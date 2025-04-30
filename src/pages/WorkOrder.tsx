import React, { useState } from 'react';
import WorkOrderCard from '@/components/WorkOrderCard';
import WorkOrderFilters from '@/components/WorkOrderFilters';
import { useToast } from '@/hooks/use-toast';
import { useTechnicians, useWorkOrders, useEquipment } from '@/lib/supabase/api';
import { Loader2 } from 'lucide-react';

const WorkOrder = () => {
  // State for filters
  const [technicianFilter, setTechnicianFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch data from Supabase
  const { data: technicians = [], isLoading: technicianLoading, error: technicianError } = useTechnicians();
  const { data: workOrders = [], isLoading: workOrdersLoading, error: workOrdersError } = useWorkOrders();
  const { data: equipment = [], isLoading: equipmentLoading, error: equipmentError } = useEquipment();

  // Show loading state
  if (technicianLoading || workOrdersLoading || equipmentLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-gray-500">Loading data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  const hasError = technicianError || workOrdersError || equipmentError;
  if (hasError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-lg font-medium text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-700">
            {technicianError ? `Technician data: ${technicianError.message}` : ''}
            {workOrdersError ? `Work order data: ${workOrdersError.message}` : ''}
            {equipmentError ? `Equipment data: ${equipmentError.message}` : ''}
          </p>
          <p className="mt-4 text-red-700">Please check your Supabase connection and try again.</p>
        </div>
      </div>
    );
  }

  // Filter work orders based on selected filters
  const filteredWorkOrders = workOrders.filter((order) => {
    if (technicianFilter && order.Technician !== technicians.find(t => t.Log_ID === technicianFilter)?.Technician) return false;
    if (statusFilter && order.Status !== statusFilter) return false;
    if (priorityFilter && order.Type !== priorityFilter) return false;
    return true;
  });

  const handleAssignTechnician = (technicianId: string) => {
    const technician = technicians.find(tech => tech.Log_ID === technicianId);
    if (technician) {
      toast({
        title: `${technician.Technician} assigned`,
        description: "The technician has been notified of their new assignment.",
      });
    }
  };

  const clearFilters = () => {
    setTechnicianFilter(null);
    setStatusFilter(null);
    setPriorityFilter(null);
  };

  // Map to keep track of equipment for work orders
  const getEquipmentName = (machineId: string) => {
    const machine = equipment.find(eq => eq.Machine_ID === machineId);
    return machine ? machine.Machine_Name : machineId;
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tech Task Pulse View</h1>
          <p className="text-gray-300">Manage technician work orders and assignments for equipment maintenance</p>
        </header>

        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Work Orders</h2>
            <span className="text-sm text-gray-300">
              Showing {filteredWorkOrders.length} of {workOrders.length} orders
            </span>
          </div>

          <WorkOrderFilters
            technicianId={technicianFilter}
            status={statusFilter}
            priority={priorityFilter}
            onTechnicianChange={setTechnicianFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
            onClearFilters={clearFilters}
            technicians={technicians}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredWorkOrders.map((order) => (
              <WorkOrderCard 
                key={order.Log_ID} 
                workOrder={order}
                technicianName={order.Technician}
              />
            ))}
            {filteredWorkOrders.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-300">No work orders match the selected filters.</p>
                <button 
                  onClick={clearFilters}
                  className="text-blue-400 hover:text-blue-300 hover:underline mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkOrder;