"use client";

import Loading from "@/components/Loading";
import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";
import React from "react";

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenant] = useUpdateTenantSettingsMutation();

  if (isLoading) return <Loading />;

  const initialData = {
    name: authUser?.userInfo.name,
    email: authUser?.userInfo.email,
    phoneNumber: authUser?.userInfo.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateTenant({
      cognitoId: authUser?.cognitoInfo?.userId,
      ...data,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .ts-root {
          padding: 72px 48px 60px 48px;
          font-family: 'Jost', sans-serif;
          min-height: 100vh;
          max-width: 680px;
        }

        /* ── Header ── */
        .ts-eyebrow {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A9E7E;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .ts-eyebrow-line {
          display: inline-block;
          width: 16px;
          height: 1.5px;
          background: #7A9E7E;
          opacity: 0.55;
        }
        .ts-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.85rem;
          font-weight: 600;
          color: #141f14;
          line-height: 1.1;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .ts-subtitle {
          font-size: 0.82rem;
          font-weight: 300;
          color: #9a9a94;
          margin-bottom: 24px;
        }
        .ts-divider {
          height: 1px;
          background: linear-gradient(90deg, #d8d3cc, transparent);
          margin-bottom: 24px;
        }

        /* ── Identity card ── */
        .ts-identity {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border: 1px solid #e0dbd3;
          border-left: 3px solid #7A9E7E;
          border-radius: 8px;
          margin-bottom: 28px;
          background: #fafaf8;
        }
        .ts-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7A9E7E, #4a8a50);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }
        .ts-identity-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a18;
          line-height: 1.2;
        }
        .ts-identity-role {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #7A9E7E;
          margin-top: 2px;
        }

        /* ── Section label ── */
        .ts-section-label {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b0aba4;
          padding-bottom: 10px;
          border-bottom: 1px solid #ece8e1;
          margin-bottom: 20px;
        }

        /* ── Hide SettingsForm's own header block ── */
        .ts-form-wrap h2 { display: none !important; }
        .ts-form-wrap h3 { display: none !important; }
        .ts-form-wrap > div > p:first-of-type { display: none !important; }
        /* Hide the wrapping header div (first child of form root) */
        .ts-form-wrap > div > div:first-child:has(h2) { display: none !important; }
        .ts-form-wrap > div > div:first-child:has(h3) { display: none !important; }

        /* ── Override Edit button red → sage green ── */
        .ts-form-wrap button[type="button"],
        .ts-form-wrap button[type="submit"],
        .ts-form-wrap button {
          font-family: 'Jost', sans-serif !important;
          font-size: 0.78rem !important;
          font-weight: 500 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          background: #7A9E7E !important;
          color: #ffffff !important;
          border: 1.5px solid #7A9E7E !important;
          border-radius: 4px !important;
          padding: 10px 24px !important;
          cursor: pointer !important;
          transition: background 0.2s ease !important;
        }
        .ts-form-wrap button:hover {
          background: #4a8a50 !important;
          border-color: #4a8a50 !important;
        }

        /* ── Form field styling ── */
        .ts-form-wrap input,
        .ts-form-wrap textarea {
          font-family: 'Jost', sans-serif !important;
          font-size: 0.875rem !important;
          font-weight: 300 !important;
          border: 1px solid #e0dbd3 !important;
          border-radius: 6px !important;
          padding: 10px 14px !important;
          background: #ffffff !important;
          color: #1a1a18 !important;
          transition: border-color 0.2s !important;
          box-shadow: none !important;
        }
        .ts-form-wrap input:focus,
        .ts-form-wrap textarea:focus {
          border-color: #7A9E7E !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(122,158,126,0.1) !important;
        }

        /* Field labels */
        .ts-form-wrap label {
          font-family: 'Jost', sans-serif !important;
          font-size: 0.78rem !important;
          font-weight: 500 !important;
          color: #3d3d3a !important;
          letter-spacing: 0.02em !important;
        }

        @media (max-width: 600px) {
          .ts-root { padding: 24px 18px 48px; }
        }
      `}</style>

      <div className="ts-root">

        {/* Header */}
        <div className="ts-eyebrow">
          <span className="ts-eyebrow-line" />
          Tenant Dashboard
        </div>
        <h1 className="ts-title">Account Settings</h1>
        <p className="ts-subtitle">Manage your personal information and preferences</p>

        <div className="ts-divider" />

        {/* Identity card */}
        <div className="ts-identity">
          <div className="ts-avatar">
            {authUser?.userInfo?.name?.[0]?.toUpperCase() ?? "T"}
          </div>
          <div>
            <div className="ts-identity-name">
              {authUser?.userInfo?.name ?? "Tenant"}
            </div>
            <div className="ts-identity-role">Tenant Account</div>
          </div>
        </div>

        {/* Section label */}
        <div className="ts-section-label">Personal Information</div>

        {/* Form — wrapped to allow style overrides */}
        <div className="ts-form-wrap">
          <SettingsForm
            initialData={initialData}
            onSubmit={handleSubmit}
            userType="tenant"
          />
        </div>

      </div>
    </>
  );
};

export default TenantSettings;