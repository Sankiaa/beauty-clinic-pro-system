
import React, { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Service } from "@/services/database";
import { v4 as uuidv4 } from "uuid";

type ServiceFormProps = {
  service: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
};

const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onClose,
  onSave,
}) => {
  // State for form fields
  const [name, setName] = useState(service?.name || "");
  const [price, setPrice] = useState(service?.price || 0);
  const [dynamicPricing, setDynamicPricing] = useState(service?.dynamicPricing || false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      // Show error or validation message
      return;
    }
    
    const serviceData: Service = {
      id: service?.id || uuidv4(),
      name,
      price,
      dynamicPricing,
    };
    
    onSave(serviceData);
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {service ? "تعديل معلومات الخدمة" : "إضافة خدمة جديدة"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">اسم الخدمة</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* Dynamic Pricing Switch */}
          <div className="flex items-center justify-between space-y-0">
            <Label htmlFor="dynamicPricing">تسعير ديناميكي (حسب عدد ضربات الليزر)</Label>
            <Switch
              id="dynamicPricing"
              checked={dynamicPricing}
              onCheckedChange={setDynamicPricing}
            />
          </div>
          
          {/* Price (if not dynamic) */}
          {!dynamicPricing && (
            <div className="space-y-2">
              <Label htmlFor="price">السعر (ل.س)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required={!dynamicPricing}
              />
            </div>
          )}
          
          {/* Note about dynamic pricing */}
          {dynamicPricing && (
            <div className="text-sm text-muted-foreground">
              سيتم حساب السعر تلقائيًا بناءً على عدد ضربات الليزر (1,500 ل.س للضربة)
            </div>
          )}
          
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

export default ServiceForm;
