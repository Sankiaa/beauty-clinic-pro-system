
import React, { useState, useEffect } from "react";
import { invoicesDb, Invoice, appointmentsDb } from "@/services/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import InvoiceForm from "./InvoiceForm";

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load invoices
  useEffect(() => {
    const loadedInvoices = invoicesDb.getAll();
    setInvoices(loadedInvoices);
  }, []);
  
  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(invoice => 
    invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.phoneNumber.includes(searchQuery) ||
    invoice.date.includes(searchQuery)
  );
  
  // Handle invoice creation/update
  const handleSaveInvoice = (invoiceData: Invoice) => {
    if (editingInvoice) {
      // Update existing invoice
      const updatedInvoice = invoicesDb.update(invoiceData);
      
      if (updatedInvoice) {
        setInvoices(prevInvoices => 
          prevInvoices.map(invoice => invoice.id === updatedInvoice.id ? updatedInvoice : invoice)
        );
        
        toast({
          title: "تم تحديث الفاتورة",
          description: "تم تحديث الفاتورة بنجاح",
          variant: "default",
        });
      }
    } else {
      // Create new invoice
      const newInvoice = invoicesDb.add(invoiceData);
      
      setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
      
      toast({
        title: "تم إضافة الفاتورة",
        description: "تم إضافة الفاتورة بنجاح",
        variant: "default",
      });
    }
    
    // Close the form
    setIsFormOpen(false);
    setEditingInvoice(null);
  };
  
  // Handle invoice deletion
  const handleDeleteInvoice = (id: string) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية حذف الفواتير",
        variant: "destructive",
      });
      return;
    }
    
    const success = invoicesDb.delete(id);
    
    if (success) {
      setInvoices(prevInvoices => 
        prevInvoices.filter(invoice => invoice.id !== id)
      );
      
      toast({
        title: "تم حذف الفاتورة",
        description: "تم حذف الفاتورة بنجاح",
        variant: "default",
      });
    }
  };
  
  // Handle invoice edit
  const handleEditInvoice = (invoice: Invoice) => {
    if (user?.role !== "admin") {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية تعديل الفواتير",
        variant: "destructive",
      });
      return;
    }
    
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };
  
  // Handle invoice print
  const handlePrintInvoice = (invoice: Invoice) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast({
        title: "خطأ في الطباعة",
        description: "لم نتمكن من فتح نافذة الطباعة. يرجى التحقق من إعدادات المتصفح.",
        variant: "destructive",
      });
      return;
    }
    
    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("ar-SY", {
        style: "currency",
        currency: "SYP",
        maximumFractionDigits: 0,
      }).format(amount);
    };
    
    // Write the invoice HTML to the new window
    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>فاتورة رقم ${invoice.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              direction: rtl;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .invoice-title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .invoice-subtitle {
              font-size: 14px;
              color: #666;
              margin-bottom: 10px;
            }
            .invoice-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
            }
            .invoice-details {
              margin-bottom: 20px;
            }
            .invoice-details h3 {
              margin-bottom: 10px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 8px;
              text-align: right;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f9f9f9;
            }
            .totals {
              text-align: left;
              margin-top: 20px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
            .print-button {
              padding: 10px 15px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div class="invoice-title">مركز غُزل للجمال</div>
            <div class="invoice-subtitle">
              سوريا - ريف دمشق التل موقف طيبة مقابل المركز الثقافي الجديد تابع لعيادة د. رشا معتوق
            </div>
            <div class="invoice-subtitle">
              هاتف: +963956961395
            </div>
          </div>
          
          <div class="invoice-info">
            <div>
              <div><strong>فاتورة إلى:</strong> ${invoice.clientName}</div>
              <div><strong>رقم الهاتف:</strong> ${invoice.phoneNumber}</div>
            </div>
            <div>
              <div><strong>رقم الفاتورة:</strong> ${invoice.id.substring(0, 8)}</div>
              <div><strong>التاريخ:</strong> ${invoice.date}</div>
              <div><strong>الوقت:</strong> ${invoice.time}</div>
            </div>
          </div>
          
          <div class="invoice-details">
            <h3>تفاصيل الخدمات</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>الخدمة</th>
                  <th>السعر</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.services.map((service, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${service}</td>
                    <td>${formatCurrency(invoice.totalAmount / invoice.services.length)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="totals">
            <div><strong>إجمالي المبلغ:</strong> ${formatCurrency(invoice.totalAmount)}</div>
            <div><strong>المبلغ المدفوع:</strong> ${formatCurrency(invoice.amountPaid)}</div>
            <div><strong>المبلغ المتبقي:</strong> ${formatCurrency(invoice.amountRemaining)}</div>
            <div><strong>طريقة الدفع:</strong> ${invoice.paymentMethod === "cash" ? "كاش" : "تقسيط"}</div>
          </div>
          
          <div class="footer">
            <p>شكراً لزيارتكم مركز غُزل للجمال</p>
            <p>محرر الفاتورة: ${invoice.createdBy} | مقدم الخدمة: ${invoice.serviceProvider}</p>
          </div>
          
          <div class="no-print" style="text-align: center;">
            <button class="print-button" onclick="window.print();">طباعة الفاتورة</button>
          </div>
        </body>
      </html>
    `);
    
    // Focus the window and trigger print
    printWindow.document.close();
    printWindow.focus();
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SY", {
      style: "currency",
      currency: "SYP",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الفواتير</h2>
        <Button 
          onClick={() => {
            setEditingInvoice(null);
            setIsFormOpen(true);
          }}
          className="bg-beauty-fuchsia hover:bg-beauty-fuchsia/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>فاتورة جديدة</span>
        </Button>
      </div>
      
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="بحث حسب اسم الزبون أو رقم الهاتف أو التاريخ..."
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
                <th className="p-2 text-right">التاريخ</th>
                <th className="p-2 text-right">الخدمات</th>
                <th className="p-2 text-right">طريقة الدفع</th>
                <th className="p-2 text-right">المبلغ المدفوع</th>
                <th className="p-2 text-right">المبلغ المتبقي</th>
                <th className="p-2 text-right">إجمالي المبلغ</th>
                <th className="p-2 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <tr key={invoice.id} className="border-t hover:bg-muted/50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{invoice.clientName}</td>
                  <td className="p-2">{invoice.phoneNumber}</td>
                  <td className="p-2">{invoice.date}</td>
                  <td className="p-2">{invoice.services.join(", ")}</td>
                  <td className="p-2">
                    {invoice.paymentMethod === "cash" ? "كاش" : "تقسيط"}
                  </td>
                  <td className="p-2">{formatCurrency(invoice.amountPaid)}</td>
                  <td className="p-2">{formatCurrency(invoice.amountRemaining)}</td>
                  <td className="p-2">{formatCurrency(invoice.totalAmount)}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handlePrintInvoice(invoice)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditInvoice(invoice)}
                        disabled={user?.role !== "admin"}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        disabled={user?.role !== "admin"}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-4 text-center text-muted-foreground">
                    لا توجد فواتير للعرض
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isFormOpen && (
        <InvoiceForm
          invoice={editingInvoice}
          onClose={() => {
            setIsFormOpen(false);
            setEditingInvoice(null);
          }}
          onSave={handleSaveInvoice}
        />
      )}
    </div>
  );
};

export default InvoicesPage;
