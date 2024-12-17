import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant='ghost' size='md' onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
      {theme === 'dark' ? <Sun className='h-5 w-5'/> : <Moon />}
    </Button>
  )
}

export default ThemeToggle