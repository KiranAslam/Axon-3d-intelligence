const themeStorageKey = "axon-theme";
let currentTheme = "dark";

try {
  currentTheme = localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark";
} catch {
  currentTheme = "dark";
}

document.documentElement.dataset.theme = currentTheme;

function updateTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The current page still changes theme when storage is unavailable.
  }

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-pressed", String(theme === "light"));
    button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    button.title = `Switch to ${nextTheme} mode`;
    button.querySelector(".theme-toggle-label").textContent = theme === "light" ? "Light" : "Dark";
  });
}

window.addEventListener("storage", (event) => {
  if (event.key === themeStorageKey) {
    document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
    updateTheme(document.documentElement.dataset.theme);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("homepage") || document.body.classList.contains("gallery-page")) {
    const actions = document.querySelector(".nav-cta");
    if (actions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "theme-toggle";
      button.innerHTML = '<span class="theme-toggle-label"></span><span class="theme-toggle-track" aria-hidden="true"><span></span></span>';
      button.addEventListener("click", () => updateTheme(currentTheme === "dark" ? "light" : "dark"));
      actions.prepend(button);
      updateTheme(currentTheme);
    }
  }

  if (document.body.classList.contains("legal-page")) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");

    if (burger && navLinks) {
      burger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        burger.setAttribute("aria-expanded", String(isOpen));
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    const floaters = document.getElementById("floaters");
    if (floaters && !reduceMotion) {
      for (let index = 0; index < 14; index += 1) {
        const floater = document.createElement("span");
        floater.style.left = `${Math.random() * 100}%`;
        floater.style.bottom = "-10px";
        floater.style.animationDuration = `${10 + Math.random() * 10}s`;
        floater.style.animationDelay = `${Math.random() * 14}s`;
        floaters.appendChild(floater);
      }
    }

    document.querySelectorAll("a[data-transition]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || link.target === "_blank" || reduceMotion) return;

        event.preventDefault();
        document.body.classList.add("leaving");
        window.setTimeout(() => {
          window.location.href = href;
        }, 220);
      });
    });
  }

  if (!document.body.classList.contains("homepage")) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.transition = "opacity .65s ease, transform .65s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      observer.observe(el);
    });
  }
});
