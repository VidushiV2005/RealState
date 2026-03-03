"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

        .cta-section {
          position: relative;
          padding: 100px 80px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 460px;
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            135deg,
            rgba(10,10,8,0.72) 0%,
            rgba(10,10,8,0.45) 60%,
            rgba(10,10,8,0.65) 100%
          );
        }

        /* left accent bar */
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        .cta-left {
          flex: 1;
          border-left: 2px solid rgba(122,158,126,0.6);
          padding-left: 28px;
        }

        .cta-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(122,158,126,0.9);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .cta-eyebrow-line {
          display: inline-block;
          width: 20px;
          height: 1px;
          background: rgba(122,158,126,0.6);
        }

        .cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.12;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }

        .cta-heading em {
          font-style: italic;
          font-weight: 400;
          color: rgba(200, 225, 200, 0.95);
        }

        .cta-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(255,255,255,0.62);
          line-height: 1.8;
          max-width: 380px;
        }

        .cta-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-shrink: 0;
        }

        .cta-btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a1a18;
          background: #ffffff;
          border: 1.5px solid #ffffff;
          padding: 14px 36px;
          border-radius: 4px;
          text-decoration: none;
          display: block;
          text-align: center;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          white-space: nowrap;
        }

        .cta-btn-primary:hover {
          background: transparent;
          color: #ffffff;
        }

        .cta-btn-secondary {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          background: #7A9E7E;
          border: 1.5px solid #7A9E7E;
          padding: 14px 36px;
          border-radius: 4px;
          text-decoration: none;
          display: block;
          text-align: center;
          transition: background 0.25s ease, color 0.25s ease;
          white-space: nowrap;
        }

        .cta-btn-secondary:hover {
          background: transparent;
          color: #7A9E7E;
          border-color: #7A9E7E;
        }

        /* decorative corner lines */
        .cta-corner {
          position: absolute;
          z-index: 2;
          width: 40px;
          height: 40px;
          pointer-events: none;
        }
        .cta-corner-tl { top: 32px; left: 48px; border-top: 1px solid rgba(122,158,126,0.35); border-left: 1px solid rgba(122,158,126,0.35); }
        .cta-corner-br { bottom: 32px; right: 48px; border-bottom: 1px solid rgba(122,158,126,0.35); border-right: 1px solid rgba(122,158,126,0.35); }

        @media (max-width: 800px) {
          .cta-section { padding: 72px 24px; }
          .cta-content { flex-direction: column; gap: 40px; align-items: flex-start; }
          .cta-right { flex-direction: row; width: 100%; }
          .cta-btn-primary, .cta-btn-secondary { flex: 1; }
          .cta-corner { display: none; }
        }
      `}</style>

      <section className="cta-section">
        <Image
          src="/landing-call-to-action.jpg"
          alt="UrbanNest Search Section Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />

        <div className="cta-overlay" />

        {/* Decorative corners */}
        <div className="cta-corner cta-corner-tl" />
        <div className="cta-corner cta-corner-br" />

        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left — text */}
          <div className="cta-left">
            <div className="cta-eyebrow">
              <span className="cta-eyebrow-line" />
              Ready to Move?
            </div>
            <h2 className="cta-heading">
              Find Your Dream<br />
              <em>Rental Property</em>
            </h2>
            <p className="cta-desc">
              Discover a wide range of rental properties in your desired location.
            </p>
          </div>

          {/* Right — buttons */}
          <motion.div
            className="cta-right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/search" className="cta-btn-primary">
              Search Properties
            </Link>
            <Link href="/signup" className="cta-btn-secondary" scroll={false}>
              Create Account
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default CallToActionSection;