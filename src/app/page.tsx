'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700&display=swap');
        .lp-body { font-family: 'Nunito', sans-serif; background: #FFF8FC; color: #2D2D2D; overflow-x: hidden; }
        .lp-jp { font-family: 'Noto Sans JP', sans-serif; }

        /* NAV */
        .lp-nav { background: #fff; border-bottom: 2px solid #FFD6E7; padding: .9rem 2.5rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .lp-logo { font-size: 1.4rem; font-weight: 900; color: #FF6B9D; text-decoration: none; }
        .lp-logo span { color: #FF9B5E; }
        .lp-nav-links { display: flex; gap: 1.5rem; align-items: center; }
        .lp-nav-links a { color: #888; font-size: .85rem; font-weight: 700; text-decoration: none; }
        .lp-nav-links a:hover { color: #FF6B9D; }
        .lp-nav-cta { background: #FF6B9D; color: #fff !important; padding: .45rem 1.25rem; border-radius: 50px; transition: background .2s; }
        .lp-nav-cta:hover { background: #e85a8a; }

        /* HERO */
        .lp-hero { padding: 5rem 2rem 4rem; text-align: center; position: relative; overflow: hidden; }
        .lp-blob1 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: #FFD6E7; opacity: .35; top: -120px; left: -80px; }
        .lp-blob2 { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: #FFF3D6; opacity: .5; top: 50px; right: -80px; }
        .lp-blob3 { position: absolute; width: 220px; height: 220px; border-radius: 50%; background: #D4F5F3; opacity: .4; bottom: -40px; left: 35%; }
        .lp-hero-content { position: relative; z-index: 1; }
        .lp-badge { display: inline-block; background: #FFF0F6; color: #FF6B9D; border: 2px solid #FFD6E7; border-radius: 50px; padding: .35rem 1.1rem; font-size: .8rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: .05em; }
        .lp-hero-title { font-size: clamp(2.4rem, 7vw, 4.5rem); font-weight: 900; line-height: 1.1; margin-bottom: 1rem; }
        .lp-hero-title .pink { color: #FF6B9D; }
        .lp-hero-title .orange { color: #FF9B5E; }
        .lp-hero-sub { font-size: 1rem; color: #888; font-weight: 600; line-height: 1.9; max-width: 420px; margin: 0 auto 2.5rem; font-family: 'Noto Sans JP', sans-serif; }
        .lp-hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem; }
        .lp-btn-main { display: inline-block; background: #FF6B9D; color: #fff; padding: 1rem 2.5rem; border-radius: 50px; font-size: 1rem; font-weight: 800; text-decoration: none; box-shadow: 0 4px 0 #d94f83; transition: transform .15s, box-shadow .15s; }
        .lp-btn-main:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #d94f83; }
        .lp-btn-sub { display: inline-block; background: #fff; color: #FF6B9D; padding: 1rem 2.5rem; border-radius: 50px; font-size: 1rem; font-weight: 800; text-decoration: none; border: 2px solid #FFD6E7; transition: all .2s; }
        .lp-btn-sub:hover { background: #FFF0F6; border-color: #FF6B9D; }
        .lp-hero-note { font-size: .78rem; color: #aaa; font-weight: 600; }
        .lp-chars { display: flex; justify-content: center; gap: 1.25rem; margin-top: 3rem; flex-wrap: wrap; }
        .lp-char { background: #fff; border: 2px solid #FFD6E7; border-radius: 20px; padding: 1.25rem 1rem; text-align: center; width: 130px; }
        .lp-char-icon { font-size: 2rem; margin-bottom: .4rem; }
        .lp-char-name { font-size: .78rem; font-weight: 800; color: #2D2D2D; font-family: 'Noto Sans JP', sans-serif; }
        .lp-char-desc { font-size: .68rem; color: #aaa; margin-top: .15rem; font-family: 'Noto Sans JP', sans-serif; }

        /* SECTIONS */
        .lp-section { padding: 4.5rem 2rem; }
        .lp-section-inner { max-width: 900px; margin: 0 auto; text-align: center; }
        .lp-tag { display: inline-block; border-radius: 8px; padding: .25rem .8rem; font-size: .72rem; font-weight: 800; letter-spacing: .05em; margin-bottom: 1rem; }
        .lp-tag-yellow { background: #FFD93D; color: #7a5a00; }
        .lp-tag-purple { background: #EDE9FE; color: #5b21b6; }
        .lp-tag-mint { background: #D4F5F3; color: #0a6b66; }
        .lp-section-title { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 900; margin-bottom: .5rem; line-height: 1.2; }

        /* PAIN */
        .lp-pain-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1rem; margin-top: 2rem; }
        .lp-pain-card { border: 2px solid #FFD6E7; border-radius: 16px; padding: 1.25rem; background: #FFF0F6; text-align: left; }
        .lp-pain-card-icon { font-size: 1.8rem; margin-bottom: .5rem; }
        .lp-pain-card strong { display: block; font-size: .88rem; font-weight: 800; color: #2D2D2D; margin-bottom: .3rem; font-family: 'Noto Sans JP', sans-serif; }
        .lp-pain-card p { font-size: .8rem; color: #888; line-height: 1.7; font-family: 'Noto Sans JP', sans-serif; }

        /* STEPS */
        .lp-steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
        .lp-step { background: #fff; border: 2px solid #E9E9FF; border-radius: 20px; padding: 1.5rem 1.25rem; text-align: center; position: relative; }
        .lp-step-num { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #A78BFA; color: #fff; width: 28px; height: 28px; border-radius: 50%; font-size: .8rem; font-weight: 900; display: flex; align-items: center; justify-content: center; }
        .lp-step-icon { font-size: 2rem; margin: 1rem 0 .75rem; }
        .lp-step h3 { font-size: .9rem; font-weight: 800; margin-bottom: .3rem; font-family: 'Noto Sans JP', sans-serif; }
        .lp-step p { font-size: .78rem; color: #888; line-height: 1.7; font-family: 'Noto Sans JP', sans-serif; }

        /* OUTPUT */
        .lp-output-card { background: #fff; border: 2px solid #D4F5F3; border-radius: 20px; overflow: hidden; max-width: 400px; margin: 2rem auto 0; }
        .lp-output-header { background: #D4F5F3; padding: .75rem 1.25rem; display: flex; gap: .5rem; align-items: center; }
        .lp-plat { background: #4ECDC4; color: #fff; font-size: .68rem; font-weight: 800; padding: .2rem .6rem; border-radius: 50px; }
        .lp-plat-dim { background: #ccc; color: #fff; font-size: .68rem; font-weight: 800; padding: .2rem .6rem; border-radius: 50px; }
        .lp-output-body { padding: 1.25rem; }
        .lp-output-body p { font-size: .83rem; line-height: 1.9; color: #2D2D2D; font-family: 'Noto Sans JP', sans-serif; }
        .lp-hashtags { margin-top: .75rem; color: #4ECDC4; font-size: .78rem; font-weight: 700; line-height: 1.9; }

        /* PRICING */
        .lp-pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-top: 2rem; }
        .lp-plan { background: #fff; border: 2px solid #FFD6E7; border-radius: 20px; padding: 1.75rem 1.5rem; position: relative; }
        .lp-plan-featured { background: #FFF0F6; border-color: #FF6B9D; }
        .lp-plan-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #FF6B9D; color: #fff; font-size: .68rem; font-weight: 800; padding: .25rem .9rem; border-radius: 50px; white-space: nowrap; }
        .lp-plan-name { font-size: .85rem; font-weight: 800; color: #888; margin-bottom: .25rem; }
        .lp-plan-price { font-size: 2.6rem; font-weight: 900; color: #2D2D2D; line-height: 1; margin-bottom: .1rem; }
        .lp-plan-price sup { font-size: 1.1rem; vertical-align: top; margin-top: .4rem; }
        .lp-plan-price sub { font-size: .9rem; font-weight: 600; color: #888; }
        .lp-plan-note { font-size: .72rem; color: #aaa; font-weight: 600; margin-bottom: 1.25rem; }
        .lp-plan-features { list-style: none; margin-bottom: 1.25rem; padding: 0; }
        .lp-plan-features li { font-size: .82rem; color: #2D2D2D; font-weight: 600; padding: .35rem 0; border-bottom: 1px dashed #FFD6E7; display: flex; align-items: center; gap: .5rem; font-family: 'Noto Sans JP', sans-serif; }
        .lp-plan-features li::before { content: '✓'; color: #FF6B9D; font-weight: 900; }
        .lp-plan-btn { width: 100%; padding: .75rem; border-radius: 50px; font-size: .85rem; font-weight: 800; cursor: pointer; border: none; font-family: 'Nunito', sans-serif; }
        .lp-plan-btn-fill { background: #FF6B9D; color: #fff; }
        .lp-plan-btn-outline { background: transparent; color: #FF6B9D; border: 2px solid #FFD6E7; }

        /* CTA */
        .lp-cta { background: #FF6B9D; padding: 5rem 2rem; text-align: center; position: relative; overflow: hidden; }
        .lp-cta-blob1 { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,.1); top: -100px; right: -50px; }
        .lp-cta-blob2 { position: absolute; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,.08); bottom: -50px; left: 10%; }
        .lp-cta h2 { font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 900; color: #fff; margin-bottom: .75rem; position: relative; z-index: 1; }
        .lp-cta p { color: rgba(255,255,255,.85); font-size: .95rem; font-weight: 600; margin-bottom: 2rem; position: relative; z-index: 1; font-family: 'Noto Sans JP', sans-serif; }
        .lp-btn-white { display: inline-block; background: #fff; color: #FF6B9D; padding: 1rem 2.5rem; border-radius: 50px; font-size: 1rem; font-weight: 900; text-decoration: none; box-shadow: 0 4px 0 rgba(0,0,0,.15); transition: transform .2s; position: relative; z-index: 1; }
        .lp-btn-white:hover { transform: translateY(-2px); }

        /* FOOTER */
        .lp-footer { background: #fff; border-top: 2px solid #FFD6E7; padding: 1.5rem 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .lp-footer-logo { font-size: 1.1rem; font-weight: 900; color: #FF6B9D; }
        .lp-footer p { font-size: .75rem; color: #aaa; font-weight: 600; }

        @media (max-width: 640px) {
          .lp-nav { padding: .9rem 1.25rem; }
          .lp-hero { padding: 4rem 1.25rem 3rem; }
          .lp-section { padding: 3rem 1.25rem; }
          .lp-footer { padding: 1.5rem 1.25rem; }
        }
      `}</style>

      <div className="lp-body">
        {/* NAV */}
        <nav className="lp-nav">
          <Link href="/" className="lp-logo">Sna<span>Pick</span> 📸</Link>
          <div className="lp-nav-links">
            <a href="#how">使い方</a>
            <a href="#pricing">料金</a>
            <Link href="/sign-up" className="lp-nav-cta">無料で始める →</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-blob1" />
          <div className="lp-blob2" />
          <div className="lp-blob3" />
          <div className="lp-hero-content">
            <div className="lp-badge">✨ 飲食店オーナーさんへ</div>
            <h1 className="lp-hero-title">
              写真1枚で<br />
              <span className="pink">SNS投稿文</span>が<br />
              <span className="orange">できあがり！</span>
            </h1>
            <p className="lp-hero-sub lp-jp">
              料理写真をアップするだけ。<br />
              Instagram・X・リール用の文章と<br />
              ハッシュタグをAIが自動で作ります。
            </p>
            <div className="lp-hero-btns">
              <Link href="/sign-up" className="lp-btn-main">無料で始める 🚀</Link>
              <a href="#how" className="lp-btn-sub">使い方を見る</a>
            </div>
            <p className="lp-hero-note">メールアドレスだけで登録できます</p>
            <div className="lp-chars">
              {[
                { icon: '🍜', name: 'ラーメン店', desc: '麺の魅力を伝えたい' },
                { icon: '☕', name: 'カフェ', desc: 'おしゃれに発信したい' },
                { icon: '🍰', name: 'スイーツ店', desc: 'かわいく見せたい' },
                { icon: '🍱', name: 'テイクアウト', desc: '手軽に告知したい' },
              ].map((c) => (
                <div className="lp-char" key={c.name}>
                  <div className="lp-char-icon">{c.icon}</div>
                  <div className="lp-char-name">{c.name}</div>
                  <div className="lp-char-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAIN */}
        <section className="lp-section" style={{ background: '#fff' }}>
          <div className="lp-section-inner">
            <div className="lp-tag lp-tag-yellow">😩 こんなお悩みありませんか？</div>
            <h2 className="lp-section-title">SNS投稿、<span style={{ color: '#FF6B9D' }}>大変じゃないですか？</span></h2>
            <div className="lp-pain-grid">
              {[
                { icon: '😓', title: '何を書けばいいか思い浮かばない', desc: '料理の写真はあるのに、毎回文章で詰まってしまう' },
                { icon: '⏰', title: '仕込みや接客で時間がない', desc: 'SNSに時間をかける余裕がどこにもない' },
                { icon: '🤔', title: 'ハッシュタグが難しい', desc: '何をつければ伸びるのか全然わからない' },
                { icon: '📱', title: 'プラットフォームごとの書き直しが面倒', desc: 'プラットフォームごとに雰囲気が違って二度手間になる' },
              ].map((p) => (
                <div className="lp-pain-card" key={p.title}>
                  <div className="lp-pain-card-icon">{p.icon}</div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="lp-section" id="how" style={{ background: '#EDE9FE' }}>
          <div className="lp-section-inner">
            <div className="lp-tag lp-tag-purple">✨ 使い方</div>
            <h2 className="lp-section-title">たった<span style={{ color: '#A78BFA' }}> 3ステップ</span>でできる！</h2>
            <div className="lp-steps-grid">
              {[
                { num: 1, icon: '📸', title: '写真をアップ', desc: '料理写真を1枚選ぶだけ。AIが画像を読み取ります' },
                { num: 2, icon: '📝', title: '情報をサクッと入力', desc: '店名・メニュー・価格など簡単なフォームに記入' },
                { num: 3, icon: '🎉', title: '投稿文がすぐ完成！', desc: 'プラットフォームごとの文章＋ハッシュタグが自動生成' },
                { num: 4, icon: '📋', title: 'コピーして投稿するだけ', desc: 'ワンクリックでコピー。あとは貼り付けるだけ！' },
              ].map((s) => (
                <div className="lp-step" key={s.num}>
                  <div className="lp-step-num">{s.num}</div>
                  <div className="lp-step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="lp-output-card">
              <div className="lp-output-header">
                <span className="lp-plat">Instagram</span>
<span className="lp-plat-dim">Reels</span>
<span className="lp-plat-dim">X</span>
<span className="lp-plat-dim">TikTok</span>
              </div>
              <div className="lp-output-body">
                <p>🌸 春限定の桜エスプレッソラテ、登場！<br />国産桜シロップと濃厚エスプレッソが絶妙にマッチ。<br />今しか飲めない一杯です🌸 テイクアウト対応・数量限定。<br />📍渋谷 ／ 月〜土 9:00–19:00</p>
                <div className="lp-hashtags">
                  #カフェ巡り #東京カフェ #渋谷カフェ<br />
                  #桜ラテ #季節限定 #コーヒー好きと繋がりたい
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="lp-section" id="pricing">
          <div className="lp-section-inner">
            <div className="lp-tag lp-tag-mint">💰 料金プラン</div>
            <h2 className="lp-section-title">シンプルで<span style={{ color: '#4ECDC4' }}>わかりやすい</span>料金</h2>
            <p className="lp-jp" style={{ color: '#888', fontSize: '.88rem', fontWeight: 600, marginTop: '.5rem' }}>まず無料で試してみてください！</p>
            <div className="lp-pricing-grid">
              <div className="lp-plan">
                <div className="lp-plan-name">Free</div>
                <div className="lp-plan-price">¥<span>0</span></div>
                <div className="lp-plan-note">ずっと無料</div>
                <ul className="lp-plan-features">
                  <li>月10回まで生成</li>
                  <li>テキストのみ（画像解析なし）</li>
                  <li>全プラットフォーム対応</li>
                </ul>
                <Link href="/sign-up" className="lp-plan-btn lp-plan-btn-outline" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  無料で始める
                </Link>
              </div>
              <div className="lp-plan lp-plan-featured">
                <div className="lp-plan-badge">🔥 人気No.1</div>
                <div className="lp-plan-name">Light</div>
                <div className="lp-plan-price"><sup>¥</sup>980<sub>/月</sub></div>
                <div className="lp-plan-note">Coming Soon</div>
                <ul className="lp-plan-features">
                  <li>月30回まで生成</li>
                  <li>画像解析あり</li>
                  <li>履歴保存（30件）</li>
                  <li>優先サポート</li>
                </ul>
                <button className="lp-plan-btn lp-plan-btn-fill">近日公開！</button>
              </div>
              <div className="lp-plan">
                <div className="lp-plan-name">Pro</div>
                <div className="lp-plan-price"><sup>¥</sup>1,980<sub>/月</sub></div>
                <div className="lp-plan-note">Coming Soon</div>
                <ul className="lp-plan-features">
                  <li>月100回まで生成</li>
                  <li>画像解析あり</li>
                  <li>履歴保存 無制限</li>
                  <li>多店舗管理（近日）</li>
                </ul>
                <button className="lp-plan-btn lp-plan-btn-outline">近日公開！</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lp-cta">
          <div className="lp-cta-blob1" />
          <div className="lp-cta-blob2" />
          <h2>今日から投稿が楽になる！🎉</h2>
          <p className="lp-jp">登録30秒。まず無料で試してみてください。</p>
          <Link href="/sign-up" className="lp-btn-white">無料で始める →</Link>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <div className="lp-footer-logo">SnaPick 📸</div>
          <p>© 2026 TechnoManagementService, Inc. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}