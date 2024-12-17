"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { MobileNav } from "./mobile-nav"
import { Search } from "./search"
import { UserNav } from "./user-nav"
import ThemeToggle from "./themeToggle"
import { usePathname } from "next/navigation"
import { IoMdHome } from "react-icons/io";

export function Header() {
    const path = usePathname()
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            {path !== '/adminSpace/dashboard' && (
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {path.replace('/adminSpace', '').split('/').map((segment, index, arr) => (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink as={Link} href={`/adminSpace/${arr.slice(0, index + 1).join('/')}`}>
                                    {segment || <Link href="/adminSpace/dashboard"><IoMdHome className="w-5 h-5" /></Link>}
                                </BreadcrumbLink>
                                {index < arr.length - 1 && <BreadcrumbSeparator />}
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
            <Search />
            <UserNav />
            <ThemeToggle />
        </header>
    )
}