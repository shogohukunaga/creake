import "./_swiper.min.js";
import "./_nav.min.js";
(function ($) {
  "use strict";

  // --- ドロワーを開く ---
  $(".l-drawer__icon").on("click", function (e) {
    e.preventDefault();
    $(".l-drawer__icon").toggleClass("is-active");
    $(".l-drawer").toggleClass("is-active");
    $(".p-drawer__background").toggleClass("is-active");
    $("body").toggleClass("fixed");
    return false;
  });

  ///MENUからCLOSEに変更
  $(".l-drawer__icon").on("click", function () {
    const $drawerText = $(".p-drawer__icon--tx");
    const isOpen = $(this).hasClass("is-open");

    // 状態のトグル
    $(this).toggleClass("is-open");

    // テキストの切り替え
    if (!isOpen) {
      $drawerText.text("CLOSE");
    } else {
      $drawerText.text("MENU");
    }
  });

  // --- オープニングのロゴ文字を1文字ずつ出現 ---
  (function setupOpeningReveal() {
    const openingTx = document.querySelector(".l-opening__tx");
    if (!openingTx) return;

    const text = openingTx.textContent.trim();
    if (!text) return;

    // スクリーンリーダー用に元の単語を保持し、表示文字は装飾扱い
    openingTx.setAttribute("aria-label", text);
    openingTx.textContent = "";

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Array.from(text).forEach(function (ch, i) {
      const span = document.createElement("span");
      span.className = "l-opening__char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = ch;
      // 動き軽減時は遅延なしで即表示
      if (!reduce) {
        span.style.animationDelay = (0.2 + i * 0.1).toFixed(2) + "s";
      }
      openingTx.appendChild(span);
    });
  })();

  // --- FAQアコーディオン ---
  $(".l-serv-faq__q").on("click", function () {
    $(this).closest(".l-serv-faq__item").toggleClass("is-open");
  });

  // --- ブログ一覧 カテゴリー開閉 ---
  $(".l-bloglist__cat-head").on("click", function () {
    $(this).closest(".l-bloglist__side").toggleClass("is-open");
  });

  // --- ブログ一覧 カテゴリー絞り込み ---
  // クリックで選択（文字色を赤に）→ 該当カテゴリーの記事を最新の日付順に表示
  (function setupBlogCategoryFilter() {
    const $catItems = $(".l-bloglist__cat-item");
    const $grid = $(".l-bloglist__grid");
    if (!$catItems.length || !$grid.length) return;

    // 初期状態は「全て」を選択
    $catItems.first().addClass("is-active");

    $catItems.on("click", function (e) {
      e.preventDefault();

      $catItems.removeClass("is-active");
      $(this).addClass("is-active");

      const cat = $(this).text().trim();
      const $cards = $grid.children(".l-bloglist__card");

      // 最新の日付順（降順）に並べ替え
      $cards
        .sort(function (a, b) {
          const dateA = $(a).find(".l-bloglist__card-date").text().trim();
          const dateB = $(b).find(".l-bloglist__card-date").text().trim();
          return dateB.localeCompare(dateA);
        })
        .appendTo($grid);

      // 選択カテゴリーの記事のみ表示（「全て」は全件表示）
      $cards.each(function () {
        const cardCat = $(this).find(".l-bloglist__card-cat").text().trim();
        $(this).toggle(cat === "全て" || cardCat === cat);
      });
    });
  })();

  // --- ページ内移動 ---
  $(function () {
    // カテゴリー絞り込みリンク（href="#"）はページ内移動の対象外
    $('a[href^="#"]')
      .not(".l-bloglist__cat-item")
      .on("click", function (e) {
      e.preventDefault();

      const targetId = $(this).attr("href");
      const $target = $(targetId === "#" ? "html" : targetId);

      if ($target.length) {
        const headerHeight = $("header").outerHeight() || 0;
        const position = $target.offset().top - headerHeight;

        // ドロワーを閉じる
        $(".l-drawer__icon,.l-drawer,.p-drawer__background").removeClass(
          "is-active",
        );
        $("body").removeClass("fixed");

        // スムーススクロール
        $("html, body").animate({ scrollTop: position }, 1000, "swing");
      }
    });
  });

  // --- スクロール関連（トップボタン／ヘッダー背景） ---
  const $win = $(window);
  const $header = $("header");
  const toTopButton = document.querySelector(".to-top");
  let lastScroll = 0;

  function onScrollCommon() {
    const scrollTop = $win.scrollTop();

    // 1) ページトップボタン表示/非表示
    if (toTopButton) {
      if (scrollTop > 300) {
        toTopButton.classList.add("show");
      } else {
        toTopButton.classList.remove("show");
      }
    }

    // 2) ヘッダー表示/非表示（下方向スクロールで隠す・上方向で表示）
    if (scrollTop > 120 && scrollTop > lastScroll) {
      $header.addClass("is-hide");
    } else {
      $header.removeClass("is-hide");
    }
    lastScroll = scrollTop;
  }

  // 初期判定 & スクロール時更新
  window.addEventListener("load", onScrollCommon, { passive: true });
  window.addEventListener("scroll", onScrollCommon, { passive: true });

  // --- ページトップボタンのクリック ---
  if (toTopButton) {
    toTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  (function setupReveal() {
    // const tagsToAnimate = [
    //   "li",
    //   ".c-ttl",
    //   ".c-subttl",
    //   ".c-main__ttl",
    //   ".c-sub__ttl",
    //   ".c-ttlbox",
    //   "section",
    // ];

    // tagsToAnimate.forEach((selector) => {
    //   document.querySelectorAll(selector).forEach((el) => {
    //     if (
    //       !el.classList.contains("l-fv") &&
    //       !el.classList.contains("p-footer__item") &&
    //       !el.classList.contains("page-numbers") &&
    //       !el.closest(".page-numbers")
    //     ) {
    //       el.classList.add("scroll_up");
    //     }
    //   });
    // });
    const targets = document.querySelectorAll(
      ".scroll_up, .scroll_left, .scroll_right",
    );
    if (!targets.length) return;

    // 動き軽減設定を尊重
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach((el) => el.classList.add("on"));
      return;
    }

    // IntersectionObserver 非対応の場合のフォールバック
    if (!("IntersectionObserver" in window)) {
      const fallback = () => {
        const winH = window.innerHeight;
        const margin = 150;
        targets.forEach((el) => {
          if (!el.classList.contains("on")) {
            const top = el.getBoundingClientRect().top;
            if (winH > top + margin) el.classList.add("on");
          }
        });
      };
      window.addEventListener("load", fallback, { passive: true });
      window.addEventListener("scroll", fallback, { passive: true });
      return;
    }

    // IntersectionObserver 使用時
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target); // 一度だけ実行
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -80px 0px", // 早めに発火
        threshold: 0,
      },
    );

    targets.forEach((el) => io.observe(el));
  })();
})(jQuery);
