# コーディング規約

<!-- どの案件でも共通で使う汎用ドキュメント。案件固有情報は project-info スキルを参照 -->

Figmaデザインをもとに、Gulp + SCSS + HTML で構築するコーディングプロジェクトの共通規約。

## 目次

1. [最重要原則](#最重要原則デザイン完成度を最優先)
2. [ディレクトリ構成](#ディレクトリ構成)
3. [開発コマンド](#開発コマンド)
4. [Figma連携](#figma連携)
5. [SCSS設計](#scss設計)
6. [HTMLのお約束](#htmlのお約束)

---

## 最重要原則：デザイン完成度を最優先

**Figmaデザインへの忠実な再現を第一優先とする。**

- デザインの形状・clip-path・余白を「実装が楽」という理由で変更しない
- 白い隙間・ズレ・余白の問題はデザインを変えずにCSS（margin・padding・z-index など）で解決する
- clip-path・diagonal cut など意図的な形状は絶対に直線化しない

> **案件固有の情報**（Figmaノード・画像一覧・各セクション構造・会社情報・カラー値など）は
> `project-info` スキルにまとめている。実装時はそちらも参照すること。

---

## ディレクトリ構成

```
（プロジェクトルート）/
├── src/                    # 開発ソース
│   ├── index.html          # TOPページ
│   ├── assets/
│   │   ├── sass/           # SCSSソース
│   │   │   ├── global/     # 変数・ミックスイン
│   │   │   ├── foundation/ # リセット・ベース
│   │   │   ├── layout/     # _top(TOP) / _sub(下層共通) / _{page}(300行超の下層) / header・drawer・footer(共通)
│   │   │   ├── component/  # 共通パーツ（c-btn/c-ttl/c-subttl…）
│   │   │   └── utility/    # ユーティリティ
│   │   ├── js/             # JavaScriptソース
│   │   └── img/
│   │       ├── pc/         # PC用画像（WebP）
│   │       └── sp/         # SP用画像（WebP）
└── public/                 # Gulp出力先（本番ファイル）
```

---

## 開発コマンド

`package.json` に scripts は定義していないため **`npx gulp` で直接実行**する。

```bash
npx gulp dev     # ローカルサーバー起動 + ファイル監視
npx gulp build   # 本番ビルド（HTML整形・JS圧縮・SCSSコンパイル・画像コピー）
```

- ソース編集は `src/` で行う
- `public/` はGulpが自動生成するため直接編集しない
- HTML は `style.css`（非min）を読み込む（`style.min.css` も生成されるが未使用）

---

## Figma連携

### MCP セットアップ

Figma Desktop アプリの Dev Mode と Claude Code を連携させる MCP サーバー。
**グローバルに一度だけ**実行すればすべてのプロジェクトで使える。

```bash
claude mcp add --scope user --transport http figma-desktop http://127.0.0.1:3845/mcp
```

- Figma Desktop アプリを起動した状態でないと `127.0.0.1:3845` が立ち上がらない
- セッション再起動後に `claude mcp list` で `✓ Connected` を確認
- Figma Desktop MCP の `get_design_context` を使えばノード走査せず色を取得できる

### カラー・フォント取得手順（REST API）

ローカルスタイルが未定義の場合（ワイヤーフレームなど）はノードを走査して抽出する。
（ファイルキー・node-idは `project-info` スキル参照。APIキーは `.claude/settings.local.json` の `FIGMA_API_KEY`）

> **スコープ注意**: `/v1/files/{key}/styles` は `library_content:read` スコープが必要。
> 未付与の場合はノード走査で代替する（下記スクリプト）。

```powershell
$token  = "（FIGMA_API_KEY）"
$fileKey = "（project-infoスキル参照）"
$nodeId  = "（対象ページのnode-idを : → %3A にエンコード）"
$headers = @{ "X-Figma-Token" = $token }
$res = Invoke-RestMethod -Uri "https://api.figma.com/v1/files/$fileKey/nodes?ids=$nodeId" -Headers $headers

$script:colors = @{}
$script:fonts  = @{}

function ToHex($val) { ([int][math]::Round($val * 255)).ToString("X2") }

function Extract-Styles($node) {
    if ($node.fills) {
        foreach ($fill in $node.fills) {
            if ($fill.type -eq "SOLID" -and $fill.color) {
                $hex = "#" + (ToHex $fill.color.r) + (ToHex $fill.color.g) + (ToHex $fill.color.b)
                $op  = if ($null -ne $fill.opacity) { [math]::Round([double]$fill.opacity, 2) } else { 1.0 }
                $key = "$hex|op:$op"
                if ($script:colors.ContainsKey($key)) { $script:colors[$key]++ } else { $script:colors[$key] = 1 }
            }
        }
    }
    if ($node.type -eq "TEXT" -and $node.style) {
        $s  = $node.style
        $lh = if ($s.lineHeightPercentFontSize) { [math]::Round([double]$s.lineHeightPercentFontSize / 100, 2) } else { "-" }
        $key = "$($s.fontFamily)|w:$($s.fontWeight)|$($s.fontSize)px|lh:$lh"
        if ($script:fonts.ContainsKey($key)) { $script:fonts[$key]++ } else { $script:fonts[$key] = 1 }
    }
    if ($node.children) { foreach ($child in $node.children) { Extract-Styles $child } }
}

Extract-Styles $res.nodes."1:3".document   # node-idはファイルに合わせて変更

Write-Output "=== COLORS ==="
$script:colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 20 |
    ForEach-Object { "$($_.Value.ToString().PadLeft(3))回  $($_.Key)" }
Write-Output "`n=== FONTS ==="
$script:fonts.GetEnumerator()  | Sort-Object Value -Descending |
    ForEach-Object { "$($_.Value.ToString().PadLeft(3))回  $($_.Key)" }
```

- 出現回数が多い色 = セクション背景など主要カラー
- 今回案件（CREAKE）の確定値は `project-info` スキル参照（ネイビー `#1c234c` / テキスト `#282136` / 赤 `#f30303` / 青 `#3aa6ff` / 淡水色 `#e6f6fb` / グレー `#ededed` ほか）

### 画像取得手順

新しいページの画像を取得する際は以下の手順で行う。
（ファイルキー・対象node-idは `project-info` スキルを参照）

**Step 1. ノード構造を取得する**

```powershell
$token = "（.claude/settings.local.jsonのFIGMA_API_KEY）"
$fileKey = "（project-infoスキル参照）"
$nodeId = "（対象ページのnode-idを : → %3A にエンコード）"
$headers = @{ "X-Figma-Token" = $token }
Invoke-RestMethod -Uri "https://api.figma.com/v1/files/$fileKey/nodes?ids=$nodeId" -Headers $headers
```

**Step 2. 画像ノードのエクスポートURLを取得する**

```powershell
# IDは , 区切り・コロンを %3A にエンコード（例: 5%3A11%2C5%3A28）
$ids = "5%3A11%2C5%3A28"
Invoke-RestMethod -Uri "https://api.figma.com/v1/images/$fileKey?ids=$ids&format=png&scale=1" -Headers $headers
```

> **注意**: `/v1/files/` はレートリミット（429）が発生しやすい。
> 429が出た場合は1〜2分待ってから再試行する。
> `/v1/images/` はレートリミットが別のため、エクスポートは先に進められる。

**Step 3. 写真かどうかを判別する（Pillow）**

```python
from PIL import Image, ImageStat
import io, urllib.request

url = "（エクスポートURL）"
data = urllib.request.urlopen(url).read()
img = Image.open(io.BytesIO(data)).convert("RGB")
stat = ImageStat.Stat(img)
stddev = sum(stat.stddev) / len(stat.stddev)
# stddev > 20 → 写真、stddev <= 20 → 単色/シンプル
```

**Step 4. PNG → WebP 変換して保存する**

```python
from PIL import Image

img = Image.open("input.png").convert("RGB")
img.save("src/assets/img/pc/output.webp", "WEBP", quality=85)
```

### 画像命名規則

- 形式: **WebP**（quality=85）
- 保存先: `src/assets/img/pc/`（SP用は `src/assets/img/sp/`）
- ファイル名はセクション/用途がわかる英小文字（例：`fv01.webp`、`about.webp`）

---

## SCSS設計

### ファイル分割ルール（`layout/`）

全 `layout/*.scss` は1本の `style.css` に結合される。**ブロック名（`l-xxx`）はファイルをまたいで衝突するため、ページ間で同名ブロックを作らない**こと。

| ファイル | 内容 |
|---|---|
| `_header.scss` / `_drawer.scss` / `_footer.scss` | 全ページ共通chrome（TOP・下層問わず使用） |
| `_top.scss` | **TOPページ専用**セクションをすべてここにまとめる（fv/news/concept/service/products/info 等） |
| `_sub.scss` | **下層ページ共通・小規模**をまとめる（pagehead＝下層共通ヒーロー、gallery/access/course/contact 等） |
| `_{page}.scss` | **1下層ページで300行以上**になる場合のみ専用ファイルを作る（例：`_about.scss`） |

- 下層でも使う**共通パーツ（`c-xxx`）は `component/`** にまとめる（`c-btn` / `c-ttl` / `c-subttl` …）。
- 新ファイルを足したら `layout/_index.scss`（または `component/_index.scss`）に `@use` を追加する。
- 案件固有の各ページ・各セクションの詳細は `project-info` スキル参照。

### ブレイクポイント（`_variables.scss`）

| 変数名 | 範囲 |
|---|---|
| `sp` | max-width: 767px |
| `tab` | 768px 〜 999px |
| `pc` | 1000px 〜 1200px |
| `ppc` | 1201px〜 |

使い方：
```scss
@use "../global" as global;

.element {
  // PC基準で書く
  @include global.mq(sp) {
    // SPの上書き
  }
}
```

**ミックスインのスケールはブレイクポイントに合わせる。**
- `mq(sp)` の中 → `sp-font`・`sp-padding`・`sp-width` 等 SP スケール
- `mq(tab)` の中 → `font`・`padding`・`width` 等 PC スケール（`sp-*` は使わない）

```scss
// NG
@include global.mq(tab) {
  @include global.sp-font(36, 700, 52, 0); // tab に sp スケールは不可
}

// OK
@include global.mq(tab) {
  @include global.font(36, 700, 52, 0);
}
```

### 寸法は必ずvwミックスインで書く（Figmaの数値をそのまま使う）

Figmaのデザインデータはpc=1440px基準。数値をそのままミックスインに渡す。

- **生のpx値（`8px` など）は書かない**
- **生の `min(N / 14.4 * 1vw)` も直書きしない**。対応するミックスインを使う（`border-radius`→`bd`/`sp-bd`、`height`→`height`/`sp-height` 等）
- 例外：`calc()` の内側は値を返す関数がないため、生の `min()` のまま可（例：`calc(100% - min(28 / 14.4 * 1vw))`）

```scss
// NG
width: 8px;
border-radius: min(8 / 14.4 * 1vw);

// OK
@include global.width(8);
@include global.bd(8);

// 例: Figmaでpadding-top: 80px の場合
@include global.padding-top(80);   // PC
@include global.sp-padding-top(40); // SP（Figmaのsp値）
```

### padding・margin は4辺揃うときショートハンドにまとめる

同じプロパティ（`padding` / `margin`）の**上下左右4辺すべて**を同じブロックで指定する場合は、
個別mixinを並べず4引数のショートハンドにまとめる（**引数の順は `top, left, bottom, right`**）。
SP用は `sp-padding` / `sp-margin` を同様に使う。

```scss
// NG（4辺を個別に指定）
@include global.padding-top(3);
@include global.padding-bottom(3);
@include global.padding-left(8);
@include global.padding-right(8);

// OK（top, left, bottom, right の順）
@include global.padding(3, 8, 3, 8);
```

- **2〜3辺だけの指定はまとめない。** 4引数にすると未指定辺に `0` が入り、別ブレイクポイントで効いているベースのpadding（例：PCの `padding-top`）を打ち消して崩れるため、個別mixinのまま残す。

### 余白は親の padding・margin・gap で作る（子要素の固定寸法で作らない）

余白やカード幅は**親要素の `padding` / `margin` / `gap` で制御**し、子要素に固定の `width` / `height` を並べて余白を作らない。
フォントは `max(12px, …)` で下げ止まる一方、固定寸法の箱はvwで縮み続けるため、tab域でテキストがはみ出して崩れる。

```scss
// NG：子に固定幅・固定高さを与えて余白を作る
.l-price__plan {
  @include global.width(245);
}
.l-price__detail {
  @include global.height(280); // 下余白を固定高さで確保 → tabで崩れる
}

// OK：親が幅・gap を持ち、子は flex: 1 で伸縮。余白は padding で確保
.l-price__list {
  display: flex;
  @include global.width(1015); // 245×3 + gap120×2（Figmaの合計値）
  margin-left: auto;
  margin-right: auto;
  @include global.gap(120);
}
.l-price__plan {
  flex: 1;
}
.l-price__detail {
  @include global.padding-top(24);
  @include global.padding-bottom(24); // 高さは中身＋paddingで決まる
}
```

**例外：スクロールコンテナは固定高さでよい。**
TOPページのNEWSリストのように「記事増加に備えて高さ固定＋スクロール」にする場合は、
固定高さが意図した挙動なので `height` + `overflow-y: auto` を使う（高さはFigmaのリスト背景rectangleの値）。

```scss
.l-news__list {
  @include global.height(325);   // Figmaの値
  overflow-y: auto;

  @include global.mq(sp) {
    @include global.sp-height(260);
  }
}
```

### フォントミックスインの使い方

`font-normal` / `sp-font-normal` は使わず、常に `font($size, $weight, $height, $spacing)` / `sp-font(...)` を使う。
`$height` は Figma の `lineHeightPx` の値をそのまま渡す。

```scss
// NG
@include global.font-normal(16, 500, 0);

// OK（Figma の lineHeightPx を第3引数に）
@include global.font(16, 500, 23, 0);
```

### カラー・フォント変数

`_variables.scss` に定義（具体値は `project-info` スキル参照）。
変数名は案件共通で `$main` / `$tx` / `$link` / `$base`（＋セクション英字ラベル用 `$label`）、フォントは `$ff-en` / `$ff-base` / `$ff-ac` を使う。
見出し先頭文字などをメインカラーにするユーティリティ `.cm`（`color: $main !important`）あり。

### ネスト禁止ルール

**SCSSのネストは一切使わない。** `&` によるBEMネストも、HTMLタグのネストも禁止。

- BEM の子要素・モディファイアは個別のルールセットで書く
- **例外1：疑似要素・疑似クラスのみ `&` を使う**（`&::before`、`&:hover`、`&:nth-child()` 等）
- **例外2：全面背景の `<picture>`** は `__img` コンテナ配下にネストして絶対配置してよい（後述）

```scss
// NG
.l-header {
  &__inner { ... }
  img { ... }
}

// OK
.l-header__inner { ... }

// OK（疑似要素・疑似クラス）
.c-btn {
  &::after { ... }
  &:hover { ... }
}
```

### モディファイアはベースの後に書く

BEMモディファイア（`--xxx`）はベースルールと詳細度が同じ（クラス1個）ため、**ベースより前に書くと後勝ちでベースに打ち消される**。
必ず「ベース → モディファイア」の順で書く。

```scss
// NG：--dark が後から来るベースの color: #fff に上書きされて効かない
.l-pagehead__ttl--dark {
  color: global.$tx;
}
.l-pagehead__ttl {
  color: #fff;
}

// OK：ベースを先に、モディファイアを後に
.l-pagehead__ttl {
  color: #fff;
}
.l-pagehead__ttl--dark {
  color: global.$tx;
}
```

### position: relative の書き方

`position: relative` を書く場合は、必ず `z-index: 1` をセットで書く。

```scss
// NG
.l-about {
  position: relative;
}

// OK
.l-about {
  position: relative;
  z-index: 1;
}
```

### `picture` / `img` は直接書かない

`_reset.scss` でグローバルに定義済みのため、レイアウトSCSSで `picture`・`img` へ直接スタイルを当てない。
コンテナに `width` / `height` を持たせれば `img { width: 100%; height: 100%; object-fit: cover }` が効く。
SP サイズもコンテナの `mq(sp)` にまとめる。

```scss
// NG
.l-pickup03__img {
  img { height: ...; }      // ネスト
}
.l-pickup03__img img { ... } // 直接指定

// OK
.l-pickup03__img {
  @include global.width(534);
  @include global.height(325);

  @include global.mq(sp) {
    @include global.sp-width(320);
    @include global.sp-height(195);
  }
}
```

**例外：全面敷き（背景）として使う `<picture>` は、コンテナ内で `picture` を絶対配置する。**
下層ページのヒーロー（`l-pagehead`）のように、同じコンテナ内にオーバーレイやタイトルが重なり、
画像を背景レイヤーとして敷く場合はコンテナの width/height だけでは制御できない。
このケースに限り `__img` コンテナ配下の `picture` をネストして `position: absolute; inset: 0` で敷く。

```html
<div class="l-pagehead__img">
  <picture>
    <img src="./assets/img/pc/news-hero.webp" alt="" width="1440" height="500" loading="eager" />
  </picture>
</div>
```

```scss
// OK（全面背景の picture はネストして絶対配置してよい）
.l-pagehead__img {
  picture {
    position: absolute;
    z-index: 0;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.85;
  }
}
```

---

## HTMLのお約束

### 基本ルール

- 画像は `<picture>` タグでPC/SP出し分け（SP用は `media="(max-width: 767px)"`）
- 画像は基本 `loading="lazy"`（FVの1枚目のみ `eager`）
- 装飾的な背景・画像の `alt` は空（`alt=""`）
- クラス命名は BEM（Block__Element--Modifier）
- `text` は `tx` と省略する（例：`__txbox`、`__tx`）
  - テキストをまとめるコンテナは `__txbox`、単体のテキスト要素は `__tx`
- `body` は使わない（`__body` → `__tx` に統一）
- レイアウト系クラスは `l-` プレフィックス
- コンポーネント系クラスは `c-` プレフィックス
- ユーティリティ系クラスは `u-` プレフィックス

### タグの使い分けルール

**繰り返し（連続）要素のマークアップは種類で決める：**

| 種類 | マークアップ | 例 |
|---|---|---|
| 投稿系（news・blog・成果事例 works・関連記事サイドバー等） | 親 `<div>` ＋ 各項目 `<article>` | `div.l-blog__list > article.l-blog__item` |
| それ以外の繰り返し構造（特徴リスト・FAQ・プラン等） | 親 `<ul>` ＋ 各項目 `<li>`（`div`不可） | `ul.l-serv-faq__list > li.l-serv-faq__item` |
| 記事本文内の箇条書き（純粋なリスト） | 通常どおり `<ul>` + `<li>` | ニュース詳細本文の列挙 |

- 投稿系は1件＝独立コンテンツなので `<article>` が適切。**リンクが無いカード（成果事例など）でも投稿系なら `<article>`**。親の `__list`/`__grid` クラスはそのまま `<div>` に付ける。
  ```html
  <!-- OK：投稿系は div > article -->
  <div class="l-blog__list">
    <article class="l-blog__item"><a href="...">…</a></article>
    <article class="l-blog__item"><a href="...">…</a></article>
  </div>
  ```
- サイドバーの関連記事のように既に `<a>` 直置きの場合は、各 `<a>` を `<article>` で囲う（クラスは `<a>` 側のまま）。
- 非投稿系の繰り返しは `__items`/`__item` に限らず、`l-serv-solve__list`/`__row` のように同じ構造が連続するものすべてが対象。リンクなしの表示カードでも `ul`/`li` を使う。

**その他のタグルール：**

- **横並び（flex）のラッパーは `__inner` ではなく `__fx`**（例：`l-about__fx`、`l-pickup03__fx`）
  - ただし `l-header__inner` は例外でそのまま
- **`<a>` はリンクがある時だけ**、**`<article>` は投稿系（独立記事コンテンツ）の時だけ**使う。投稿系でない単独の表示カードは `<div>`
- **ヘッダーロゴは `<h1>` タグ**を使う（`<p>` 不可）

### 複数段落テキストの書き方

Figmaで段落が分かれていても、**同じ意味のテキストブロックは `<br>` で繋いで1つの `<p>` にまとめる**。
複数の `<p>` に分けない。

```html
<!-- NG -->
<p class="p-about__tx">1段落目のテキスト。</p>
<p class="p-about__tx">2段落目のテキスト。</p>

<!-- OK -->
<p class="p-about__tx">1段落目のテキスト。<br>2段落目のテキスト。</p>
```

### セクションタイトルのクラス設計

各セクションの `<h2>` には `p-{セクション名}__ttl c-ttl` を付ける。

```html
<h2 class="p-news__ttl c-ttl">NEWS</h2>
```

- `c-ttl` … 共通タイトルスタイル（フォントサイズ・色など全セクション共通の見た目）
- `p-{セクション}__ttl` … セクション固有の上書きが必要な場合のみここに追記

**運用ルール：**
同じフォントサイズ・色のときは `c-ttl` にスタイルを書く。
セクションごとに見た目が異なる場合は `p-{セクション}__ttl` で上書きする。

### サブタイトルのクラス設計

`c-ttl` の直下に置く日本語サブタイトル（例：「丸一金属について」「事業内容」）には `__subttl` + `c-subttl` を使う。

```html
<h2 class="p-about__ttl c-ttl">ABOUT</h2>
<p class="p-about__subttl c-subttl">丸一金属について</p>
```

- `c-subttl` … 共通スタイル（font-family・font-size・margin など）
- `p-{セクション}__subttl` … 色・text-align などセクション固有の上書きのみ記述
- `__sub` は使わない → `__subttl` に統一
