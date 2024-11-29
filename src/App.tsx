import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { auth } from "./services/api";
import AdminCommunication from "./pages/AdminCommunication";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "./pages/NotAuthorized";

const queryClient = new QueryClient();

const verifyy = async () => {
  try {
    if (!localStorage.getItem("entnttoken")) return;
    const user = await auth.verify();
    if (user?.status !== 200) {
      if (localStorage.getItem("entnttoken")) {
        localStorage.removeItem("entnttoken");
      }
    } else {
      localStorage.setItem("identnt", user?.data?.id);
    }
  } catch (error) {
    console.error("Error in verification : ", error);
  }
};

const App = () => {
  verifyy();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unauthorized" element={<NotAuthorized />} />
            <Route
              path="/admin"
              element={
                <>
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                </>
              }
            />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/communication/:id" element={<AdminCommunication />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
