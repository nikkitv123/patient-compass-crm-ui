
import { useState, useEffect } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus,
  Search, 
  Filter, 
  Users, 
  BadgeCheck, 
  Shield,
  Trash,
  UserCog
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { User, UserRole } from "@/types/user";
import { roleDescriptions } from "@/docs/RoleDescriptions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Sample user data
const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@hospital.com",
    role: "admin",
    position: "System Administrator",
  },
  {
    id: "crm-1",
    name: "Jane Smith",
    email: "jane.smith@hospital.com",
    role: "crm_user",
    position: "Patient Support Rep",
  },
  {
    id: "crm-2",
    name: "Robert Johnson",
    email: "r.johnson@hospital.com",
    role: "crm_user",
    position: "Case Manager",
  },
  {
    id: "doctor-1",
    name: "Dr. Michael Chen",
    email: "m.chen@hospital.com",
    role: "doctor",
    position: "Cardiologist",
  },
  {
    id: "doctor-2",
    name: "Dr. Sarah Williams",
    email: "s.williams@hospital.com",
    role: "doctor",
    position: "Neurologist",
  },
  {
    id: "marketing-1",
    name: "Mark Davis",
    email: "m.davis@hospital.com",
    role: "marketing",
    position: "Marketing Specialist",
  }
];

// User form schema
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["admin", "crm_user", "doctor", "marketing"] as const),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

// User management component
export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // User form
  const addUserForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "crm_user",
      position: "",
    },
  });

  // Edit user form
  const editUserForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "crm_user",
      position: "",
    },
  });

  // Update edit form when user changes
  useEffect(() => {
    if (userToEdit) {
      editUserForm.reset({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        position: userToEdit.position,
      });
    }
  }, [userToEdit, editUserForm]);

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRoleFilter = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRoleFilter;
  });

  // Handle adding a new user
  const handleAddUser = (data: UserFormValues) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      position: data.position,
    };
    
    setUsers([...users, newUser]);
    toast.success(`User ${data.name} has been added successfully`);
    setIsAddDialogOpen(false);
    addUserForm.reset();
  };

  // Handle editing a user
  const handleEditUser = (data: UserFormValues) => {
    if (!userToEdit) return;
    
    const updatedUsers = users.map(user => 
      user.id === userToEdit.id 
        ? { ...user, name: data.name, email: data.email, role: data.role, position: data.position }
        : user
    );
    
    setUsers(updatedUsers);
    toast.success(`User ${data.name} has been updated successfully`);
    setIsEditDialogOpen(false);
    setUserToEdit(null);
  };

  // Handle deleting a user
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(user => user.id !== userToDelete.id));
    toast.success(`User ${userToDelete.name} has been deleted`);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Get role badge style
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <Badge variant="destructive" className="font-normal">{roleDescriptions[role].title}</Badge>;
      case "crm_user":
        return <Badge variant="secondary" className="font-normal">{roleDescriptions[role].title}</Badge>;
      case "doctor":
        return <Badge variant="outline" className="bg-green-100 text-green-800 font-normal">{roleDescriptions[role].title}</Badge>;
      case "marketing":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 font-normal">{roleDescriptions[role].title}</Badge>;
      default:
        return <Badge variant="outline" className="font-normal">{role}</Badge>;
    }
  };

  return (
    <RoleGuard allowedRoles="admin" fallback={<div className="p-6">You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="User Management" />
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground mt-1">
                Add, edit, and manage user accounts and permissions
              </p>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with role-specific permissions.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...addUserForm}>
                <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="space-y-4 py-4">
                  <FormField
                    control={addUserForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@hospital.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(roleDescriptions).map(([role, description]) => (
                              <SelectItem key={role} value={role}>
                                {description.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Job Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="mt-6">
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add User</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {Object.entries(roleDescriptions).map(([role, description]) => (
                <SelectItem key={role} value={role}>
                  {description.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {user.role === "admin" ? (
                        <Shield className="h-4 w-4 text-red-500" />
                      ) : user.role === "doctor" ? (
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Users className="h-4 w-4 text-muted-foreground" />
                      )}
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setUserToEdit(user);
                            setIsEditDialogOpen(true);
                          }}>
                            <UserCog className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setUserToDelete(user);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editUserForm}>
            <form onSubmit={editUserForm.handleSubmit(handleEditUser)} className="space-y-4 py-4">
              <FormField
                control={editUserForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editUserForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editUserForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(roleDescriptions).map(([role, description]) => (
                          <SelectItem key={role} value={role}>
                            {description.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editUserForm.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user account for {userToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </RoleGuard>
  );
}
