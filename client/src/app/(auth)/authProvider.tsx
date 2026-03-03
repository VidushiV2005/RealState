"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  Text,
  View,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname } from "next/navigation";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View style={{ textAlign: "center", padding: "20px 24px 12px" }}>
        {/* Logo mark */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "12px",
        }}>
          <div style={{
            width: "28px",
            height: "28px",
            background: "linear-gradient(135deg, #7A9E7E, #5d8462)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            boxShadow: "0 2px 8px rgba(122, 158, 126, 0.2)",
          }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "0.02em",
          }}>
            Urban<span style={{ color: "#7A9E7E" }}>Nest</span>
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.813rem",
          fontWeight: 400,
          color: "#666666",
          letterSpacing: "0.01em",
          lineHeight: 1.3,
          margin: 0,
        }}>
          Welcome back
        </p>
      </View>
    );
  },

  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="I am a"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
            direction="row"
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── Page wrapper ── */
        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          transition: background-color 0.4s ease;
        }

        /* Background transitions based on active tab */
        .auth-root.signup-active {
          background: #f0f7f4;
        }

        .auth-root.signin-active {
          background: #f8f9fa;
        }

        /* Subtle background decoration */
        .auth-root::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(122, 158, 126, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
        }

        .auth-root::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(93, 132, 98, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
        }

        /* ── Amplify container overrides ── */
        [data-amplify-authenticator] {
          position: relative;
          z-index: 10;
          --amplify-components-authenticator-router-box-shadow: 
            0 4px 20px rgba(0,0,0,0.08);
          --amplify-components-authenticator-router-border-width: 1px;
          --amplify-components-authenticator-router-border-color: #e5e7eb;
          --amplify-components-authenticator-router-border-style: solid;
          --amplify-components-authenticator-router-border-radius: 16px;
          --amplify-components-authenticator-router-background-color: #ffffff;
          --amplify-components-authenticator-max-width: 400px;
        }

        /* Tab bar */
        [data-amplify-authenticator] [role="tablist"] {
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 16px 16px 0 0;
          padding: 8px 24px;
          gap: 8px;
          display: flex;
          justify-content: center;
        }

        [data-amplify-authenticator] [role="tab"] {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.813rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.02em !important;
          color: #6b7280 !important;
          padding: 10px 24px !important;
          border-bottom: none !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
          background: transparent !important;
        }

        [data-amplify-authenticator] [role="tab"]:hover {
          color: #374151 !important;
          background: #f3f4f6 !important;
        }

        [data-amplify-authenticator] [role="tab"][aria-selected="true"] {
          color: #ffffff !important;
          background: #7A9E7E !important;
          font-weight: 700 !important;
          box-shadow: 0 2px 4px rgba(122, 158, 126, 0.2) !important;
        }

        /* Form body padding */
        [data-amplify-authenticator] [data-amplify-form] {
          padding: 20px 24px 24px !important;
        }

        /* Labels */
        [data-amplify-authenticator] .amplify-label {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.01em !important;
          color: #1a1a1a !important;
          margin-bottom: 4px !important;
        }

        /* Inputs */
        [data-amplify-authenticator] .amplify-input {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.875rem !important;
          font-weight: 400 !important;
          color: #1a1a1a !important;
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
          padding: 9px 12px !important;
          background: #ffffff !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important;
        }

        [data-amplify-authenticator] .amplify-input::placeholder {
          color: #9ca3af !important;
          font-weight: 400 !important;
        }

        [data-amplify-authenticator] .amplify-input:hover {
          border-color: #9ca3af !important;
        }

        [data-amplify-authenticator] .amplify-input:focus {
          border-color: #7A9E7E !important;
          box-shadow: 
            0 0 0 3px rgba(122,158,126,0.1),
            0 1px 2px rgba(0,0,0,0.02) !important;
          outline: none !important;
        }

        /* Primary submit button */
        [data-amplify-authenticator] .amplify-button--primary {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.813rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.02em !important;
          background: #7A9E7E !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 10px 18px !important;
          color: #ffffff !important;
          transition: all 0.2s ease !important;
          width: 100% !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          cursor: pointer !important;
        }

        [data-amplify-authenticator] .amplify-button--primary:hover {
          background: #6a8e6e !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15) !important;
        }

        [data-amplify-authenticator] .amplify-button--primary:active {
          transform: scale(0.98) !important;
        }

        /* Link / text buttons */
        [data-amplify-authenticator] .amplify-button--link,
        [data-amplify-authenticator] .amplify-button--small {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.813rem !important;
          font-weight: 500 !important;
          color: #7A9E7E !important;
          transition: color 0.2s !important;
        }

        [data-amplify-authenticator] .amplify-button--link:hover {
          color: #5d8462 !important;
          text-decoration: underline !important;
        }

        /* Radio group */
        [data-amplify-authenticator] .amplify-radiogroupfield__legend {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.01em !important;
          color: #1a1a1a !important;
          margin-bottom: 6px !important;
        }

        [data-amplify-authenticator] .amplify-radiogroupfield {
          margin-bottom: 12px !important;
        }

        [data-amplify-authenticator] .amplify-radio {
          margin: 3px 0 !important;
        }

        [data-amplify-authenticator] .amplify-radio__button {
          width: 16px !important;
          height: 16px !important;
          border-width: 2px !important;
          border-color: #d1d5db !important;
          transition: all 0.2s !important;
        }

        [data-amplify-authenticator] .amplify-radio__button:hover {
          border-color: #7A9E7E !important;
        }

        [data-amplify-authenticator] .amplify-radio__button:checked,
        [data-amplify-authenticator] .amplify-radio__input:checked + .amplify-radio__button {
          border-color: #7A9E7E !important;
          background: #7A9E7E !important;
        }

        [data-amplify-authenticator] .amplify-radio__label {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.813rem !important;
          font-weight: 500 !important;
          color: #374151 !important;
          margin-left: 6px !important;
        }

        /* Error messages */
        [data-amplify-authenticator] .amplify-text--error {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
          color: #dc2626 !important;
          margin-top: 3px !important;
        }

        /* Password field icon */
        [data-amplify-authenticator] .amplify-field__show-password {
          border: none !important;
          background: transparent !important;
          color: #6b7280 !important;
          transition: color 0.2s !important;
          cursor: pointer !important;
        }

        [data-amplify-authenticator] .amplify-field__show-password:hover {
          color: #374151 !important;
        }

        /* Field container spacing */
        [data-amplify-authenticator] .amplify-field {
          margin-bottom: 12px !important;
        }

        /* Footer links */
        [data-amplify-authenticator] .amplify-text--center {
          margin-top: 10px !important;
          font-size: 0.75rem !important;
        }

        /* Remove extra spacing */
        [data-amplify-authenticator] .amplify-heading {
          margin: 0 !important;
        }

        /* Compact radio group styling */
        [data-amplify-authenticator] .amplify-flex {
          gap: 12px !important;
        }
      `}</style>

      <div className={`auth-root ${pathname.includes("signup") ? "signup-active" : "signin-active"}`}>
        <Authenticator
          initialState={pathname.includes("signup") ? "signUp" : "signIn"}
          components={components}
          formFields={formFields}
        >
          {() => <>{children}</>}
        </Authenticator>
      </div>
    </>
  );
};

export default Auth;