
import React, { useState, useEffect } from "react";
import { clientsDb, Client } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ClientForm from "./ClientForm";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load clients
  useEffect(() => {
    const loadedClients = clientsDb.getAll();
    setClients(loadedClients);
  }, []);
  
  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phoneNumber.includes(searchQuery) ||
    (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Handle client creation/update
  const handleSaveClient = (clientData: Client) => {
    if (editingClient) {
      // Update existing client
      const updatedClient = clientsDb.update(clientData);
      
      if (updatedClient) {
        setClients(prevClients => 
          prevClients.map(client => client.id === updatedClient.id ? updatedClient : client)
        );
        
        toast({
          title: "تم تحديث الزبون",
          description: "تم تحديث معلومات الزبون بنجاح",
          variant: "default",
        });
      }
    } else {
      // Create new client
      const newClient = clientsDb.add(clientData);
      
      setClients(prevClients => [...prevClients, newClient]);
      
      toast({
        title: "تم إضافة الزبون",
        description: "تم إضافة الزبون بنجاح",
        variant: "default",
      });
    }
    
    // Close the form
    setIsFormOpen(false);
    setEditingClient(null);
  };
  
  // Handle client deletion
  const handleDeleteClient = (id: string) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية حذف الزبائن",
        variant: "destructive",
      });
      return;
    }
    
    const success = clientsDb.delete(id);
    
    if (success) {
      setClients(prevClients => 
        prevClients.filter(client => client.id !== id)
      );
      
      toast({
        title: "تم حذف الزبون",
        description: "تم حذف معلومات الزبون بنجاح",
        variant: "default",
      });
    }
  };
  
  // Handle client edit
  const handleEditClient = (client: Client) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية تعديل معلومات الزبائن",
        variant: "destructive",
      });
      return;
    }
    
    setEditingClient(client);
    setIsFormOpen(true);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الزبائن</h2>
        <Button 
          onClick={() => {
            setEditingClient(null);
            setIsFormOpen(true);
          }}
          className="bg-beauty-fuchsia hover:bg-beauty-fuchsia/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>زبون جديد</span>
        </Button>
      </div>
      
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="بحث حسب الاسم أو رقم الهاتف أو البريد الإلكتروني..."
          className="ps-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-right">#</th>
                <th className="p-2 text-right">اسم الزبون</th>
                <th className="p-2 text-right">رقم الهاتف</th>
                <th className="p-2 text-right">البريد الإلكتروني</th>
                <th className="p-2 text-right">نوع الشعر</th>
                <th className="p-2 text-right">نوع البشرة</th>
                <th className="p-2 text-right">الجلسات الحالية</th>
                <th className="p-2 text-right">الجلسات المتبقية</th>
                <th className="p-2 text-right">الدفعات المتبقية</th>
                <th className="p-2 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={client.id} className="border-t hover:bg-muted/50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{client.name}</td>
                  <td className="p-2">{client.phoneNumber}</td>
                  <td className="p-2">{client.email || "-"}</td>
                  <td className="p-2">{client.hairType || "-"}</td>
                  <td className="p-2">{client.skinType || "-"}</td>
                  <td className="p-2">{client.currentSessions}</td>
                  <td className="p-2">{client.remainingSessions}</td>
                  <td className="p-2">{client.remainingPayments || 0}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClient(client)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClient(client.id)}
                        disabled={user?.role !== "admin"}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-4 text-center text-muted-foreground">
                    لا يوجد زبائن للعرض
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isFormOpen && (
        <ClientForm
          client={editingClient}
          onClose={() => {
            setIsFormOpen(false);
            setEditingClient(null);
          }}
          onSave={handleSaveClient}
        />
      )}
    </div>
  );
};

export default ClientsPage;
