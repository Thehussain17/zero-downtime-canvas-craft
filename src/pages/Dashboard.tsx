import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { CalendarPreview } from "@/components/dashboard/calendar-preview";
import { GlassCard } from "@/components/ui/glass-card";
import { Bell, Settings, User } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://sqcjlqeiojrfouethboe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2pscWVpb2pyZm91ZXRoYm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MDY1NjcsImV4cCI6MjA2MTQ4MjU2N30.qqVFQOgRnSYXqSGfhzCqHdeOCi6Td0vkGX2CT4wlPiM");

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [machineCount, setMachineCount] = useState<number | null>(null);
  const [workingmachineCount, setWorkingMachineCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchMachineCount = async () => {
      const { count } = await supabase
        .from('machines')
        .select('Machine_ID', { count: 'exact', head: true });
      setMachineCount(count ?? 60);
    };

    const fetchActiveMachineCount = async () => {
      const { count } = await supabase
        .from('machines')
        .select('*', { count: 'exact', head: true })
        .eq('Status', 'Working');
      setWorkingMachineCount(count ?? 45);
    };

    fetchMachineCount();
    fetchActiveMachineCount();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-yellow-900 text-white p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-400">Dashboard</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-yellow-600/20 hover:bg-yellow-600/30 transition">
              <Bell size={20} className="text-yellow-300" />
            </button>
            <button className="p-2 rounded-full bg-yellow-600/20 hover:bg-yellow-600/30 transition">
              <Settings size={20} className="text-yellow-300" />
            </button>
            <button className="p-2 rounded-full bg-yellow-600/20 hover:bg-yellow-600/30 transition">
              <User size={20} className="text-yellow-300" />
            </button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard 
            title="Total Equipment" 
            value={loading ? "—" : machineCount} 
            loading={loading}
            status="success"
            
          />
          <SummaryCard 
            title="Health Status" 
            value={loading ? "—" : "97%"} 
            loading={loading}
            status="success"
            trend="up"
            trendValue="2.3% from last month"
            
          />
          <SummaryCard 
            title="Active Equipment" 
            value={loading ? "—" : workingmachineCount} 
            loading={loading}
            status={              
              (workingmachineCount/machineCount)*100 < 33 ? "danger" :
              (workingmachineCount/machineCount)*100 < 66 ? "warning" : "success"
            }
            trend="down"
            trendValue="3 fewer than yesterday"
            
          />
          <SummaryCard 
            title="Maintenance Due" 
            value={loading ? "—" : "12"} 
            loading={loading}
            status="warning"
            
          />
        </motion.div>

        {/* Charts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DowntimeChart  />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CalendarPreview  />
          </motion.div>
        </div>

        {/* Footer Quote */}
        <motion.div 
          variants={itemVariants} 
          className="mt-8 text-center"
        >
          <GlassCard className="inline-block px-8 py-3 bg-yellow-500/10 border border-yellow-600 text-yellow-300">
            <p className="italic font-medium">
              "Zero Downtime is Possible."
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
