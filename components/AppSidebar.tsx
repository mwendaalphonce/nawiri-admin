"use client"
import {
  User2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { sidebarSections } from "./sidebarItems";
import { useState } from "react";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-[#1a1f37]">
      {/* ---------- HEADER ---------- */}
      <SidebarHeader className="py-4 bg-[#1a1f37]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-transparent">
              <Link href="/" className="flex items-center cursor-pointer justify-center">
                {isCollapsed ? (
                  <Image 
                    src="/logo.png" 
                    alt="Nawiri Icon" 
                    width={40} 
                    height={40} 
                  />
                ) : (
                  <Image 
                    src="/white-logo.png" 
                    alt="Nawiri Logo" 
                    width={100} 
                    height={100} 
                  />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="bg-[#2a2f47]" />

      {/* ---------- CONTENT ---------- */}
      <SidebarContent className="bg-[#1a1f37] scrollbar-hide overflow-y-auto">
        {sidebarSections.map((section, idx) => (
          <SidebarGroup key={section.label || `section-${idx}`} className="px-3 py-2">
            {/* Only show label if it exists */}
            {section.label && (
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-cyan-400 mb-2 px-2">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const hasChildren = item.children !== undefined && item.children.length > 0;
                  const isOpen = openItems[item.title];
                  const isActive = pathname === item.url;
                  const hasActiveChild = item.children?.some(child => pathname === child.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      {hasChildren ? (
                        <>
                          <SidebarMenuButton
                            onClick={() => toggleItem(item.title)}
                            className={`w-full flex items-center justify-between rounded-lg transition-colors ${
                              isActive || hasActiveChild
                                ? 'bg-[#7c3aed] text-white'
                                : 'hover:bg-[#7c3aed] text-gray-200 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 text-yellow-400" />
                              <span>{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.badge !== undefined && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-[#2a2f47] text-gray-300">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronDown 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </SidebarMenuButton>

                          {/* Show children when expanded OR when parent/child is active */}
                          {(isOpen || hasActiveChild) && item.children && (
                            <SidebarMenuSub className="ml-0 mt-1 border-l-2 border-[#7c3aed] pl-4">
                              {item.children.map((sub) => {
                                const isSubActive = pathname === sub.url;
                                return (
                                  <SidebarMenuSubItem key={sub.title}>
                                    <SidebarMenuSubButton 
                                      asChild
                                      className={`rounded-lg transition-colors ${
                                        isSubActive
                                          ? 'bg-[#7c3aed] text-white'
                                          : 'hover:bg-[#2a2f47] text-gray-300 hover:text-white'
                                      }`}
                                    >
                                      <Link href={sub.url} className="flex items-center gap-3">
                                        <sub.icon className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm">{sub.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          )}
                        </>
                      ) : (
                        <SidebarMenuButton 
                          asChild
                          className={`rounded-lg transition-colors ${
                            isActive
                              ? 'bg-[#7c3aed] text-white'
                              : 'hover:bg-[#7c3aed] text-gray-200 hover:text-white'
                          }`}
                        >
                          <Link href={item.url} className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-yellow-400" />
                            <span>{item.title}</span>
                            {item.badge !== undefined && (
                              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-[#2a2f47] text-gray-300">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ---------- FOOTER ---------- */}
      <SidebarFooter className="bg-[#1a1f37]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full flex items-center hover:bg-[#2a2f47] text-gray-200">
                  <User2 className="h-4 w-4 mr-3" />
                  <span>Admin User</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;