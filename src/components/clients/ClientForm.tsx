
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client, servicesDb } from "@/services/database";
import { v4 as uuidv4 } from "uuid";

type ClientFormProps = {
  client: Client | null;
  onClose: () => void;
  onSave: (client: Client) => void;
};

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onClose,
  onSave,
}) => {
  // State for form fields
  const [name, setName] = useState(client?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(client?.phoneNumber || "");
  const [email, setEmail] = useState(client?.email || "");
  const [hairType, setHairType] = useState(client?.hairType || "");
  const [hairColor, setHairColor] = useState(client?.hairColor || "");
  const [skinType, setSkinType] = useState(client?.skinType || "");
  const [allergies, setAllergies] = useState(client?.allergies || "");
  const [currentSessions, setCurrentSessions] = useState(client?.currentSessions || 0);
  const [remainingSessions, setRemainingSessions] = useState(client?.remainingSessions || 0);
  const [favoriteServices, setFavoriteServices] = useState<string[]>(client?.favoriteServices || []);
  const [remainingPayments, setRemainingPayments] = useState(client?.remainingPayments || 0);
  const [notes, setNotes] = useState(client?.notes || "");
  
  // Load services for favorite services dropdown
  const services = servicesDb.getAll();
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phoneNumber) {
      // Show error or validation message
      return;
    }
    
    const clientData: Client = {
      id: client?.id || uuidv4(),
      name,
      phoneNumber,
      email,
      hairType,
      hairColor,
      skinType,
      allergies,
      currentSessions,
      remainingSessions,
      favoriteServices,
      remainingPayments,
      notes,
    };
    
    onSave(clientData);
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {client ? "تعديل معلومات الزبون" : "إضافة زبون جديد"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">اسم الزبون</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            
            {/* Hair Type */}
            <div className="space-y-2">
              <Label htmlFor="hairType">نوع الشعر</Label>
              <Select onValueChange={setHairType} value={hairType}>
                <SelectTrigger id="hairType">
                  <SelectValue placeholder="اختر نوع الشعر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ناعم">ناعم</SelectItem>
                  <SelectItem value="عادي">عادي</SelectItem>
                  <SelectItem value="خشن">خشن</SelectItem>
                  <SelectItem value="مجعد">مجعد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Hair Color */}
            <div className="space-y-2">
              <Label htmlFor="hairColor">لون الشعر</Label>
              <Input
                id="hairColor"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
              />
            </div>
            
            {/* Skin Type */}
            <div className="space-y-2">
              <Label htmlFor="skinType">نوع البشرة</Label>
              <Select onValueChange={setSkinType} value={skinType}>
                <SelectTrigger id="skinType">
                  <SelectValue placeholder="اختر نوع البشرة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عادية">عادية</SelectItem>
                  <SelectItem value="دهنية">دهنية</SelectItem>
                  <SelectItem value="جافة">جافة</SelectItem>
                  <SelectItem value="مختلطة">مختلطة</SelectItem>
                  <SelectItem value="حساسة">حساسة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Allergies */}
            <div className="space-y-2">
              <Label htmlFor="allergies">الحساسية</Label>
              <Input
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
            
            {/* Current Sessions */}
            <div className="space-y-2">
              <Label htmlFor="currentSessions">عدد الجلسات الحالية</Label>
              <Input
                id="currentSessions"
                type="number"
                min="0"
                value={currentSessions}
                onChange={(e) => setCurrentSessions(Number(e.target.value))}
              />
            </div>
            
            {/* Remaining Sessions */}
            <div className="space-y-2">
              <Label htmlFor="remainingSessions">عدد الجلسات المتبقية</Label>
              <Input
                id="remainingSessions"
                type="number"
                min="0"
                value={remainingSessions}
                onChange={(e) => setRemainingSessions(Number(e.target.value))}
              />
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
            
            {/* Favorite Services */}
            <div className="space-y-2">
              <Label htmlFor="favoriteServices">الخدمات الأكثر طلباً</Label>
              <Select
                onValueChange={(value) => setFavoriteServices([...favoriteServices, value])}
              >
                <SelectTrigger id="favoriteServices">
                  <SelectValue placeholder="اختر الخدمات المفضلة" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem 
                      key={service.id} 
                      value={service.name}
                      disabled={favoriteServices.includes(service.name)}
                    >
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Display selected favorite services */}
              {favoriteServices.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {favoriteServices.map((service, index) => (
                    <div 
                      key={index} 
                      className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center"
                    >
                      {service}
                      <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => setFavoriteServices(favoriteServices.filter(s => s !== service))}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

export default ClientForm;
