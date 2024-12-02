import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold">Sync Schedule Guru</h1>
          <div className="space-x-2 sm:space-x-4">
            <Link to="/adminsignin">
              <Button variant="ghost">Admin Login</Button>
            </Link>
            <Link to="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-12 sm:py-20 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up">
              Streamline Your Communication Schedule
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-up delay-150 px-4">
              Keep track of your company communications effortlessly with our intuitive calendar system.
            </p>
            <Link to="/signup">
              <Button size="lg" className="animate-fade-up delay-300">
                Start Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <div className="p-6 bg-background rounded-lg shadow-sm animate-fade-up hover:scale-105 transition-transform duration-300">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-primary mx-auto" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">Schedule Communications</h3>
                <p className="text-muted-foreground text-center">
                  Easily plan and organize your company communications using our intuitive calendar interface.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm animate-fade-up delay-150 hover:scale-105 transition-transform duration-300">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-primary mx-auto" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">Manage Companies</h3>
                <p className="text-muted-foreground text-center">
                  Keep track of all your company contacts and communication history in one place.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm animate-fade-up delay-300 hover:scale-105 transition-transform duration-300">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-primary mx-auto" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">Never Miss a Follow-up</h3>
                <p className="text-muted-foreground text-center">
                  Get timely reminders for upcoming communications and stay on top of your schedule.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-sm sm:text-base text-muted-foreground">
          © 2024 Sync Schedule Guru. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;