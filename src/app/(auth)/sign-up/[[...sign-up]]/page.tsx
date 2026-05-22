"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err: unknown) {
      const e = err as { errors?: { message: string }[] };
      setError(e.errors?.[0]?.message ?? "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/generate");
      }
    } catch (err: unknown) {
      const e = err as { errors?: { message: string }[] };
      setError(e.errors?.[0]?.message ?? "認証コードが正しくありません");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFF8FC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "40px 32px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>
          SnaPick アカウント作成
        </h1>

        {step === "form" ? (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 6, color: "#555" }}>
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 6, color: "#555" }}>
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="8文字以上"
                style={inputStyle}
              />
            </div>
            {error && <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              style={buttonStyle(loading || !email || !password)}
            >
              {loading ? "送信中..." : "アカウントを作成"}
            </button>
            <p style={{ textAlign: "center", fontSize: 13, marginTop: 16, color: "#555" }}>
              すでにアカウントをお持ちの方は
              <a href="/sign-in" style={{ color: "#E91E8C", marginLeft: 4 }}>ログイン</a>
            </p>
          </>
        ) : (
          <>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 20, textAlign: "center" }}>
              {email} に確認コードを送信しました
            </p>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 6, color: "#555" }}>
                確認コード
              </label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="6桁のコード"
                style={inputStyle}
              />
            </div>
            {error && <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button
              onClick={handleVerify}
              disabled={loading || !code}
              style={buttonStyle(loading || !code)}
            >
              {loading ? "確認中..." : "メールを確認する"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  display: "block",
  pointerEvents: "auto",
  position: "relative",
  zIndex: 1,
  color: "#111",
  background: "#fff",
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
});