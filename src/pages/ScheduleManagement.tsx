
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Search, Filter, ChevronLeft, ChevronRight, Users, CheckSquare, CalendarDays, Eye } from "lucide-react";
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
        case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'in-progress': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else {
      switch (status) {
        case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'in-progress': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const isToday = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  };

  return (
    <div className="space-y-6 p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Schedule Management
          </h1>
          <p className="text-muted-foreground">
            Manage your appointments and tasks in one unified calendar view
          </p>
        </div>
        <div className="flex gap-3">
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

      {/* Controls Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                  className="h-9 w-9 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="bg-muted rounded-lg px-4 py-2 border">
                  <span className="font-semibold text-foreground">
                    {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                  className="h-9 w-9 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(new Date())}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search appointments..." 
                  className="w-64" 
                />
              </div>
              <Select value={viewMode} onValueChange={(value: 'week' | 'day') => setViewMode(value)}>
                <SelectTrigger className="w-40">
                  <Eye className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="day">Day View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>
            Your appointments and tasks for the week
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 min-w-[800px]">
              {/* Time column header */}
              <div className="bg-muted border-b border-r p-4 text-center">
                <Clock className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                <span className="text-sm font-semibold text-foreground">Time</span>
              </div>
              
              {/* Day headers */}
              {weekDays.map((day) => (
                <div 
                  key={day.toISOString()} 
                  className={`p-4 text-center border-b border-r ${
                    isToday(day) 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-muted'
                  }`}
                >
                  <div className={`text-sm font-medium ${isToday(day) ? 'text-primary' : 'text-muted-foreground'}`}>
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${
                    isToday(day) 
                      ? 'text-primary' 
                      : 'text-foreground'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  {isToday(day) && (
                    <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-2"></div>
                  )}
                </div>
              ))}

              {/* Time slots */}
              {timeSlots.map((timeSlot) => (
                <>
                  {/* Time label */}
                  <div key={`time-${timeSlot}`} className="bg-muted p-3 border-r border-b text-center">
                    <span className="text-sm font-medium text-foreground">{timeSlot}</span>
                  </div>
                  
                  {/* Day cells */}
                  {weekDays.map((day) => {
                    const items = getItemsForTimeSlot(day, timeSlot);
                    return (
                      <div 
                        key={`${day.toISOString()}-${timeSlot}`} 
                        className={`p-2 border-r border-b min-h-[80px] hover:bg-muted/50 transition-colors ${
                          isToday(day) ? 'bg-primary/5' : 'bg-background'
                        }`}
                      >
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`mb-2 p-3 rounded-lg text-xs cursor-pointer hover:shadow-md transition-all duration-200 border ${
                              item.type === 'appointment' 
                                ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                                : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {item.type === 'appointment' ? (
                                <Users className="h-3 w-3 text-blue-600" />
                              ) : (
                                <CheckSquare className="h-3 w-3 text-purple-600" />
                              )}
                              <span className="font-semibold text-foreground truncate flex-1">{item.title}</span>
                            </div>
                            {item.patient && (
                              <div className="text-muted-foreground truncate mb-2 text-xs">
                                👤 {item.patient.name}
                              </div>
                            )}
                            <div className="flex gap-1 flex-wrap">
                              <Badge 
                                variant="secondary" 
                                className={`text-xs px-2 py-1 ${getStatusColor(item.status, item.type)}`}
                              >
                                {item.status}
                              </Badge>
                              {item.priority && (
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs px-2 py-1 ${getPriorityColor(item.priority)}`}
                                >
                                  {item.priority}
                                </Badge>
                              )}
                            </div>
                            {item.duration && (
                              <div className="text-xs text-muted-foreground mt-1">
                                ⏱️ {item.duration} mins
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduleItems.filter(item => item.type === 'appointment').map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:shadow-md transition-all">
                <div>
                  <div className="font-semibold text-foreground">{appointment.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    🕒 {appointment.time} • ⏱️ {appointment.duration} mins
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(appointment.status, appointment.type)} border`}>
                    {appointment.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CheckSquare className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduleItems.filter(item => item.type === 'task').map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:shadow-md transition-all">
                <div>
                  <div className="font-semibold text-foreground">{task.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    🕒 {task.time} • ⏱️ {task.duration} mins
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getPriorityColor(task.priority || 'medium')} border`}>
                    {task.priority}
                  </Badge>
                  <Badge className={`${getStatusColor(task.status, task.type)} border`}>
                    {task.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
