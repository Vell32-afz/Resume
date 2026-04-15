const printBtn = document.getElementById("print-btn");
const yearSpan = document.getElementById("copyright-year");
const revealItems = document.querySelectorAll(".reveal");
const skillCurrent = document.getElementById("skill-current");
const skillNext = document.getElementById("skill-next");

const skills = [
  "Networking",
  "Routers",
  "Electronics",
  "Computer Hardware",
  "Java",
  "HTML",
  "Cybersecurity",
  "Virus Protection",
  "Troubleshooting",
  "Problem Solving"
];

let skillIndex = 0;
let isAnimating = false;

if (printBtn) {
  printBtn.addEventListener("click", () => {
    window.print();
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

if (skillCurrent && skillNext) {
  skillCurrent.textContent = skills[0];
  skillNext.textContent = skills[1];

  skillCurrent.style.transform = "translateX(0)";
  skillCurrent.style.opacity = "1";
  skillNext.style.transform = "translateX(100%)";
  skillNext.style.opacity = "0";

  setInterval(() => {
    if (isAnimating) return;
    isAnimating = true;

    const nextIndex = (skillIndex + 1) % skills.length;
    const upcomingIndex = (nextIndex + 1) % skills.length;

    skillNext.textContent = skills[nextIndex];

    skillCurrent.classList.remove("animate-current");
    skillNext.classList.remove("animate-next");

    void skillCurrent.offsetWidth;
    void skillNext.offsetWidth;

    skillCurrent.classList.add("animate-current");
    skillNext.classList.add("animate-next");

    setTimeout(() => {
      skillCurrent.classList.remove("animate-current");
      skillNext.classList.remove("animate-next");

      skillCurrent.textContent = skills[nextIndex];
      skillNext.textContent = skills[upcomingIndex];

      skillCurrent.style.transform = "translateX(0)";
      skillCurrent.style.opacity = "1";

      skillNext.style.transform = "translateX(100%)";
      skillNext.style.opacity = "0";

      skillIndex = nextIndex;
      isAnimating = false;
    }, 550);
  }, 2800);
}