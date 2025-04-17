
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointmentsDb, Appointment } from "@/services/database";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

const CalendarComponent: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Appointment[]>([]);
  
  // Function to get appointments for the selected date
  const getAppointmentsForDate = (date: Date) => {
    if (!date) return [];
    
    const dateString = format(date, "yyyy-MM-dd");
    const appointments = appointmentsDb.getByDate(dateString);
    setEvents(appointments);
  };
  
  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      getAppointmentsForDate(newDate);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <span>التقويم</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          locale={ar}
          className="mx-auto pointer-events-auto"
        />
        
        {events.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">المواعيد اليوم:</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="bg-accent p-2 rounded text-sm">
                  <div className="font-medium">{event.clientName}</div>
                  <div className="text-xs text-muted-foreground">
                    {event.time} - {event.services.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {events.length === 0 && date && (
          <div className="mt-4 text-center text-muted-foreground">
            لا توجد مواعيد في هذا اليوم
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarComponent;
