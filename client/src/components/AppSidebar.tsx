"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Building, FileText, Heart, Home, Settings } from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import Link from "next/link";

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building,  label: "Properties",   href: "/managers/properties"   },
          { icon: FileText,  label: "Applications", href: "/managers/applications" },
          { icon: Settings,  label: "Settings",     href: "/managers/settings"     },
        ]
      : [
          { icon: Heart,     label: "Favorites",    href: "/tenants/favorites"     },
          { icon: FileText,  label: "Applications", href: "/tenants/applications"  },
          { icon: Home,      label: "Residences",   href: "/tenants/residences"    },
          { icon: Settings,  label: "Settings",     href: "/tenants/settings"      },
        ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');

        /* ── Sidebar shell ── */
        .un-sidebar {
          background: #ffffff !important;
          border-right: 1px solid #e8e3db !important;
          font-family: 'Jost', sans-serif;
        }

        /* ── Header ── */
        .un-sidebar-header {
          padding: 20px 16px 12px;
          border-bottom: 1px solid #f0ece5;
        }

        .un-header-open {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
        }

        .un-header-collapsed {
          display: flex;
          justify-content: center;
        }

        .un-view-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7A9E7E;
        }

        .un-toggle-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #e8e3db;
          background: #fafaf8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #7a7a74;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .un-toggle-btn:hover {
          border-color: #7A9E7E;
          color: #7A9E7E;
          background: #eef4ee;
        }

        /* ── Nav list ── */
        .un-nav-list {
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* ── Nav item ── */
        .un-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          color: #6a6a65;
          position: relative;
          white-space: nowrap;
        }

        .un-nav-item:hover {
          background: #f0f5f0;
          color: #3d6b41;
        }

        .un-nav-item.active {
          background: #eef4ee;
          color: #2d6e32;
        }

        /* Active left pill */
        .un-nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #7A9E7E;
          border-radius: 0 2px 2px 0;
        }

        .un-nav-icon {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          transition: color 0.2s;
        }

        .un-nav-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.855rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1;
        }

        /* ── Collapsed icon-only ── */
        .un-nav-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          margin: 0 auto;
          text-decoration: none;
          color: #6a6a65;
          transition: background 0.2s, color 0.2s;
          position: relative;
        }
        .un-nav-item-icon:hover {
          background: #f0f5f0;
          color: #3d6b41;
        }
        .un-nav-item-icon.active {
          background: #eef4ee;
          color: #2d6e32;
        }
        .un-nav-item-icon.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #7A9E7E;
          border-radius: 0 2px 2px 0;
        }

        /* ── Bottom divider above settings ── */
        .un-nav-sep {
          height: 1px;
          background: #f0ece5;
          margin: 8px 10px;
        }
      `}</style>

      <Sidebar
        collapsible="icon"
        className="un-sidebar fixed left-0"
        style={{
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
      >
        {/* ── Header ── */}
        <SidebarHeader className="un-sidebar-header">
          <SidebarMenu>
            <SidebarMenuItem>
              {open ? (
                <div className="un-header-open">
                  <span className="un-view-label">
                    {userType === "manager" ? "Manager View" : "Renter View"}
                  </span>
                  <button className="un-toggle-btn" onClick={toggleSidebar}>
                    <X style={{ width: "14px", height: "14px" }} />
                  </button>
                </div>
              ) : (
                <div className="un-header-collapsed">
                  <button className="un-toggle-btn" onClick={toggleSidebar}>
                    <Menu style={{ width: "14px", height: "14px" }} />
                  </button>
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* ── Nav links ── */}
        <SidebarContent>
          <SidebarMenu>
            <div className={open ? "un-nav-list" : "un-nav-list"} style={{ paddingTop: "12px" }}>
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;

                // Separator before Settings
                const isSettings = link.href.includes("settings");

                return (
                  <React.Fragment key={link.href}>
                    {isSettings && <div className="un-nav-sep" />}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        {open ? (
                          <Link
                            href={link.href}
                            scroll={false}
                            className={cn("un-nav-item", isActive && "active")}
                          >
                            <link.icon className="un-nav-icon" />
                            <span className="un-nav-label">{link.label}</span>
                          </Link>
                        ) : (
                          <Link
                            href={link.href}
                            scroll={false}
                            className={cn("un-nav-item-icon", isActive && "active")}
                            title={link.label}
                          >
                            <link.icon style={{ width: "18px", height: "18px" }} />
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </React.Fragment>
                );
              })}
            </div>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;