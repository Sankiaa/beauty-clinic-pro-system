
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ProfileSettings from "./tabs/ProfileSettings";
import SystemSettings from "./tabs/SystemSettings";
import BackupSettings from "./tabs/BackupSettings";
import UserPermissionsSettings from "./tabs/UserPermissionsSettings";
import NotificationsSettings from "./tabs/NotificationsSettings";
import WhatsappSettings from "./tabs/WhatsappSettings";
import ReportsSettings from "./tabs/ReportsSettings";
import AboutSettings from "./tabs/AboutSettings";

interface SettingsTabContentProps {
  activeTab: string;
  isAdmin: boolean;
}

const SettingsTabContent: React.FC<SettingsTabContentProps> = ({ activeTab, isAdmin }) => {
  return (
    <>
      <TabsContent value="profile" className="m-0 animate-in fade-in-50 duration-300">
        <ProfileSettings />
      </TabsContent>
              
      <TabsContent value="system" className="m-0 animate-in fade-in-50 duration-300">
        <SystemSettings />
      </TabsContent>
              
      {isAdmin && (
        <TabsContent value="permissions" className="m-0 animate-in fade-in-50 duration-300">
          <UserPermissionsSettings />
        </TabsContent>
      )}
              
      <TabsContent value="backup" className="m-0 animate-in fade-in-50 duration-300">
        <BackupSettings />
      </TabsContent>
              
      <TabsContent value="notifications" className="m-0 animate-in fade-in-50 duration-300">
        <NotificationsSettings />
      </TabsContent>
              
      {isAdmin && (
        <TabsContent value="whatsapp" className="m-0 animate-in fade-in-50 duration-300">
          <WhatsappSettings />
        </TabsContent>
      )}
              
      {isAdmin && (
        <TabsContent value="reports" className="m-0 animate-in fade-in-50 duration-300">
          <ReportsSettings />
        </TabsContent>
      )}
              
      <TabsContent value="about" className="m-0 animate-in fade-in-50 duration-300">
        <AboutSettings />
      </TabsContent>
    </>
  );
};

export default SettingsTabContent;
