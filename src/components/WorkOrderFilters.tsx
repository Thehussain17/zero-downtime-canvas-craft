import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Technician } from '@/lib/supabase/types';

interface WorkOrderFiltersProps {
  technicianId: string | null;
  status: string | null;
  priority: string | null;
  onTechnicianChange: (value: string | null) => void;
  onStatusChange: (value: string | null) => void;
  onPriorityChange: (value: string | null) => void;
  onClearFilters: () => void;
  technicians: Technician[];
}

const WorkOrderFilters: React.FC<WorkOrderFiltersProps> = ({
  technicianId,
  status,
  priority,
  onTechnicianChange,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
  technicians
}) => {
  const hasActiveFilters = technicianId !== null || status !== null || priority !== null;

  // Get unique values for status and priority
  const uniqueStatuses = Array.from(new Set(technicians.map(tech => tech.Status)));
  const uniqueTypes = Array.from(new Set(technicians.map(tech => tech.Type)));

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Select
            value={status || "all"}
            onValueChange={(value) => onStatusChange(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select
            value={priority || "all"}
            onValueChange={(value) => onPriorityChange(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className="text-sm text-black">Active filters:</span>
          {technicianId && (
            <Badge variant="default" className="flex gap-1 items-center">
              Technician: {technicians.find(t => t.Log_ID === technicianId)?.Technician || "Unknown"}
              <X className="h-3 w-3 cursor-pointer text-black" onClick={() => onTechnicianChange(null)} />
            </Badge>
          )}
          {status && (
            <Badge variant="default" className="flex gap-1 items-center">
              Status: {status}
              <X className="h-3 w-3 cursor-pointer text-black" onClick={() => onStatusChange(null)} />
            </Badge>
          )}
          {priority && (
            <Badge variant="default" className="flex gap-1 items-center">
              Type: {priority}
              <X className="h-3 w-3 cursor-pointer text-black" onClick={() => onPriorityChange(null)} />
            </Badge>
          )}
          <Badge 
            variant="outline" 
            className="flex gap-1 items-center cursor-pointer hover:bg-yellow-400 hover:text-black"
            onClick={onClearFilters}
          >
            Clear all filters
            <X className="h-3 w-3" />
          </Badge>
        </div>
      )}
    </div>
  );
};

export default WorkOrderFilters;
