import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Database, 
  Wrench, 
  BotMessageSquare, 
  Users, 
  FileText, 
  Gauge, 
  Calendar, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { RoleBadge } from "@/components/ui/role-badge";

interface SidebarNavProps {
  role?: "admin" | "tech" | "viewer";
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export function SidebarNav({ role = "viewer", collapsed, toggleCollapsed }: SidebarNavProps) {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Equipment", icon: Database, path: "/equipment" },
    { name: "Maintenance", icon: Wrench, path: "/maintenance" },
    { name: "Work Orders", icon: FileText, path: "/work-orders" },
    { name: "ChatBot", icon: BotMessageSquare, path: "/chat" },
    
    { name: "Schedule", icon: Calendar, path: "/schedule" },
    
    
  ];

  const filteredItems = navItems.filter(item => {
    if (item.adminOnly && role !== "admin") return false;
    return true;
  });

  if (!mounted) return null;

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-black border-r transition-all duration-300 border-yellow-500",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
      animate={{ width: collapsed ? 70 : 250 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-500">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center">
                <span className="text-black font-bold">FX</span>
              </div>
              <h1 className="font-semibold text-white">Flexion</h1>
            </motion.div>
          )}
          <button
            onClick={toggleCollapsed}
            className="p-1.5 rounded-md hover:bg-gray-800 text-yellow-400 transition-colors"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* Nav Links */}
        <div className="py-4 flex-1 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm",
                    isActive 
                      ? "bg-yellow-400 text-black font-semibold"
                      : "text-white hover:bg-gray-800"
                  )}
                >
                  <item.icon size={18} className={isActive ? "text-black" : "text-yellow-400"} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info */}
        <div className="p-4 border-t border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
              JD
            </div>
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className="text-sm font-medium text-white">Prashant Goundadkar</span>
                <RoleBadge role={role} className="mt-1" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
