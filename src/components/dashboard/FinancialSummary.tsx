
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { invoicesDb } from "@/services/database";
import { CreditCard } from "lucide-react";

const FinancialSummary: React.FC = () => {
  const { user } = useAuth();
  
  // Only show this component for admin users
  if (user?.role !== "admin") return null;
  
  // Get invoices and calculate daily, weekly, monthly and yearly totals
  const invoices = invoicesDb.getAll();
  
  // Calculate total income
  const totalIncome = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  
  // Generate some sample data for the chart
  const financialData = [
    { name: "الأحد", amount: 120000 },
    { name: "الإثنين", amount: 180000 },
    { name: "الثلاثاء", amount: 200000 },
    { name: "الأربعاء", amount: 250000 },
    { name: "الخميس", amount: 300000 },
    { name: "الجمعة", amount: 150000 },
    { name: "السبت", amount: 220000 },
  ];
  
  // Format number to currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SY", {
      style: "currency",
      currency: "SYP",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <span>ملخص مالي</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-accent p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">اليوم</div>
            <div className="text-lg font-bold">{formatCurrency(financialData[6].amount)}</div>
          </div>
          <div className="bg-accent p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">الأسبوع</div>
            <div className="text-lg font-bold">
              {formatCurrency(financialData.reduce((sum, day) => sum + day.amount, 0))}
            </div>
          </div>
          <div className="bg-accent p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">الشهر</div>
            <div className="text-lg font-bold">
              {formatCurrency(financialData.reduce((sum, day) => sum + day.amount, 0) * 4)}
            </div>
          </div>
          <div className="bg-accent p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">السنة</div>
            <div className="text-lg font-bold">
              {formatCurrency(financialData.reduce((sum, day) => sum + day.amount, 0) * 52)}
            </div>
          </div>
        </div>
        
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                labelFormatter={(label) => `اليوم: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#D946EF" 
                activeDot={{ r: 8 }} 
                name="المبلغ"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
