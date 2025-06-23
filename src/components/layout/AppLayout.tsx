
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <SidebarNav />
        <SidebarInset className="flex flex-col flex-1">
          <TopBar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
