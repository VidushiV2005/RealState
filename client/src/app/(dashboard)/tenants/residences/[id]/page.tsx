"use client";

import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAuthUserQuery,
  useGetLeasesQuery,
  useGetPaymentsQuery,
  useGetPropertyQuery,
} from "@/state/api";
import { Lease, Payment, Property } from "@/types/prismaTypes";
import {
  ArrowDownToLineIcon,
  Check,
  CreditCard,
  Download,
  Edit,
  FileText,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

    .res-root {
      padding: 88px 48px 60px 80px;
      font-family: 'Jost', sans-serif;
      min-height: 100vh;
    }

    /* ── Section label ── */
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
    .res-page-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      font-weight: 600;
      color: #141f14;
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .res-page-sub {
      font-size: 0.875rem;
      font-weight: 300;
      color: #7a7a74;
      margin-bottom: 32px;
    }
    .res-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, #e0dbd3, transparent);
      margin-bottom: 28px;
    }

    /* ── Top row ── */
    .res-top-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      align-items: stretch;
    }

    /* ── Residence card ── */
    .res-card {
      flex: 1;
      background: #ffffff;
      border: 1px solid #e5e1da;
      border-radius: 12px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .res-card-top {
      display: flex;
      gap: 20px;
    }

    .res-img-placeholder {
      width: 180px;
      height: 120px;
      border-radius: 8px;
      background: linear-gradient(135deg, #d4e4d5, #eef4ee);
      flex-shrink: 0;
      border: 1px solid #c4d9c5;
    }

    .res-card-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .res-lease-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f0faf0;
      border: 1px solid #b4d9b6;
      color: #2d6e32;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
      width: fit-content;
    }
    .res-lease-badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #4a9e50;
    }

    .res-prop-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: #141f14;
      margin-bottom: 6px;
      line-height: 1.2;
    }

    .res-location {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.82rem;
      color: #7a7a74;
      font-weight: 300;
      margin-bottom: 10px;
    }

    .res-rent {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      font-weight: 600;
      color: #141f14;
    }
    .res-rent span {
      font-family: 'Jost', sans-serif;
      font-size: 0.8rem;
      font-weight: 300;
      color: #a0a09a;
    }

    /* lease dates row */
    .res-dates-row {
      display: flex;
      gap: 0;
      border: 1px solid #e5e1da;
      border-radius: 8px;
      overflow: hidden;
    }
    .res-date-cell {
      flex: 1;
      padding: 12px 16px;
      border-right: 1px solid #e5e1da;
    }
    .res-date-cell:last-child { border-right: none; }
    .res-date-label {
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #a0a09a;
      margin-bottom: 4px;
    }
    .res-date-val {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1a1a18;
    }

    /* action buttons */
    .res-btn-row {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .res-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 9px 18px;
      border-radius: 5px;
      border: 1px solid #cdc8c0;
      background: #ffffff;
      color: #3d3d3a;
      font-family: 'Jost', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    .res-btn:hover {
      background: #1a1a18;
      border-color: #1a1a18;
      color: #ffffff;
    }

    /* ── Payment method card ── */
    .res-payment-card {
      width: 320px;
      flex-shrink: 0;
      background: #ffffff;
      border: 1px solid #e5e1da;
      border-radius: 12px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .res-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.3rem;
      font-weight: 600;
      color: #141f14;
      margin-bottom: 2px;
    }
    .res-card-sub {
      font-size: 0.8rem;
      font-weight: 300;
      color: #a0a09a;
    }

    .res-visa-wrap {
      border: 1px solid #e5e1da;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .res-visa-chip {
      width: 54px;
      height: 36px;
      background: linear-gradient(135deg, #1a3a8f, #2a5acc);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .res-visa-chip span {
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .res-visa-info { flex: 1; }
    .res-visa-name-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .res-visa-name {
      font-size: 0.85rem;
      font-weight: 500;
      color: #1a1a18;
    }
    .res-visa-default {
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #7A9E7E;
      background: #eef4ee;
      border: 1px solid #c4d9c5;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .res-visa-detail {
      font-size: 0.75rem;
      color: #a0a09a;
      font-weight: 300;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }

    /* ── Billing history ── */
    .res-billing {
      background: #ffffff;
      border: 1px solid #e5e1da;
      border-radius: 12px;
      padding: 28px;
    }

    .res-billing-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
      gap: 16px;
    }

    .res-table-head {
      font-size: 0.65rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.15em !important;
      text-transform: uppercase !important;
      color: #a0a09a !important;
      padding: 12px 16px !important;
      border-bottom: 1px solid #e5e1da !important;
    }

    .res-table-cell {
      font-size: 0.82rem !important;
      color: #3d3d3a !important;
      font-weight: 400 !important;
      padding: 14px 16px !important;
      border-bottom: 1px solid #f0ece6 !important;
    }

    .res-status-paid {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #f0faf0;
      border: 1px solid #b4d9b6;
      color: #2d6e32;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 3px 10px;
      border-radius: 20px;
    }
    .res-status-pending {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #fefce8;
      border: 1px solid #e0d060;
      color: #7a5e00;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 3px 10px;
      border-radius: 20px;
    }

    .res-download-sm {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 5px;
      border: 1px solid #cdc8c0;
      background: #ffffff;
      color: #3d3d3a;
      font-family: 'Jost', sans-serif;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .res-download-sm:hover {
      background: #1a1a18;
      border-color: #1a1a18;
      color: white;
    }

    @media (max-width: 900px) {
      .res-root { padding: 80px 20px 40px; }
      .res-top-row { flex-direction: column; }
      .res-payment-card { width: 100%; }
      .res-card-top { flex-direction: column; }
      .res-img-placeholder { width: 100%; height: 160px; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   PAYMENT METHOD
───────────────────────────────────────────────────────────── */
const PaymentMethod = () => (
  <div className="res-payment-card">
    <div>
      <p className="res-card-title">Payment Method</p>
      <p className="res-card-sub">Change how you pay for your plan.</p>
    </div>

    <div className="res-visa-wrap">
      <div className="res-visa-chip"><span>VISA</span></div>
      <div className="res-visa-info">
        <div className="res-visa-name-row">
          <span className="res-visa-name">Visa ···· 2024</span>
          <span className="res-visa-default">Default</span>
        </div>
        <div className="res-visa-detail">
          <CreditCard style={{ width: "12px", height: "12px" }} />
          Expiry 26/06/2024
        </div>
        <div className="res-visa-detail">
          <Mail style={{ width: "12px", height: "12px" }} />
          billing@baseclub.com
        </div>
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button className="res-btn">
        <Edit style={{ width: "14px", height: "14px" }} />
        Edit
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   RESIDENCE CARD
───────────────────────────────────────────────────────────── */
const ResidenceCard = ({
  property,
  currentLease,
}: {
  property: Property;
  currentLease: Lease;
}) => (
  <div className="res-card">
    <div className="res-card-top">
      <div className="res-img-placeholder" />
      <div className="res-card-info">
        <div>
          <div className="res-lease-badge">
            <span className="res-lease-badge-dot" />
            Active Lease
          </div>
          <h2 className="res-prop-name">{property.name}</h2>
          <div className="res-location">
            <MapPin style={{ width: "13px", height: "13px" }} />
            {property.location.city}, {property.location.country}
          </div>
        </div>
        <div className="res-rent">
          ${currentLease.rent}
          <span> / night</span>
        </div>
      </div>
    </div>

    <div className="res-dates-row">
      {[
        { label: "Start Date",    val: new Date(currentLease.startDate).toLocaleDateString() },
        { label: "End Date",      val: new Date(currentLease.endDate).toLocaleDateString() },
        { label: "Next Payment",  val: new Date(currentLease.endDate).toLocaleDateString() },
      ].map(({ label, val }) => (
        <div key={label} className="res-date-cell">
          <div className="res-date-label">{label}</div>
          <div className="res-date-val">{val}</div>
        </div>
      ))}
    </div>

    <div className="res-btn-row">
      <button className="res-btn">
        <User style={{ width: "14px", height: "14px" }} />
        Manager
      </button>
      <button className="res-btn">
        <Download style={{ width: "14px", height: "14px" }} />
        Agreement
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   BILLING HISTORY
───────────────────────────────────────────────────────────── */
const BillingHistory = ({ payments }: { payments: Payment[] }) => (
  <div className="res-billing">
    <div className="res-billing-header">
      <div>
        <p className="res-card-title">Billing History</p>
        <p className="res-card-sub">Download your previous receipts and usage details.</p>
      </div>
      <button className="res-btn">
        <Download style={{ width: "14px", height: "14px" }} />
        Download All
      </button>
    </div>

    <div style={{ borderTop: "1px solid #e5e1da" }}>
      <Table>
        <TableHeader>
          <TableRow style={{ borderBottom: "1px solid #e5e1da" }}>
            {["Invoice", "Status", "Billing Date", "Amount", "Action"].map(h => (
              <TableHead key={h} className="res-table-head">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id} style={{ borderBottom: "1px solid #f0ece6" }}>
              <TableCell className="res-table-cell">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText style={{ width: "14px", height: "14px", color: "#7A9E7E", flexShrink: 0 }} />
                  Invoice #{payment.id} —{" "}
                  {new Date(payment.paymentDate).toLocaleString("default", {
                    month: "short", year: "numeric",
                  })}
                </div>
              </TableCell>
              <TableCell className="res-table-cell">
                {payment.paymentStatus === "Paid" ? (
                  <span className="res-status-paid">
                    <Check style={{ width: "10px", height: "10px" }} />
                    Paid
                  </span>
                ) : (
                  <span className="res-status-pending">Pending</span>
                )}
              </TableCell>
              <TableCell className="res-table-cell">
                {new Date(payment.paymentDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="res-table-cell" style={{ fontWeight: 500 }}>
                ${payment.amountPaid.toFixed(2)}
              </TableCell>
              <TableCell className="res-table-cell">
                <button className="res-download-sm">
                  <ArrowDownToLineIcon style={{ width: "12px", height: "12px" }} />
                  Download
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────── */
const Residence = () => {
  const { id } = useParams();
  const { data: authUser } = useGetAuthUserQuery();
  const { data: property, isLoading: propertyLoading, error: propertyError } =
    useGetPropertyQuery(Number(id));
  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(
    parseInt(authUser?.cognitoInfo?.userId || "0"),
    { skip: !authUser?.cognitoInfo?.userId }
  );
  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery(
    leases?.[0]?.id || 0,
    { skip: !leases?.[0]?.id }
  );

  if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />;
  if (!property || propertyError) return <div>Error loading property</div>;

  const currentLease = leases?.find((lease) => lease.propertyId === property.id);

  return (
    <>
      <Styles />
      <div className="res-root">
        {/* Page header */}
        <div className="res-eyebrow">
          <span className="res-eyebrow-line" />
          Tenant Dashboard
        </div>
        <h1 className="res-page-title">My Residence</h1>
        <p className="res-page-sub">Manage your active lease, payment method, and billing history</p>
        <div className="res-divider" />

        {/* Top row: Residence + Payment */}
        <div className="res-top-row">
          {currentLease && (
            <ResidenceCard property={property} currentLease={currentLease} />
          )}
          <PaymentMethod />
        </div>

        {/* Billing history */}
        <BillingHistory payments={payments || []} />
      </div>
    </>
  );
};

export default Residence;