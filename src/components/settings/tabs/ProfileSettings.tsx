
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم حفظ التغييرات بنجاح",
    });
  };
  
  return (
    <form onSubmit={handleSaveProfile} className="space-y-4">
      <h3 className="text-lg font-medium">الملف الشخصي</h3>
      <p className="text-sm text-muted-foreground">تعديل معلومات الحساب الشخصية</p>
      
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-primary">
            <AvatarImage src={user?.username === "admin" ? "/placeholder.svg" : "/placeholder.svg"} />
            <AvatarFallback className="text-2xl">
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">اسم المستخدم</Label>
          <Input
            id="username"
            defaultValue={user?.username}
            disabled
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="role">الصلاحية</Label>
          <Input
            id="role"
            defaultValue={user?.role === "admin" ? "مدير" : "مستخدم"}
            disabled
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input
            id="name"
            defaultValue={user?.username === "admin" ? "مدير النظام" : "مستخدم عادي"}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            defaultValue={user?.username === "admin" ? "admin@guzel.com" : "user1@guzel.com"}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            defaultValue="+963956XXXXXX"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">تغيير كلمة المرور</span>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="current_password">كلمة المرور الحالية</Label>
          <Input
            id="current_password"
            type="password"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="new_password">كلمة المرور الجديدة</Label>
          <Input
            id="new_password"
            type="password"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="confirm_password">تأكيد كلمة المرور الجديدة</Label>
          <Input
            id="confirm_password"
            type="password"
          />
        </div>
      </div>
      
      <Button type="submit" className="mt-4">حفظ التغييرات</Button>
    </form>
  );
};

export default ProfileSettings;
