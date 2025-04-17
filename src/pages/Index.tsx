
import React, { useState, useEffect } from "react";
import LoginPage from "@/components/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AppointmentsPage from "@/components/appointments/AppointmentsPage";
import ClientsPage from "@/components/clients/ClientsPage";
import ServicesPage from "@/components/services/ServicesPage";
import InvoicesPage from "@/components/invoices/InvoicesPage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { initializeDatabase } from "@/services/database";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activePage, setActivePage] = useState<string>("dashboard");
  
  // Initialize the database with default services
  useEffect(() => {
    initializeDatabase();
  }, []);
  
  // Create a backup when the window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      // We would normally create a backup here
      // But for now, we'll just leave a placeholder
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  
  // Render different pages based on active page
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage setActivePage={setActivePage} />;
      case "appointments":
        return <AppointmentsPage />;
      case "clients":
        return <ClientsPage />;
      case "services":
        return <ServicesPage />;
      case "invoices":
        return <InvoicesPage />;
      default:
        return <DashboardPage setActivePage={setActivePage} />;
    }
  };
  
  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  // If authenticated, show dashboard
  return (
    <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </DashboardLayout>
  );
};

export default Index;
