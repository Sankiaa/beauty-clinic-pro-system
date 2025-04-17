
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Lock, Edit, Trash2 } from "lucide-react";

const UserPermissionsSettings = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">إدارة المستخدمين والصلاحيات</h3>
          <p className="text-sm text-muted-foreground">تحكم في صلاحيات المستخدمين وأدوارهم في النظام</p>
        </div>
        <Button size="sm" className="gap-1">
          <User className="h-4 w-4" />
          إضافة مستخدم
        </Button>
      </div>
      
      <div className="space-y-4 mt-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">المستخدمين النشطين</h4>
                <p className="text-xs text-muted-foreground">إجمالي المستخدمين: 2</p>
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            <div className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-primary h-9 w-9 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      admin
                      <Badge variant="secondary" className="ml-2">مدير النظام</Badge>
                    </h4>
                    <p className="text-xs text-muted-foreground">وصول كامل لجميع الصلاحيات</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Lock className="h-3 w-3" />
                  تغيير كلمة المرور
                </Button>
              </div>
            </div>
            
            <div className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary h-9 w-9 rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                    U
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      user1
                      <Badge variant="outline" className="ml-2">مستخدم</Badge>
                    </h4>
                    <p className="text-xs text-muted-foreground">وصول محدود للنظام</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1 h-8">
                    <Lock className="h-3 w-3" />
                    كلمة المرور
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 h-8">
                    <Edit className="h-3 w-3" />
                    تعديل
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 h-8 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">
                    <Trash2 className="h-3 w-3" />
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermissionsSettings;
