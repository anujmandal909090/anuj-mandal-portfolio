// Tell CSS that JavaScript is running (used by the scroll animations)
document.documentElement.classList.add("js");

// ---------- 1. Grab the elements we need ----------
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const yearSpan = document.getElementById("year");

// ---------- 2. Mobile menu: open and close ----------
function openMenu() {
  navMenu.classList.add("open");
  navToggle.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
}

navToggle.addEventListener("click", function () {
  if (navMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close the menu when a link is clicked
navLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Close the menu with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Close the menu when the screen becomes wide again
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// ---------- 3. Scroll events: navbar style, back-to-top, active link ----------
function highlightActiveLink() {
  let currentId = "home";
  const scrollPosition = window.scrollY + 120;

  sections.forEach(function (section) {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  // If we reached the bottom of the page, highlight the last section
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
    currentId = sections[sections.length - 1].id;
  }

  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

function handleScroll() {
  // Add a border/background to the navbar after scrolling a little
  navbar.classList.toggle("scrolled", window.scrollY > 20);

  // Show the back-to-top button after scrolling down
  backToTop.classList.toggle("show", window.scrollY > 400);

  highlightActiveLink();
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// ---------- 4. Back-to-top button ----------
backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- 5. Scroll animations (fade-in when items appear) ----------
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
} else {
  // Older browsers: just show everything
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}

// ---------- 6. Footer year (updates automatically) ----------
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
