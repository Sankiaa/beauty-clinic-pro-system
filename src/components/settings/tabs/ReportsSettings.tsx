
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const ReportsSettings = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">التقارير المالية</h3>
      <p className="text-sm text-muted-foreground">عرض وتصدير التقارير المالية والإحصائيات</p>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        >
          <FileText className="h-10 w-10 mb-2" />
          <span className="font-medium">تقرير المبيعات اليومي</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        >
          <FileText className="h-10 w-10 mb-2" />
          <span className="font-medium">تقرير المبيعات الأسبوعي</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        >
          <FileText className="h-10 w-10 mb-2" />
          <span className="font-medium">تقرير المبيعات الشهري</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        >
          <FileText className="h-10 w-10 mb-2" />
          <span className="font-medium">تقرير المبيعات السنوي</span>
        </Button>
      </div>
    </div>
  );
};

export default ReportsSettings;
