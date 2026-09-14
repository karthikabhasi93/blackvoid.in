async function loadComponent(id, path) {
  const target = document.getElementById(id);
  if (!target) return;
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  const close = document.querySelector(".mobile-close");
  const themeButtons = document.querySelectorAll(".theme-toggle, .mobile-theme-toggle");

  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });

  const setMenu = (open) => {
    menu?.classList.toggle("open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    if (toggle) toggle.textContent = open ? "×" : "☰";
    document.body.classList.toggle("menu-open", open);
  };

  toggle?.addEventListener("click", () => setMenu(!menu?.classList.contains("open")));
  close?.addEventListener("click", () => setMenu(false));
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));

  themeButtons.forEach(button => button.addEventListener("click", toggleTheme));
  updateThemeControls();
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("blackvoid-theme", theme);
  updateThemeControls();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

function updateThemeControls() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to black theme");
    btn.title = dark ? "Switch to light theme" : "Switch to black theme";
    const icon = btn.querySelector(".theme-icon");
    if (icon) icon.textContent = dark ? "☾" : "☼";
  });
  document.querySelectorAll(".mobile-theme-toggle").forEach(btn => {
    btn.innerHTML = dark ? "Switch to Light Theme <span>☼</span>" : "Switch to Black Theme <span>☾</span>";
  });


  updateLogo();
  
}

function updateLogo() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const logo = dark
      ? "assets/images/logo/blackvoid-logo-white.png"
      : "assets/images/logo/blackvoid-logo-black.png";

    document.querySelectorAll(".brand-logo").forEach(img => {
      img.src = logo;
    });
}
  
(async function initComponents() {
  const saved = localStorage.getItem("blackvoid-theme");
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
  }
  await Promise.all([
    loadComponent("site-header", "components/header.html"),
    loadComponent("site-footer", "components/footer.html")
  ]);
  setupHeader();
})();
