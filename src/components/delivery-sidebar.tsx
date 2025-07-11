import { Link, useLocation } from "react-router-dom";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  User,
  Route,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo from "@/assets/icon.svg";

const deliveryNavigation = [
  { name: "My Orders", href: "/delivery/orders", icon: Package },
  { name: "Pending Orders", href: "/delivery/pending", icon: Clock },
  { name: "In Transit", href: "/delivery/in-transit", icon: Route },
  { name: "Delivered", href: "/delivery/delivered", icon: CheckCircle },
  { name: "Cancelled", href: "/delivery/cancelled", icon: XCircle },
  { name: "Route Map", href: "/delivery/map", icon: MapPin },
  { name: "Profile", href: "/delivery/profile", icon: User },
];

export default function DeliverySidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/delivery/orders">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src={logo} alt="Food Delivery" className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Food Delivery</span>
                  <span className="truncate text-xs">Delivery Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {deliveryNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                  >
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
