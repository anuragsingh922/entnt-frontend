import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Plus, LogOut } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Upcoming Communications</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add Communication
              </Button>
            </div>

            <div className="grid gap-4">
              {/* Placeholder for communications list */}
              <div className="p-4 border rounded-lg">
                <p className="text-muted-foreground">No communications scheduled</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;