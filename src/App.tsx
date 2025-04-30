
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import EquipmentInventory from "@/pages/EquipmentInventory";
import EquipmentDetails from "@/pages/EquipmentDetails";
import NotFound from "@/pages/NotFound";
import ChatBot from "@/components/chatbot/ChatBot";
import MaintenanceDashboard from "./pages/MaintenanceDashboard";
import Calendar from "./pages/Calendar";
import { CalendarProvider } from "@/context/CalendarContext"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<AppLayout role="admin" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipment" element={<EquipmentInventory />} />
            <Route path="/equipment/:id" element={<EquipmentDetails />} />
            {/* Add more routes as they are implemented */}
            <Route path="/maintenance" element={<MaintenanceDashboard />} />
            <Route path="/work-orders" element={<NotFound />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/monitoring" element={<NotFound />} />
            <Route path="/schedule" element={<CalendarProvider><Calendar /></CalendarProvider>} />
            <Route path="/users" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);



export default App;
