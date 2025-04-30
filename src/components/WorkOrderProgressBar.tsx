
import React from 'react';
import { cn } from "@/lib/utils";

interface WorkOrderProgressBarProps {
  progress: number;
  status: 'in-progress' | 'completed' | 'pending';
  className?: string;
}

const WorkOrderProgressBar: React.FC<WorkOrderProgressBarProps> = ({
  progress,
  status,
  className
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-status-completed';
      case 'in-progress':
        return 'bg-status-in-progress';
      case 'pending':
        return 'bg-status-pending';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className={cn("w-full h-2 bg-gray-200 rounded-full overflow-hidden", className)}>
      <div 
        className={cn("h-full transition-all duration-1000 ease-out animate-progress-fill", getStatusColor())}
        style={{ '--progress-value': `${progress}%` } as React.CSSProperties}
      />
    </div>
  );
};

export default WorkOrderProgressBar;
