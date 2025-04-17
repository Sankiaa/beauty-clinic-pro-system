
import React, { useState, useEffect } from "react";
import { servicesDb, Service } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ServiceForm from "./ServiceForm";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load services
  useEffect(() => {
    // Initialize default services if none exist
    servicesDb.initializeDefault();
    
    const loadedServices = servicesDb.getAll();
    setServices(loadedServices);
  }, []);
  
  // Filter services based on search query
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle service creation/update
  const handleSaveService = (serviceData: Service) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية إدارة الخدمات والأسعار",
        variant: "destructive",
      });
      return;
    }
    
    if (editingService) {
      // Update existing service
      const updatedService = servicesDb.update(serviceData);
      
      if (updatedService) {
        setServices(prevServices => 
          prevServices.map(service => service.id === updatedService.id ? updatedService : service)
        );
        
        toast({
          title: "تم تحديث الخدمة",
          description: "تم تحديث معلومات الخدمة بنجاح",
          variant: "default",
        });
      }
    } else {
      // Create new service
      const newService = servicesDb.add(serviceData);
      
      setServices(prevServices => [...prevServices, newService]);
      
      toast({
        title: "تم إضافة الخدمة",
        description: "تم إضافة الخدمة بنجاح",
        variant: "default",
      });
    }
    
    // Close the form
    setIsFormOpen(false);
    setEditingService(null);
  };
  
  // Handle service deletion
  const handleDeleteService = (id: string) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية حذف الخدمات",
        variant: "destructive",
      });
      return;
    }
    
    const success = servicesDb.delete(id);
    
    if (success) {
      setServices(prevServices => 
        prevServices.filter(service => service.id !== id)
      );
      
      toast({
        title: "تم حذف الخدمة",
        description: "تم حذف الخدمة بنجاح",
        variant: "default",
      });
    }
  };
  
  // Handle service edit
  const handleEditService = (service: Service) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية تعديل معلومات الخدمات",
        variant: "destructive",
      });
      return;
    }
    
    setEditingService(service);
    setIsFormOpen(true);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الخدمات والأسعار</h2>
        <Button 
          onClick={() => {
            setEditingService(null);
            setIsFormOpen(true);
          }}
          className="bg-beauty-fuchsia hover:bg-beauty-fuchsia/90"
          disabled={user?.role !== "admin"}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>خدمة جديدة</span>
        </Button>
      </div>
      
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="بحث حسب اسم الخدمة..."
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
                <th className="p-2 text-right">اسم الخدمة</th>
                <th className="p-2 text-right">السعر</th>
                <th className="p-2 text-right">تسعير ديناميكي</th>
                <th className="p-2 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={service.id} className="border-t hover:bg-muted/50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{service.name}</td>
                  <td className="p-2">
                    {service.dynamicPricing ? "تسعير ديناميكي (حسب عدد الضربات)" : formatCurrency(service.price)}
                  </td>
                  <td className="p-2">
                    {service.dynamicPricing ? "نعم" : "لا"}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditService(service)}
                        disabled={user?.role !== "admin"}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
                        disabled={user?.role !== "admin"}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    لا توجد خدمات للعرض
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isFormOpen && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setIsFormOpen(false);
            setEditingService(null);
          }}
          onSave={handleSaveService}
        />
      )}
    </div>
  );
};

export default ServicesPage;
