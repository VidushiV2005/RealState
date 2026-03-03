"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
} from "@/state/api";
import { Heart } from "lucide-react";
import React from "react";

const Favorites = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );

  const {
    data: favoriteProperties,
    isLoading,
    error,
  } = useGetPropertiesQuery(
    { favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id) },
    { skip: !tenant?.favorites || tenant?.favorites.length === 0 }
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading favorites</div>;

  const count = favoriteProperties?.length ?? 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .fav-root {
          padding: 88px 48px 60px 80px;
          font-family: 'Jost', sans-serif;
          min-height: 100vh;
        }

        /* ── Header ── */
        .fav-header {
          margin-bottom: 36px;
        }
        .fav-eyebrow {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A9E7E;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .fav-eyebrow-line {
          display: inline-block;
          width: 20px;
          height: 1.5px;
          background: #7A9E7E;
          opacity: 0.6;
        }
        .fav-title-row {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 6px;
        }
        .fav-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #141f14;
          line-height: 1.1;
        }
        .fav-count {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: #7A9E7E;
          background: #eef4ee;
          border: 1px solid #c4d9c5;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }
        .fav-subtitle {
          font-size: 0.875rem;
          font-weight: 300;
          color: #7a7a74;
        }

        /* ── Grid ── */
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1280px) { .fav-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .fav-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  {
          .fav-root { padding: 80px 20px 40px; }
          .fav-grid { grid-template-columns: 1fr; }
        }

        /* ── Empty state ── */
        .fav-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
          border: 1px dashed #d4cfc7;
          border-radius: 12px;
          margin-top: 8px;
        }
        .fav-empty-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #eef4ee;
          border: 1px solid #c4d9c5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #7A9E7E;
        }
        .fav-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #3d3d3a;
          margin-bottom: 8px;
        }
        .fav-empty-desc {
          font-size: 0.85rem;
          font-weight: 300;
          color: #a0a09a;
          max-width: 280px;
          line-height: 1.7;
        }

        /* ── Divider ── */
        .fav-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #e0dbd3, transparent);
          margin-bottom: 28px;
        }
      `}</style>

      <div className="fav-root">

        {/* Header */}
        <div className="fav-header">
          <div className="fav-eyebrow">
            <span className="fav-eyebrow-line" />
            Tenant Dashboard
          </div>
          <div className="fav-title-row">
            <h1 className="fav-title">Saved Properties</h1>
            {count > 0 && (
              <span className="fav-count">{count} saved</span>
            )}
          </div>
          <p className="fav-subtitle">Browse and manage your saved property listings</p>
        </div>

        <div className="fav-divider" />

        {/* Grid or empty */}
        {count === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty-icon">
              <Heart className="w-5 h-5" />
            </div>
            <p className="fav-empty-title">No saved properties yet</p>
            <p className="fav-empty-desc">
              Browse listings and tap the heart icon to save properties you love.
            </p>
          </div>
        ) : (
          <div className="fav-grid">
            {favoriteProperties?.map((property) => (
              <Card
                key={property.id}
                property={property}
                isFavorite={true}
                onFavoriteToggle={() => {}}
                showFavoriteButton={false}
                propertyLink={`/tenants/residences/${property.id}`}
              />
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default Favorites;