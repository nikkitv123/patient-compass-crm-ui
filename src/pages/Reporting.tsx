
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, PieChart as PieChartIcon } from "lucide-react";
import { useState } from "react";

const Reporting = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for demonstration purposes
  const caseVolumeData = [
    { name: "Jan", created: 65, resolved: 40 },
    { name: "Feb", created: 59, resolved: 48 },
    { name: "Mar", created: 80, resolved: 65 },
    { name: "Apr", created: 81, resolved: 90 },
    { name: "May", created: 56, resolved: 85 },
    { name: "Jun", created: 55, resolved: 53 },
    { name: "Jul", created: 40, resolved: 45 },
  ];

  const resolutionTimeData = [
    { name: "Jan", avgHours: 24 },
    { name: "Feb", avgHours: 28 },
    { name: "Mar", avgHours: 22 },
    { name: "Apr", avgHours: 18 },
    { name: "May", avgHours: 16 },
    { name: "Jun", avgHours: 20 },
    { name: "Jul", avgHours: 15 },
  ];

  const slaData = [
    { name: "Jan", met: 85, breached: 15 },
    { name: "Feb", met: 80, breached: 20 },
    { name: "Mar", met: 88, breached: 12 },
    { name: "Apr", met: 92, breached: 8 },
    { name: "May", met: 90, breached: 10 },
    { name: "Jun", met: 85, breached: 15 },
    { name: "Jul", met: 95, breached: 5 },
  ];

  const csatData = [
    { name: "Jan", score: 4.2 },
    { name: "Feb", score: 4.0 },
    { name: "Mar", score: 4.3 },
    { name: "Apr", score: 4.5 },
    { name: "May", score: 4.4 },
    { name: "Jun", score: 4.1 },
    { name: "Jul", score: 4.7 },
  ];

  const caseTypeData = [
    { name: "Medical Inquiry", value: 35 },
    { name: "Billing Issue", value: 25 },
    { name: "Appointment", value: 20 },
    { name: "Insurance", value: 15 },
    { name: "Other", value: 5 },
  ];

  const COLORS = ['#0056B3', '#0E86D4', '#68C3E5', '#43A047', '#FF9800'];

  const casesByDepartmentData = [
    { name: "Cardiology", cases: 120 },
    { name: "Oncology", cases: 85 },
    { name: "Neurology", cases: 70 },
    { name: "Pediatrics", cases: 65 },
    { name: "Surgery", cases: 55 },
    { name: "Internal Medicine", cases: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporting Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Analyze case trends and operational metrics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal w-[240px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select defaultValue="all-departments">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-departments">All Departments</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="oncology">Oncology</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
            <SelectItem value="surgery">Surgery</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-types">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Case Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Case Types</SelectItem>
            <SelectItem value="medical">Medical Inquiry</SelectItem>
            <SelectItem value="billing">Billing Issue</SelectItem>
            <SelectItem value="appointment">Appointment</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="last-30-days">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="last-90-days">Last 90 Days</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="satisfaction">Patient Satisfaction</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Cases (Last 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">532</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-healthcare-success mr-1">↑ 8%</span>
                  vs. previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resolved Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">458</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-healthcare-success mr-1">↑ 12%</span>
                  vs. previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Resolution Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.2 hrs</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-healthcare-success mr-1">↓ 15%</span>
                  vs. previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  SLA Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-healthcare-success mr-1">↑ 4%</span>
                  vs. previous period
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Case Volume Trend</CardTitle>
                <CardDescription>Created vs. Resolved Cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={caseVolumeData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="created" 
                        stroke="#0056B3" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="#43A047" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cases by Type</CardTitle>
                <CardDescription>Distribution of case categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={caseTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {caseTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} cases`, 'Volume']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cases by Department</CardTitle>
              <CardDescription>Distribution of cases across hospital departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={casesByDepartmentData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cases" fill="#0056B3" name="Total Cases" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Case Priority Distribution</CardTitle>
                <CardDescription>Breakdown by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "High", value: 30 },
                          { name: "Medium", value: 45 },
                          { name: "Low", value: 25 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#D32F2F" />
                        <Cell fill="#FF9800" />
                        <Cell fill="#0E86D4" />
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Status Overview</CardTitle>
                <CardDescription>Current status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Open", value: 78 },
                        { name: "In Progress", value: 125 },
                        { name: "Pending", value: 42 },
                        { name: "Resolved", value: 215 },
                        { name: "Closed", value: 72 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Cases" radius={[4, 4, 0, 0]}>
                        <Cell fill="#2196F3" />
                        <Cell fill="#673AB7" />
                        <Cell fill="#FF9800" />
                        <Cell fill="#4CAF50" />
                        <Cell fill="#9E9E9E" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Average Resolution Time</CardTitle>
                <CardDescription>Time to resolve cases (in hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={resolutionTimeData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="avgHours"
                        stroke="#0E86D4"
                        strokeWidth={2}
                        name="Avg. Hours"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SLA Compliance</CardTitle>
                <CardDescription>SLA met vs. breached</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={slaData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="met" stackId="a" fill="#43A047" name="SLA Met" radius={[4, 0, 0, 4]} />
                      <Bar dataKey="breached" stackId="a" fill="#D32F2F" name="SLA Breached" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Performance</CardTitle>
                <CardDescription>Case resolution by staff member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Dr. Smith", resolved: 45, avgHours: 16 },
                        { name: "Dr. Johnson", resolved: 38, avgHours: 18 },
                        { name: "Nurse Wilson", resolved: 32, avgHours: 14 },
                        { name: "Dr. Brown", resolved: 28, avgHours: 20 },
                        { name: "Dr. Davis", resolved: 25, avgHours: 22 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="resolved" fill="#0056B3" name="Cases Resolved" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>First Response Time</CardTitle>
                <CardDescription>Average time to first response (in hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Email", hours: 4.2 },
                        { name: "Phone", hours: 0.8 },
                        { name: "WhatsApp", hours: 1.5 },
                        { name: "SMS", hours: 2.1 },
                        { name: "In Person", hours: 0.2 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" fill="#68C3E5" name="Hours" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CSAT Score Trend</CardTitle>
                <CardDescription>Average customer satisfaction score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={csatData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#43A047"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="CSAT Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Distribution</CardTitle>
                <CardDescription>CSAT score distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { rating: "5 ★", count: 145 },
                        { rating: "4 ★", count: 120 },
                        { rating: "3 ★", count: 65 },
                        { rating: "2 ★", count: 25 },
                        { rating: "1 ★", count: 15 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="rating" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Responses" radius={[4, 4, 0, 0]}>
                        <Cell fill="#4CAF50" />
                        <Cell fill="#8BC34A" />
                        <Cell fill="#FFC107" />
                        <Cell fill="#FF9800" />
                        <Cell fill="#F44336" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Patient Feedback by Department</CardTitle>
                <CardDescription>Average CSAT scores by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Cardiology", score: 4.5, responses: 85 },
                        { name: "Oncology", score: 4.3, responses: 65 },
                        { name: "Neurology", score: 4.2, responses: 50 },
                        { name: "Pediatrics", score: 4.7, responses: 72 },
                        { name: "Surgery", score: 4.1, responses: 45 },
                        { name: "Internal Medicine", score: 4.4, responses: 60 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" domain={[0, 5]} />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="score" name="Avg. CSAT Score" fill="#0056B3" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="responses" stroke="#FF9800" name="Responses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reporting;
