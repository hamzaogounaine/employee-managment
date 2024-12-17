"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"



export function SidebarItem({ href, icon: Icon, label, isActive }) {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
            isActive 
              ? "bg-accent text-accent-foreground" 
              : "text-muted-foreground"
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
    </TooltipProvider>
  )
}