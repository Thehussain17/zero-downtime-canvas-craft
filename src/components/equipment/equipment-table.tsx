import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Sample equipment data
const equipmentData = [
  { id: 1, name: "Main Generator", category: "Power", health: 98, lastMaintenance: "2023-02-15", status: "success", year: 2020 },
  { id: 2, name: "HVAC System A", category: "Climate", health: 87, lastMaintenance: "2023-03-10", status: "success", year: 2021 },
  { id: 3, name: "Water Pump 1", category: "Plumbing", health: 65, lastMaintenance: "2023-01-05", status: "warning", year: 2019 },
  { id: 4, name: "Emergency Generator", category: "Power", health: 92, lastMaintenance: "2023-04-20", status: "success", year: 2022 },
  { id: 5, name: "Cooling Tower", category: "Climate", health: 45, lastMaintenance: "2022-11-30", status: "danger", year: 2018 },
];

// Categories for filtering
const categories = ["All", "Power", "Climate", "Plumbing"];

export function EquipmentTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [equipment, setEquipment] = useState(equipmentData);
  const [isLoading, setIsLoading] = useState(false);

  // Handle row click
  const handleRowClick = (id: number) => {
    // Add transition animation before navigation
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/equipment/${id}`);
    }, 300);
  };

  // Filter equipment based on search and category
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white-400" size={18} />
          <Input
            placeholder="Search equipment..."
            className="pl-10 bg-black text-white-300 border border-yellow-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-black text-white-400 border border-yellow-600 hover:bg-yellow-100">
            <Filter size={16} />
            Filter
          </Button>
          
          <select
            className="rounded-md border border-yellow-600 bg-black text-white-300 px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden border border-yellow-600">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white-300 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">Health</th>
                <th className="px-4 py-3 text-left">Last Maintenance</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="border-b border-yellow-600 cursor-pointer hover:bg-yellow-500 bg-black text-white-300"
                  onClick={() => handleRowClick(item.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.995 }}
                >
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.year}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${ 
                            item.health > 80 ? "bg-green-500" :
                            item.health > 60 ? "bg-yellow-400" :
                            "bg-red-500"
                          }`}
                          style={{ width: `${item.health}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{item.health}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{new Date(item.lastMaintenance).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <StatusIndicator status={item.status as any} showIcon />
                  </td>
                </motion.tr>
              ))}
              
              {filteredEquipment.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white-400">
                    No equipment found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
}
