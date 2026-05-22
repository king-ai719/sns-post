"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSendCode = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("reset");
    } catch (err: unknown) {
      const e = err as { errors?: { message: string }[] };
      setError(e.errors?.[0]?.message ?? "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });
      if (result.status === "complete") {
        setDone(true);
      }
    } catch (err: unknown) {
      const e = err as { errors?: { message: string }[] };
      setError(e.errors?.[0]?.message ?? "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>パスワードをリセットしました</h1>
          <p style={{ color: "#555", textAlign: "center", marginBottom: 24 }}>
            新しいパスワードでログインしてください。
          </p>
          <a href="/sign-in" style={buttonStyle(false)}>ログインへ</a>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>パスワードをリセット</h1>

        {step === "email" ? (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                style={inputStyle}
              />
            </div>
            {error && <p style={errorStyle}>{error}</p>}
            <button
              onClick={handleSendCode}
              disabled={loading || !email}
              style={buttonStyle(loading || !email)}
            >
              {loading ? "送信中..." : "確認コードを送信"}
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: "#555", marginBottom: 16, textAlign: "center" }}>
              {email} に確認コードを送信しました
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>確認コード</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="6桁のコード"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>新しいパスワード</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="8文字以上"
                style={inputStyle}
              />
            </div>
            {error && <p style={errorStyle}>{error}</p>}
            <button
              onClick={handleReset}
              disabled={loading || !code || !newPassword}
              style={buttonStyle(loading || !code || !newPassword)}
            >
              {loading ? "処理中..." : "パスワードをリセット"}
            </button>
          </>
        )}

        <p style={{ textAlign: "center", fontSize: 13, marginTop: 16, color: "#555" }}>
          <a href="/sign-in" style={{ color: "#E91E8C" }}>ログインに戻る</a>
        </p>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#FFF8FC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: 16,
  padding: "40px 32px",
  width: "100%",
  maxWidth: 400,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 24,
  textAlign: "center",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  marginBottom: 6,
  color: "#555",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  color: "#111",
  background: "#fff",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: 13,
  marginBottom: 12,
};

const buttonStyle = (disabled: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  background: disabled ? "#ccc" : "#E91E8C",
  color: "white",
  fontSize: 15,
  fontWeight: 600,
  cursor: disabled ? "not-allowed" : "pointer",
  display: "block",
  textAlign: "center",
  textDecoration: "none",
});