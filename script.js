document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Dark mode toggle
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const icon = toggle.querySelector("i");
      if (icon) {
        icon.className = document.body.classList.contains("dark")
          ? "fa-solid fa-sun"
          : "fa-solid fa-moon";
      }
    });
  }

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    const setMenuState = (isOpen) => {
      mobileMenu.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("open");
      setMenuState(isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });
  }

  // Scrollspy
  const navLinks = Array.from(document.querySelectorAll(".navlink"));
  const sectionLinks = navLinks.filter((link) => {
    const href = link.getAttribute("href");
    return href && href.startsWith("#");
  });

  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length > 0) {
    const setActive = () => {
      const scrollPosition = window.scrollY + 120;
      let currentSectionId = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          currentSectionId = section.id;
        }
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const targetId = href.slice(1);
        link.classList.toggle("active", targetId === currentSectionId);
      });
    };

    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  if (lightbox && lightboxImg && captionText) {
    document.querySelectorAll(".clickable").forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        captionText.textContent = img.alt || "";
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

  // News bar
  const newsBar = document.getElementById("newsBar");
  const closeNews = document.getElementById("closeNews");
  const announcementKey = "announcementSeen";

  if (newsBar && sessionStorage.getItem(announcementKey) === "true") {
    newsBar.style.display = "none";
  }

  if (newsBar && closeNews) {
    closeNews.addEventListener("click", () => {
      newsBar.style.display = "none";
      sessionStorage.setItem(announcementKey, "true");
    });
  }
});
