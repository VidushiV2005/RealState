"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <Loading />;
  if (!authUser?.userRole) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');

        .dash-root {
          min-height: 100vh;
          width: 100%;
          background: #f7f5f1;
          font-family: 'Jost', sans-serif;
        }

        .dash-body {
          display: flex;
        }

        /* Sidebar gets a clean white card feel */
        .dash-sidebar-wrap {
          flex-shrink: 0;
          background: #ffffff;
          border-right: 1px solid #e8e3db;
        }

        /* Main content area */
        .dash-main {
          flex: 1;
          min-width: 0;
          transition: all 0.3s ease;
          background: #f7f5f1;
        }

        /* Subtle top rule below navbar */
        .dash-content-inner {
          border-top: 1px solid rgba(122,158,126,0.12);
        }
      `}</style>

      <SidebarProvider>
        <div className="dash-root">
          <Navbar />
          <div className="dash-body">

            {/* Sidebar */}
            <div className="dash-sidebar-wrap">
              <Sidebar userType={authUser.userRole.toLowerCase()} />
            </div>

            {/* Page content */}
            <main
              className="dash-main"
              style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
            >
              <div className="dash-content-inner">
                {children}
              </div>
            </main>

          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;