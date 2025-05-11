
import React, { useState, useEffect } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Users, Grip, Plus, Minus, Save } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { roleDescriptions } from "@/docs/RoleDescriptions";
import { UserRole } from "@/types/user";

interface Permission {
  id: string;
  name: string;
}

interface SortablePermissionItemProps {
  permission: Permission;
}

const SortablePermissionItem = ({ permission }: SortablePermissionItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: permission.id,
    // Add the required resizeObserverConfig property
    data: {
      permission
    }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg border shadow-sm cursor-move hover:shadow-md transition-all duration-200 flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        <Grip className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="font-medium">{permission.name}</span>
      </div>
    </div>
  );
};

export default function RolePermissionManager() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("crm_user");
  const [availablePermissions, setAvailablePermissions] = useState<Permission[]>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize permissions based on role descriptions
  useEffect(() => {
    if (selectedRole) {
      // Set assigned permissions from roleDescriptions
      const currentRolePermissions = roleDescriptions[selectedRole].permissions.map(
        (name, index) => ({
          id: `assigned-${selectedRole}-${index}`,
          name,
        })
      );
      
      setAssignedPermissions(currentRolePermissions);
      
      // Create a set of all possible permissions from all roles
      const allPermissionsSet = new Set<string>();
      Object.values(roleDescriptions).forEach(role => {
        role.permissions.forEach(perm => allPermissionsSet.add(perm));
      });
      
      // Remove already assigned permissions
      const assignedPermissionNames = new Set(currentRolePermissions.map(p => p.name));
      const remainingPermissions = Array.from(allPermissionsSet)
        .filter(name => !assignedPermissionNames.has(name))
        .map((name, index) => ({
          id: `available-${index}`,
          name,
        }));
        
      setAvailablePermissions(remainingPermissions);
    }
  }, [selectedRole]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeItem = [...availablePermissions, ...assignedPermissions].find(
      item => item.id === active.id
    );
    
    if (!activeItem) return;

    // Check if the permission is being moved from available to assigned
    if (availablePermissions.find(item => item.id === active.id) && 
        over.id === "assigned-permissions-container") {
      // Move from available to assigned
      setAvailablePermissions(availablePermissions.filter(item => item.id !== active.id));
      setAssignedPermissions([...assignedPermissions, activeItem]);
      toast.success(`Added "${activeItem.name}" to ${roleDescriptions[selectedRole].title} role`);
    }
    // Check if the permission is being moved from assigned to available
    else if (assignedPermissions.find(item => item.id === active.id) && 
             over.id === "available-permissions-container") {
      // Move from assigned to available
      setAssignedPermissions(assignedPermissions.filter(item => item.id !== active.id));
      setAvailablePermissions([...availablePermissions, activeItem]);
      toast.success(`Removed "${activeItem.name}" from ${roleDescriptions[selectedRole].title} role`);
    }
    // Reordering within the assigned permissions
    else if (assignedPermissions.find(item => item.id === active.id) && 
             assignedPermissions.find(item => item.id === over.id)) {
      const oldIndex = assignedPermissions.findIndex(item => item.id === active.id);
      const newIndex = assignedPermissions.findIndex(item => item.id === over.id);
      setAssignedPermissions(arrayMove(assignedPermissions, oldIndex, newIndex));
    }
  };

  const filteredAvailablePermissions = availablePermissions.filter(
    permission => permission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveChanges = () => {
    // In a real application, this would save to backend/database
    toast.success("Permission changes saved successfully");
  };

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6 max-w-7xl mx-auto">
        <BackNavigationHeader title="Role Permission Manager" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Role Permission Manager</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Configure permissions for different user roles
            </p>
          </div>
          <Button onClick={saveChanges} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="crm_user" onValueChange={(value) => setSelectedRole(value as UserRole)} className="w-full">
            <TabsList className="w-full border-b mb-6 bg-background">
              {Object.entries(roleDescriptions).map(([role, description]) => (
                <TabsTrigger key={role} value={role} className="flex-1 gap-2 py-3">
                  <Users className="w-4 h-4" />
                  {description.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(roleDescriptions).map(([role, description]) => (
              <TabsContent key={role} value={role} className="mt-0">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">{description.title}</h2>
                  <p className="text-muted-foreground">{description.description}</p>
                </div>
                
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assigned Permissions */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Assigned Permissions
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Drag to reorder or remove permissions
                        </p>
                      </CardHeader>
                      <CardContent 
                        id="assigned-permissions-container"
                        className="min-h-[400px] border-2 border-dashed rounded-lg p-4 transition-colors hover:border-primary/50"
                      >
                        <SortableContext 
                          items={assignedPermissions.map(p => p.id)} 
                          strategy={verticalListSortingStrategy}
                        >
                          {assignedPermissions.map(permission => (
                            <SortablePermissionItem 
                              key={permission.id} 
                              permission={permission} 
                            />
                          ))}
                        </SortableContext>
                        {assignedPermissions.length === 0 && (
                          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                            <Minus className="w-8 h-8" />
                            <p>No permissions assigned</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Available Permissions */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-primary" />
                          Available Permissions
                        </CardTitle>
                        <div className="relative mt-2">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search permissions..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent 
                        id="available-permissions-container"
                        className="min-h-[400px] border-2 border-dashed rounded-lg p-4 transition-colors hover:border-primary/50"
                      >
                        <SortableContext 
                          items={filteredAvailablePermissions.map(p => p.id)} 
                          strategy={verticalListSortingStrategy}
                        >
                          {filteredAvailablePermissions.map(permission => (
                            <SortablePermissionItem 
                              key={permission.id} 
                              permission={permission} 
                            />
                          ))}
                        </SortableContext>
                        {filteredAvailablePermissions.length === 0 && (
                          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                            <Search className="w-8 h-8" />
                            <p>{searchTerm ? "No matching permissions" : "No additional permissions available"}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </DndContext>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  );
}
