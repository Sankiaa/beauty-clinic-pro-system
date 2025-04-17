
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, User, Shield, Database, BellRing, Info, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfileSettings from "./tabs/ProfileSettings";
import SystemSettings from "./tabs/SystemSettings";
import BackupSettings from "./tabs/BackupSettings";

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const isAdmin = user?.role === "admin";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-xl">إعدادات النظام</DialogTitle>
          <DialogDescription>
            تخصيص واضبط إعدادات تطبيق غُزل للجمال
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="border-b">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="w-full justify-start rounded-none bg-transparent px-6 h-auto">
                <TabsTrigger value="profile" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                  <User className="h-4 w-4" />
                  <span>الملف الشخصي</span>
                </TabsTrigger>
                
                <TabsTrigger value="system" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>إعدادات النظام</span>
                </TabsTrigger>
                
                {isAdmin && (
                  <TabsTrigger value="permissions" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                    <Shield className="h-4 w-4" />
                    <span>إدارة المستخدمين</span>
                  </TabsTrigger>
                )}
                
                <TabsTrigger value="backup" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                  <Database className="h-4 w-4" />
                  <span>النسخ الاحتياطي</span>
                </TabsTrigger>
                
                <TabsTrigger value="notifications" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                  <BellRing className="h-4 w-4" />
                  <span>الإشعارات</span>
                </TabsTrigger>
                
                {isAdmin && (
                  <TabsTrigger value="whatsapp" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>رسائل واتس آب</span>
                  </TabsTrigger>
                )}
                
                {isAdmin && (
                  <TabsTrigger value="reports" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                    <FileText className="h-4 w-4" />
                    <span>التقارير</span>
                  </TabsTrigger>
                )}
                
                <TabsTrigger value="about" className="flex gap-2 data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2 hover:text-primary transition-colors">
                  <Info className="h-4 w-4" />
                  <span>حول البرنامج</span>
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>
          
          <ScrollArea className="h-[500px]">
            <div className="p-6">
              <TabsContent value="profile" className="m-0">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="system" className="m-0">
                <SystemSettings />
              </TabsContent>
              
              <TabsContent value="permissions" className="m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">إدارة المستخدمين والصلاحيات</h3>
                  <p className="text-sm text-muted-foreground">تحكم في صلاحيات المستخدمين وأدوارهم في النظام</p>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">admin</h4>
                        <p className="text-sm text-muted-foreground">مدير النظام - وصول كامل</p>
                      </div>
                      <Button size="sm" variant="outline">تغيير كلمة المرور</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">user1</h4>
                        <p className="text-sm text-muted-foreground">مستخدم - وصول محدود</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">تغيير كلمة المرور</Button>
                        <Button size="sm" variant="outline">تعديل الصلاحيات</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button className="mt-4">إضافة مستخدم جديد</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="backup" className="m-0">
                <BackupSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">إعدادات الإشعارات</h3>
                  <p className="text-sm text-muted-foreground">تحكم في كيفية ظهور الإشعارات وأنواعها</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>إشعارات المواعيد الجديدة</Label>
                        <p className="text-sm text-muted-foreground">إظهار إشعار عند إضافة موعد جديد</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>إشعارات الفواتير الجديدة</Label>
                        <p className="text-sm text-muted-foreground">إظهار إشعار عند إصدار فاتورة جديدة</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>تذكيرات المواعيد</Label>
                        <p className="text-sm text-muted-foreground">إظهار تذكير قبل موعد بساعة</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>إشعارات صوتية</Label>
                        <p className="text-sm text-muted-foreground">تشغيل صوت عند ظهور إشعار جديد</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="whatsapp" className="m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">إدارة رسائل واتس آب</h3>
                  <p className="text-sm text-muted-foreground">إعداد الرسائل التذكيرية والعروض على واتس آب</p>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">رسائل تذكير المواعيد</h4>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="reminder-template">قالب رسالة التذكير</Label>
                          <textarea
                            className="min-h-[100px] resize-y border rounded-md p-2"
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
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">رسائل العروض والتخفيضات</h4>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="promo-template">قالب رسالة العروض</Label>
                          <textarea
                            className="min-h-[100px] resize-y border rounded-md p-2"
                            id="promo-template"
                            defaultValue="عزيزتنا [الاسم]، يسرنا إعلامك بعرضنا الجديد: [تفاصيل العرض]. العرض ساري حتى [التاريخ]. نتطلع لزيارتك!"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-2">حفظ الإعدادات</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reports" className="m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">التقارير المالية</h3>
                  <p className="text-sm text-muted-foreground">عرض وتصدير التقارير المالية والإحصائيات</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                      <FileText className="h-10 w-10 mb-2" />
                      <span className="font-medium">تقرير المبيعات اليومي</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                      <FileText className="h-10 w-10 mb-2" />
                      <span className="font-medium">تقرير المبيعات الأسبوعي</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                      <FileText className="h-10 w-10 mb-2" />
                      <span className="font-medium">تقرير المبيعات الشهري</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                      <FileText className="h-10 w-10 mb-2" />
                      <span className="font-medium">تقرير المبيعات السنوي</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="m-0">
                <div className="space-y-4 text-center">
                  <h3 className="text-xl font-medium">مركز غُزل للجمال</h3>
                  <p className="text-muted-foreground">الإصدار 1.0.0</p>
                  
                  <div className="py-4">
                    <img
                      src="/placeholder.svg"
                      alt="شعار مركز غُزل للجمال"
                      className="w-32 h-32 mx-auto rounded-full shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p>رقم الهاتف: +963956961395</p>
                    <p>العنوان: سوريا - ريف دمشق التل موقف طيبة مقابل امركز الثقافي الجديد تابع لعيادة د. رشا معتوق</p>
                    <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter className="p-6 border-t">
          <Button 
            variant="default" 
            onClick={() => {
              setOpen(false);
              toast({
                title: "تم حفظ الإعدادات",
                description: "تم حفظ جميع التغييرات بنجاح",
              });
            }}
          >
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
