
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Calendar,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
  Scissors,
  Receipt,
  Languages,
} from "lucide-react";

type Props = {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
};

const DashboardLayout: React.FC<Props> = ({ children, activePage, setActivePage }) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = () => {
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نراك قريبًا!",
    });
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top navigation bar */}
      <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4 md:px-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Logo or clinic name */}
          <h1 className="text-xl font-bold text-primary-foreground hidden md:block">
            مركز غُزل للجمال
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 justify-center flex-1">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="search"
              className="block w-full p-2 ps-10 text-sm border rounded-lg bg-card focus:ring-primary focus:border-primary"
              placeholder="البحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          {/* Language toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="text-muted-foreground hover:text-foreground"
          >
            <Languages className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          {/* Logout */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Right sidebar with menu buttons */}
        <aside className="w-20 md:w-64 bg-sidebar border-s border-border flex flex-col items-center md:items-stretch p-3">
          <div className="space-y-2 flex-1">
            <h2 className="text-lg font-semibold hidden md:block mb-4 px-2">القائمة الرئيسية</h2>
            
            <Button
              variant={activePage === "appointments" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActivePage("appointments")}
            >
              <Calendar className="h-5 w-5" />
              <span className="hidden md:inline">المواعيد</span>
            </Button>
            
            <Button
              variant={activePage === "clients" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActivePage("clients")}
            >
              <Users className="h-5 w-5" />
              <span className="hidden md:inline">الزبائن</span>
            </Button>
            
            <Button
              variant={activePage === "services" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActivePage("services")}
            >
              <Scissors className="h-5 w-5" />
              <span className="hidden md:inline">الخدمات والأسعار</span>
            </Button>
            
            <Button
              variant={activePage === "invoices" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActivePage("invoices")}
            >
              <Receipt className="h-5 w-5" />
              <span className="hidden md:inline">الفواتير</span>
            </Button>
          </div>
          
          <div className="mt-auto pt-4 hidden md:block">
            <div className="text-xs text-muted-foreground">
              <p>المستخدم: {user?.username}</p>
              <p>الصلاحية: {user?.role === "admin" ? "مدير" : "مستخدم"}</p>
            </div>
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
