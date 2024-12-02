import React, { useEffect } from "react";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Checkbox } from "../components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "../redux/hooks/index.js";
import { setselectedCompanies } from "../redux/slices/selectedCompanies/index.js";

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
  const dispatch = useAppDispatch();
  const scompanies = useAppSelector((state) => state.selectedCompanies);
  dispatch(setselectedCompanies());
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>(
    []
  );

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
    dispatch(setselectedCompanies(selectedCompanies));
    console.log(scompanies);
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
                    ? events.last.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs bg-red-200 rounded-sm p-2"
                        >
                          <span className="text-black-800">{item.name}</span>
                          <span>
                            {new Date(item.date).toLocaleDateString()}
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
                    ? events.upcoming.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs bg-yellow-300 rounded-sm p-2"
                        >
                          <span>{item.name}</span>
                          <span>
                            {new Date(item.date).toLocaleDateString()}
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
