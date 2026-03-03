"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    imageSrc: "/landing-search3.png",
    title: "Trustworthy and Verified Listings",
    description: "Discover the best rental options backed by genuine user reviews and thorough property verification.",
  },
  {
    imageSrc: "/landing-search2.png",
    title: "Browse Rental Listings with Ease",
    description: "Get access to user reviews and ratings for a better understanding of every rental option.",
  },
  {
    imageSrc: "/landing-search1.png",
    title: "Simplify Your Search with Advanced Filters",
    description: "Find verified rental listings tailored to your needs for a completely hassle-free experience.",
  },
];

const FeaturesSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

        .feat-section {
          background: #ffffff;
          padding: 72px 80px 80px;
        }
        .feat-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .feat-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 48px;
        }
        .feat-header-left {
          flex: 1;
        }
        .feat-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A9E7E;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .feat-eyebrow-line {
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #7A9E7E;
          opacity: 0.6;
        }
        .feat-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 2.6vw, 2.2rem);
          font-weight: 500;
          color: #1a1a18;
          line-height: 1.18;
          letter-spacing: -0.01em;
          max-width: 420px;
        }
        .feat-heading em {
          font-style: italic;
          font-weight: 400;
          color: #7A9E7E;
        }
        .feat-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          background: #7A9E7E;
          border: 1.5px solid #7A9E7E;
          padding: 12px 28px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .feat-btn:hover {
          background: #ffffff;
          color: #7A9E7E;
        }
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .feat-card {
          border: 1px solid #ece8e1;
          border-radius: 10px;
          overflow: hidden;
          background: #ffffff;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .feat-card:hover {
          box-shadow: 0 8px 32px rgba(26,26,24,0.08);
          transform: translateY(-4px);
          border-color: #cdc8c0;
        }
        .feat-img-wrap {
          width: 100%;
          height: 172px;
          background: #f5f2ed;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .feat-card-body {
          padding: 20px 22px 24px;
        }
        .feat-card-number {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7A9E7E;
          margin-bottom: 8px;
        }
        .feat-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #1a1a18;
          line-height: 1.28;
          margin-bottom: 8px;
        }
        .feat-divider {
          width: 24px;
          height: 1px;
          background: #e0dbd3;
          margin-bottom: 10px;
        }
        .feat-card-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: #7a7a74;
          line-height: 1.75;
        }
        @media (max-width: 900px) {
          .feat-section { padding: 56px 24px; }
          .feat-grid { grid-template-columns: 1fr; }
          .feat-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="feat-section">
        <div className="feat-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="feat-header"
          >
            <div className="feat-header-left">
              <div className="feat-eyebrow">
                <span className="feat-eyebrow-line" />
                Why UrbanNest
              </div>
              <h2 className="feat-heading">
                Find the Home You Want Using Our <em>Effective Search Filters</em>
              </h2>
            </div>
            <Link href="/search" className="feat-btn">
              Search Properties
            </Link>
          </motion.div>

          <div className="feat-grid">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="feat-card">
                  <div className="feat-img-wrap">
                    <Image
                      src={card.imageSrc}
                      width={380}
                      height={380}
                      alt={card.title}
                      style={{ width: "85%", height: "85%", objectFit: "contain" }}
                    />
                  </div>
                  <div className="feat-card-body">
                    <div className="feat-card-number">0{i + 1}</div>
                    <h3 className="feat-card-title">{card.title}</h3>
                    <div className="feat-divider" />
                    <p className="feat-card-desc">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;