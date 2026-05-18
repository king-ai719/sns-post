"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "メールアドレスまたはパスワードが正しくありません。");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Googleログインに失敗しました。");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <nav style={styles.nav}>
        <Link href="/" style={styles.logo}>
          Sna<span style={styles.logoSpan}>Pick</span> 📸
        </Link>
        <Link href="/" style={styles.navBack}>← トップに戻る</Link>
      </nav>

      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>📸</div>
            <div style={styles.cardTitle}>おかえりなさい！</div>
            <div style={styles.cardSub}>続きを始めましょう。</div>
          </div>

          <button style={styles.socialBtn} onClick={handleGoogleSignIn} type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Googleで続ける
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>またはメールでログイン</span>
            <div style={styles.dividerLine} />
          </div>

          <form onSubmit={handleSignIn}>
            <div style={styles.field}>
              <label style={styles.label}>メールアドレス</label>
              <input
                style={styles.input}
                type="email"
                placeholder="taro@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>パスワード</label>
              <input
                style={styles.input}
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div style={{ textAlign: "right", marginTop: "-.5rem", marginBottom: "1rem" }}>
              <Link href="/forgot-password" style={styles.forgotLink}>
                パスワードを忘れた方
              </Link>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン 🔑"}
            </button>
          </form>

          <p style={styles.loginLink}>
            アカウントをお持ちでない方は{" "}
            <Link href="/sign-up" style={styles.loginLinkA}>新規登録（無料）</Link>
          </p>

          <div style={styles.badgeRow}>
            <span style={styles.badge}>✨ 1日3回無料</span>
            <span style={styles.badge}>🔒 安心の暗号化</span>
            <span style={styles.badge}>📱 スマホ対応</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const pink = "#FF6B9D";
const pinkLight = "#FFD6E7";
const pinkPale = "#FFF0F6";
const orange = "#FF9B5E";
const textMuted = "#888";
const textMain = "#2D2D2D";
const white = "#FFFFFF";

const styles: Record<string, React.CSSProperties> = {
  bg: {
    minHeight: "100vh", background: "#FFF8FC",
    display: "flex", flexDirection: "column",
    fontFamily: "'Nunito', sans-serif",
    position: "relative", overflow: "hidden",
  },
  blob1: {
    position: "fixed", width: 350, height: 350, borderRadius: "50%",
    background: pinkLight, opacity: 0.35, top: -120, left: -80, zIndex: 0,
  },
  blob2: {
    position: "fixed", width: 250, height: 250, borderRadius: "50%",
    background: "#FFF3D6", opacity: 0.5, bottom: -60, right: -40, zIndex: 0,
  },
  blob3: {
    position: "fixed", width: 180, height: 180, borderRadius: "50%",
    background: "#D4F5F3", opacity: 0.4, top: "40%", left: "5%", zIndex: 0,
  },
  nav: {
    background: white, borderBottom: `2px solid ${pinkLight}`,
    padding: ".9rem 2rem", display: "flex", alignItems: "center",
    justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
  },
  logo: { fontSize: "1.3rem", fontWeight: 900, color: pink, textDecoration: "none" },
  logoSpan: { color: orange },
  navBack: { fontSize: ".8rem", fontWeight: 700, color: textMuted, textDecoration: "none" },
  page: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    padding: "2rem 1rem", position: "relative", zIndex: 1,
  },
  card: {
    background: white, border: `2px solid ${pinkLight}`,
    borderRadius: 24, padding: "2.5rem 2rem", width: "100%", maxWidth: 400,
  },
  cardHeader: { textAlign: "center", marginBottom: "2rem" },
  cardIcon: { fontSize: "2.8rem", marginBottom: ".75rem" },
  cardTitle: { fontSize: "1.5rem", fontWeight: 900, color: textMain, marginBottom: ".3rem" },
  cardSub: {
    fontSize: ".83rem", color: textMuted, fontWeight: 600, lineHeight: 1.7,
    fontFamily: "'Noto Sans JP', sans-serif",
  },
  socialBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
    gap: ".6rem", padding: ".75rem", border: "2px solid #E5E7EB", borderRadius: 50,
    background: white, fontSize: ".88rem", fontWeight: 700, color: textMain,
    cursor: "pointer", marginBottom: ".75rem", fontFamily: "'Nunito', sans-serif",
  },
  divider: { display: "flex", alignItems: "center", gap: ".75rem", margin: "1.25rem 0" },
  dividerLine: { flex: 1, height: 1, background: pinkLight },
  dividerText: { fontSize: ".75rem", color: textMuted, fontWeight: 700, whiteSpace: "nowrap" },
  field: { marginBottom: "1rem" },
  label: {
    display: "block", fontSize: ".8rem", fontWeight: 800, color: textMain,
    marginBottom: ".4rem", fontFamily: "'Noto Sans JP', sans-serif",
  },
  input: {
    width: "100%", padding: ".7rem 1rem", border: `2px solid ${pinkLight}`,
    borderRadius: 12, fontSize: ".88rem", fontFamily: "'Nunito', sans-serif",
    color: textMain, background: white, outline: "none",
  },
  forgotLink: { fontSize: ".78rem", color: pink, fontWeight: 700, textDecoration: "none" },
  submitBtn: {
    width: "100%", padding: ".85rem", background: pink, color: white,
    border: "none", borderRadius: 50, fontSize: ".95rem", fontWeight: 800,
    cursor: "pointer", boxShadow: "0 4px 0 #d94f83", fontFamily: "'Nunito', sans-serif",
  },
  error: {
    color: "#e53e3e", fontSize: ".8rem", fontWeight: 600,
    marginBottom: ".75rem", textAlign: "center",
    fontFamily: "'Noto Sans JP', sans-serif",
  },
  loginLink: {
    textAlign: "center", marginTop: "1.25rem",
    fontSize: ".82rem", color: textMuted, fontWeight: 600,
    fontFamily: "'Noto Sans JP', sans-serif",
  },
  loginLinkA: { color: pink, textDecoration: "none", fontWeight: 800 },
  badgeRow: { display: "flex", justifyContent: "center", gap: ".5rem", marginTop: "1.5rem", flexWrap: "wrap" },
  badge: {
    background: pinkPale, border: `1.5px solid ${pinkLight}`,
    borderRadius: 50, padding: ".25rem .8rem",
    fontSize: ".72rem", fontWeight: 700, color: pink,
  },
};