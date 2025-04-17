
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, RefreshCw, Calendar } from "lucide-react";

const BackupSettings = () => {
  const { toast } = useToast();
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);
  
  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast({
            title: "تم إنشاء النسخة الاحتياطية",
            description: "تم حفظ النسخة الاحتياطية بنجاح",
          });
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  const handleRestoreBackup = () => {
    toast({
      title: "تم استعادة النسخة الاحتياطية",
      description: "تم استعادة البيانات بنجاح",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">النسخ الاحتياطي واستعادة البيانات</h3>
        <p className="text-sm text-muted-foreground">إدارة النسخ الاحتياطية واستعادة البيانات</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label>النسخ الاحتياطي التلقائي</Label>
            <p className="text-sm text-muted-foreground">إنشاء نسخة احتياطية تلقائياً عند إغلاق البرنامج</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="space-y-2">
          <Label>تكرار النسخ الاحتياطي</Label>
          <Select defaultValue="daily">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر التكرار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">يومياً</SelectItem>
              <SelectItem value="weekly">أسبوعياً</SelectItem>
              <SelectItem value="monthly">شهرياً</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="backup_location">مسار حفظ النسخ الاحتياطية</Label>
          <div className="flex">
            <Input id="backup_location" defaultValue="C:/GuzelBeauty/backups" className="flex-1 rounded-r-none" />
            <Button variant="outline" className="rounded-l-none">تصفح</Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>الاحتفاظ بالنسخ الاحتياطية لمدة</Label>
          <Select defaultValue="30">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المدة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 أيام</SelectItem>
              <SelectItem value="30">30 يوم</SelectItem>
              <SelectItem value="90">90 يوم</SelectItem>
              <SelectItem value="365">سنة كاملة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">النسخ الاحتياطية الحالية</span>
          </div>
        </div>
        
        <div className="space-y-4 mt-4">
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">نسخة اليوم - {new Date().toLocaleDateString('ar-SY')}</span>
              </div>
              <span className="text-sm text-muted-foreground">11:30 صباحاً</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>تنزيل</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>استعادة</span>
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">نسخة الأمس - {new Date(Date.now() - 86400000).toLocaleDateString('ar-SY')}</span>
              </div>
              <span className="text-sm text-muted-foreground">5:15 مساءً</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>تنزيل</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>استعادة</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
            onClick={handleCreateBackup}
            disabled={isBackingUp}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>إنشاء نسخة احتياطية الآن</span>
          </Button>
          
          <Button 
            onClick={handleRestoreBackup}
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" />
            <span>استعادة من نسخة احتياطية</span>
          </Button>
        </div>
        
        {isBackingUp && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>جارِ إنشاء النسخة الاحتياطية...</span>
              <span>{backupProgress}%</span>
            </div>
            <Progress value={backupProgress} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupSettings;
