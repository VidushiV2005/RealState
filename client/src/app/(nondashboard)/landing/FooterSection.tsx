"use client";

import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook, faInstagram, faTwitter, faLinkedin, faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        .footer-root {
          background: #111810;
          padding: 80px 80px 0;
          position: relative;
          overflow: hidden;
        }

        /* faint grid */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(122,158,126,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122,158,126,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* top green accent line */
        .footer-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #7A9E7E, #4a8a50, transparent);
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── main grid ── */
        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* brand col */
        .footer-brand-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: 0.04em;
          display: inline-block;
          margin-bottom: 18px;
        }

        .footer-brand-logo span { color: #7A9E7E; }

        .footer-tagline {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,255,255,0.42);
          line-height: 1.8;
          max-width: 230px;
          margin-bottom: 28px;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
        }

        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          font-size: 0.85rem;
        }

        .footer-social-btn:hover {
          border-color: #7A9E7E;
          color: #7A9E7E;
          background: rgba(122,158,126,0.08);
        }

        /* link cols */
        .footer-col-title {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A9E7E;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(122,158,126,0.2);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links a {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          display: inline-block;
        }

        .footer-links a:hover {
          color: #ffffff;
          padding-left: 4px;
        }

        /* ── bottom bar ── */
        .footer-bottom {
          padding: 24px 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .footer-copy {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
        }

        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-links a {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-bottom-links a:hover { color: rgba(255,255,255,0.7); }

        @media (max-width: 900px) {
          .footer-root { padding: 60px 24px 0; }
          .footer-main { grid-template-columns: 1fr 1fr; gap: 40px; }
        }

        @media (max-width: 560px) {
          .footer-main { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-line" />

        <div className="footer-inner">
          <div className="footer-main">

            {/* Brand */}
            <div>
              <Link href="/" className="footer-brand-logo" scroll={false}>
                Urban<span>Nest</span>
              </Link>
              <p className="footer-tagline">
                The premium rental marketplace connecting tenants with exceptional homes across the world's most sought-after cities.
              </p>
              <div className="footer-socials">
                {[
                  { icon: faFacebook,  label: "Facebook"  },
                  { icon: faInstagram, label: "Instagram" },
                  { icon: faTwitter,   label: "Twitter"   },
                  { icon: faLinkedin,  label: "LinkedIn"  },
                  { icon: faYoutube,   label: "YouTube"   },
                ].map(({ icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="footer-social-btn">
                    <FontAwesomeIcon icon={icon} style={{ width: "15px", height: "15px" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="footer-col-title">Legal</div>
              <ul className="footer-links">
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <div className="footer-col-title">Product</div>
              <ul className="footer-links">
                <li><Link href="/search">Search</Link></li>
                <li><Link href="/signup">Create Account</Link></li>
                <li><Link href="/signin">Sign In</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copy">© {new Date().getFullYear()} UrbanNest. All rights reserved.</span>
            <div className="footer-bottom-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;