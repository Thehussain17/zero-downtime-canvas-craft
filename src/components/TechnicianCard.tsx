
import React from 'react';
import { Technician } from '@/lib/supabase/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TechnicianCardProps {
  technician: Technician;
  onAssign: (technicianId: string) => void;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({ technician, onAssign }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Determine availability based on status
  const isAvailable = technician.Status.toLowerCase() === 'available';
  
  // Count work orders for this technician
  const getWorkloadIndicator = () => {
    // For now just show a placeholder badge
    return <Badge className="bg-status-low">Active</Badge>;
  };

  const getAvailabilityIndicator = () => {
    if (isAvailable) {
      return <span className="flex items-center"><div className="h-2 w-2 rounded-full bg-status-low mr-1"></div> Available</span>;
    } else {
      return <span className="flex items-center"><div className="h-2 w-2 rounded-full bg-status-high mr-1"></div> Busy</span>;
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback>{getInitials(technician.Technician)}</AvatarFallback>
              </Avatar>
              <div className="absolute -top-1 -right-1">
                {getWorkloadIndicator()}
              </div>
            </div>
            <div>
              <h3 className="font-medium">{technician.Technician}</h3>
              <div className="text-sm text-gray-500">
                {getAvailabilityIndicator()}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-600 mb-2">{technician.Issue || "No current issues"}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">{technician.Type}</Badge>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          <span>Last active: {new Date(technician.Date).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onAssign(technician.Log_ID)}
          variant={isAvailable ? 'default' : 'outline'}
          className="w-full"
          disabled={!isAvailable}
        >
          {isAvailable ? 'Assign Task' : 'Currently Busy'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TechnicianCard;
