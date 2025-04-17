
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const NotificationsSettings = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">إعدادات الإشعارات</h3>
      <p className="text-sm text-muted-foreground">تحكم في كيفية ظهور الإشعارات وأنواعها</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md hover:border-primary/50 transition-colors">
          <div className="space-y-0.5">
            <Label>إشعارات المواعيد الجديدة</Label>
            <p className="text-sm text-muted-foreground">إظهار إشعار عند إضافة موعد جديد</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md hover:border-primary/50 transition-colors">
          <div className="space-y-0.5">
            <Label>إشعارات الفواتير الجديدة</Label>
            <p className="text-sm text-muted-foreground">إظهار إشعار عند إصدار فاتورة جديدة</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md hover:border-primary/50 transition-colors">
          <div className="space-y-0.5">
            <Label>تذكيرات المواعيد</Label>
            <p className="text-sm text-muted-foreground">إظهار تذكير قبل موعد بساعة</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md hover:border-primary/50 transition-colors">
          <div className="space-y-0.5">
            <Label>إشعارات صوتية</Label>
            <p className="text-sm text-muted-foreground">تشغيل صوت عند ظهور إشعار جديد</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
