
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Search, Filter, ChevronLeft, ChevronRight, Users, CheckSquare } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";

interface ScheduleItem {
  id: string;
  type: 'appointment' | 'task';
  title: string;
  time: string;
  duration?: number;
  patient?: {
    id: string;
    name: string;
  };
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  priority?: 'high' | 'medium' | 'low';
}

export default function ScheduleManagement() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock schedule data
  const scheduleItems: ScheduleItem[] = [
    {
      id: "1",
      type: "appointment",
      title: "Consultation - Sarah Johnson",
      time: "09:00",
      duration: 30,
      patient: { id: "p1", name: "Sarah Johnson" },
      status: "confirmed"
    },
    {
      id: "2",
      type: "task",
      title: "Review lab results",
      time: "10:30",
      duration: 15,
      status: "scheduled",
      priority: "high"
    },
    {
      id: "3",
      type: "appointment",
      title: "Follow-up - Michael Smith",
      time: "11:00",
      duration: 45,
      patient: { id: "p2", name: "Michael Smith" },
      status: "scheduled"
    },
    {
      id: "4",
      type: "task",
      title: "Call patient for medication check",
      time: "14:00",
      duration: 10,
      status: "scheduled",
      priority: "medium"
    }
  ];

  const weekDays = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfWeek(currentWeek), i)
  );

  const timeSlots = Array.from({ length: 12 }, (_, i) => 
    `${(8 + i).toString().padStart(2, '0')}:00`
  );

  const getItemsForTimeSlot = (date: Date, timeSlot: string) => {
    // For demo purposes, only show items for today
    if (format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
      return scheduleItems.filter(item => item.time === timeSlot);
    }
    return [];
  };

  const getStatusColor = (status: string, type: string) => {
    if (type === 'appointment') {
      switch (status) {
        case 'confirmed': return 'bg-green-100 text-green-800';
        case 'scheduled': return 'bg-blue-100 text-blue-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': return 'bg-yellow-100 text-yellow-800';
        case 'scheduled': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Management</h1>
          <p className="text-muted-foreground">
            Manage your appointments and tasks in one unified view
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Appointment
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[200px] text-center">
              {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date())}
          >
            Today
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={viewMode} onValueChange={(value: 'week' | 'day') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="day">Day View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>
            Your appointments and tasks for the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            {/* Time column header */}
            <div className="text-sm font-medium text-muted-foreground p-2">
              Time
            </div>
            
            {/* Day headers */}
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="text-sm font-medium text-center p-2 border-b">
                <div>{format(day, 'EEE')}</div>
                <div className="text-lg">{format(day, 'd')}</div>
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map((timeSlot) => (
              <>
                {/* Time label */}
                <div key={`time-${timeSlot}`} className="text-sm text-muted-foreground p-2 border-r">
                  {timeSlot}
                </div>
                
                {/* Day cells */}
                {weekDays.map((day) => {
                  const items = getItemsForTimeSlot(day, timeSlot);
                  return (
                    <div key={`${day.toISOString()}-${timeSlot}`} className="p-1 border-r border-b min-h-[60px]">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="mb-1 p-1 rounded text-xs cursor-pointer hover:shadow-sm border"
                          style={{ backgroundColor: item.type === 'appointment' ? '#e3f2fd' : '#f3e5f5' }}
                        >
                          <div className="flex items-center gap-1">
                            {item.type === 'appointment' ? (
                              <Users className="h-3 w-3" />
                            ) : (
                              <CheckSquare className="h-3 w-3" />
                            )}
                            <span className="font-medium truncate">{item.title}</span>
                          </div>
                          {item.patient && (
                            <div className="text-muted-foreground truncate">
                              {item.patient.name}
                            </div>
                          )}
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className={getStatusColor(item.status, item.type)}>
                              {item.status}
                            </Badge>
                            {item.priority && (
                              <Badge variant="secondary" className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleItems.filter(item => item.type === 'appointment').map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{appointment.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time} • {appointment.duration} mins
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(appointment.status, appointment.type)}>
                      {appointment.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleItems.filter(item => item.type === 'task').map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.time} • {task.duration} mins
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority || 'medium')}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status, task.type)}>
                      {task.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
