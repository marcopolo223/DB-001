(function () {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const statusEl = document.querySelector("[data-open-status]");
  if (statusEl) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      weekday: "short",
    }).formatToParts(now);

    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    const mins = hour * 60 + minute;
    const open = mins >= 6 * 60 && mins < 15 * 60;

    statusEl.textContent = open ? "Open now" : "Closed now";
    statusEl.classList.add(open ? "is-open" : "is-closed");
    statusEl.setAttribute("aria-label", open
      ? "Robert's is open now, 6 a.m. to 3 p.m."
      : "Robert's is closed now. We open at 6 a.m.");
  }

  const tabs = document.querySelectorAll("[data-menu-tab]");
  const panels = document.querySelectorAll("[data-menu-panel]");
  if (tabs.length) {
    const activate = (id) => {
      tabs.forEach((tab) => {
        const on = tab.getAttribute("data-menu-tab") === id;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", String(on));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute("data-menu-panel") !== id;
      });
      if (window.location.hash !== `#${id}`) {
        history.replaceState(null, "", `#${id}`);
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab.getAttribute("data-menu-tab")));
    });

    const fromHash = window.location.hash.replace("#", "");
    const valid = [...tabs].some((t) => t.getAttribute("data-menu-tab") === fromHash);
    activate(valid ? fromHash : tabs[0].getAttribute("data-menu-tab"));
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
