// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => loader.remove(), 600);
  }
});

// Ripple Effect
document.querySelectorAll(".ripple").forEach((button) => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-circle");

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Optional: save preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Load saved theme
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  });
}

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Optional: Animate Stats Counter (if you want animated numbers)
const animateCounter = (element, endValue, duration = 2000) => {
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / endValue));
  const increment = () => {
    start += 1;
    element.textContent = start + (element.dataset.suffix || "");
    if (start < endValue) {
      setTimeout(increment, stepTime);
    }
  };
  increment();
};

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector("#stats");
  const statsTriggered = statsSection?.dataset.triggered;

  if (
    statsSection &&
    !statsTriggered &&
    statsSection.getBoundingClientRect().top < window.innerHeight
  ) {
    statsSection.dataset.triggered = true;
    statsSection.querySelectorAll("h3").forEach((el) => {
      const target = parseInt(el.textContent.replace(/\D/g, ""));
      const suffix = el.textContent.replace(/[0-9]/g, "").trim();
      el.dataset.suffix = suffix;
      animateCounter(el, target);
    });
  }
});
