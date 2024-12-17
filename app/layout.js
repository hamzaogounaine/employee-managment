import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Dashboard } from '@/components/dashboard/layout'


export const metadata = {
  title: 'Next.js App with Responsive Layout',
  description: 'A modern Next.js application with responsive sidebar and navbar',
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Dashboard>{children}</Dashboard>
        </ThemeProvider>
      </body>
    </html>
  )
}