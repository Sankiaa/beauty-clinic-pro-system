
import React from "react";
import CalendarComponent from "./Calendar";
import FinancialSummary from "./FinancialSummary";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Scissors, Receipt } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { appointmentsDb, clientsDb, servicesDb, invoicesDb } from "@/services/database";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  description,
  onClick,
}) => {
  return (
    <Card className="dashboard-card cursor-pointer hover:border-primary transition-all" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

type Props = {
  setActivePage: (page: string) => void;
};

const DashboardPage: React.FC<Props> = ({ setActivePage }) => {
  const { user } = useAuth();
  
  // Get counts from database
  const appointmentsCount = appointmentsDb.getAll().length;
  const clientsCount = clientsDb.getAll().length;
  const servicesCount = servicesDb.getAll().length;
  const invoicesCount = invoicesDb.getAll().length;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SY", {
      style: "currency",
      currency: "SYP",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate total revenue
  const totalRevenue = invoicesDb.getAll().reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">لوحة التحكم</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="المواعيد"
          value={appointmentsCount}
          icon={<Calendar className="h-6 w-6 text-primary" />}
          description="إجمالي المواعيد"
          onClick={() => setActivePage("appointments")}
        />
        
        <DashboardCard
          title="الزبائن"
          value={clientsCount}
          icon={<Users className="h-6 w-6 text-primary" />}
          description="إجمالي الزبائن"
          onClick={() => setActivePage("clients")}
        />
        
        <DashboardCard
          title="الخدمات"
          value={servicesCount}
          icon={<Scissors className="h-6 w-6 text-primary" />}
          description="إجمالي الخدمات"
          onClick={() => setActivePage("services")}
        />
        
        <DashboardCard
          title="الفواتير"
          value={invoicesCount}
          icon={<Receipt className="h-6 w-6 text-primary" />}
          description="إجمالي الفواتير"
          onClick={() => setActivePage("invoices")}
        />
      </div>
      
      {user?.role === "admin" && (
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">إجمالي الإيرادات</h3>
            <div className="text-4xl font-bold mb-2">{formatCurrency(totalRevenue)}</div>
            <p className="text-sm text-muted-foreground">إجمالي الإيرادات من جميع الفواتير</p>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FinancialSummary />
        </div>
        <div>
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
