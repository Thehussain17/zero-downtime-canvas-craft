import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DashboardCard = ({
  title,
  value,
  subtext,
  icon,
}: {
  title: string;
  value: string | number;
  subtext: string;
  icon?: React.ReactNode;
}) => (
  <Card className="bg-[#1c1c1e] text-yellow-400 shadow-md w-full max-w-sm">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-yellow-400">{title}</h3>
        {icon && <span className="text-yellow-400">{icon}</span>}
      </div>
      <div className="mt-4 text-3xl font-bold text-white">{value}</div>
      <p className="text-sm text-yellow-300 mt-1">{subtext}</p>
    </CardContent>
  </Card>
);

const MaintenanceDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-400">Maintenance Dashboard</h1>
        <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-300">
          View Full Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total Tasks" value="0" subtext="0 completed" />
        <DashboardCard title="Machines" value="51" subtext="0 operational" />
        <DashboardCard title="Overbooked Days" value="0" subtext="Days with more than 3 tasks" />
      </div>

      <div className="bg-[#1c1c1e] rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">Upcoming Maintenance Tasks</h2>
        <Separator className="bg-yellow-500" />
        <p className="text-yellow-300 mt-4">No upcoming tasks</p>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
