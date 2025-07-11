import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DeliverySidebar from "@/components/delivery-sidebar";
import { useDocumentTitle } from "@/hooks";

export default function DeliveryLayout() {
  useDocumentTitle();

  return (
    <SidebarProvider>
      <DeliverySidebar />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 px-2 sm:px-4 sticky top-0 bg-white border-b z-10">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-sidebar-border" />
          <h1 className="text-base sm:text-lg font-semibold">
            Delivery Portal
          </h1>
        </header>
        <div className="flex flex-1 flex-col min-h-0">
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
