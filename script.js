/* =====================================================================
   SARAUTA — script.js (shared by all pages)
   Every feature checks that its element exists first, so one file
   can safely run on all five pages.
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- 1. Header: solid background after scrolling ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 2. Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1000) setMenu(false);
    });
  }

  /* ---------- 3. Scroll reveal (fade in when scrolled into view) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4. Page transition (fade out before opening another page) ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#" || link.target === "_blank" ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.origin !== window.location.origin) return;
    if (link.pathname === window.location.pathname && link.search === window.location.search) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(function () { window.location.href = link.href; }, 280);
  });
  // If the user presses the browser's Back button, make sure the page is visible again
  window.addEventListener("pageshow", function () {
    document.body.classList.remove("leaving");
  });

  /* ---------- 5. Products page: filter buttons ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var products = document.querySelectorAll(".product[data-cat]");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      products.forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !show);
        card.classList.remove("is-showing");
        if (show) {
          void card.offsetWidth; // restart the little fade animation
          card.classList.add("is-showing");
        }
      });
    });
  });

  // Links such as products.html?filter=fura open with that filter already chosen
  var wanted = new URLSearchParams(window.location.search).get("filter");
  if (wanted) {
    filterBtns.forEach(function (b) { if (b.getAttribute("data-filter") === wanted) b.click(); });
  }

  /* ---------- 6. Gallery page: lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector("p");
    var current = 0;

    function show(i) {
      current = (i + tiles.length) % tiles.length;
      var t = tiles[current];
      lbImg.src = t.getAttribute("data-full");
      lbImg.alt = t.getAttribute("data-alt") || "";
      lbCap.textContent = t.getAttribute("data-caption") || "";
    }
    function openBox(i) {
      show(i);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lb-close").focus();
    }
    function closeBox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      tiles[current].focus();
    }
    tiles.forEach(function (tile, i) {
      tile.addEventListener("click", function () { openBox(i); });
      tile.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBox(i); }
      });
    });
    lightbox.querySelector(".lb-close").addEventListener("click", closeBox);
    lightbox.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lightbox.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeBox(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  // If a remote photo fails to load, hide the broken icon and let the wine gradient show instead
  document.addEventListener("error", function (e) {
    var el = e.target;
    if (el && el.tagName === "IMG") {
      var tile = el.closest(".tile");
      if (tile) tile.classList.add("img-failed");
    }
  }, true);

  /* ---------- 7. Contact form (front-end only: nothing is sent anywhere) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");

    // Pre-fill from links such as contact.html?product=Zobo%20Reserve
    var params = new URLSearchParams(window.location.search);
    var product = params.get("product");
    var topic = params.get("topic");
    if (product && form.elements.product) form.elements.product.value = product;
    if (topic && form.elements.topic) form.elements.topic.value = topic;
    if (product && form.elements.topic && !topic) form.elements.topic.value = "Order a product";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = form.elements.name.value.trim().split(" ")[0];
      status.textContent = "Thank you, " + name + ". Your enquiry has been noted and the team will reply within one working day. " +
        "(Demo note: this project has no back end, so the message is not actually sent anywhere.)";
      status.classList.add("show");
      status.focus();
      form.reset();
    });
  }

  /* ---------- 8. Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
