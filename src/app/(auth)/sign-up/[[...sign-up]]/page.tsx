"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFF8FC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <SignUp />
    </div>
  );
}