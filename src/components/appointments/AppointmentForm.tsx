
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
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Appointment, clientsDb, servicesDb } from "@/services/database";
import { v4 as uuidv4 } from "uuid";

type AppointmentFormProps = {
  appointment: Appointment | null;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
};

// Add uuid dependency
const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onClose,
  onSave,
}) => {
  // State for form fields
  const [clientId, setClientId] = useState(appointment?.clientId || "");
  const [clientName, setClientName] = useState(appointment?.clientName || "");
  const [phoneNumber, setPhoneNumber] = useState(appointment?.phoneNumber || "");
  const [email, setEmail] = useState(appointment?.email || "");
  const [date, setDate] = useState<Date | undefined>(
    appointment?.date ? new Date(appointment.date) : new Date()
  );
  const [time, setTime] = useState(appointment?.time || "");
  const [selectedServices, setSelectedServices] = useState<string[]>(appointment?.services || []);
  const [providerId, setProviderId] = useState(appointment?.providerId || "1"); // Default provider
  const [providerName, setProviderName] = useState(appointment?.providerName || "الطبيب");
  const [notes, setNotes] = useState(appointment?.notes || "");
  const [status, setStatus] = useState<"confirmed" | "pending">(appointment?.status || "pending");
  const [remainingPayments, setRemainingPayments] = useState(appointment?.remainingPayments || 0);
  
  // Load clients and services
  const [clients, setClients] = useState(clientsDb.getAll());
  const [services, setServices] = useState(servicesDb.getAll());
  
  // Handle client selection
  const handleClientSelect = (selectedClientId: string) => {
    const selectedClient = clients.find(client => client.id === selectedClientId);
    
    if (selectedClient) {
      setClientId(selectedClientId);
      setClientName(selectedClient.name);
      setPhoneNumber(selectedClient.phoneNumber);
      setEmail(selectedClient.email || "");
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !clientName || !phoneNumber || selectedServices.length === 0) {
      // Show error or validation message
      return;
    }
    
    const appointmentData: Appointment = {
      id: appointment?.id || uuidv4(),
      clientId,
      clientName,
      phoneNumber,
      email,
      date: format(date, "yyyy-MM-dd"),
      time,
      services: selectedServices,
      providerId,
      providerName,
      notes,
      status,
      remainingPayments,
    };
    
    onSave(appointmentData);
  };
  
  // Handle service selection
  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prevSelected => 
      prevSelected.includes(serviceName)
        ? prevSelected.filter(name => name !== serviceName)
        : [...prevSelected, serviceName]
    );
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {appointment ? "تعديل موعد" : "إضافة موعد جديد"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            {/* Email (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            
            {/* Service Provider */}
            <div className="space-y-2">
              <Label htmlFor="providerName">مقدم الخدمة</Label>
              <Input
                id="providerName"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                required
              />
            </div>
            
            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">حالة الموعد</Label>
              <Select onValueChange={(value) => setStatus(value as "confirmed" | "pending")} value={status}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">مؤكد</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Remaining Payments */}
            <div className="space-y-2">
              <Label htmlFor="remainingPayments">الدفعات المتبقية (في حال التقسيط)</Label>
              <Input
                id="remainingPayments"
                type="number"
                min="0"
                value={remainingPayments}
                onChange={(e) => setRemainingPayments(Number(e.target.value))}
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
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات (اختياري)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي ملاحظات إضافية..."
              rows={3}
            />
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

export default AppointmentForm;
