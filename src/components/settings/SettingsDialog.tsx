
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import SettingsTabs from "./SettingsTabs";
import SettingsTabContent from "./SettingsTabContent";

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [progress, setProgress] = useState(13);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Effect to animate progress bar
  useEffect(() => {
    if (open) {
      setProgress(13);
      const timer1 = setTimeout(() => setProgress(45), 100);
      const timer2 = setTimeout(() => setProgress(67), 300);
      const timer3 = setTimeout(() => setProgress(85), 600);
      const timer4 = setTimeout(() => setProgress(100), 900);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [open]);

  // Change progress when tab changes
  useEffect(() => {
    if (open) {
      setProgress(85);
      const timer = setTimeout(() => setProgress(100), 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Dynamic background colors based on tab
  const getTabBgColor = (tabId) => {
    const colors = {
      profile: "bg-gradient-to-r from-purple-50/70 to-transparent dark:from-purple-950/20 dark:to-transparent",
      system: "bg-gradient-to-r from-blue-50/70 to-transparent dark:from-blue-950/20 dark:to-transparent",
      permissions: "bg-gradient-to-r from-green-50/70 to-transparent dark:from-green-950/20 dark:to-transparent",
      backup: "bg-gradient-to-r from-yellow-50/70 to-transparent dark:from-yellow-950/20 dark:to-transparent",
      notifications: "bg-gradient-to-r from-pink-50/70 to-transparent dark:from-pink-950/20 dark:to-transparent",
      whatsapp: "bg-gradient-to-r from-emerald-50/70 to-transparent dark:from-emerald-950/20 dark:to-transparent",
      reports: "bg-gradient-to-r from-orange-50/70 to-transparent dark:from-orange-950/20 dark:to-transparent",
      about: "bg-gradient-to-r from-gray-50/70 to-transparent dark:from-gray-950/20 dark:to-transparent",
    };
    return colors[tabId] || "";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative group hover:bg-primary/10 transition-colors duration-300"
        >
          <Settings className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
          <span className="sr-only">إعدادات</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden p-0 border-primary/20 shadow-lg transition-all duration-300">
        <DialogHeader className="px-6 pt-4 pb-2 bg-card/30 backdrop-blur-sm">
          <DialogTitle className="text-xl flex items-center gap-2 text-primary">
            <Settings className="h-5 w-5" />
            <span>إعدادات النظام</span>
          </DialogTitle>
          <DialogDescription>
            تخصيص واضبط إعدادات تطبيق غُزل للجمال
          </DialogDescription>
          <Progress value={progress} className="h-1 mt-2 bg-primary/10" />
        </DialogHeader>
        
        <Tabs 
          defaultValue="profile" 
          className="w-full" 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value);
            setProgress(85);
            setTimeout(() => setProgress(100), 300);
          }}
        >
          <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
            <ScrollArea className="w-full" orientation="horizontal">
              <div className="min-w-full">
                <SettingsTabs activeTab={activeTab} isAdmin={user?.role === "admin"} />
              </div>
            </ScrollArea>
          </div>
          
          <ScrollArea className={`h-[520px] ${getTabBgColor(activeTab)}`}>
            <div className="p-6 animate-in fade-in-50 duration-300">
              <SettingsTabContent activeTab={activeTab} isAdmin={user?.role === "admin"} />
            </div>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter className="p-4 border-t bg-card/30 backdrop-blur-sm flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="gap-1"
          >
            إلغاء
          </Button>
          <Button 
            variant="default" 
            className="gap-2 hover:bg-primary/90 transition-colors"
            onClick={() => {
              setOpen(false);
              toast({
                title: "تم حفظ الإعدادات",
                description: "تم حفظ جميع التغييرات بنجاح",
              });
            }}
          >
            <Save className="h-4 w-4" />
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
