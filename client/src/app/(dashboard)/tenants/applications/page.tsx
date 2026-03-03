"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useGetApplicationsQuery, useGetAuthUserQuery } from "@/state/api";
import { CircleCheckBig, Clock, Download, XCircle } from "lucide-react";
import React from "react";

const Applications = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: applications,
    isLoading,
    isError,
  } = useGetApplicationsQuery({
    userId: authUser?.cognitoInfo?.userId,
    userType: "tenant",
  });

  if (isLoading) return <Loading />;
  if (isError || !applications) return <div>Error fetching applications</div>;

  const approved  = applications.filter(a => a.status === "Approved").length;
  const pending   = applications.filter(a => a.status === "Pending").length;
  const denied    = applications.filter(a => a.status === "Denied").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .apps-root {
          min-height: 100vh;
          background: transparent;
          padding: 88px 48px 60px 80px;
          font-family: 'Jost', sans-serif;
        }

        /* ── Header area ── */
        .apps-header {
          margin-bottom: 36px;
        }
        .apps-eyebrow {
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
        .apps-eyebrow-line {
          display: inline-block;
          width: 20px;
          height: 1.5px;
          background: #7A9E7E;
          opacity: 0.6;
        }
        .apps-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #141f14;
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .apps-subtitle {
          font-size: 0.875rem;
          font-weight: 300;
          color: #7a7a74;
        }

        /* ── Summary pills ── */
        .apps-summary {
          display: flex;
          gap: 12px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .apps-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .apps-pill-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .apps-pill.approved {
          background: #f0faf0;
          border-color: #b4d9b6;
          color: #2d7a32;
        }
        .apps-pill.approved .apps-pill-dot { background: #4a9e50; }
        .apps-pill.pending {
          background: #fefce8;
          border-color: #e8d87a;
          color: #856a00;
        }
        .apps-pill.pending .apps-pill-dot { background: #c9a200; }
        .apps-pill.denied {
          background: #fff5f5;
          border-color: #f0b4b4;
          color: #9e2d2d;
        }
        .apps-pill.denied .apps-pill-dot { background: #d94444; }

        /* ── Application row wrapper ── */
        .apps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Status + Download bar ── */
        .apps-card-footer {
          display: flex;
          align-items: stretch;
          gap: 12px;
          padding: 0 20px 20px;
          width: 100%;
        }

        .apps-status {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 0.835rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          border: 1px solid;
        }
        .apps-status svg { flex-shrink: 0; }

        .apps-status.approved {
          background: #f0faf0;
          border-color: #b4d9b6;
          color: #2d6e32;
        }
        .apps-status.pending {
          background: #fefce8;
          border-color: #e0d060;
          color: #7a5e00;
        }
        .apps-status.denied {
          background: #fff5f5;
          border-color: #f0aaaa;
          color: #8e2222;
        }

        .apps-status strong {
          font-weight: 600;
        }

        .apps-download {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 6px;
          border: 1px solid #cdc8c0;
          background: #ffffff;
          color: #3d3d3a;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .apps-download:hover {
          background: #1a1a18;
          border-color: #1a1a18;
          color: #ffffff;
        }

        /* ── Empty state ── */
        .apps-empty {
          text-align: center;
          padding: 80px 24px;
          color: #a0a09a;
        }
        .apps-empty-icon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          color: #e0dbd3;
          margin-bottom: 16px;
        }
        .apps-empty p {
          font-size: 0.9rem;
          font-weight: 300;
        }

        @media (max-width: 700px) {
          .apps-root { padding: 80px 20px 40px; }
          .apps-card-footer { flex-direction: column; }
          .apps-download { justify-content: center; }
        }
      `}</style>

      <div className="apps-root">

        {/* Header */}
        <div className="apps-header">
          <div className="apps-eyebrow">
            <span className="apps-eyebrow-line" />
            Tenant Dashboard
          </div>
          <h1 className="apps-title">My Applications</h1>
          <p className="apps-subtitle">Track and manage your property rental applications</p>
        </div>

        {/* Summary pills */}
        {applications.length > 0 && (
          <div className="apps-summary">
            <div className="apps-pill approved">
              <span className="apps-pill-dot" />
              {approved} Approved
            </div>
            <div className="apps-pill pending">
              <span className="apps-pill-dot" />
              {pending} Pending
            </div>
            <div className="apps-pill denied">
              <span className="apps-pill-dot" />
              {denied} Denied
            </div>
          </div>
        )}

        {/* Applications list */}
        {applications.length === 0 ? (
          <div className="apps-empty">
            <div className="apps-empty-icon">—</div>
            <p>No applications yet. Start searching for your perfect home.</p>
          </div>
        ) : (
          <div className="apps-list">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                userType="renter"
              >
                <div className="apps-card-footer">

                  {/* Status banner */}
                  {application.status === "Approved" ? (
                    <div className="apps-status approved">
                      <CircleCheckBig className="w-4 h-4" />
                      <span>
                        <strong>Approved</strong> — Lease active until{" "}
                        {new Date(application.lease?.endDate).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </span>
                    </div>
                  ) : application.status === "Pending" ? (
                    <div className="apps-status pending">
                      <Clock className="w-4 h-4" />
                      <span>
                        <strong>Pending Review</strong> — Your application is awaiting landlord approval
                      </span>
                    </div>
                  ) : (
                    <div className="apps-status denied">
                      <XCircle className="w-4 h-4" />
                      <span>
                        <strong>Not Approved</strong> — This application was not accepted
                      </span>
                    </div>
                  )}

                  {/* Download */}
                  <button className="apps-download">
                    <Download className="w-4 h-4" />
                    Agreement
                  </button>

                </div>
              </ApplicationCard>
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default Applications;