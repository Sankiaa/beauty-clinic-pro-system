
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sun, Moon, Monitor } from "lucide-react";

const SystemSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم تحديث إعدادات النظام بنجاح",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">إعدادات النظام</h3>
        <p className="text-sm text-muted-foreground">إدارة إعدادات وتفضيلات التطبيق</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>المظهر</Label>
          <ToggleGroup type="single" defaultValue={theme} className="justify-start">
            <ToggleGroupItem value="light" aria-label="فاتح" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span>فاتح</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="داكن" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span>داكن</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="تلقائي" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>تلقائي</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-2">
          <Label>اللغة</Label>
          <Select defaultValue={language}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">الإنجليزية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>المنطقة الزمنية</Label>
          <Select defaultValue="Asia/Damascus">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المنطقة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Damascus">دمشق (GMT+3)</SelectItem>
              <SelectItem value="Asia/Beirut">بيروت (GMT+3)</SelectItem>
              <SelectItem value="Asia/Amman">عمّان (GMT+3)</SelectItem>
              <SelectItem value="Europe/Istanbul">اسطنبول (GMT+3)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>تنسيق التاريخ</Label>
          <Select defaultValue="dd/MM/yyyy">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر تنسيق التاريخ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>تنسيق الوقت</Label>
          <Select defaultValue="12">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر تنسيق الوقت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 ساعة (مساءً/صباحاً)</SelectItem>
              <SelectItem value="24">24 ساعة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>العملة</Label>
          <Select defaultValue="SYP">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر العملة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SYP">ليرة سورية (ل.س)</SelectItem>
              <SelectItem value="USD">دولار أمريكي ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label>تفعيل تسجيل الدخول التلقائي</Label>
            <p className="text-sm text-muted-foreground">تسجيل الدخول تلقائياً عند فتح البرنامج</p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label>عرض شاشة البداية</Label>
            <p className="text-sm text-muted-foreground">عرض شاشة ترحيبية عند بدء تشغيل البرنامج</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">معلومات المركز</span>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="clinic_name">اسم المركز</Label>
          <Input id="clinic_name" defaultValue="مركز غُزل للجمال" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="clinic_phone">رقم هاتف المركز</Label>
          <Input id="clinic_phone" defaultValue="+963956961395" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="clinic_address">عنوان المركز</Label>
          <Input id="clinic_address" defaultValue="سوريا - ريف دمشق التل موقف طيبة مقابل امركز الثقافي الجديد تابع لعيادة د. رشا معتوق" />
        </div>
      </div>
      
      <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
    </div>
  );
};

export default SystemSettings;
