-- =============================================
-- SNS投稿補助AI - Supabase初期セットアップSQL
-- Supabase Studio > SQL Editor で実行してください
-- =============================================

-- 1. profiles テーブル
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id   TEXT UNIQUE NOT NULL,
  store_name TEXT,
  store_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. generations テーブル
CREATE TABLE IF NOT EXISTS generations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  shop_name       TEXT NOT NULL,
  menu_name       TEXT NOT NULL,
  price           INTEGER,
  description     TEXT,
  mood            TEXT,
  target          TEXT,
  image_url       TEXT,
  instagram_post  TEXT,
  x_post          TEXT,
  hashtags        TEXT,        -- JSON文字列 ["tag1","tag2",...]
  reels_caption   TEXT,
  tokens_used     INTEGER,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. rate_limits テーブル
CREATE TABLE IF NOT EXISTS rate_limits (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date    DATE NOT NULL DEFAULT CURRENT_DATE,
  count   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, date)
);

-- 4. インデックス
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_date ON rate_limits(user_id, date);

-- 5. RLS 有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Storageバケット設定（Studio > Storage で実行）
-- =============================================
-- 1. "photos" バケットを作成（Public: ON）
-- 2. ポリシーで認証ユーザーのみアップロード許可:
--    INSERT: (auth.role() = 'authenticated')
--    SELECT: true（公開読み取り）
