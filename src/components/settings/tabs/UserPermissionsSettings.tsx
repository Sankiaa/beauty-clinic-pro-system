
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const UserPermissionsSettings = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">إدارة المستخدمين والصلاحيات</h3>
      <p className="text-sm text-muted-foreground">تحكم في صلاحيات المستخدمين وأدوارهم في النظام</p>
      
      <div className="border rounded-md p-4 space-y-4 hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium">admin</h4>
            <p className="text-sm text-muted-foreground">مدير النظام - وصول كامل</p>
          </div>
          <Button size="sm" variant="outline" className="hover:bg-primary/10 hover:text-primary transition-colors">تغيير كلمة المرور</Button>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium">user1</h4>
            <p className="text-sm text-muted-foreground">مستخدم - وصول محدود</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="hover:bg-primary/10 hover:text-primary transition-colors">تغيير كلمة المرور</Button>
            <Button size="sm" variant="outline" className="hover:bg-primary/10 hover:text-primary transition-colors">تعديل الصلاحيات</Button>
          </div>
        </div>
        
        <Separator />
        
        <Button className="mt-4 hover:bg-primary/90 transition-colors">إضافة مستخدم جديد</Button>
      </div>
    </div>
  );
};

export default UserPermissionsSettings;
