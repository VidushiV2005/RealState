"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmedQuery)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(setFilters({ location: trimmedQuery, coordinates: [lng, lat] }));
        const params = new URLSearchParams({ location: trimmedQuery, coordinates: `${lng},${lat}` });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        .hero-root {
          position: relative;
          height: 100vh;
          min-height: 640px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.08) 45%,
            rgba(0,0,0,0.22) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
          max-width: 760px;
          padding: 0 24px;
        }
        .hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .hero-eyebrow-line {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
        }
        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5.5vw, 4.4rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }
        .hero-heading em {
          font-style: italic;
          font-weight: 400;
        }
        .hero-subtext {
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.875rem, 1.4vw, 1rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.85;
          margin-bottom: 44px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-search-wrap {
          display: flex;
          max-width: 560px;
          margin: 0 auto;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.14);
        }
        .hero-input {
          flex: 1 !important;
          height: 54px !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: rgba(255,255,255,0.97) !important;
          font-family: 'Jost', sans-serif !important;
          font-size: 0.875rem !important;
          font-weight: 300 !important;
          color: #1a1a18 !important;
          padding: 0 22px !important;
          border-radius: 0 !important;
          letter-spacing: 0.01em;
        }
        .hero-input::placeholder { color: #a0a09a !important; font-weight: 300; }
        .hero-btn {
          height: 54px !important;
          padding: 0 30px !important;
          background: #7A9E7E !important;
          color: white !important;
          border: none !important;
          border-radius: 0 !important;
          font-family: 'Jost', sans-serif !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          cursor: pointer !important;
          flex-shrink: 0;
          transition: background 0.25s ease !important;
          white-space: nowrap;
        }
        .hero-btn:hover { background: #6a8e6e !important; }
        .hero-scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .hero-scroll-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }
        .hero-scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.45), transparent);
          animation: heroPulse 2.2s ease-in-out infinite;
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.75; }
        }
        @media (max-width: 600px) {
          .hero-search-wrap { flex-direction: column; }
          .hero-input { border-bottom: 1px solid rgba(0,0,0,0.07) !important; }
          .hero-btn { height: 48px !important; width: 100%; }
        }
      `}</style>

      <div className="hero-root">
        <Image
          src="/landing-splash.jpg"
          alt="UrbanNest Rental Platform Hero Section"
          fill
          className="object-cover object-center"
          style={{ zIndex: 0, filter: "blur(2px)", transform: "scale(1.03)" }}
          priority
        />

        <div className="hero-overlay" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.9 }}
          >
            <span className="hero-eyebrow-line" />
            Premium Rental Marketplace
            <span className="hero-eyebrow-line" />
          </motion.div>

          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Start Your Journey to Find<br />
            <em>the Perfect Place to Call Home</em>
          </motion.h1>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.8 }}
          >
            Explore our wide range of rental properties tailored to fit your
            lifestyle and needs.
          </motion.p>

          <motion.div
            className="hero-search-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.8 }}
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => { if (e.key === "Enter") handleLocationSearch(); }}
              placeholder="Search by city, neighbourhood or address"
              className="hero-input"
            />
            <Button onClick={handleLocationSearch} className="hero-btn">
              Search
            </Button>
          </motion.div>
        </motion.div>

        <div className="hero-scroll-hint">
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;