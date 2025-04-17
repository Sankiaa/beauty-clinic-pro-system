
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Invoice, clientsDb, servicesDb, Service, appointmentsDb, Appointment } from "@/services/database";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

type InvoiceFormProps = {
  invoice: Invoice | null;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onClose,
  onSave,
}) => {
  const { user } = useAuth();
  
  // State for form fields
  const [clientId, setClientId] = useState(invoice?.clientId || "");
  const [clientName, setClientName] = useState(invoice?.clientName || "");
  const [phoneNumber, setPhoneNumber] = useState(invoice?.phoneNumber || "");
  const [appointmentId, setAppointmentId] = useState(invoice?.appointmentId || "");
  const [date, setDate] = useState<Date | undefined>(
    invoice?.date ? new Date(invoice.date) : new Date()
  );
  const [time, setTime] = useState(invoice?.time || format(new Date(), "HH:mm"));
  const [selectedServices, setSelectedServices] = useState<string[]>(invoice?.services || []);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "installment">(invoice?.paymentMethod || "cash");
  const [amountPaid, setAmountPaid] = useState(invoice?.amountPaid || 0);
  const [amountRemaining, setAmountRemaining] = useState(invoice?.amountRemaining || 0);
  const [createdBy, setCreatedBy] = useState(invoice?.createdBy || user?.username || "");
  const [serviceProvider, setServiceProvider] = useState(invoice?.serviceProvider || "");
  const [totalAmount, setTotalAmount] = useState(invoice?.totalAmount || 0);
  const [laserShots, setLaserShots] = useState<{ [key: string]: number }>({});
  
  // Load clients, services, and appointments
  const [clients, setClients] = useState(clientsDb.getAll());
  const [services, setServices] = useState<Service[]>(servicesDb.getAll());
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsDb.getAll());
  
  // Calculate total amount when selected services change
  useEffect(() => {
    let total = 0;
    
    selectedServices.forEach(serviceName => {
      const service = services.find(s => s.name === serviceName);
      
      if (service) {
        if (service.dynamicPricing) {
          // Dynamic pricing based on laser shots
          const shots = laserShots[service.name] || 0;
          total += shots * 1500; // 1,500 ل.س per shot
        } else {
          // Fixed price
          total += service.price;
        }
      }
    });
    
    setTotalAmount(total);
    
    // If cash payment, set amount paid to total
    if (paymentMethod === "cash") {
      setAmountPaid(total);
      setAmountRemaining(0);
    } else {
      // For installments, update remaining amount
      setAmountRemaining(total - amountPaid);
    }
  }, [selectedServices, services, laserShots, paymentMethod, amountPaid]);
  
  // Update remaining amount when paid amount changes
  useEffect(() => {
    if (paymentMethod === "installment") {
      setAmountRemaining(totalAmount - amountPaid);
    }
  }, [amountPaid, totalAmount, paymentMethod]);
  
  // Handle client selection
  const handleClientSelect = (selectedClientId: string) => {
    const selectedClient = clients.find(client => client.id === selectedClientId);
    
    if (selectedClient) {
      setClientId(selectedClientId);
      setClientName(selectedClient.name);
      setPhoneNumber(selectedClient.phoneNumber);
    }
  };
  
  // Handle appointment selection
  const handleAppointmentSelect = (selectedAppointmentId: string) => {
    const selectedAppointment = appointments.find(appointment => appointment.id === selectedAppointmentId);
    
    if (selectedAppointment) {
      setAppointmentId(selectedAppointmentId);
      handleClientSelect(selectedAppointment.clientId);
      setDate(new Date(selectedAppointment.date));
      setTime(selectedAppointment.time);
      setSelectedServices(selectedAppointment.services);
      setServiceProvider(selectedAppointment.providerName);
    }
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    const newPaymentMethod = value as "cash" | "installment";
    setPaymentMethod(newPaymentMethod);
    
    if (newPaymentMethod === "cash") {
      setAmountPaid(totalAmount);
      setAmountRemaining(0);
    }
  };
  
  // Handle service selection
  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prevSelected => 
      prevSelected.includes(serviceName)
        ? prevSelected.filter(name => name !== serviceName)
        : [...prevSelected, serviceName]
    );
  };
  
  // Handle laser shots change
  const handleLaserShotsChange = (serviceName: string, shots: number) => {
    setLaserShots(prev => ({
      ...prev,
      [serviceName]: shots
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !clientName || !phoneNumber || selectedServices.length === 0) {
      // Show error or validation message
      return;
    }
    
    const invoiceData: Invoice = {
      id: invoice?.id || uuidv4(),
      clientId,
      clientName,
      phoneNumber,
      appointmentId,
      date: format(date, "yyyy-MM-dd"),
      time,
      services: selectedServices,
      paymentMethod,
      amountPaid,
      amountRemaining,
      createdBy,
      serviceProvider,
      totalAmount,
    };
    
    onSave(invoiceData);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SY", {
      style: "currency",
      currency: "SYP",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {invoice ? "تعديل فاتورة" : "إنشاء فاتورة جديدة"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Appointment Selection */}
            <div className="space-y-2">
              <Label htmlFor="appointmentSelect">اختر الموعد (اختياري)</Label>
              <Select onValueChange={handleAppointmentSelect} value={appointmentId}>
                <SelectTrigger id="appointmentSelect">
                  <SelectValue placeholder="اختر الموعد" />
                </SelectTrigger>
                <SelectContent>
                  {appointments.map(appointment => (
                    <SelectItem key={appointment.id} value={appointment.id}>
                      {appointment.clientName} - {appointment.date} ({appointment.time})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Client Selection */}
            <div className="space-y-2">
              <Label htmlFor="clientSelect">اختر الزبون</Label>
              <Select onValueChange={handleClientSelect} value={clientId}>
                <SelectTrigger id="clientSelect">
                  <SelectValue placeholder="اختر الزبون" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} ({client.phoneNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="clientName">اسم الزبون</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">رقم الهاتف</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            
            {/* Date */}
            <div className="space-y-2">
              <Label>التاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="h-4 w-4 me-2" />
                    {date ? format(date, "yyyy-MM-dd") : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time">الوقت</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            
            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">طريقة الدفع</Label>
              <Select onValueChange={handlePaymentMethodChange} value={paymentMethod}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">كاش</SelectItem>
                  <SelectItem value="installment">تقسيط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {paymentMethod === "installment" && (
              <div className="space-y-2">
                <Label htmlFor="amountPaid">المبلغ المدفوع</Label>
                <Input
                  id="amountPaid"
                  type="number"
                  min="0"
                  max={totalAmount}
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(Number(e.target.value))}
                  required
                />
              </div>
            )}
            
            {/* Service Provider */}
            <div className="space-y-2">
              <Label htmlFor="serviceProvider">مقدم الخدمة</Label>
              <Input
                id="serviceProvider"
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                required
              />
            </div>
            
            {/* Created By */}
            <div className="space-y-2">
              <Label htmlFor="createdBy">محرر الفاتورة</Label>
              <Input
                id="createdBy"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-2">
            <Label>الخدمات</Label>
            <div className="border rounded-md p-3 max-h-40 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2">
              {services.map(service => (
                <div key={service.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`service-${service.id}`}
                    checked={selectedServices.includes(service.name)}
                    onCheckedChange={() => handleServiceToggle(service.name)}
                  />
                  <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
                    {service.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dynamic Pricing for Selected Services */}
          {selectedServices.some(serviceName => 
            services.find(s => s.name === serviceName)?.dynamicPricing
          ) && (
            <div className="space-y-2">
              <Label>عدد ضربات الليزر للخدمات ذات التسعير الديناميكي</Label>
              <div className="border rounded-md p-3 space-y-2">
                {selectedServices
                  .filter(serviceName => 
                    services.find(s => s.name === serviceName)?.dynamicPricing
                  )
                  .map(serviceName => (
                    <div key={serviceName} className="grid grid-cols-2 gap-2 items-center">
                      <Label>{serviceName}</Label>
                      <Input
                        type="number"
                        min="0"
                        value={laserShots[serviceName] || 0}
                        onChange={(e) => handleLaserShotsChange(serviceName, Number(e.target.value))}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          )}
          
          {/* Summary */}
          <div className="border rounded-md p-4 space-y-2 bg-muted/30">
            <div className="flex justify-between">
              <span>إجمالي المبلغ:</span>
              <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>المبلغ المدفوع:</span>
              <span>{formatCurrency(amountPaid)}</span>
            </div>
            <div className="flex justify-between">
              <span>المبلغ المتبقي:</span>
              <span>{formatCurrency(amountRemaining)}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-beauty-fuchsia hover:bg-beauty-fuchsia/90">
              حفظ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceForm;
