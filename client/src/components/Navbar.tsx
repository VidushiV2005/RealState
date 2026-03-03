"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 50;
          background: rgba(14, 20, 14, 0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(122,158,126,0.15);
          transition: background 0.3s ease;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          width: 100%;
          height: 100%;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo-hex {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #7A9E7E, #4a8a50);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .nav-logo:hover .nav-logo-hex { transform: rotate(15deg); }

        .nav-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.06em;
          line-height: 1;
        }
        .nav-logo-text span { color: #7A9E7E; }

        /* ── Center tagline ── */
        .nav-tagline {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.04em;
          text-align: center;
          pointer-events: none;
          white-space: nowrap;
        }

        /* ── Dashboard action btn ── */
        .nav-action-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #ffffff;
          background: #5a9e60;
          border: 1px solid #6ab070;
          padding: 8px 18px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .nav-action-btn:hover { background: #3d8045; }

        /* ── Icon buttons (bell, message) ── */
        .nav-icon-btn {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          background: transparent;
        }
        .nav-icon-btn:hover {
          border-color: #7A9E7E;
          color: #7A9E7E;
          background: rgba(122,158,126,0.08);
        }

        .nav-badge {
          position: absolute;
          top: 6px; right: 6px;
          width: 7px; height: 7px;
          background: #e05c5c;
          border-radius: 50%;
          border: 1.5px solid rgba(14,20,14,0.9);
        }

        /* ── Auth buttons ── */
        .nav-signin {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.18);
          padding: 8px 20px;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .nav-signin:hover {
          border-color: rgba(255,255,255,0.45);
          color: #ffffff;
        }

        .nav-signup {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: #ffffff;
          background: #7A9E7E;
          border: 1px solid #7A9E7E;
          padding: 8px 20px;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .nav-signup:hover {
          background: #4a8a50;
          border-color: #4a8a50;
        }

        /* ── Dropdown ── */
        .nav-avatar {
          cursor: pointer;
          border-radius: 50%;
          transition: opacity 0.2s;
        }
        .nav-avatar:hover { opacity: 0.85; }

        /* ── Right group ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Left group ── */
        .nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* vertical separator */
        .nav-sep {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.1);
        }
      `}</style>

      <div className="nav-root" style={{ height: `${NAVBAR_HEIGHT}px` }}>
        <div className="nav-inner">

          {/* ── Left ── */}
          <div className="nav-left">
            {isDashboardPage && (
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            )}

            <Link href="/" scroll={false} className="nav-logo">
              <div className="nav-logo-hex" />
              <span className="nav-logo-text">
                Urban<span>Nest</span>
              </span>
            </Link>

            {isDashboardPage && authUser && (
              <>
                <div className="nav-sep hidden md:block" />
                <button
                  className="nav-action-btn hidden md:flex"
                  onClick={() =>
                    router.push(
                      authUser.userRole?.toLowerCase() === "manager"
                        ? "/managers/newproperty"
                        : "/search"
                    )
                  }
                >
                  {authUser.userRole?.toLowerCase() === "manager" ? (
                    <><Plus style={{ width: "14px", height: "14px" }} /> Add Property</>
                  ) : (
                    <><Search style={{ width: "14px", height: "14px" }} /> Search</>
                  )}
                </button>
              </>
            )}
          </div>

          {/* ── Centre ── */}
          {!isDashboardPage && (
            <p className="nav-tagline hidden md:block">
              Discover your perfect rental apartment with our advanced search
            </p>
          )}

          {/* ── Right ── */}
          <div className="nav-right">
            {authLoading ? (
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
                Loading…
              </span>
            ) : authUser ? (
              <>
                <div className="nav-icon-btn hidden md:flex">
                  <MessageCircle style={{ width: "16px", height: "16px" }} />
                  <div className="nav-badge" />
                </div>
                <div className="nav-icon-btn hidden md:flex">
                  <Bell style={{ width: "16px", height: "16px" }} />
                  <div className="nav-badge" />
                </div>

                <div className="nav-sep hidden md:block" />

                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="nav-avatar" style={{ width: "34px", height: "34px" }}>
                      <AvatarImage src={authUser.userInfo?.image} />
                      <AvatarFallback
                        style={{
                          background: "#7A9E7E",
                          color: "#fff",
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {authUser.userInfo?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    style={{
                      background: "#111810",
                      border: "1px solid rgba(122,158,126,0.2)",
                      borderRadius: "8px",
                      minWidth: "180px",
                      padding: "6px",
                    }}
                  >
                    <DropdownMenuItem
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.83rem",
                        fontWeight: 500,
                        color: "#ffffff",
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "9px 12px",
                      }}
                      className="hover:!bg-[#7A9E7E] hover:!text-white"
                      onClick={() =>
                        router.push(
                          authUser.userRole?.toLowerCase() === "manager"
                            ? "/managers/properties"
                            : "/tenants/favorites",
                          { scroll: false }
                        )
                      }
                    >
                      Go to Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuSeparator style={{ background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />

                    <DropdownMenuItem
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.83rem",
                        color: "rgba(255,255,255,0.6)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "9px 12px",
                      }}
                      className="hover:!bg-[rgba(122,158,126,0.12)] hover:!text-white"
                      onClick={() =>
                        router.push(
                          `/${authUser.userRole?.toLowerCase()}s/settings`,
                          { scroll: false }
                        )
                      }
                    >
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.83rem",
                        color: "rgba(255,255,255,0.6)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "9px 12px",
                      }}
                      className="hover:!bg-[rgba(122,158,126,0.12)] hover:!text-white"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/signin" className="nav-signin">
                  Sign In
                </Link>
                <Link href="/signup" className="nav-signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;