import React from "react";
import { Calendar } from "../components/ui/calendar";
import { Card } from "../components/ui/card";

const CalendarView = () => {
  const [pastDate, setPastDate] = React.useState<Date | undefined>(new Date());
  const [futureDate, setFutureDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-medium mb-4">Past Communications</h3>
        <Calendar
          mode="single"
          selected={pastDate}
          onSelect={setPastDate}
          className="rounded-md border"
        />
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-4">Upcoming Communications</h3>
        <Calendar
          mode="single"
          selected={futureDate}
          onSelect={setFutureDate}
          className="rounded-md border"
        />
      </Card>
    </div>
  );
};

export default CalendarView;