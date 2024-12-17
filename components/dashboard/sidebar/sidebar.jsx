"use client"

import Link from "next/link"
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,

  Users,
  Users2
} from "lucide-react"

import { SidebarItem } from "./sidebar-item"
import { usePathname } from "next/navigation";

export function Sidebar() {
  const sidebarItems = [
    { href: "/adminSpace/dashboard", icon: Home, label: "Dashboard" },
    { href: "/adminSpace/employees", icon: Users, label: "employees" },
    { href: "products", icon: Package, label: "Products" },
    { href: "#", icon: Users2, label: "Customers" },
    { href: "#", icon: LineChart, label: "Analytics" },
    { href: "#", icon: Settings, label: "Settings", isBottom: true }
  ];
  const path = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {sidebarItems.filter(item => !item.isBottom).map((item, index) => (
          <SidebarItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={
              item.href === path.includes(item.href) // Other pages follow the usual logic
            }
          />
        ))}

      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {sidebarItems.filter(item => item.isBottom).map((item, index) => (
          <SidebarItem key={index} href={item.href} icon={item.icon} label={item.label}  isActive={
            item.href === '/'
              ? path === '/' // Home page is active only if the path is exactly `/`
              : path.includes(item.href) // Other pages follow the usual logic
          }/>
        ))}
      </nav>
    </aside>
  );
}