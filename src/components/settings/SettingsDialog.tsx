
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
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
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, [open]);

  // Dynamic background colors based on tab
  const getTabBgColor = (tabId) => {
    const colors = {
      profile: "bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30 dark:to-transparent",
      system: "bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/30 dark:to-transparent",
      permissions: "bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/30 dark:to-transparent",
      backup: "bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-950/30 dark:to-transparent",
      notifications: "bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-950/30 dark:to-transparent",
      whatsapp: "bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-950/30 dark:to-transparent",
      reports: "bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-950/30 dark:to-transparent",
      about: "bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-950/30 dark:to-transparent",
    };
    return colors[tabId] || "";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-primary/10 transition-colors duration-300"
        >
          <Settings className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden p-0 border-primary/20 transition-all duration-300">
        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-xl flex items-center gap-2 text-primary">
            <Settings className="h-5 w-5" />
            <span>إعدادات النظام</span>
          </DialogTitle>
          <DialogDescription>
            تخصيص واضبط إعدادات تطبيق غُزل للجمال
          </DialogDescription>
          <Progress value={progress} className="h-1 mt-2" />
        </DialogHeader>
        
        <Tabs 
          defaultValue="profile" 
          className="w-full" 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value);
            // Animate progress based on tab selection
            setProgress(Math.floor(Math.random() * 30) + 70);
          }}
        >
          <div className="border-b bg-card/80">
            <ScrollArea className="w-full whitespace-nowrap">
              <SettingsTabs activeTab={activeTab} isAdmin={user?.role === "admin"} />
            </ScrollArea>
          </div>
          
          <ScrollArea className={`h-[500px] ${getTabBgColor(activeTab)}`}>
            <div className="p-6">
              <SettingsTabContent activeTab={activeTab} isAdmin={user?.role === "admin"} />
            </div>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter className="p-6 border-t">
          <Button 
            variant="default" 
            className="hover:bg-primary/90 transition-colors"
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
