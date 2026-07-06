---
name: create-page
description: CREAKE（クレーク）サイトの下層ページ（サービス詳細/成果事例一覧/ニュース一覧/ブログ一覧/お問い合わせ/会社概要 等）を新規作成する手順。Figmaフレーム特定→画像書き出し→静的HTML→SCSS→ビルド検証までの流れと、共通の決まりごとをまとめる。下層ページを作る・修正するときに参照する。
---

# 下層ページ作成手順

汎用規約は `CLAUDE.md`、案件固有の値（カラー・会社情報・ナビ・画像）は `project-info` スキルを参照。

このプロジェクトは **静的HTML + Gulp + SCSS**（WordPress/PHPではない）。下層ページは `src/{name}.html` を作る。

## 現状

- **TOP（index.html）＋ 私たちについて（about.html）＋ サービスInstagram制作代行（service.html）＋ 成果事例一覧（works.html）＋ ニュース一覧（news.html）＋ ニュース詳細（news-single.html）＋ ブログ一覧（blog.html）＋ ブログ詳細（blog-single.html）＋ お問い合わせ（contact.html）＋ サンクス（thanks.html）＋ プライバシーポリシー（privacy.html）実装済み（2026-07-01）**。他（YouTube制作代行/MEO/SEO）は未提供。
- ページヘッダー `l-pagehead` は3系統：デフォルト（暗い写真＋overlay＋白タイトル）/`--navy`（画像なし紺）/`--light`（明るい写真＋`__ttl--dark`濃色タイトル）。
- 下層共通の `l-pagehead`（ヒーロー）・`l-breadcrumb` は `layout/_sub.scss` に定義済み。新ページはこれを流用する。
- ナビの想定リンク：私たちについて `#about`（または `about.html`）/ サービス `#service` / 成果事例 `#works`（一覧 `works.html`）/ ニュース `#news`（一覧 `news.html`）/ ブログ `#blog`（一覧 `blog.html`）/ お問い合わせ `contact.html` / 無料資料請求 `download.html` / プライバシーポリシー `privacy.html`。
- 下層デザインが提供されたら本手順で作成する。

## 手順

### Step 1. フレーム特定
Figma Desktop の MCP（`mcp__figma-desktop__get_metadata` / `get_screenshot`）で対象フレームを確認。
ファイルキーは `PBIROzcmf8MIxn8gu9HUJi`。

### Step 2. ノード構造・テキスト・色を抽出
`get_design_context` でコード＋色＋スクショ、`get_metadata` で構造を取得。
- TEXT の文字はそのまま本文として**忠実に転記**。
- SOLID背景は CSS の色で再現（画像化しない）。IMAGE fill のみ書き出す。
- 出力が大きすぎてファイル保存になった場合は python で `const img` 行・`data-name`・テキスト行だけ抽出して読む。

### Step 3. 画像の書き出し
- **REST `/v1/images` は現在403で使えない**。Figma Desktop の localhost サーバー経由でDLする。
- `get_design_context` を対象セクションで叩くと `localhost:3845/assets/{hash}.{ext}` が warm になる（同一セッション中）。
- **必ず拡張子付き**（`{hash}.png` / `{hash}.svg`）でDL。拡張子なしは404。
- Pillow で `WEBP quality=85`（透過は RGBA quality=90）に変換して `src/assets/img/pc/`（SP専用画像は `sp/`）へ保存。4096px等の巨大アイコンは適宜リサイズ。
- **大きな帯状の背景は CSS `background` / SOLID色**で実装。
- 命名はセクション/用途がわかる名前＋ページ接頭辞（例：`works-fv.webp`）。

### Step 4. HTMLテンプレート作成
`src/{name}.html` を作る。
- **ヘッダー・ドロワー・フッターは `src/index.html` からコピー**（共通chrome）。`<title>` はページ名。h1 はヘッダーロゴ。
- BEM・`l-`/`c-`/`u-` プレフィックス、`text`→`tx`、横並びラッパーは `__fx`、繰り返しは `ul`/`li`。
- フォント読込・css link は index.html の `<head>` をそのまま（Noto Sans JP / Overpass）。

### Step 5. SCSS 作成
- **下層ページのスタイルは新規 `layout/_{name}.scss` に書き**、`layout/_index.scss` に `@use "{name}";` を追加（TOPセクションは `_top.scss`）。小規模な下層共通は `_sub.scss` を作ってまとめてもよい。
- **ブロック名（`l-xxx`）はTOP・他下層と衝突させない**。使用済み: TOP=`l-header/l-drawer/l-footer/l-fv/l-cta/l-intro/l-reason/l-works/l-about/l-news/l-blog`、下層共通(`_sub.scss`)=`l-pagehead/l-breadcrumb`、私たちについて(`_about.scss`)=`l-about__*`、サービス(`_service.scss`)=`l-serv-*`/`c-serv-ttl`/`l-serv-ic`、成果事例一覧(`_works.scss`)=`l-works-page`/`l-works-grid`/`l-works-pager`（カードはTOPの`l-works__*`流用）、ニュース一覧(`_newslist.scss`)=`l-newslist`（行はTOPの`l-news__*`、ページャは`l-works-pager`流用）、ニュース詳細(`_newslist.scss`)=`l-news-single`、ブログ一覧(`_blog.scss`)=`l-bloglist`、ブログ詳細(`_blog.scss`)=`l-blogsingle`/`l-blogside`、お問い合わせ/サンクス/プライバシー(`_page.scss`)=`l-contact`/`l-thanks`/`l-privacy`。
- 下層ヒーローは `l-pagehead`（画像＋overlay＋タイトル）を流用（画像だけ差し替え）。PC縦CTAは `l-fv__side`、SP CTAバーは `l-cta` を流用。
- 共通パーツは `component/` の既存 `c-btn`（CTAボタン460×82）/ `c-ttl`・`c-subttl`（見出し）を流用できるか先に検討する。
- 規約厳守：**ネスト禁止**（疑似要素・疑似クラスのみ `&` 可）、寸法は vw ミックスイン（生px禁止）、`position:relative` には `z-index:1`、`picture/img` に直接指定しない、`font()`/`sp-font()` を使う。
- SP は `mq(sp)` 内で `sp-*` ミックスイン（PCスケールと混在させない）。SPデザインが無い場合は 375基準で妥当な単カラムに組む。
- **絶対配置のテキストはSPで崩れやすい**。カード等はできるだけ padding ベースのフロー（`__content` ラッパー等）で組み、装飾（タブ・背景ボックス）のみ absolute にする。

### Step 6. ビルド検証
```bash
npx gulp build
```
- 出力 `public/` を確認。SCSSコンパイルエラーが無いこと（deprecation warning は無視可）。
- ヘッドレス Edge で PC(1440)/SP を `--screenshot` し Figma と目視比較。**SPは `--window-size=390〜480以上`**（実描画幅470の見切れ対策）。

## 確立済みの共通コンポーネント
- `c-btn`：CTAボタン（460×82・テキスト24px＋`arw.svg`）。白背景は `$gray`、グレー背景は `c-btn--white`。
- `c-ttl`：セクション見出し（32px bold・中央）。`c-subttl` / `c-subttl--red`（赤ラベル）。
- ヘッダー（ネイビー120px）・ドロワー・フッター（ネイビー）は全ページ共通chrome。

## 作業後
`CLAUDE.md`・`project-info`・このスキル・メモリを見直して更新する。作業用の一時ファイル・デバッグ用スクショは削除する。
