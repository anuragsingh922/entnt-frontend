import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationBadge = () => {
  const overdueCount = 1;
  const dueTodayCount = 1;
  const totalCount = overdueCount + dueTodayCount;

  const overdueNotifications = [
    { company: "Acme Corp", type: "Email", dueDate: "2024-03-15" }
  ];

  const todayNotifications = [
    { company: "TechStart Inc", type: "LinkedIn Post", dueDate: "2024-03-20" }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {overdueCount > 0 && (
            <>
              <DropdownMenuLabel className="text-destructive text-sm font-medium">
                Overdue Communications
              </DropdownMenuLabel>
              {overdueNotifications.map((notification, index) => (
                <DropdownMenuItem key={`overdue-${index}`} className="flex flex-col items-start">
                  <span className="font-medium">{notification.company}</span>
                  <span className="text-sm text-muted-foreground">
                    {notification.type} - Due: {notification.dueDate}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}
          {dueTodayCount > 0 && (
            <>
              <DropdownMenuLabel className="text-sm font-medium">
                Due Today
              </DropdownMenuLabel>
              {todayNotifications.map((notification, index) => (
                <DropdownMenuItem key={`today-${index}`} className="flex flex-col items-start">
                  <span className="font-medium">{notification.company}</span>
                  <span className="text-sm text-muted-foreground">
                    {notification.type} - Due Today
                  </span>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBadge;