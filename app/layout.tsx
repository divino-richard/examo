import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideBar from './components/SideBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Examo App',
  description: 'Exam application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex bg-zinc-100'>
        <SideBar />
        <main className='w-full h-screen p-5 overflow-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
