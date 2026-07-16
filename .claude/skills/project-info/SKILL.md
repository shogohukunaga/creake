---
name: project-info
description: CREAKE（クレーク／住宅業界専門の集客・ブランディング会社）オフィシャルサイトの案件固有情報。Figmaファイルキー・node-id・画像一覧・TOPページ各セクションの構造・会社情報・カラー/フォントの具体値をまとめる。ページ作成・既存セクションの修正・SCSS実装・Figma画像取得を行う際に参照する。
---

# CREAKE 案件情報

このスキルは CREAKE（クレーク）サイトの**案件固有情報**をまとめたもの。
汎用的なコーディング規約・SCSS設計・Figma取得手順は `CLAUDE.md` を参照。

住宅業界（工務店）専門の Instagram 集客・ブランディング／リール運用・制作代行会社。
キャッチコピーは「住宅業界専門の 集客とブランディングを叶える 頼れるパートナーへ」。
ネイビー（`#1c234c`）× 淡い水色（`#e6f6fb`）× 赤/青のCTAで、清潔感のあるビジネスデザイン。ゴシック体（Yu Gothic）ベース。

---

## Figma情報

- **ファイルURL**: https://www.figma.com/design/PBIROzcmf8MIxn8gu9HUJi/
- **ファイルキー**: `PBIROzcmf8MIxn8gu9HUJi`
- **APIトークン**: `.claude/settings.local.json` の `FIGMA_API_KEY`（※2026-07時点で REST `/v1/*` が 403。画像取得は Figma Desktop MCP 経由で行う）
- **取得方法**: Figma Desktop の MCP（`mcp__figma-desktop__*`）を使う。

### フレーム構成（2026-07-01 時点）

| 種別 | フレーム名 | node-id | サイズ | 状態 |
|---|---|---|---|---|
| PC | PC版TOPページ | `137:1034` | 1440 × 4477 | 実装済（index.html） |
| SP | SP版TOPページ | `1:284` | 390 × 6562 | 実装済 |
| — | TOPページ動作指示（ルール） | `2003:815` | — | 反映済（`2003:814` は誤り） |
| PC | PC版私たちについて | `137:999` | 1440 × 3070 | 実装済（about.html） |
| SP | SP版私たちについて | `41:923` | 390 × 3193 | 実装済 |
| PC | PC版サービス Instagram制作代行 | `137:692` | 1440 × 8682 | 実装済（service.html） |
| SP | SP版サービス | `67:610` | — | 実装済 |
| PC | PC版成果事例一覧 | `137:620` | 1440 × 2305 | 実装済（works.html） |
| SP | SP版成果事例一覧 | `67:609` | — | 実装済 |
| PC | PC版News一覧 | `137:550` | 1440 × 2002 | 実装済（news.html） |
| SP | SP版News一覧 | `81:359` | — | 実装済 |
| PC | PC版News詳細 | `137:537` | 1440 × 2579 | 実装済（news-single.html） |
| SP | SP版News詳細 | `102:381` | — | 実装済 |
| PC | PC版ブログ一覧 | `137:457` | 1440 × 2561 | 実装済（blog.html） |
| SP | SP版ブログ詳細 | `109:324` | 390 × 4402 | 実装済（blog-single.html） |
| PC | PC版お問い合わせフォーム | `137:327` | 1440 × 3034 | 実装済（contact.html） |
| PC | PC版サンクスページ | `137:322` | 1440 × 1024 | 実装済（thanks.html） |
| PC | PC版プライバシーポリシー | `137:311` | 1440 × 5162 | 実装済（privacy.html） |

下層ページ：**私たちについて / サービス / 成果事例一覧 / ニュース一覧 / ニュース詳細 / ブログ一覧 / ブログ詳細 / お問い合わせ（contact.html）/ サンクス（thanks.html）/ プライバシーポリシー（privacy.html）実装済**。他（YouTube制作代行/MEO/SEO）は未提供。
※お問い合わせ/資料請求/プライバシーの各リンクは全ページで `contact.html` / `privacy.html` に接続済み。
※ブログ一覧はPC(`137:457`)、ブログ詳細はSP(`109:324`)を主参照に実装（他方ブレイクポイントは同デザインから判断してレスポンシブ化）。ブログ一覧SPの専用フレームは未確認。

### 修正版デザイン（コピーファイル）

修正版デザインは**別ファイル（コピー）**に追加される：
- **ファイルキー**: `G9f78iybgAjR1x0Lezr7o5`（「2026.HP　CREAKE様 (コピー)」）
- PC版ブログ詳細 修正版 `174:821`（1440×3632）→ **実装済（2026-07-15）**。監修者/執筆者カード追加・目次グレー化（#f3f3f3）・2カラム幅変更（本文639/サイドバー250/gap85）・見出しバー#282136化。サイドバー区切り線 2px #d9d9d9。アバターは `blog-author01/02.webp`、バッジ帯は `blog-author-badge.svg`（#1c234c）。
- SP版TOP Reasonカード 修正版 `4:279`「理由①」（350×328・単体フレーム）→ **実装済（2026-07-15）**。水色ボックス(34,27)282×269・本文はx53〜300（16px Bold lh26）・タイトル中央揃え18px lh28・リボン63×79でReason/01はリボン内センター・カード下パディング62。コピー元と node-id は共通**ではない**（原本の `1:284` 等はコピーでは参照不可）。
- SP版FV指示 `40:919`「指示ファーストビュー」→ **実装済（2026-07-15）**。①FV写真はSPで84×150・8px間隔・右→左無限マーキー（`l-fv__sprow-track` 2セット＋`fvLeft` keyframes、参考: genji-group.com）②`l-cta`（無料資料請求/お問い合わせ）は全ページで画面最下部に固定（`position:fixed; z-index:floating`）・アイコン付き（`cta-book.webp`＝fv-ico-docの透過トリミング版 / `fv-ico-mail.webp`）。フッターSPは固定バー分の逃げ余白 `sp-padding-bottom(92)`。
- SP版私たちについて 修正版 `41:923`（390×3193）→ **実装済（2026-07-15）**。SPの崩れ修正：リード/セクションタイトルを18px化（20pxだと折返し崩れ）・本文16px medium・Vision/Misson/Futureバッジはグレー枠左上に密着＋影（`.l-about__body` sp-padding-top 0、`.l-about__label` box-shadow 0 4px 4px rgba(0,0,0,.2)）・画像はSPで `top:0` にしてPCの-48オフセットを打消し全幅で下部に敷く・代表メッセージバッジはSPで `transform:none; border:none` ＋影でカード左上密着、本文はバッジ左端に揃え（padding-left 0）。名前16px/代表14px。
- SP用サービスページ `67:610`（390×10233）→ **SP差分を反映済（2026-07-15）**。①`c-serv-ttl` はSPでコンパクト箱（18px・padding 4/16・sp-bd(8)・`max-width:calc(100% - min(60/3.75*1vw))`）②解決セクション：`__head` 20px・ラベルはSPで `left:0`（PCの56オフセット打消し）＋白背景16px・ボックス16px/lh27・リスト幅310 ③おすすめカードはSPで縦積み（アイコン上中央80×78・テキスト下中央16px）④料金：`__term--none`（高さ揃えダミー）はSP非表示・「▼最も選ばれるプラン」はSPではスタンダード直前（HTML内 `l-serv-price__most--sp`、PC用のベース要素はSPで非表示）。PCは全て変更なし。
- SP用サービスページ 追補（2026-07-15）：⑤FV背景はSPで白の対角三角形 `sp/serv-fv-shape-sp.svg`（67:914。`l-serv-fv__shape` を picture でPC/SP出し分け、pictureは全面背景の例外ネストで100%×100%）⑥悩みセクションの吹き出しはSP専用ベクター `sp/serv-worry-bubble-sp.svg`／`serv-worry-bubble2-sp.svg`（67:908/67:902。2つ目は左右反転済み・しっぽ右下）・本文16px lh20・人物は1人目73×77／2人目87×91 ⑦解決ラベルの背景はPC同様の半透明グレー（#fffにしない。67:890=rgba(217,217,217,0.08)）。
- SP版フッター `88:268`（390×750、実体は `64:214`）→ **実装済（2026-07-15、全ページ共通）**。ナビを「ホーム/私たちについて/Instagram制作代行/YouTube制作代行(#)/MEO対策(#)/SEO対策(#)/成果事例/ニュース/ブログ/プライバシーポリシー」の10項目に変更（お問い合わせ・無料資料請求はナビから削除。CTAは固定バーが担う）。SP値：ロゴ36px＋CREAKE 22px・住所16px bold・ナビ18px bold gap20・区切り線300px・コピーライト16px・inner幅304。thanks.html はフッターナビなしのため対象外。
- SP版menu（ドロワー展開版）`76:167`（390×1051）→ **実装済（2026-07-15、全8ページのドロワー共通）**。①ドロワーを**フル幅ネイビー**化（`width:100%`、`top:sp80`＝ヘッダー下から表示・`height:calc(100% - 80/3.75vw)`）。ヘッダー(z20)のロゴ＋×は残す。オーバーレイもヘッダーを暗くしないよう `top:sp80`。ドロワー上端に `border-top:1px rgba(255,255,255,.3)`（Figma divider）。②ナビ拡張：ホーム/私たちについて/Instagram制作代行＋サブ4項目（・サービス内容→`service.html#service-what`、・制作の流れ→`#service-flow`、・料金プラン→`#service-price`、・よくある質問→`#service-faq`）/YouTube制作代行/MEO対策/SEO対策/成果事例/ニュース/ブログ。サブ項目は `l-drawer__nav-item--sub`（インデント＋16px）。③CTAは `l-cta` 同様のアイコン付き横並びバー（`cta-book.webp`/`fv-ico-mail.webp`）。service.htmlの該当4セクションに `id`（service-what/flow/price/faq）付与済み。JSトグルは既存のまま。
- SP版成果事例一覧ページヘッダー 修正版 `98:255`（フレーム `98:254`「TOP」390×239）→ **実装済（2026-07-16）**。**SPのみ**パンくずを紺ヘッダー内・タイトル上に配置（白14px Bold）。**他下層ページにも横展開**：`_sub.scss` に `.l-breadcrumb--hero`（SPのみ表示・白）／`.l-breadcrumb--hero-light`（news系の明るいヒーロー用に濃色上書き）／`.l-breadcrumb--hero-sp`（about用＝元からヒーロー内にあるパンくずのSP白＋サイズ調整）／`.l-breadcrumb--body`（本文上パンくず＝SP非表示）を追加。適用：works/contact/privacy（紺・白）、news/news-single（写真・白）、about（写真・白）。**PCは全ページ現状維持**（パンくずは従来位置）。blog/blog-single はヒーロー無しのため対象外。about PCのパンくずは元から濃色で写真上に低コントラスト（本改修では未変更）。
- SP版ニュース一覧ページヘッダー 修正版 `98:390`（フレーム内・390×240）→ **実装済（2026-07-16）**。**SPのみ** news系ヒーロー（`--light`）を暗くして白文字化：`.l-pagehead--light` のSPに `background:$main` ＋ `&::after`（`rgba(125,134,151,0.5)` オーバーレイ、about同様の見た目）を追加し、写真85%を暗く見せる。タイトルは `.l-pagehead__ttl--dark` をSPで白に（＝ユーザー編集）。パンくずは `.l-breadcrumb--hero`（白）のまま＝`--hero-light`（濃色）は廃止。`--hero` にSPで `position:relative; z-index:2` を付与しオーバーレイ前面へ。**PCの news/news-single は明るい写真＋濃色タイトルのまま**。news・news-single 両方に適用。
- **ヘッドレスEdge検証の注意**: `--window-size` を小さくしても実レイアウト幅は約488pxにクランプされる（PNGは指定幅で切り出される）。`position:fixed; width:100%` の要素は右が見切れて写るが実装は正常。50/50分割などの検証は `--window-size=700` 等（mq(sp)内の大きめ幅）で行う。

### PC TOP 主要セクション node-id（フレーム `137:1034` 内）

| セクション | node-id | y範囲 |
|---|---|---|
| ヘッダー | `137:1226`（本体 `137:1745`） | 0–120 |
| ファーストビュー | `137:1172` | 0–730 |
| イントロ（工務店専門〜） | `137:1169` | 761–1041 |
| 選ばれる理由（サービス） | `137:1141` | 1073–1709 |
| 成果事例 | `137:1124` | 1709–2297 |
| 私たちについて | `137:1119` | 2297–2679 |
| ニュース | `137:1084` | 2679–3319 |
| ブログ | `137:1036` | 3319–3898 |
| フッター | `137:1035`（本体 `137:1762`） | 3898–4477 |

---

## 会社情報

| 項目 | 値 |
|---|---|
| 社名 | CREAKE（クレーク） |
| 住所 | 東京都中央区日本橋宝町1丁目11番12号　日本橋水野ビル7階 |
| 事業 | 住宅業界（工務店）専門の Instagram 集客・ブランディング／リール運用・制作代行 |
| コピーライト | © 2026 CREAKE. All rights reserved. |

グローバルナビ（ヘッダー／ドロワー／フッター共通）：
**私たちについて `#about` / サービス `#service`(選ばれる理由) / 成果事例 `#works` / ニュース `#news` / ブログ `#blog`**
＋ CTA：**無料資料請求（青）** / **お問い合わせ（赤）**。フッターはこれに **ホーム / プライバシーポリシー** を加えた9項目。

---

## カラー変数（`_variables.scss`）

| 変数 | 色 | 用途 |
|---|---|---|
| `$main` | `#1c234c` | ネイビー。ヘッダー・フッター背景・Reasonタブ |
| `$tx` | `#282136` | テキスト・見出し・枠線 |
| `$link` / `$blue` | `#3aa6ff` | 資料請求ボタン（青） |
| `$base` | `#fff` | ベース（白）。白背景セクション |
| `$red` | `#f30303` | お問い合わせボタン（赤） |
| `$ltblue` | `#e6f6fb` | Reasonカード内側・成果事例バッジ背景 |
| `$statblue` | `#285793` | 成果事例の数字（200% / 1万 / 7.2%） |
| `$gray` | `#ededed` | セクション背景（選ばれる理由/私たちについて/ブログ）・CTAボタン背景 |

**セクション背景は白↔グレーの交互**：FV/イントロ=白 → 選ばれる理由=`$gray` → 成果事例=白 → 私たちについて=`$gray` → ニュース=白 → ブログ=`$gray` → フッター=`$main`。
`c-btn` は白背景セクション上では `$gray`、グレー背景セクション上では白（`c-btn--white`）。

## フォント変数

Figma指定は **Yu Gothic**（Bold/Medium/Regular）主体、CREAKE ロゴのみ **Yu Gothic UI Semibold**。

| 変数 | 値 |
|---|---|
| `$ff-base` | `"Yu Gothic", YuGothic, "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif` |
| `$ff-en` | `"Overpass", "Yu Gothic", YuGothic, sans-serif`（CREAKE ロゴ・Reason・数字） |

Google Fonts 読み込み（`index.html`）:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Overpass:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

---

## 画像一覧（`src/assets/img/pc/`）

WebP quality=85（透過は RGBA quality=90）。SVGはそのまま。
**取得手順**: `get_design_context` で対象セクションを叩くと `localhost:3845/assets/{hash}.{ext}` が warm になる。
**必ず拡張子付き**（`{hash}.png` / `{hash}.svg`）でDLする（拡張子なしは404）。REST `/v1/images` は現在403で使えない。

| ファイル | 内容 |
|---|---|
| `logo.webp` | CREAKEロゴマーク（ティール系の幾何学リーフ。ヘッダー・フッター共通・透過） |
| `fv01`〜`fv05.webp` | FV画像列の写真5点（施工事例。左列↓・右列↑にCSSスクロール） |
| `txt-creake-wide.svg` / `txt-creake.svg` | FV背景の「CREAKE CREAKE」ウォーターマーク（薄いアウトライン文字） |
| `reason-tab.svg` / `reason-tab3.svg` | 選ばれる理由カードの左上ネイビータブ（`#1C234C` の五角形。中身は同一） |
| `case01`〜`case03.webp` | 成果事例のInstagram投稿画像3点（縦長・文字入り） |
| `case-bg.webp` | 成果事例の背景装飾（現状HTML未使用） |
| `phone-frame.webp` | 成果事例のスマホモックアップ枠（透過スクリーン・432×801。`l-works__img::after` で写真の上に重ねる） |
| `blog01`〜`blog04.webp` | ブログ記事サムネイル4点 |
| `arw.svg` / `arw-sm.svg` | play-outline矢印（`c-btn` 用28px / ブログ「詳細はこちら」用12px。fill `#282136`） |
| `fv-ico-mail.webp` / `fv-ico-doc.webp` | FV縦CTAのアイコン（現状は白インラインSVGで代替、webpは未使用） |
| `about-hero.webp` | 私たちについて ヒーロー背景（ノートPC・デスク。overlay `rgba(125,134,151,.5)`＋opacity.85） |
| `about-vision.webp` / `about-misson.webp` / `about-future.webp` | Vision/Misson/Future 行の写真（536×320） |
| `serv-post.webp` | サービスFVの投稿写真（電話モックアップ内） |
| `serv-badge-bg.webp` | FV実績バッジの月桂冠フレーム |
| `serv-icons1〜3.webp` | アイコンスプライトシート（制作代行/おすすめの丸アイコンをCSS background-position で切り出し。`.l-serv-ic--why01〜04/reco1〜5`） |
| `serv-worry.webp` | 悩みセクションの人物3体シート（CSS crop） |
| `serv-fv-shape.svg` | FV左の白い斜めシェイプ |
| `serv-corner-white.svg` / `serv-corner-blue.svg` | セクション境界の山形（▲）用コーナー三角。**次セクションの上端に absolute で重ねる**（solve上端=白コーナー148px / why上端=水色コーナー136px、SPは66px）。旧 `serv-poly5/6.svg` は不使用 |
| `serv-worry-bubble.svg` / `serv-worry-bubble2.svg` | 悩みセクションの楕円吹き出し（しっぽ左下/右下ミラー。`#F4F4F4`） |
| `serv-arrow-bubble.svg` | 解決セクションの白吹き出し矩形 |
| `serv-ig-heart/chat/repeat/send/dots.svg` | 電話モックアップのInstagramアイコン |
| `serv-ig-house.webp` | サービスFVフォンのアカウントアバター（白丸+家アイコン） |
| `serv-ic-reco3.webp` / `serv-ic-reco4.webp` | おすすめ複合アイコン（人物+¥袋 / ビル+パズル。スプライトからPIL合成） |
| `case01〜03.webp` | 成果事例の投稿写真（TOP／成果事例一覧①②③で共用） |
| `works-case04〜07.webp` | 成果事例一覧④〜⑦の投稿写真（⑥は上下2枚を合成） |
| `news-hero.webp` | ニュース一覧/詳細ヒーローの「NEWS」写真（明るい写真・opacity.85） |
| `news-single-img.webp` | ニュース詳細の本文アイキャッチ写真 |
| `blog01〜04.webp` | ブログサムネイル（TOP／ブログ一覧・詳細サイドで共用。一覧5〜10の枠は流用） |
| `blog-single-hero.webp` | ブログ詳細のアイキャッチ写真 |

FV縦CTA・ヘッダー/ドロワー/CTAバーのメール/書類アイコンは**白インラインSVG**で実装（`index.html` 内に直接記述）。

---

## TOPページ HTML / SCSS セクション構成

HTMLは `src/index.html`、SCSSは `layout/_top.scss` に全TOPセクション集約。header/drawer/footer は各専用ファイル。

```
<header class="l-header">     ネイビー120px。h1ロゴ(マーク+CREAKE48px) / 右に無料資料請求(青)+お問い合わせ(赤)ボタン→ナビ5項目。SPはロゴ+ハンバーガー
<div class="p-drawer__background"> + <div class="l-drawer">  SPドロワー（右からネイビーパネル。ナビ+CTA2ボタン）
<main class="over">
  <section class="l-fv">          左920グレー+CREAKEウォーターマーク / 右2列画像スクロール(CSS @keyframes fvUp/fvDown) / キャッチコピー52px / SP用3枚横並び l-fv__sprow
  <div class="l-fv__side">        PC縦型フローティングCTA(青:無料資料請求 / 赤:お問い合わせ。position:fixed)
  <div class="l-cta">            SP用CTAバー（青+赤、FV直下・PC非表示）
  <section class="l-intro">       白。見出し36px + 本文（悩み3行＋解決文）
  <section id="service" class="l-reason">  グレー。選ばれる理由36px + 3カード(白430×500+内側#e6f6fb+ネイビータブ+Reason/番号+タイトル+本文)
  <section id="works" class="l-works">     白。成果事例32px+説明+スマホモックアップ3台(144×267・phone-frame.webp重ね)+右横に#e6f6fbバッジ(数字#285793)+c-btn(l-works__btn)
  <section id="about" class="l-about">     グレー。私たち、クレークについて30px+本文+c-btn--white
  <section id="news" class="l-news">       白。ニュース32px+最新情報(赤)+5行リスト(1200幅・枠#282136・日付|線|カテゴリ|タイトル)+c-btn
  <section id="blog" class="l-blog">        グレー。ブログ32px+4記事(2×2・サムネ212×134+タイトル+線+日付+カテゴリ#282136バッジ+詳細はこちら)+c-btn--white
</main>
<footer class="l-footer">      ネイビー。左:ロゴ+住所 / 右:ナビ9項目 / 下:白線+コピーライト中央
```

### 共通コンポーネント（`component/`）
- **`c-btn`**（`_c-btn.scss`）：CTAボタン（460×82）。テキスト24px bold `$tx` ＋ `arw.svg`。白背景セクションは `$gray`、グレー背景は `c-btn--white`（白）。成果事例/私たちについて/ニュース/ブログで使用。
- **`c-ttl`**（`_c-title.scss`）：セクション見出し（32px bold・中央）。選ばれる理由は `l-reason__ttl` で36pxに上書き。`c-subttl`＝サブ、`c-subttl--red`＝「最新情報」等の赤ラベル。

### TOPページの動作ルール（Figma `2003:815`「TOPのページ動作指示」・順守必須）
※ `2003:814` は誤り。正は `2003:815`（PC版動作指示）。
- **オープニングアニメーション**（PC/SP・ランディング時）：ネイビー全画面 `.l-opening` にロゴ＋CREAKE が出現→約2秒表示→フェードアウトしてFV出現。FVキャッチコピー3行は左→右へスライドイン（`fvCopyIn` 遅延2.9s）。参考: sho-san.co.jp。CSSのみ（毎回再生）。
- **ヘッダー表示制御**：下方向スクロールで隠す・上方向スクロールで表示（`script.js` が `.l-header.is-hide` を付与、`transform: translateY(-100%)`）。参考: webcoco.jp。
- **ヘッダーナビ**：各項目ホバーで下線出現（`::after`）。「サービス」ホバーで**下方にサブメニュー出現**（`.l-header__submenu`＝白90%＋ネイビー枠、Instagram制作代行/YouTube制作代行/MEO対策/SEO対策、区切り線あり、各項目ホバーで下線＋文字ネイビー）。参考: kentem.jp。
- **CTA/ボタンのホバー色変化**：無料資料請求(青)・お問い合わせ(赤)＝濃色化（`#1f8fe6`/`#c60000`）。`c-btn`（成果事例/私たち/ニュース/ブログ）＝`#a9a9a9`。FV縦CTAも同様。
- **FV画像**：PCは縦2列（左↓ `fvDown` / 右↑ `fvUp`）。右サイドの縦CTAは追従（`position:fixed`）。参考: genji-group.com。**SPは3枚横並び静止**（SPデザイン `1:284` 準拠。※`2003:814` の「6枚右→左」は誤りのため不採用）。
- **SP CTAバー** `.l-cta`：無料資料請求＋お問い合わせをFV直下に配置（固定ではない・`1:284` 準拠）。
- **ニュース**：各行 `.l-news__item`（`<a>`）はホバーで背景色変更（`$ltblue`）→クリックでニュース詳細へ。「ニュース一覧はこちら」→一覧ページ。
- **ブログ**：画像＋タイトル＋日付＋「詳細はこちら▷」で記事詳細へ（写真〜日付は `.l-blog__link`）。画像ホバーで拡大（`.l-blog__img img` scale 1.08）。「もっと見る」→一覧ページ。参考: kentem.jp/blog。
- **成果事例/私たちについて**：各ボタンホバーで色変化→クリックで各一覧/私たちについてページへ。
- **リンク遷移先**（下層ページ提供後に実装）：ロゴ・会社名・ホーム→TOP FV先頭 / 私たちについて・成果事例・ニュース・ブログ→各セクション / サービス→Instagram制作代行→サービスページ / YouTube制作代行・MEO対策・SEO対策→**メニュー表示のみ（ページなし）** / 無料資料請求・お問い合わせ→お問い合わせページ / プライバシーポリシー→専用ページ。現状はTOP内アンカー（`#about` 等）で暫定。

### レイアウトの要点
- **FVの画像2列**は Swiper ではなく **CSS `@keyframes`（fvUp/fvDown）** の無限縦スクロール（左列↓・右列↑）。画像は各列3枚×2セットで `translateY(-50%)` ループ。
- **FV縦CTA** `l-fv__side` は `position: fixed`（画面右中央に常時表示）。SPは非表示で、代わりに `l-cta` バー＋ドロワー内CTA。
- **選ばれる理由カード**は `l-reason__content`（padding方式のフロー）でタイトル/本文を配置。タブ・内側ボックスのみ absolute（SPでも崩れない）。
- **ヘッダーは `position: fixed`** で FV 上部（画像列）に重なる（Figma通り。main に padding-top は付けない）。
- ネイビーは `#1c234c`（`$main`）、テキスト濃紺は `#282136`（`$tx`）で**別色**。混同しない。
- ドロワーJSは既存 `script.js`（`.l-drawer__icon` / `.l-drawer` / `.p-drawer__background` / `is-active` / MENU⇔CLOSE切替）を使用。`_swiper.js` は空（Swiper未使用）。

---

## 下層ページ

### 私たちについて（`about.html`）
```
<header class="l-header"> / <div class="l-drawer">   ← index.html と共通（コピー。ナビは index.html#xxx へ）
<main class="over">
  <div class="l-pagehead">        下層共通ヒーロー（`_sub.scss`）。背景画像+overlay+タイトル(h2 64px白)。ヘッダーは重なる（TOP同様）
  <div class="l-fv__side">        PC縦フローティングCTA（TOPと同じclassを流用）
  <div class="l-cta">            SP CTAバー（TOPと同じ）
  <div class="l-about__head">     パンくず(l-breadcrumb) + リード文(l-about__lead 40px bold)
  <section class="l-about__row"> ×3  Vision/Misson/Future。#f4f4f4帯+白ラベル箱+見出し32px+本文20px+写真536×320
  <section class="l-about__msg">  代表メッセージ。白+ネイビー枠ラベル(帯上端に translateY(-50%))＋代表名＋本文
</main>
<footer class="l-footer">        共通
```
- **行レイアウト**：DOM順は `[本文, 画像]`。PCは `flex-direction: row-reverse`（写真左・本文右）、SPは `column`（本文→全幅画像）。
- **下層共通パーツ**（`_sub.scss`）：`l-pagehead`（ヒーロー・高さPC500/SP240）、`l-breadcrumb`。新しい下層ページはこれを流用する。
- ページ固有は `_about.scss`。ヒーロー画像は各ページ差し替え。

### サービス Instagram制作代行（`service.html` / `_service.scss`）
全10セクションの縦長LP。青 `$statblue #285793` × オレンジ `$orange #f58b19` が基調。
FV(電話モックアップ+月桂冠実績バッジ+丸バッジ) → こんなお悩み(人物+吹き出し) → 解決いたします(ラベル+矢印吹き出し) → なぜ制作代行(番号+丸アイコン01-04) → どんなサービス(内容+料金箱) → 制作の流れ(Step01-06+縦線) → こんな会社様におすすめ(丸アイコン5枚) → 料金プラン(3プラン:トライアル#31a2a2/スタンダード#f58b19/プレミアム#a52614) → よくある質問(アコーディオン)。
- 共通の青いタイトル箱 = `.c-serv-ttl`。丸アイコンはスプライトを CSS `background-size/position` %指定で切り出し（解像度非依存）。
- FAQアコーディオンは `script.js` の `.l-serv-faq__q` クリックで `.l-serv-faq__item.is-open` をトグル。
- ※Figma本文の「イエサツ」は旧テンプレの残骸のため「CREAKE」に置換済み。
- **FVフォン**は phone-frame.webp（成果事例と共用）を `::after` で重ね、内側 `l-serv-fv__screen`（224×438）に写真＋すりガラスパネル `rgba(120,120,120,.5)`（アバター/tatemono_/フォローピル/キャプション/アイコン列）。FVボタンは「お申込みはこちら　→」（contact.htmlへ）。バッジに`(税別)`行あり。
- **悩みセクション**は楕円吹き出し（serv-worry-bubble.svg/2.svg）。①スーツ男性（char--1=sprite 50% 22%）②ヘルメット職人（char--2=4% 22%）。PCは横並び（人物 margin-top 85）、SPは吹き出し上・人物下（order:2・-16重なり）。
- **山形の境界**は次セクション上端にコーナーSVGを重ねる方式（`l-serv-solve__polytop`=白148 / `l-serv-why__polytop`=水色136、SP66）。タイトルが山形の帯に食い込むカンプ配置を再現。
- **SPのFV**はカンプ`67:610`準拠：タイトル24px1行→サブ中央→バッジ左(56,180)＋フォン左(42,253,155×283)＋実績3つ縦列右(top205※innerからは103)＋SNS文言下部中央・お申込みボタン非表示。
- おすすめ5枚目は左寄せ（`justify-content: flex-start`）。reco3/4は合成webpアイコン。料金の「◯本パック」は白ピル。
### 成果事例一覧（`works.html` / `_works.scss`）
ネイビー背景ヒーロー（`l-pagehead--navy`＝`rgba(28,35,76,.85)`・画像なし）＋パンくず＋**電話モックアップ7枚の3カラムグリッド**＋ページネーション。
- カードは TOP の `l-works__item`/`__img`/`__badge`（＋数字なしバッジ用 `l-works__badge-cv`）を流用。グリッドは `.l-works-grid`（PC=3列grid / SP=1列）。
- ①②③はTOPと同じ `case01〜03.webp`、④〜⑦は `works-case04〜07.webp`。
- ※`l-works__item` は「スマホ(144×267・`__img::after` に phone-frame.webp 重ね)＋右横バッジ」の flex 横並び（PCはバッジ margin-top(123)、SPは縦中央）。バッジは明示 `width(150)`＋padding 10（幅autoや padding 14 だと「エンゲージメント率」が折れるため）。TOP・一覧共通。

### ニュース一覧（`news.html` / `_newslist.scss`）
明るい写真ヒーロー（`l-pagehead--light`＝白背景・`l-pagehead__ttl--dark`＝濃色タイトル）＋パンくず＋**ニュース10行**＋ページネーション。
- 行は TOP の `l-news__list`/`l-news__item`（日付│線│カテゴリ│タイトル、ホバー背景変化）を流用。ページ余白は `l-newslist`。ページネーションは `l-works-pager` 流用。
- ヒーローのタイトルは写真が明るいため濃色（`#282136`）。ページヘッダーのバリエーション：`--navy`（画像なし紺）/`--light`（明るい写真＋濃色タイトル）/デフォルト（暗い写真＋白タイトル＋overlay）。
- ※デザインの5行目・10行目は「日付/カテゴリー/タイトル」のテンプレ行（プレースホルダー）。忠実に反映しているが実運用では削除/差し替え想定。

### ニュース詳細（`news-single.html` / `_newslist.scss` 内 `l-news-single`）
ニュース一覧と同じ明るい写真ヒーロー（`l-pagehead--light`）＋パンくず＋日付/カテゴリ＋中央寄せタイトル28px＋アイキャッチ画像（1033幅）＋本文（`#1c234c` 20px・箇条書き `<ul>` は `list-style:disc` を復活）＋「ニュース一覧はこちら」`c-btn`（`news.html` へ）。

### ブログ一覧（`blog.html` / `_blog.scss` の `l-bloglist`）
ヒーロー画像なし。中央寄せ「ブログ」タイトル＋パンくず＋[左:カテゴリー絞り込み(全て/お知らせ/コラム/その他・#a9a9a9区切り線) | 右:2カラム縦カードグリッド10件] ＋ページネーション（`l-works-pager`流用）。カードはサムネ(335×190)＋タイトル20px＋日付＋カテゴリバッジ(#1c234c)。SPは1カラム。※ヒーロー無しのため固定ヘッダー分 `padding-top(152)` で逃がす。

### ブログ詳細（`blog-single.html` / `_blog.scss` の `l-blogsingle`）
PCは[本文(article) | 右サイドバー(aside)]の2カラム、SPは縦積み。本文＝パンくず→アイキャッチ→タイトル→日付/カテゴリ→リード→目次ボックス→見出し付きセクション×4（見出しは `::before` のネイビー縦棒マーカー）→ページャ(前へ/次へ)→「ブログ一覧はこちら」`c-btn`。サイドバー＝最新記事(5)/おすすめの記事(3)（サムネ140×98＋日付＋タイトル、`l-blogside`）。

### お問い合わせ（`contact.html`）/ サンクス（`thanks.html`）/ プライバシーポリシー（`privacy.html`）（`_page.scss`）
- **contact**：`l-pagehead--navy`＋フォーム（`l-contact`）。種別チェックボックス（`appearance:none` の自作四角＋:checkedでチェック）、各フィールドは `#e6f6fb` 入力＋赤「必須」バッジ、同意チェック、`送信する`ボタン（`$main`）。`action="./thanks.html"`。
- **thanks**：`l-thanks`＝全画面 `#e6f6fb`（`min-height:100vh`・中央寄せ）、**フッターなし**（デザイン通り）。テキスト＋「トップページに戻る」。
- **privacy**：`l-pagehead--navy`（タイトル`--sm` 48px＋`__subttl`）＋長文（`l-privacy`、【見出し】=`l-privacy__h`＋段落）。
- ページヘッダーは `flex-direction:column`（タイトル＋サブタイトルを縦積み。単一タイトルも縦中央・左寄せで従来通り）。

- 下層ページの作成手順は `create-page` スキル参照。

## 検証（スクリーンショット）の注意

ヘッドレス Edge は `--window-size` を375にしても実レイアウト幅約470pxが下限。
→ SP確認は **`--window-size=390〜480,XXXX`** 程度でキャプチャ。PCは1440。

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,4600 --screenshot="out.png" "file:///.../public/index.html"
```

---

## ビルド

`package.json` に scripts は無い。**`npx gulp build`（本番ビルド）／`npx gulp dev`（監視＋サーバー）**。
ソースは `src/`、出力は `public/`。HTMLは `style.css`（非min）を読み込む。
