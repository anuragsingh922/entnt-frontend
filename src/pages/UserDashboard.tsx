import React, { useCallback, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NotificationBadge from "./NotificationBadge";
import CompanyList from "./CompanyList";
import styles from "./Style.module.css";
import { communications } from "@/services/api";

const CommunicationCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showDialog, setShowDialog] = React.useState(false);
  const [showAddEventDialog, setShowAddEventDialog] = React.useState(false);
  const [disabledEvents, setDisabledEvents] = React.useState<string[]>([]);
  const [newEvent, setNewEvent] = React.useState({
    type: "",
    company: "",
    notes: "",
  });
  const [comapanyWithEvents, setcomapanyWithEvents] = useState([]);

  // Mock dates with communications
  const [lastcommunicationDates, setlastcommunicationDates] = React.useState(
    []
  );
  const [upcommingcommunicationDates, setupcommingcommunicationDates] =
    React.useState([]);

  // Mock events data with past and upcoming communications
  const [events, setEvents] = React.useState({});

  const getallevents = useCallback(async () => {
    try {
      const result = await communications.getAlll();

      const groupedByCompany = result.reduce((acc: any, communication: any) => {
        const companyName = communication.company.name;
        const currentDate = new Date();

        // Initialize the company object with last, upcoming, and current arrays if it doesn't exist
        if (!acc[companyName]) {
          acc[companyName] = {
            name: companyName,
            last: [],
            upcoming: [],
            current: [],
          };
        }

        const eventDate = new Date(communication.date);

        // Extract the year, month, and day from the ISO date
        const year = eventDate.getUTCFullYear();
        const month = eventDate.getUTCMonth(); // Months are 0-indexed, so November (11) becomes 10
        const day = eventDate.getUTCDate();

        // Create a new Date object using the year, month, and day
        const newDate = new Date(year, month, day);

        // const comdates = communicationDates;
        // comdates.push(newDate);
        // setCommunicationDates(comdates);

        // Classify the event based on the eventDate compared to the currentDate
        if (eventDate < currentDate) {
          setlastcommunicationDates((prev) => [...prev, eventDate]);
          acc[companyName].last.push({
            name: communication.name,
            description: communication.description,
            mandatoryFlag: communication.mandatoryFlag,
            date: communication.date,
          }); // Past event
        } else {
          setupcommingcommunicationDates((prev) => [...prev, eventDate]);
          acc[companyName].upcoming.push({
            name: communication.name,
            description: communication.description,
            mandatoryFlag: communication.mandatoryFlag,
            date: communication.date,
          });
        }

        return acc;
      }, {});
      setcomapanyWithEvents(groupedByCompany);
      console.log(
        "Last : ",
        lastcommunicationDates,
        "Upcoming : ",
        upcommingcommunicationDates
      );
    } catch (error) {
      console.error("Error in getting all the events : ", error);
    }
  }, []);

  useEffect(() => {
    getallevents();
  }, [getallevents]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setShowDialog(true);
    }
  };

  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return events[dateKey as keyof typeof events] || [];
  };

  const toggleEventHighlight = (dateKey: string) => {
    setDisabledEvents((prev) =>
      prev.includes(dateKey)
        ? prev.filter((d) => d !== dateKey)
        : [...prev, dateKey]
    );
  };

  const handleAddEvent = () => {
    if (!date || !newEvent.type || !newEvent.company) return;

    const dateKey = format(date, "yyyy-MM-dd");
    const updatedEvents = {
      ...events,
      [dateKey]: [
        ...(events[dateKey as keyof typeof events] || []),
        { ...newEvent, status: "upcoming" },
      ],
    };

    setEvents(updatedEvents);
    setShowAddEventDialog(false);
    setNewEvent({ type: "", company: "", notes: "" });
  };

  const EventCard = ({ event, dateKey }: { event: any; dateKey: string }) => (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <p className="font-medium text-sm">{event?.company}</p>
              <p className="text-sm text-muted-foreground">{event?.type}</p>
              <p className="text-sm mt-1">{event?.notes}</p>
              <div className="mt-2 flex items-center gap-2">
                <Switch
                  checked={!disabledEvents.includes(dateKey)}
                  onCheckedChange={() => toggleEventHighlight(dateKey)}
                />
                <span className="text-xs text-muted-foreground">
                  {disabledEvents.includes(dateKey)
                    ? "Highlight disabled"
                    : "Highlight enabled"}
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{event.notes}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <>
      <Card className="h-full m-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Communication Calendar</CardTitle>
          <div className={styles.header}>
            <Button
              onClick={() => setShowAddEventDialog(true)}
              className={styles.btn}
            >
              Add Event
            </Button>
            <NotificationBadge />
          </div>
        </CardHeader>

        <div className={`${styles.main}`}>
          <div className={styles.list}>
            <CompanyList list={comapanyWithEvents} />
          </div>
          <div className={styles.event}>
            <div>
              <CardContent>
                <div className="grid lg:grid-cols-[1fr_300px] gap-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    modifiers={{
                      lastcommunication: lastcommunicationDates,
                      upcomingcommunication: upcommingcommunicationDates,
                      lastEvent: lastcommunicationDates.filter(
                        (d) => !disabledEvents.includes(format(d, "yyyy-MM-dd"))
                      ),
                      upcomingEvent: upcommingcommunicationDates.filter(
                        (d) => !disabledEvents.includes(format(d, "yyyy-MM-dd"))
                      ),
                    }}
                    modifiersStyles={{
                      communication: {
                        backgroundColor: "#FEF7CD",
                        color: "#1A1F2C",
                        borderRadius: "50%",
                      },
                      lastEvent: {
                        backgroundColor: "#FF0000",
                        color: "white",
                        borderRadius: "50%",
                      },
                      upcomingEvent: {
                        backgroundColor: "#fed24a",
                        color: "black",
                        borderRadius: "50%",
                      },
                      selected: {
                        backgroundColor: "#6fa8dc",
                        color: "black",
                        borderRadius: "50%",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                    className="rounded-md border"
                  />

                  <div className="hidden lg:block">
                    <h3 className="font-medium mb-2">
                      {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                    </h3>
                    <div className="space-y-2">
                      {getEventsForDate(date).map((event, index) => (
                        <EventCard
                          key={index}
                          event={event}
                          dateKey={date ? format(date, "yyyy-MM-dd") : ""}
                        />
                      ))}
                      {date && getEventsForDate(date).length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No events for this date
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Dialog
                  open={showAddEventDialog}
                  onOpenChange={setShowAddEventDialog}
                >
                  <DialogContent className="bg-gray-300">
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-gray-300">
                        <Select
                          value={newEvent.type}
                          onValueChange={(value) =>
                            setNewEvent((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          placeholder="Company name"
                          value={newEvent.company}
                          onChange={(e) =>
                            setNewEvent((prev) => ({
                              ...prev,
                              company: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Notes"
                          value={newEvent.notes}
                          onChange={(e) =>
                            setNewEvent((prev) => ({
                              ...prev,
                              notes: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button
                        onClick={handleAddEvent}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Add Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </div>
            <div>
              <CardContent>
                {/* <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      {getEventsForDate(date).map((event, index) => (
                        <EventCard
                          key={index}
                          event={event}
                          dateKey={date ? format(date, "yyyy-MM-dd") : ""}
                        />
                      ))}
                      {date && getEventsForDate(date).length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No events for this date
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog> */}

                <Dialog
                  open={showAddEventDialog}
                  onOpenChange={setShowAddEventDialog}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Select
                          value={newEvent.type}
                          onValueChange={(value) =>
                            setNewEvent((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          placeholder="Company name"
                          value={newEvent.company}
                          onChange={(e) =>
                            setNewEvent((prev) => ({
                              ...prev,
                              company: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Notes"
                          value={newEvent.notes}
                          onChange={(e) =>
                            setNewEvent((prev) => ({
                              ...prev,
                              notes: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button
                        onClick={handleAddEvent}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Add Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CommunicationCalendar;
