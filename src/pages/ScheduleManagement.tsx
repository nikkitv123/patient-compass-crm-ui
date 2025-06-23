
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
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Schedule Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your appointments and tasks in one unified calendar view
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Add Appointment
          </Button>
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50 shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Controls Section */}
      <Card className="shadow-sm border-blue-100">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                  className="h-9 w-9 p-0 hover:bg-blue-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="bg-white rounded-lg px-4 py-2 border border-blue-100 shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">
                    {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                  className="h-9 w-9 p-0 hover:bg-blue-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(new Date())}
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search appointments..." 
                  className="w-64 border-blue-200 focus:border-blue-400" 
                />
              </div>
              <Select value={viewMode} onValueChange={(value: 'week' | 'day') => setViewMode(value)}>
                <SelectTrigger className="w-40 border-blue-200">
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
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-3 text-xl">
            <CalendarDays className="h-6 w-6" />
            Weekly Schedule
          </CardTitle>
          <CardDescription className="text-blue-100">
            Your appointments and tasks for the week
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 min-w-[800px]">
              {/* Time column header */}
              <div className="bg-gray-50 border-b border-r border-gray-200 p-4 text-center">
                <Clock className="h-5 w-5 mx-auto text-gray-500 mb-1" />
                <span className="text-sm font-semibold text-gray-700">Time</span>
              </div>
              
              {/* Day headers */}
              {weekDays.map((day) => (
                <div 
                  key={day.toISOString()} 
                  className={`p-4 text-center border-b border-r border-gray-200 ${
                    isToday(day) 
                      ? 'bg-gradient-to-b from-blue-100 to-blue-50 border-blue-300' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`text-sm font-medium ${isToday(day) ? 'text-blue-700' : 'text-gray-600'}`}>
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${
                    isToday(day) 
                      ? 'text-blue-600' 
                      : 'text-gray-800'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  {isToday(day) && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2"></div>
                  )}
                </div>
              ))}

              {/* Time slots */}
              {timeSlots.map((timeSlot) => (
                <>
                  {/* Time label */}
                  <div key={`time-${timeSlot}`} className="bg-gray-50 p-3 border-r border-b border-gray-200 text-center">
                    <span className="text-sm font-medium text-gray-700">{timeSlot}</span>
                  </div>
                  
                  {/* Day cells */}
                  {weekDays.map((day) => {
                    const items = getItemsForTimeSlot(day, timeSlot);
                    return (
                      <div 
                        key={`${day.toISOString()}-${timeSlot}`} 
                        className={`p-2 border-r border-b border-gray-200 min-h-[80px] hover:bg-gray-50 transition-colors ${
                          isToday(day) ? 'bg-blue-25' : 'bg-white'
                        }`}
                      >
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`mb-2 p-3 rounded-lg text-xs cursor-pointer hover:shadow-md transition-all duration-200 border ${
                              item.type === 'appointment' 
                                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100' 
                                : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {item.type === 'appointment' ? (
                                <Users className="h-3 w-3 text-blue-600" />
                              ) : (
                                <CheckSquare className="h-3 w-3 text-purple-600" />
                              )}
                              <span className="font-semibold text-gray-800 truncate flex-1">{item.title}</span>
                            </div>
                            {item.patient && (
                              <div className="text-gray-600 truncate mb-2 text-xs">
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
                              <div className="text-xs text-gray-500 mt-1">
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
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {scheduleItems.filter(item => item.type === 'appointment').map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl hover:shadow-md transition-all">
                  <div>
                    <div className="font-semibold text-gray-800">{appointment.title}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      🕒 {appointment.time} • ⏱️ {appointment.duration} mins
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(appointment.status, appointment.type)} border`}>
                      {appointment.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <CheckSquare className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {scheduleItems.filter(item => item.type === 'task').map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-md transition-all">
                  <div>
                    <div className="font-semibold text-gray-800">{task.title}</div>
                    <div className="text-sm text-gray-600 mt-1">
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
                    <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                      View
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
