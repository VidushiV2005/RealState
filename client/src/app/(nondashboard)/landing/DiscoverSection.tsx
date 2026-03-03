"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    imageSrc: "/landing-icon-wand.png",
    title: "Search for Properties",
    description: "Browse through our extensive collection of rental properties in your desired location.",
    step: "01",
  },
  {
    imageSrc: "/landing-icon-calendar.png",
    title: "Book Your Rental",
    description: "Once you have found the perfect rental property, easily book it online with just a few clicks.",
    step: "02",
  },
  {
    imageSrc: "/landing-icon-heart.png",
    title: "Enjoy Your New Home",
    description: "Move into your new rental property and start enjoying your dream home.",
    step: "03",
  },
];

const DiscoverSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

        .disc-section {
          background: #e8f0e8;
          padding: 80px 80px;
          position: relative;
          overflow: hidden;
        }

        .disc-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(90,140,95,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(90,140,95,0.12) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .disc-section::after {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(90,140,95,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .disc-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .disc-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 52px;
        }

        .disc-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4a8a50;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .disc-eyebrow-line {
          display: inline-block;
          width: 24px;
          height: 1.5px;
          background: #4a8a50;
          opacity: 0.7;
        }

        .disc-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.6rem);
          font-weight: 500;
          color: #141f14;
          line-height: 1.15;
          letter-spacing: -0.01em;
          max-width: 400px;
        }

        .disc-heading em {
          font-style: italic;
          font-weight: 400;
          color: #4a8a50;
        }

        .disc-subtext {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: #4a5e4a;
          line-height: 1.8;
          max-width: 300px;
          text-align: right;
        }

        .disc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .disc-card {
          background: #ffffff;
          border: 1px solid #c4d9c5;
          border-radius: 12px;
          padding: 36px 28px 32px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }

        .disc-card:hover {
          box-shadow: 0 12px 40px rgba(50,100,55,0.13);
          transform: translateY(-5px);
          border-color: #7A9E7E;
        }

        /* top accent bar on hover */
        .disc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #7A9E7E, #a8c8aa);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .disc-card:hover::before { opacity: 1; }

        .disc-card-bg-num {
          position: absolute;
          bottom: -14px;
          right: 16px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 7rem;
          font-weight: 600;
          color: rgba(90,140,95,0.1);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .disc-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: linear-gradient(135deg, #d8eeda, #eef6ef);
          border: 1px solid #b4d4b6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: transform 0.3s ease;
        }
        .disc-card:hover .disc-icon-wrap {
          transform: scale(1.08);
        }

        .disc-step {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4a8a50;
          margin-bottom: 10px;
        }

        .disc-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #141f14;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .disc-divider {
          width: 28px;
          height: 1.5px;
          background: #7A9E7E;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .disc-card-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: #3d543d;
          line-height: 1.78;
        }

        .disc-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 28px;
          gap: 6px;
        }

        .disc-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #7A9E7E;
        }

        @media (max-width: 900px) {
          .disc-section { padding: 56px 24px; }
          .disc-grid { grid-template-columns: 1fr; }
          .disc-header { flex-direction: column; align-items: flex-start; }
          .disc-subtext { text-align: left; }
        }
      `}</style>

      <section className="disc-section">
        <div className="disc-inner">

          <motion.div
            className="disc-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="disc-eyebrow">
                <span className="disc-eyebrow-line" />
                How It Works
              </div>
              <h2 className="disc-heading">
                Three Simple Steps to Your <em>Dream Home</em>
              </h2>
            </div>
            <p className="disc-subtext">
              Searching for your dream rental has never been easier. Start today and discover your perfect home.
            </p>
          </motion.div>

          <div className="disc-grid">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="disc-card">
                  <div className="disc-card-bg-num">{card.step}</div>
                  <div className="disc-icon-wrap">
                    <Image
                      src={card.imageSrc}
                      width={26}
                      height={26}
                      alt={card.title}
                      style={{ objectFit: "contain", width: "24px", height: "24px" }}
                    />
                  </div>
                  <div className="disc-step">Step {card.step}</div>
                  <h3 className="disc-card-title">{card.title}</h3>
                  <div className="disc-divider" />
                  <p className="disc-card-desc">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="disc-connector"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="disc-dot"
                style={{ opacity: i === 2 ? 1 : i === 1 || i === 3 ? 0.45 : 0.2 }}
              />
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default DiscoverSection;