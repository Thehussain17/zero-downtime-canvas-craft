// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Routes, Route } from "react-router-dom";
// import Index from "@/pages/Index";
// import Calendar from "@/pages/Calendar";
// import Technicians from "@/pages/Technicians";
// import MaintenanceDashboard from "@/pages/MaintenanceDashboard";
// import Layout from "@/components/layout/Layout";
// import NotFound from "@/pages/NotFound";

// const queryClient = new QueryClient();

// const MaintenanceApp = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<MaintenanceDashboard/>} />
//           <Route path="maintenance" element={<MaintenanceDashboard />} />
//           <Route path="calendar" element={<Calendar />} />
//           <Route path="technicians" element={<Technicians />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default MaintenanceApp;