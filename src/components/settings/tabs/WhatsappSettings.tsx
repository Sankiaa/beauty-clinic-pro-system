
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const WhatsappSettings = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">إدارة رسائل واتس آب</h3>
      <p className="text-sm text-muted-foreground">إعداد الرسائل التذكيرية والعروض على واتس آب</p>
      
      <div className="space-y-4">
        <div className="border rounded-md p-4 hover:border-primary/50 transition-colors">
          <h4 className="font-medium mb-2">رسائل تذكير المواعيد</h4>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="reminder-template">قالب رسالة التذكير</Label>
              <textarea
                className="min-h-[100px] resize-y border rounded-md p-2 hover:border-primary focus:border-primary transition-colors"
                id="reminder-template"
                defaultValue="مرحباً [الاسم]، نذكرك بموعدك غداً الساعة [الوقت] في مركز غُزل للجمال. لتأكيد أو إلغاء الموعد، يرجى الرد على هذه الرسالة."
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="send-reminder" defaultChecked />
              <Label htmlFor="send-reminder">إرسال تذكير قبل الموعد بـ 24 ساعة</Label>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4 hover:border-primary/50 transition-colors">
          <h4 className="font-medium mb-2">رسائل العروض والتخفيضات</h4>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="promo-template">قالب رسالة العروض</Label>
              <textarea
                className="min-h-[100px] resize-y border rounded-md p-2 hover:border-primary focus:border-primary transition-colors"
                id="promo-template"
                defaultValue="عزيزتنا [الاسم]، يسرنا إعلامك بعرضنا الجديد: [تفاصيل العرض]. العرض ساري حتى [التاريخ]. نتطلع لزيارتك!"
              />
            </div>
          </div>
        </div>
        
        <Button className="mt-2 hover:bg-primary/90 transition-colors">حفظ الإعدادات</Button>
      </div>
    </div>
  );
};

export default WhatsappSettings;
