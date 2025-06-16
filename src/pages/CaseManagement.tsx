
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Plus, Search, Filter, Clock, AlertTriangle } from "lucide-react";

export default function CaseManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground">
            Track and manage patient cases and support tickets
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Case
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cases by ID, patient, or description..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Urgent cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <Briefcase className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-xs text-muted-foreground">Cases closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Case List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Cases</CardTitle>
          <CardDescription>
            Current open cases requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample case items */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">#CS-001</span>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Patient medication allergy concern - John Doe
                </p>
                <p className="text-xs text-muted-foreground">
                  Created 2 hours ago • Assigned to Dr. Smith
                </p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">#CS-002</span>
                  <Badge variant="secondary">Medium Priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Insurance claim issue - Jane Smith
                </p>
                <p className="text-xs text-muted-foreground">
                  Created 1 day ago • Assigned to Billing Team
                </p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
