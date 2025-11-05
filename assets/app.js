/* assets/app.js */
"use strict";

/* =========================
   Menu burger (mobile)
   ========================= */
(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;

  const toggleMenu = () => menu.classList.toggle("open");
  toggle.addEventListener("click", toggleMenu);

  // Fermer le menu si on clique sur un lien
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) menu.classList.remove("open");
  });

  // Échapper ferme aussi
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menu.classList.remove("open");
  });
})();

/* =========================
   Scroll reveal (IntersectionObserver)
   ========================= */
(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => io.observe(el));
})();

/* =========================
   Compteurs animés (ex: About)
   ========================= */
(() => {
  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter || "0");
    const suffix = el.dataset.suffix || "";
    if (!Number.isFinite(target)) return;

    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      el.textContent = cur + suffix;
    }, 16);
  }

  document.querySelectorAll("[data-counter]").forEach(animateCounter);
})();

/* =========================
   Parallax (hero)
   - data-parallax sur l'image .parallax-media
   - option data-speed (0.15 ~ 0.35)  — défaut 0.25
   ========================= */
(() => {
  const els = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!els.length) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const top = window.scrollY || window.pageYOffset;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.25");
        el.style.transform = `translateY(${top * speed * 0.5}px)`;
      });
      ticking = false;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* =========================
   Modals (bandeau bleu - 4 cards)
   - Boutons:  [data-open-modal="clé"]
   - Modals :  <div data-modal id="modal-clé"> ... </div>
   - Bouton X: [data-close-modal]
   - Fermer: clic dehors + ESC
   ========================= */
(() => {
  // Ouvrir
  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-open-modal");
      if (!key) return;
      const modal = document.getElementById(`modal-${key}`);
      if (!modal) return;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");

      const closer = modal.querySelector("[data-close-modal]");
      if (closer) closer.focus();
    });
  });

  // Fermer (bouton X)
  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const backdrop = btn.closest("[data-modal]");
      if (!backdrop) return;
      backdrop.classList.remove("open");
      backdrop.setAttribute("aria-hidden", "true");
    });
  });

  // Fermer (clic en dehors)
  document.querySelectorAll("[data-modal]").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("open");
        backdrop.setAttribute("aria-hidden", "true");
      }
    });
  });

  // Fermer (ESC)
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document
      .querySelectorAll("[data-modal].open")
      .forEach((bd) => bd.classList.remove("open"));
    document
      .querySelectorAll("[data-modal].open")
      .forEach((bd) => bd.setAttribute("aria-hidden", "true"));
  });
})();

// ===== Accordéon FAQ =====
document.addEventListener('DOMContentLoaded', () => {
  const acc = document.querySelector('[data-accordion]');
  if (!acc) return;

  const items = [...acc.querySelectorAll('[data-acc-item]')];
  items.forEach(item => {
    const btn = item.querySelector('[data-acc-button]');
    btn?.addEventListener('click', () => {
      // On autorise plusieurs ouverts ? -> ici : oui
      item.classList.toggle('open');
    });
  });
});

