
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const AboutSettings = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">مركز غُزل للجمال</h3>
        <Badge variant="outline" className="px-3 py-1 text-xs font-medium">الإصدار 1.0.0</Badge>
      </div>
      
      <div className="flex justify-center my-6">
        <div className="relative group">
          <img
            src="/placeholder.svg"
            alt="شعار مركز غُزل للجمال"
            className="w-32 h-32 mx-auto rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 border-4 border-primary/20 group-hover:border-primary/40"
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      <div className="space-y-4 text-center">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">رقم الهاتف</p>
          <p className="font-medium text-primary">+963956961395</p>
        </div>
        
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">العنوان</p>
          <p className="text-sm">سوريا - ريف دمشق التل موقف طيبة مقابل المركز الثقافي الجديد</p>
          <p className="text-sm">تابع لعيادة د. رشا معتوق</p>
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open('https://guzel-beauty.com', '_blank')}>
            زيارة الموقع الإلكتروني
            <ExternalLink className="h-3 w-3 mr-1" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground pt-2">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default AboutSettings;
