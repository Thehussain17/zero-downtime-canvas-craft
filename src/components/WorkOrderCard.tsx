
import React from 'react';
import { WorkOrder } from '@/lib/supabase/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import WorkOrderProgressBar from './WorkOrderProgressBar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface WorkOrderCardProps {
  workOrder: WorkOrder;
  technicianName?: string;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({ workOrder, technicianName }) => {
  // Calculate progress based on status
  const getProgress = () => {
    switch (workOrder.Status.toLowerCase()) {
      case 'completed':
        return 100;
      case 'in-progress':
        return 50;
      case 'pending':
        return 0;
      default:
        return 0;
    }
  };

  const getPriorityBadge = () => {
    switch (workOrder.Type.toLowerCase()) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-status-medium">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-status-low border-status-low">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{workOrder.Type}</Badge>;
    }
  };

  const getStatusBadge = () => {
    switch (workOrder.Status.toLowerCase()) {
      case 'completed':
        return <Badge variant="outline" className="border-status-completed text-status-completed">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="border-status-in-progress text-status-in-progress">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-status-pending text-status-pending">Pending</Badge>;
      default:
        return <Badge variant="outline">{workOrder.Status}</Badge>;
    }
  };

  const progress = getProgress();
  const timeAgo = formatDistanceToNow(new Date(workOrder.Date), { addSuffix: true });
  const isInProgress = workOrder.Status.toLowerCase() === 'in-progress';

  return (
    <Card className="w-full bg-dark-500 text-white hover:bg-yellow-400 hover:text-black transition-shadow duration-300">
      <CardHeader className="pb-2 bg-dark text-white hover:bg-yellow-400 hover:text-black">
        <div className="flex bg-dark text-white hover:bg-yellow-400 hover:text-black items-center justify-between ">
          <CardTitle className="text-lg text-white-100 font-medium hover:text-dark-100 ">{workOrder.Issue}</CardTitle>
          {getPriorityBadge()}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-grey-500">Machine ID: {workOrder.Machine_ID}</span>
          {getStatusBadge()}
        </div>
      </CardHeader>
      {/* <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-4">{workOrder.Action_Taken || "No action taken yet"}</p>
        <WorkOrderProgressBar progress={progress} status={workOrder.Status.toLowerCase() as any} />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Progress: {progress}%</span>
        </div>
      </CardContent> */}
      <CardFooter className="pt-2 flex items-center justify-between text-xs text-white-500">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Updated {timeAgo}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>
            {isInProgress && technicianName 
              ? `Assigned to: ${technicianName}` 
              : isInProgress 
                ? "Unassigned" 
                : ""}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkOrderCard;