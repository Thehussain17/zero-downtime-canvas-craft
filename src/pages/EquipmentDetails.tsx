import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowLeft, Calendar, Filter, Plus, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const equipmentData = {
  id: 1,
  name: "Main Generator",
  category: "Power",
  model: "GenPower 5000X",
  serialNumber: "GP5000-12345",
  manufacturer: "PowerGen Industries",
  installDate: "2020-05-15",
  health: 78,
  status: "warning",
  lastSeen: "2023-04-28T14:30:00",
  location: "Building A, Basement",
  notes: [
    { id: 1, date: "2023-04-25", author: "Tech Smith", content: "Conducted routine inspection, found slight oil leak", reaction: "🛠️" },
    { id: 2, date: "2023-03-10", author: "Manager Johnson", content: "Scheduled for full maintenance next month", reaction: "📅" },
    { id: 3, date: "2023-02-15", author: "Tech Davis", content: "Replaced worn belt and lubricated bearings", reaction: "✅" },
  ],
  maintenanceHistory: [
    { id: 1, date: "2023-02-15", type: "Preventive", description: "Regular 1000-hour service", technician: "Davis" },
    { id: 2, date: "2022-11-03", type: "Repair", description: "Fixed fuel line leak", technician: "Smith" },
    { id: 3, date: "2022-08-22", type: "Preventive", description: "Regular 500-hour service", technician: "Johnson" },
    { id: 4, date: "2022-05-10", type: "Inspection", description: "Quarterly safety check", technician: "Davis" },
    { id: 5, date: "2022-02-18", type: "Preventive", description: "Regular 100-hour service", technician: "Smith" },
  ]
};

const EquipmentDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEquipment(equipmentData);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-100 to-yellow-50 dark:from-neutral-900 dark:to-[#1a1c20]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-black-100 to-yellow-50 dark:from-neutral-900 dark:to-[#1a1c20] p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="mb-6">
          <Link to="/equipment" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={16} />
            <span>Back to Equipment</span>
          </Link>

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{equipment.name}</h1>
            <StatusIndicator status={equipment.status as any} showIcon text="Operational" />
          </div>
          <p className="text-muted-foreground">{equipment.model} • {equipment.category}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <GlassCard>
              <h2 className="text-lg font-medium mb-4">Equipment Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Serial Number</p>
                  <p>{equipment.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Manufacturer</p>
                  <p>{equipment.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Installation Date</p>
                  <p>{new Date(equipment.installDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>{equipment.location}</p>
                </div>
                <div className="col-span-full mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Last Seen Active</p>
                  <div className="inline-block bg-green-100 text-green-900 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm">
                    <span className="inline-block h-2 w-2 rounded-full bg-statusGood mr-2"></span>
                    {new Date(equipment.lastSeen).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <AnimatedButton className="flex items-center gap-2 bg-dark-999 text-white hover:bg-yellow-500" size="sm">
                  <Wrench size={16} />
                  Schedule Maintenance
                </AnimatedButton>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  View Reports
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard>
              <h2 className="text-lg font-medium mb-4">Health Status</h2>
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span>HP</span>
                  <span>{equipment.health}/100</span>
                </div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      equipment.health > 80 ? "bg-statusGood" :
                      equipment.health > 50 ? "bg-statusWarning" :
                      "bg-statusDanger"
                    }`}
                    style={{ width: `${equipment.health}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${equipment.health}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Next Service Due</span>
                  <span className="text-sm font-medium text-amber-500">14 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Age</span>
                  <span className="text-sm font-medium">3 years, 2 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Lifecycle</span>
                  <span className="text-sm font-medium">42% Complete</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  View Full History
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mb-6">
          <GlassCard>
            <h2 className="text-lg font-medium mb-4">Maintenance Timeline</h2>

            <div className="relative border-l-2 border-muted ml-3 pl-8 space-y-6 py-2">
              {equipment.maintenanceHistory.map((event: any, index: number) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-4 border-background bg-muted"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.type} • Tech: {event.technician}
                      </p>
                    </div>
                    <p className="text-sm font-medium md:pl-6">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard>
            <div className="flex justify-between bg -dark-1000 items-center mb-4">
              <h2 className="text-lg font-medium">Notes</h2>
              <AnimatedButton variant="outline" size="sm" className="flex items-center gap-2">
                <Plus size={14} />
                Add Note
              </AnimatedButton>
            </div>

            <div className="space-y-4">
              {equipment.notes.map((note: any, index: number) => (
                <motion.div 
                  key={note.id}
                  className="bg-dark/70 dark:bg-[#2a2d33] p-4 rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{note.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(note.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-xl">{note.reaction}</div>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EquipmentDetails;
