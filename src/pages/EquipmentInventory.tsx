import { motion } from "framer-motion";
import { EquipmentTable } from "@/components/equipment/equipment-table";
import { GlassCard } from "@/components/ui/glass-card";
import { Plus } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://sqcjlqeiojrfouethboe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2pscWVpb2pyZm91ZXRoYm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MDY1NjcsImV4cCI6MjA2MTQ4MjU2N30.qqVFQOgRnSYXqSGfhzCqHdeOCi6Td0vkGX2CT4wlPiM");

const EquipmentInventory = () => {
  // Animation variants
  const [machineCount, setMachineCount] = useState<number | null>(null);
  const [workingmachineCount, setWorkingMachineCount] = useState<number | null>(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
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
  

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-4 md:p-6 text-white-400"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white-500">
            Equipment Inventory
          </h1>
          <AnimatedButton className="flex items-center gap-2 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition">
            <Plus size={16} />
            Add Equipment
          </AnimatedButton>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <GlassCard className="text-center bg-black/70 border border-yellow-600 text-white-300">
            <p className="text-sm text-white-500">Total Items</p>
            <p className="text-2xl font-bold">{machineCount}</p>
          </GlassCard>
          <GlassCard className="text-center bg-black/70 border border-yellow-600 text-white-300">
            <p className="text-sm text-white-500">Categories</p>
            <p className="text-2xl font-bold">12</p>
          </GlassCard>
          <GlassCard className="text-center bg-black/70 border border-yellow-600 text-white-300">
            <p className="text-sm text-white-500">Needing Attention</p>
            <p className="text-2xl font-bold text-white-400">17</p>
          </GlassCard>
          <GlassCard className="text-center bg-black/70 border border-yellow-600 text-white-300">
            <p className="text-sm text-white-500">Critical Status</p>
            <p className="text-2xl font-bold text-red-500">5</p>
          </GlassCard>
        </motion.div>

        {/* Equipment Table */}
        <motion.div variants={itemVariants}>
          <GlassCard className="bg-black/60 text-white-200 border border-yellow-400">
            <EquipmentTable />
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EquipmentInventory;
