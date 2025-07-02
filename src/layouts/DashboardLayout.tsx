import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-sidebar-border" />
          <h1 className="text-lg font-semibold">FS Admin</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
