
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCircle,
  Settings,
  Shield,
  Database,
  BellRing,
  MessageSquare,
  FileText,
  Info,
} from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  isAdmin: boolean;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, isAdmin }) => {
  return (
    <TabsList className="w-full justify-start rounded-none bg-transparent px-3 h-auto overflow-x-auto">
      <TabsTrigger
        value="profile"
        className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
      >
        <UserCircle className="h-4 w-4" />
        <span>الملف الشخصي</span>
      </TabsTrigger>

      <TabsTrigger
        value="system"
        className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
      >
        <Settings className="h-4 w-4" />
        <span>إعدادات النظام</span>
      </TabsTrigger>

      {isAdmin && (
        <TabsTrigger
          value="permissions"
          className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
        >
          <Shield className="h-4 w-4" />
          <span>إدارة المستخدمين</span>
        </TabsTrigger>
      )}

      <TabsTrigger
        value="backup"
        className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
      >
        <Database className="h-4 w-4" />
        <span>النسخ الاحتياطي</span>
      </TabsTrigger>

      <TabsTrigger
        value="notifications"
        className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
      >
        <BellRing className="h-4 w-4" />
        <span>الإشعارات</span>
      </TabsTrigger>

      {isAdmin && (
        <TabsTrigger
          value="whatsapp"
          className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>رسائل واتس آب</span>
        </TabsTrigger>
      )}

      {isAdmin && (
        <TabsTrigger
          value="reports"
          className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>التقارير</span>
        </TabsTrigger>
      )}

      <TabsTrigger
        value="about"
        className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-4 py-3 hover:text-primary transition-colors"
      >
        <Info className="h-4 w-4" />
        <span>حول البرنامج</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabs;
