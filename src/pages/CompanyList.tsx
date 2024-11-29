import React from "react";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Checkbox } from "../components/ui/checkbox";

interface Communication {
  type: string;
  date: string;
  notes?: string;
}

interface Company {
  id: string;
  name: string;
  lastCommunications: Communication[];
  nextCommunication?: Communication;
  status: "overdue" | "due" | "normal";
}

// Mock data
const companies: Company[] = [
  {
    id: "1",
    name: "Apple Inc.",
    lastCommunications: [
      {
        type: "LinkedIn Post",
        date: "2024-04-05",
        notes: "Product launch announcement",
      },
      { type: "Email", date: "2024-04-01", notes: "Follow-up meeting" },
    ],
    nextCommunication: { type: "Email", date: "2024-04-10" },
    status: "due",
  },
  {
    id: "2",
    name: "Microsoft",
    lastCommunications: [
      { type: "Email", date: "2024-04-03", notes: "Partnership discussion" },
    ],
    nextCommunication: { type: "LinkedIn Post", date: "2024-04-15" },
    status: "normal",
  },
  {
    id: "3",
    name: "Google",
    lastCommunications: [
      { type: "LinkedIn Post", date: "2024-03-28", notes: "Tech conference" },
    ],
    nextCommunication: { type: "Email", date: "2024-04-01" },
    status: "overdue",
  },
];

interface CompanyEvents {
  name: string;
  last: Event[];
  upcoming: Event[];
  current: Event[];
}

interface CompanyWithEvents {
  [companyName: string]: CompanyEvents;
}

const CompanyList = ({ list }: { list: CompanyWithEvents }) => {
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>(
    []
  );

  const getStatusColor = (status: Company["status"]) => {
    switch (status) {
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "due":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
      <div className="space-y-4">
        {Object.entries(list).map(([companyName, events]) => (
          <div
            key={companyName}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              selectedCompanies.includes(companyName)
                ? "border-primary/50 shadow-sm"
                : "border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCompanies.includes(companyName)}
                  onCheckedChange={() => handleCompanySelect(companyName)}
                />
                <h3 className="font-medium">{companyName}</h3>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Last Communications:</span>
                <div className="mt-1 space-y-1">
                  {Array.isArray(events.last) && events.last.length > 0
                    ? events.last.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs"
                        >
                          <span>{event.name}</span>
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Next Communications:</span>
                <div className="mt-1 space-y-1">
                  {Array.isArray(events.upcoming) && events.upcoming.length > 0
                    ? events.upcoming.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs"
                        >
                          <span>{event.name}</span>
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CompanyList;
