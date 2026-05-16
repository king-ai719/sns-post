# PostAI - SNS投稿補助AI

飲食店・個人事業主向けのSNS投稿文AI生成Webアプリ

## 技術スタック

- **フロントエンド**: Next.js 15 / TypeScript / Tailwind CSS
- **認証**: Clerk
- **DB**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o-mini
- **デプロイ**: Cloudflare Pages

---

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <your-repo>
cd sns-post-ai
npm install
```

### 2. 環境変数の設定

```bash
cp .env.local.example .env.local
# .env.local を編集して各サービスのキーを設定
```

### 3. Supabase セットアップ

1. [Supabase](https://supabase.com) でプロジェクト作成
2. Studio > SQL Editor で `supabase-setup.sql` を実行
3. Studio > Storage で `photos` バケットを作成（Public ON）
4. `.env.local` に URL と ANON KEY を設定

### 4. Clerk セットアップ

1. [Clerk](https://clerk.com) でアプリ作成
2. Social Login（Google等）を設定
3. `.env.local` に Publishable Key と Secret Key を設定

### 5. OpenAI セットアップ

1. [OpenAI Platform](https://platform.openai.com) でAPIキー取得
2. `.env.local` に設定

### 6. 開発サーバー起動

```bash
npm run dev
# http://localhost:3000
```

---

## Cloudflare Pages デプロイ

```bash
# ビルドコマンド: npm run build
# 出力ディレクトリ: .next
# Node.js バージョン: 20.x
```

環境変数は Cloudflare Dashboard > Pages > Settings > Environment Variables で設定。

---

## コスト最適化

| 施策 | 効果 |
|------|------|
| GPT-4o-mini 使用 | GPT-4oの約1/15のコスト |
| max_tokens: 800 | トークン上限でコスト制御 |
| 1日10回/ユーザー制限 | 無制限API呼び出しを防止 |
| JSON mode強制 | 無駄な説明文を省く |
| システムプロンプト固定化 | OpenAIキャッシュ効果 |

---

## 開発ロードマップ

- [x] MVP（認証・フォーム・AI生成・コピー・履歴）
- [ ] 画像解析による投稿文改善
- [ ] テンプレート保存
- [ ] 予約投稿連携
- [ ] Google口コミ返信AI
- [ ] 多店舗管理
