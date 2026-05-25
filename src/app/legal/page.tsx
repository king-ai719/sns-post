export default function LegalPage() {
  return (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '60px 24px',
      fontFamily: "'Noto Sans JP', sans-serif",
      color: '#2D2D2D',
      lineHeight: 1.8,
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 40, borderBottom: '2px solid #FFD6E7', paddingBottom: 16 }}>
        特定商取引法に基づく表記
      </h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {[
          ['販売業者', '株式会社Techno Management Service'],
          ['代表責任者', '小松原　貴之'],
          ['所在地', '東京都北区赤羽1-41-5'],
          ['電話番号', '03-6903-9229'],
          ['メールアドレス', 'info@tms-92.com'],
          ['販売URL', 'https://snapick-92.com'],
          ['販売価格', 'Lightプラン：¥980/月\nProプラン：¥1,980/月\n（税込）'],
          ['支払方法', 'クレジットカード（Stripe決済）'],
          ['支払時期', 'お申し込み時に即時決済。以降、毎月自動更新'],
          ['役務の提供時期', '決済完了後、即時利用可能'],
          ['返品・キャンセル', 'サービスの性質上、返金はお受けできません。\nサブスクリプションはいつでも解約可能です。解約後は次回更新日まで利用できます。'],
          ['動作環境', 'インターネット接続環境および対応ブラウザが必要です'],
        ].map(([label, value]) => (
          <tr key={label} style={{ borderBottom: '1px solid #FFD6E7' }}>
            <td style={{
              padding: '16px 12px',
              fontWeight: 700,
              width: '30%',
              verticalAlign: 'top',
              color: '#FF6B9D',
              fontSize: 14,
            }}>
              {label}
            </td>
            <td style={{
              padding: '16px 12px',
              fontSize: 14,
              whiteSpace: 'pre-line',
            }}>
              {value}
            </td>
          </tr>
        ))}
      </table>

      <p style={{ marginTop: 40, fontSize: 12, color: '#aaa', textAlign: 'center' }}>
        © 2026 TechnoManagementService Co.,Ltd
      </p>
    </div>
  )
}