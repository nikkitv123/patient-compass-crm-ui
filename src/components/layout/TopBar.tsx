
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  MessageCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real application, would navigate to search results or filter current view
  };

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      <form onSubmit={handleSearch} className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search patients, cases, or tasks..."
          className="pl-10 w-full h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-healthcare-primary text-xs text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Messages</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">Dr. Robert Chen</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Patient follow-up required for case #1234
                </p>
                <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">Nurse Wilson</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Updated lab results for patient Maria Garcia
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">System Notification</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Case #5678 escalated due to SLA breach
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm font-medium text-healthcare-primary cursor-pointer">
              View All Messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-healthcare-danger text-xs text-white">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notifications</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-healthcare-warning text-white mt-0.5">SLA</Badge>
                <div>
                  <p className="font-medium">SLA Warning</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Case #2468 approaching SLA breach (30 min remaining)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Just now</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-healthcare-primary text-white mt-0.5">Task</Badge>
                <div>
                  <p className="font-medium">New Task Assigned</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Call patient John Doe for medication follow-up
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">30 minutes ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-healthcare-danger text-white mt-0.5">Alert</Badge>
                <div>
                  <p className="font-medium">High-Risk Patient Alert</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Sarah Williams has been flagged as high-risk
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-green-600 text-white mt-0.5">Case</Badge>
                <div>
                  <p className="font-medium">Case Resolved</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Case #3579 has been successfully resolved
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm font-medium text-healthcare-primary cursor-pointer">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
