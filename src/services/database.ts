
// Simple local storage based database

// Types
export type Appointment = {
  id: string;
  clientId: string;
  clientName: string;
  phoneNumber: string;
  email?: string;
  date: string;
  time: string;
  services: string[];
  providerId: string;
  providerName: string;
  notes?: string;
  status: "confirmed" | "pending";
  remainingPayments?: number;
};

export type Client = {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  hairType?: string;
  hairColor?: string;
  skinType?: string;
  allergies?: string;
  currentSessions: number;
  remainingSessions: number;
  favoriteServices: string[];
  remainingPayments?: number;
  notes?: string;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  dynamicPricing?: boolean;
};

export type Invoice = {
  id: string;
  clientId: string;
  clientName: string;
  phoneNumber: string;
  appointmentId: string;
  date: string;
  time: string;
  services: string[];
  paymentMethod: "cash" | "installment";
  amountPaid: number;
  amountRemaining: number;
  createdBy: string;
  serviceProvider: string;
  totalAmount: number;
};

// Collection names
const COLLECTIONS = {
  APPOINTMENTS: "appointments",
  CLIENTS: "clients",
  SERVICES: "services",
  INVOICES: "invoices",
};

// Generic CRUD operations
const getCollection = <T>(collectionName: string): T[] => {
  const data = localStorage.getItem(collectionName);
  return data ? JSON.parse(data) : [];
};

const saveCollection = <T>(collectionName: string, data: T[]): void => {
  localStorage.setItem(collectionName, JSON.stringify(data));
};

const addItem = <T extends { id: string }>(collectionName: string, item: T): T => {
  const collection = getCollection<T>(collectionName);
  collection.push(item);
  saveCollection(collectionName, collection);
  return item;
};

const updateItem = <T extends { id: string }>(collectionName: string, item: T): T | null => {
  const collection = getCollection<T>(collectionName);
  const index = collection.findIndex((i) => i.id === item.id);
  
  if (index !== -1) {
    collection[index] = item;
    saveCollection(collectionName, collection);
    return item;
  }
  
  return null;
};

const deleteItem = <T extends { id: string }>(collectionName: string, id: string): boolean => {
  const collection = getCollection<T>(collectionName);
  const filteredCollection = collection.filter((item) => item.id !== id);
  
  if (filteredCollection.length !== collection.length) {
    saveCollection(collectionName, filteredCollection);
    return true;
  }
  
  return false;
};

const getItem = <T extends { id: string }>(collectionName: string, id: string): T | null => {
  const collection = getCollection<T>(collectionName);
  const item = collection.find((i) => i.id === id);
  return item || null;
};

// Specific collection operations
export const appointmentsDb = {
  getAll: (): Appointment[] => getCollection<Appointment>(COLLECTIONS.APPOINTMENTS),
  get: (id: string): Appointment | null => getItem<Appointment>(COLLECTIONS.APPOINTMENTS, id),
  add: (appointment: Appointment): Appointment => addItem<Appointment>(COLLECTIONS.APPOINTMENTS, appointment),
  update: (appointment: Appointment): Appointment | null => updateItem<Appointment>(COLLECTIONS.APPOINTMENTS, appointment),
  delete: (id: string): boolean => deleteItem<Appointment>(COLLECTIONS.APPOINTMENTS, id),
  getByClientId: (clientId: string): Appointment[] => {
    const appointments = getCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    return appointments.filter(appointment => appointment.clientId === clientId);
  },
  getByDate: (date: string): Appointment[] => {
    const appointments = getCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    return appointments.filter(appointment => appointment.date === date);
  }
};

export const clientsDb = {
  getAll: (): Client[] => getCollection<Client>(COLLECTIONS.CLIENTS),
  get: (id: string): Client | null => getItem<Client>(COLLECTIONS.CLIENTS, id),
  add: (client: Client): Client => addItem<Client>(COLLECTIONS.CLIENTS, client),
  update: (client: Client): Client | null => updateItem<Client>(COLLECTIONS.CLIENTS, client),
  delete: (id: string): boolean => deleteItem<Client>(COLLECTIONS.CLIENTS, id),
  search: (query: string): Client[] => {
    const clients = getCollection<Client>(COLLECTIONS.CLIENTS);
    const lowercaseQuery = query.toLowerCase();
    return clients.filter(client => 
      client.name.toLowerCase().includes(lowercaseQuery) || 
      client.phoneNumber.includes(query) ||
      (client.email && client.email.toLowerCase().includes(lowercaseQuery))
    );
  }
};

export const servicesDb = {
  getAll: (): Service[] => getCollection<Service>(COLLECTIONS.SERVICES),
  get: (id: string): Service | null => getItem<Service>(COLLECTIONS.SERVICES, id),
  add: (service: Service): Service => addItem<Service>(COLLECTIONS.SERVICES, service),
  update: (service: Service): Service | null => updateItem<Service>(COLLECTIONS.SERVICES, service),
  delete: (id: string): boolean => deleteItem<Service>(COLLECTIONS.SERVICES, id),
  // Initialize default services
  initializeDefault: (): void => {
    const existingServices = getCollection<Service>(COLLECTIONS.SERVICES);
    
    if (existingServices.length === 0) {
      const defaultServices: Service[] = [
        { id: "1", name: "وجه كامل", price: 50000 },
        { id: "2", name: "شارب", price: 0, dynamicPricing: true },
        { id: "3", name: "ذقن", price: 0, dynamicPricing: true },
        { id: "4", name: "كف اليد", price: 0, dynamicPricing: true },
        { id: "5", name: "ايدين كاملين", price: 150000 },
        { id: "6", name: "ساعدين", price: 80000 },
        { id: "7", name: "عضدين", price: 90000 },
        { id: "8", name: "رجلين كاملين", price: 250000 },
        { id: "9", name: "ساقين", price: 120000 },
        { id: "10", name: "فخذين", price: 150000 },
        { id: "11", name: "ارداف", price: 50000 },
        { id: "12", name: "بيكيني", price: 50000 },
        { id: "13", name: "ابط", price: 50000 },
        { id: "14", name: "ابط + بيكيني", price: 100000 },
        { id: "15", name: "بطن", price: 120000 },
        { id: "16", name: "خط السرة", price: 80000 },
        { id: "17", name: "اسفل الظهر", price: 0, dynamicPricing: true },
        { id: "18", name: "ظهر", price: 130000 },
        { id: "19", name: "جسم كامل", price: 700000 },
        { id: "20", name: "جسم كامل مع وجه وارداف", price: 750000 },
        { id: "21", name: "جسم جزئي", price: 550000 },
      ];
      
      saveCollection(COLLECTIONS.SERVICES, defaultServices);
    }
  }
};

export const invoicesDb = {
  getAll: (): Invoice[] => getCollection<Invoice>(COLLECTIONS.INVOICES),
  get: (id: string): Invoice | null => getItem<Invoice>(COLLECTIONS.INVOICES, id),
  add: (invoice: Invoice): Invoice => addItem<Invoice>(COLLECTIONS.INVOICES, invoice),
  update: (invoice: Invoice): Invoice | null => updateItem<Invoice>(COLLECTIONS.INVOICES, invoice),
  delete: (id: string): boolean => deleteItem<Invoice>(COLLECTIONS.INVOICES, id),
  getByClientId: (clientId: string): Invoice[] => {
    const invoices = getCollection<Invoice>(COLLECTIONS.INVOICES);
    return invoices.filter(invoice => invoice.clientId === clientId);
  }
};

// Initialize the database with default data
export const initializeDatabase = (): void => {
  servicesDb.initializeDefault();
};

// Backup and restore
export const createBackup = (): string => {
  const backup = {
    appointments: getCollection(COLLECTIONS.APPOINTMENTS),
    clients: getCollection(COLLECTIONS.CLIENTS),
    services: getCollection(COLLECTIONS.SERVICES),
    invoices: getCollection(COLLECTIONS.INVOICES),
    timestamp: new Date().toISOString()
  };
  
  return JSON.stringify(backup);
};

export const restoreBackup = (backupData: string): boolean => {
  try {
    const backup = JSON.parse(backupData);
    
    if (backup.appointments) saveCollection(COLLECTIONS.APPOINTMENTS, backup.appointments);
    if (backup.clients) saveCollection(COLLECTIONS.CLIENTS, backup.clients);
    if (backup.services) saveCollection(COLLECTIONS.SERVICES, backup.services);
    if (backup.invoices) saveCollection(COLLECTIONS.INVOICES, backup.invoices);
    
    return true;
  } catch (error) {
    console.error("Failed to restore backup:", error);
    return false;
  }
};
