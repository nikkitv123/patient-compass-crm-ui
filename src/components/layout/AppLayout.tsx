
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <TopBar />
          <main className="flex-1 overflow-auto p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
