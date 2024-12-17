"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header/header"
import { Sidebar } from "./sidebar/sidebar"
import Register from "@/app/register/page"
import LoginPage from "@/app/login/page"
import { SessionProvider } from "next-auth/react"

export function Dashboard({children}) {
  const path = usePathname()
  if(path === '/register') return <Register />
  if(path === '/login') return <LoginPage />
  return (
    <SessionProvider>

    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className=" items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          {children}
        </main>
      </div>
    </div>
    </SessionProvider>
  )
}