"use client"

import React, { useEffect } from 'react'
import Navbar from "@/app/(components)/Navbar"
import Sidebar from '@/app/(components)/Sidebar'
import StoreProvider, { useAppSelector } from './redux'

const DashboardLayout = ({children}: { children: React.ReactNode}) => {
  const isSidebarCollapse = useAppSelector(state => state.global.isSidebarCollapse)
  const isDarkMode = useAppSelector(state => state.global.isDarkMode)

  useEffect(() => {
   if(isDarkMode) {
    document.documentElement.classList.add("dark");
   }else {
    document.documentElement.classList.remove("dark")
   }
  })
  
  return (
    <div className='flex min-h-screen w-full text-gray-900 bg-gray-50'>
        <Sidebar/>
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${!isSidebarCollapse && 'md:pl-64'}`}>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

const DashboardWrapper = ({children}: { children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper