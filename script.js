// /* The provided JavaScript code snippet is performing the following tasks: */
// // Footer year
// document.getElementById("year").textContent = new Date().getFullYear();

// // Dark mode toggle
// const toggle = document.getElementById("themeToggle");
// toggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   const icon = toggle.querySelector("i");
//   icon.className = document.body.classList.contains("dark")
//     ? "fa-solid fa-sun"
//     : "fa-solid fa-moon";
// });

// // Scrollspy (active nav link)
// const links = Array.from(document.querySelectorAll(".navlink"));
// const sections = links
//   .map(a => document.querySelector(a.getAttribute("href")))
//   .filter(Boolean);

// const setActive = () => {
//   const y = window.scrollY + 120;
//   let current = sections[0]?.id || "home";

//   for (const sec of sections) {
//     if (sec.offsetTop <= y) current = sec.id;
//   }

//   links.forEach(a => {
//     const id = a.getAttribute("href").slice(1);
//     a.classList.toggle("active", id === current);
//   });
// };

// window.addEventListener("scroll", setActive, { passive: true });
// setActive();

// 1. Footer year (Works on both pages)
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2. Dark mode toggle (Works on both pages)
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

// 3. Scrollspy (Only runs if navlinks exist - prevents errors on publications page)
const links = Array.from(document.querySelectorAll(".navlink"));
const sections = links
  .map(a => {
    const targetId = a.getAttribute("href");
    // Only look for sections if the href is an ID (starts with #)
    if (targetId && targetId.startsWith("#")) {
      return document.querySelector(targetId);
    }
    return null;
  })
  .filter(Boolean);

if (sections.length > 0) {
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id || "home";

    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec.id;
    }

    links.forEach(a => {
      const id = a.getAttribute("href").slice(1);
      a.classList.toggle("active", id === current);
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

// --- Lightbox Logic ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Find all clickable images
document.querySelectorAll(".clickable").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    captionText.innerHTML = img.alt;
  });
});

// Close when clicking (x)
if (closeBtn) {
  closeBtn.onclick = () => { lightbox.style.display = "none"; }
}

// Close when clicking anywhere outside the image
if (lightbox) {
  lightbox.onclick = (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  }
}


// // --- News Bar Logic ---
// const newsBar = document.querySelector(".news-bar");
// const closeNews = document.getElementById("closeNews");

// if (closeNews && newsBar) {
//   closeNews.addEventListener("click", () => {
//     newsBar.style.display = "none";
//     // Optional: Save to local storage so it stays closed
//     localStorage.setItem("newsClosed", "true");
//   });
// }

// // Check if user previously closed it
// if (localStorage.getItem("newsClosed") === "true") {
//   if (newsBar) newsBar.style.display = "none";
// }




const newsBar = document.getElementById("newsBar");
const closeNews = document.getElementById("closeNews");

if (closeNews && newsBar) {
  closeNews.addEventListener("click", () => {
    newsBar.style.display = "none";
    // Stores the state so it doesn't reappear on refresh
    sessionStorage.setItem("announcementSeen", "true");
  });
}

// Check session storage on load
if (sessionStorage.getItem("announcementSeen") === "true") {
  if (newsBar) newsBar.style.display = "none";
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const expanded = mobileMenu.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    menuToggle.innerHTML = expanded
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}
