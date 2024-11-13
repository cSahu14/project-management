"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapse } from "@/state";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPrioritys, setShowPrioritys] = useState(true);

  const dispatch = useAppDispatch();
  const isSidebarCollapse = useAppSelector(state => state.global.isSidebarCollapse)
  const sideBarClassName = 
  `fixed flex flex-cols h-[100%] justify-between shadow-xl transition-all 
    duration-300 bg-white h-full z-40 dark:bg-black ${isSidebarCollapse ? 'w-0 hidden': 'w-64'}`;
  return <div className={sideBarClassName}>
    <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 min-h-[56px] flex items-center justify-between bg-white px-6 pt-3 dark:bg-black">
            <div className="text-xl font-bold text-gray-800 dark:text-white">
                CSLIST
            </div>
            {
                !isSidebarCollapse && (
                    <button className="py-3" onClick={() => dispatch(setIsSidebarCollapse(!isSidebarCollapse))}>
                        <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                    </button>
                )
            }
        </div>
        {/* Teams */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <div>
                <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                    CS TEAM
                </h3>
                <div className="mt-1 flex items-start gap-2">
                    <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400"/>
                    <p className="text-xs text-gray-500">Private</p>
                </div>
            </div>
        </div>
        {/* Navbar links */}
        <nav className="z-10 w-full">
            <SidebarLinks 
                href="/"
                label="Home"
                icon={Home}
            />
            <SidebarLinks 
                href="/timeline"
                label="Timeline"
                icon={Briefcase}
            />
            <SidebarLinks 
                href="/search"
                label="Search"
                icon={Search}
            />
            <SidebarLinks 
                href="/settings"
                label="Settings"
                icon={Settings}
            />
            <SidebarLinks 
                href="/user"
                label="User"
                icon={User}
            />
            <SidebarLinks 
                href="/teams"
                label="Teams"
                icon={Users}
            />

        </nav>
        {/* Projects links */}
        <button onClick={() => setShowProjects(prev => !prev)} className="flex items-center justify-between w-full px-8 py-3 text-gray-500">
            <span className="">Projects</span>
            { showProjects ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {/* Projects lists */}


        {/* Priority links */}
        <button onClick={() => setShowPrioritys(prev => !prev)} className="flex items-center justify-between w-full px-8 py-3 text-gray-500">
            <span className="">Prioritys</span>
            { showPrioritys ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {/* Priority lists */}
        { showPrioritys && (
            <>
                 <SidebarLinks 
                    href="/priority/urgent"
                    label="Urgent"
                    icon={AlertCircle}
                />
                  <SidebarLinks 
                    href="/priority/high"
                    label="High"
                    icon={ShieldAlert}
                />
                  <SidebarLinks 
                    href="/priority/medium"
                    label="Medium"
                    icon={AlertTriangle}
                />
                  <SidebarLinks 
                    href="/priority/low"
                    label="Low"
                    icon={AlertOctagon}
                />
                  <SidebarLinks 
                    href="/priority/backlog"
                    label="Backlog"
                    icon={Layers3}
                />
            </>
        )}
    </div>
  </div>;
};

export interface SidebarLinks {
    href: string,
    label: string,
    icon: LucideIcon,
}

const SidebarLinks = ({
    href,
    label,
    icon: Icon,
}: SidebarLinks) => {
    const pathname = usePathname();
    const isActive = pathname === href || ( pathname === "/" && href === "/dashboard");
 

    return (
        <Link href={href} className="w-full">
            <div className={
                `relative flex cursor-pointer gap-3 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800
                ${isActive && 'bg-gray-100 text-white dark:bg-gray-600 '} px-8 py-3 justify-start
                `
            }>
                { isActive && (
                    <div className="absolute h-[100%] w-[5px] bg-blue-200 top-0 left-0" />
                )}

                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100"/>
                <span className="font-medium text-gray-800 dark:text-gray-100">{ label }</span>
            </div>
        </Link>
    )
}
export default Sidebar;
