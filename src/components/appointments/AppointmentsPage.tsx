
import React, { useState, useEffect } from "react";
import { appointmentsDb, Appointment, servicesDb, clientsDb } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import AppointmentForm from "./AppointmentForm";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load appointments
  useEffect(() => {
    const loadedAppointments = appointmentsDb.getAll();
    setAppointments(loadedAppointments);
  }, []);
  
  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(appointment => 
    appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.phoneNumber.includes(searchQuery)
  );
  
  // Handle appointment creation/update
  const handleSaveAppointment = (appointmentData: Appointment) => {
    if (editingAppointment) {
      // Update existing appointment
      const updatedAppointment = appointmentsDb.update(appointmentData);
      
      if (updatedAppointment) {
        setAppointments(prevAppointments => 
          prevAppointments.map(app => app.id === updatedAppointment.id ? updatedAppointment : app)
        );
        
        toast({
          title: "تم تحديث الموعد",
          description: "تم تحديث الموعد بنجاح",
          variant: "default",
        });
      }
    } else {
      // Create new appointment
      const newAppointment = appointmentsDb.add(appointmentData);
      
      setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
      
      toast({
        title: "تم إضافة الموعد",
        description: "تم إضافة الموعد بنجاح",
        variant: "default",
      });
    }
    
    // Close the form
    setIsFormOpen(false);
    setEditingAppointment(null);
  };
  
  // Handle appointment deletion
  const handleDeleteAppointment = (id: string) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية حذف المواعيد",
        variant: "destructive",
      });
      return;
    }
    
    const success = appointmentsDb.delete(id);
    
    if (success) {
      setAppointments(prevAppointments => 
        prevAppointments.filter(app => app.id !== id)
      );
      
      toast({
        title: "تم حذف الموعد",
        description: "تم حذف الموعد بنجاح",
        variant: "default",
      });
    }
  };
  
  // Handle appointment edit
  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">المواعيد</h2>
        <Button 
          onClick={() => {
            setEditingAppointment(null);
            setIsFormOpen(true);
          }}
          className="bg-beauty-fuchsia hover:bg-beauty-fuchsia/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>موعد جديد</span>
        </Button>
      </div>
      
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="بحث حسب اسم الزبون أو رقم الهاتف..."
          className="ps-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-right">#</th>
                <th className="p-2 text-right">اسم الزبون</th>
                <th className="p-2 text-right">رقم الهاتف</th>
                <th className="p-2 text-right">التاريخ</th>
                <th className="p-2 text-right">الوقت</th>
                <th className="p-2 text-right">الخدمات</th>
                <th className="p-2 text-right">مقدم الخدمة</th>
                <th className="p-2 text-right">الحالة</th>
                <th className="p-2 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment.id} className="border-t hover:bg-muted/50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{appointment.clientName}</td>
                  <td className="p-2">{appointment.phoneNumber}</td>
                  <td className="p-2">{appointment.date}</td>
                  <td className="p-2">{appointment.time}</td>
                  <td className="p-2">{appointment.services.join(", ")}</td>
                  <td className="p-2">{appointment.providerName}</td>
                  <td className="p-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      appointment.status === "confirmed" 
                        ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300" 
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                    }`}>
                      {appointment.status === "confirmed" ? "مؤكد" : "قيد الانتظار"}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        disabled={user?.role !== "admin"}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-muted-foreground">
                    لا توجد مواعيد للعرض
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isFormOpen && (
        <AppointmentForm
          appointment={editingAppointment}
          onClose={() => {
            setIsFormOpen(false);
            setEditingAppointment(null);
          }}
          onSave={handleSaveAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
