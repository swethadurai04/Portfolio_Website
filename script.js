/* ═══════════════════════════════════════
   SWETHA D — PORTFOLIO  |  script.js
   ═══════════════════════════════════════ */

/* ── 1. TYPING ANIMATION ── */
const roles = [
  "Full Stack Developer.",
  "Java Developer.",
  "UI Craftsperson.",
  "Problem Solver."
];
let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;

const typedEl = document.getElementById("typed-role");

function typeLoop() {
  const current = roles[roleIndex];
  const displayed = isDeleting
    ? current.slice(0, charIndex - 1)
    : current.slice(0, charIndex + 1);

  typedEl.innerHTML = displayed + '<span class="cursor-blink"></span>';

  if (!isDeleting) {
    charIndex++;
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 55 : 90);
}

setTimeout(typeLoop, 1200);


/* ── 2. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


/* ── 3. SKILLS MARQUEE ── */
const row1Skills = [
  { name: "JavaScript", color: "#f7df1e", img: "icons/javascript.svg" },
  { name: "React.js",   color: "#61dafb", img: "icons/react.svg"      },
  { name: "HTML5",      color: "#e34f26", img: "icons/html5.svg"      },
  { name: "CSS3",       color: "#1572b6", img: "icons/css3.svg"       },
  { name: "Bootstrap",  color: "#7952b3", img: "icons/bootstrap.svg"  },
  { name: "Java",       color: "#f89820", img: "icons/java.svg"       },
];

const row2Skills = [
  { name: "Spring Boot", color: "#6db33f", img: "icons/springboot.svg" },
  { name: "Git",         color: "#f05032", img: "icons/git.svg"        },
  { name: "GitHub",      color: "#ffffff", img: "icons/github.svg"     },
  { name: "VS Code",     color: "#007acc", img: "icons/vscode.svg"     },
  { name: "PostgreSQL",  color: "#336791", img: "icons/postgresql.svg" },
  { name: "SQL",         color: "#00adef", img: "icons/sql.svg"        },
];

function buildMarqueeRow(skills, trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  // duplicate for seamless infinite loop
  [...skills, ...skills].forEach(skill => {
    const pill = document.createElement("div");
    pill.className = "skill-pill";
    pill.style.setProperty("--pill-color", skill.color);
    pill.innerHTML = `<img src="${skill.img}" width="26" height="26" alt="${skill.name}" />`
                   + `<span>${skill.name}</span>`;
    track.appendChild(pill);
  });
}

buildMarqueeRow(row1Skills, "row1");
buildMarqueeRow(row2Skills, "row2");


/* ── 4. ACTIVE NAV HIGHLIGHT ── */
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});


/* ── 5. PROJECT ONE-BY-ONE SCROLL REVEAL ── */
const projCards = document.querySelectorAll(".proj-reveal");
const projObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("proj-visible"), i * 180);
      projObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
projCards.forEach(card => projObserver.observe(card));


/* ── 6. LEFT/RIGHT REVEAL ── */
const lrObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      lrObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal-left, .reveal-right").forEach(el => lrObserver.observe(el));


/* ── 7. CONTACT FORM ── */
function sendMessage() {
  const name    = document.getElementById("cf-name").value.trim();
  const email   = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject") ? document.getElementById("cf-subject").value.trim() : "—";
  const message = document.getElementById("cf-message").value.trim();
  const success = document.getElementById("cf-success");

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }
  success.classList.add("show");
  document.getElementById("cf-name").value    = "";
  document.getElementById("cf-email").value   = "";
  if (document.getElementById("cf-subject")) document.getElementById("cf-subject").value = "";
  document.getElementById("cf-message").value = "";
  setTimeout(() => success.classList.remove("show"), 4000);
}


/* ── 8. SCROLL TO TOP BUTTON ── */
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("show", window.scrollY > 400);
});
