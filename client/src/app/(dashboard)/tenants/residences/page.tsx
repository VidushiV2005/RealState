"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
} from "@/state/api";
import { Home } from "lucide-react";
import React from "react";

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );

  const {
    data: currentResidences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading current residences</div>;

  const count = currentResidences?.length ?? 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .res-root {
          padding: 88px 48px 60px 80px;
          font-family: 'Jost', sans-serif;
          min-height: 100vh;
        }

        .res-header { margin-bottom: 36px; }

        .res-eyebrow {
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
        .res-eyebrow-line {
          display: inline-block;
          width: 20px;
          height: 1.5px;
          background: #7A9E7E;
          opacity: 0.6;
        }
        .res-title-row {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 6px;
        }
        .res-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #141f14;
          line-height: 1.1;
        }
        .res-count {
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
        .res-subtitle {
          font-size: 0.875rem;
          font-weight: 300;
          color: #7a7a74;
        }

        .res-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #e0dbd3, transparent);
          margin-bottom: 28px;
        }

        .res-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1280px) { .res-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .res-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  {
          .res-root { padding: 80px 20px 40px; }
          .res-grid { grid-template-columns: 1fr; }
        }

        .res-empty {
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
        .res-empty-icon {
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
        .res-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #3d3d3a;
          margin-bottom: 8px;
        }
        .res-empty-desc {
          font-size: 0.85rem;
          font-weight: 300;
          color: #a0a09a;
          max-width: 280px;
          line-height: 1.7;
        }
      `}</style>

      <div className="res-root">

        <div className="res-header">
          <div className="res-eyebrow">
            <span className="res-eyebrow-line" />
            Tenant Dashboard
          </div>
          <div className="res-title-row">
            <h1 className="res-title">Current Residences</h1>
            {count > 0 && (
              <span className="res-count">{count} active</span>
            )}
          </div>
          <p className="res-subtitle">View and manage your current living spaces</p>
        </div>

        <div className="res-divider" />

        {count === 0 ? (
          <div className="res-empty">
            <div className="res-empty-icon">
              <Home className="w-5 h-5" />
            </div>
            <p className="res-empty-title">No active residences</p>
            <p className="res-empty-desc">
              You don't have any current residences. Browse properties to find your next home.
            </p>
          </div>
        ) : (
          <div className="res-grid">
            {currentResidences?.map((property) => (
              <Card
                key={property.id}
                property={property}
                isFavorite={tenant?.favorites.includes(property.id) || false}
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

export default Residences;