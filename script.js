// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector("header");

// Mobile Menu Toggle - Initialize immediately
(function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.style.overflow = mobileNav.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
})();

// Video Popup Functionality
(function () {
  const videoTrigger = document.getElementById("videoTrigger");
  const videoPopup = document.getElementById("videoPopup");
  const videoPopupClose = document.getElementById("videoPopupClose");
  const popupVideo = document.getElementById("popupVideo");
  const backdrop = document.querySelector(".video-popup-backdrop");
  const originalVideo = videoTrigger
    ? videoTrigger.querySelector("video")
    : null;

  if (videoTrigger && videoPopup && popupVideo && originalVideo) {
    // Open popup on click
    videoTrigger.addEventListener("click", function () {
      // Pause original video
      originalVideo.pause();

      videoPopup.classList.add("active");
      document.body.style.overflow = "hidden";
      popupVideo.currentTime = 0;
      popupVideo.muted = false;
      popupVideo.play();
    });

    // Close popup function
    function closePopup() {
      videoPopup.classList.remove("active");
      document.body.style.overflow = "";
      popupVideo.pause();
      popupVideo.muted = true;

      // Resume original video
      originalVideo.play();
    }

    // Close on X button click
    if (videoPopupClose) {
      videoPopupClose.addEventListener("click", closePopup);
    }

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener("click", closePopup);
    }

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoPopup.classList.contains("active")) {
        closePopup();
      }
    });
  }
})();

// All sections with white backgrounds that need light header
const whiteSections = [
  document.querySelector(".impact-stats-section"),
  document.querySelector(".stats-section"),
  document.querySelector(".case-studies-section"),
  document.querySelector(".contact-section"),
  document.querySelector(".footer"),
  document.querySelector(".content-area"),
  document.querySelector(".work-cta-section"),

  // Work page sections
  document.querySelector(".work-hero-section"),
  document.querySelector(".work-grid-section"),
];

let currentState = "none";

// Helper function to check if scroll position is within any white section
function isInWhiteSection(scrollY) {
  const offset = 100;
  return whiteSections.some((section) => {
    if (!section) return false;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    return scrollY + offset >= top && scrollY + offset < bottom;
  });
}

// Use GSAP ScrollTrigger for smooth, flicker-free header state changes
const isChatPage = document.querySelector(".chat-page-section") !== null;
const isCaseStudyPage = document.querySelector(".case-study-hero") !== null;

// Trigger for when we start scrolling (dark background)
ScrollTrigger.create({
  start: 50,
  end: "max",
  onUpdate: (self) => {
    if (isChatPage) return;
    const scrollY = window.scrollY;

    let newState = "none";

    // Determine state based on position
    if (isCaseStudyPage) {
      // Case study pages: always light theme when scrolled
      newState = scrollY > 50 ? "light" : "none";
    } else if (isInWhiteSection(scrollY)) {
      newState = "light";
    } else if (scrollY > 50) {
      newState = "dark";
    }

    // Only update if state actually changed
    if (newState !== currentState) {
      currentState = newState;

      // Use GSAP for smooth class transitions
      if (newState === "light") {
        header.classList.remove("scrolled-dark");
        header.classList.add("scrolled-light");
      } else if (newState === "dark") {
        header.classList.remove("scrolled-light");
        header.classList.add("scrolled-dark");
      } else {
        header.classList.remove("scrolled-dark", "scrolled-light");
      }
    }
  },
});

// GSAP animations for stats cards on scroll
gsap.fromTo(
  ".stat-card",
  {
    y: 60,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".stats-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate stats headline
gsap.fromTo(
  ".stats-headline",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".stats-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate approach section header
gsap.fromTo(
  ".approach-header",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".approach-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate approach video
gsap.fromTo(
  ".approach-video",
  {
    x: -60,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".approach-content",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate approach text
gsap.fromTo(
  ".approach-text",
  {
    x: 60,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".approach-content",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate case studies section
gsap.fromTo(
  ".case-studies-header",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".case-studies-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

gsap.fromTo(
  ".case-study-card",
  {
    y: 60,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".case-studies-grid",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate footer CTA
gsap.fromTo(
  ".footer-cta-headline",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-cta",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

gsap.fromTo(
  ".footer-cta .highlight-tag",
  {
    y: 30,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-cta",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate footer columns
gsap.fromTo(
  ".footer-content > *",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate impact section
gsap.fromTo(
  ".impact-title, .impact-subtitle",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".impact-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate clients grid within impact section
gsap.fromTo(
  ".impact-section .client-box",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".impact-section .clients-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
);

// Animate impact slider header
gsap.fromTo(
  ".impact-slider-header",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".impact-slider-header",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
);

// gsap.fromTo(
//   ".impact-slider .case-card, .impact-slider .testimonial-card",
//   {
//     y: 60,
//     opacity: 0,
//   },
//   {
//     y: 0,
//     opacity: 1,
//     duration: 0.8,
//     stagger: 0.15,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: ".impact-slider-wrapper",
//       start: "top 75%",
//       toggleActions: "play none none reverse",
//     },
//   }
// );

// // Impact Slider Functionality
// const slider = document.querySelector(".impact-slider");
// const prevBtn = document.querySelector(".slider-nav.prev");
// const nextBtn = document.querySelector(".slider-nav.next");

// if (slider && prevBtn && nextBtn) {
//   let isDragging = false;
//   let startX;
//   let scrollLeft;
//   let currentTranslate = 0;
//   const slideWidth = 444; // card width + gap

//   // Button navigation
//   prevBtn.addEventListener("click", () => {
//     currentTranslate = Math.min(currentTranslate + slideWidth, 0);
//     slider.style.transform = `translateX(${currentTranslate}px)`;
//   });

//   nextBtn.addEventListener("click", () => {
//     const maxTranslate = -(
//       slider.scrollWidth -
//       slider.parentElement.offsetWidth +
//       100
//     );
//     currentTranslate = Math.max(currentTranslate - slideWidth, maxTranslate);
//     slider.style.transform = `translateX(${currentTranslate}px)`;
//   });

//   // Drag functionality
//   slider.addEventListener("mousedown", (e) => {
//     isDragging = true;
//     slider.style.transition = "none";
//     startX = e.pageX;
//     scrollLeft = currentTranslate;
//   });

//   slider.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX;
//     const walk = x - startX;
//     currentTranslate = scrollLeft + walk;
//     slider.style.transform = `translateX(${currentTranslate}px)`;
//   });

//   slider.addEventListener("mouseup", () => {
//     isDragging = false;
//     slider.style.transition =
//       "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

//     // Snap to bounds
//     const maxTranslate = -(
//       slider.scrollWidth -
//       slider.parentElement.offsetWidth +
//       100
//     );
//     if (currentTranslate > 0) currentTranslate = 0;
//     if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;
//     slider.style.transform = `translateX(${currentTranslate}px)`;
//   });

//   slider.addEventListener("mouseleave", () => {
//     if (isDragging) {
//       isDragging = false;
//       slider.style.transition =
//         "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

//       const maxTranslate = -(
//         slider.scrollWidth -
//         slider.parentElement.offsetWidth +
//         100
//       );
//       if (currentTranslate > 0) currentTranslate = 0;
//       if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;
//       slider.style.transform = `translateX(${currentTranslate}px)`;
//     }
//   });

//   // Touch support
//   slider.addEventListener("touchstart", (e) => {
//     isDragging = true;
//     slider.style.transition = "none";
//     startX = e.touches[0].pageX;
//     scrollLeft = currentTranslate;
//   });

//   slider.addEventListener("touchmove", (e) => {
//     if (!isDragging) return;
//     const x = e.touches[0].pageX;
//     const walk = x - startX;
//     currentTranslate = scrollLeft + walk;
//     slider.style.transform = `translateX(${currentTranslate}px)`;
//   });

//   slider.addEventListener("touchend", () => {
//     isDragging = false;
//     slider.style.transition =
//       "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

//     const maxTranslate = -(
//       slider.scrollWidth -
//       slider.parentElement.offsetWidth +
//       100
//     );
//     if (currentTranslate > 0) currentTranslate = 0;
//     if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;
//     slider.style.transform = `translateX(${currentTranslate}px)`;
//   });
// }
// swiper-slider
const impactSwiper = new Swiper(".impact-slider-wrapper", {
  slidesPerView: "auto",
  slidesPerGroup: 1, // <<< slide one card at a time
  spaceBetween: 40,
  grabCursor: false,

  centeredSlides: false,
  initialSlide: 0,
  loop: false,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".impact-slider-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1, // 🔥 FULL WIDTH SLIDE
      spaceBetween: 10,
    },
    480: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
    768: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
  },
});

// Smooth scroll navigation & active state tracking
const navLinks = document.querySelectorAll("nav a");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const allNavLinks = document.querySelectorAll("nav a, .mobile-nav a");
const sections = document.querySelectorAll("section[id], main[id]");

// Smooth scroll on nav click (both desktop and mobile)
allNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Only handle same-page hash links (starting with #)
    // Let cross-page links (like index.html#section) navigate normally
    if (!href || !href.startsWith("#")) {
      return; // Don't prevent default, let browser navigate
    }

    e.preventDefault();
    const targetSection = document.querySelector(href);
    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Update active nav link on scroll
function updateActiveNav() {
  const scrollPos = window.scrollY + 150;

  // Sections where "About" should stay active
  const aboutSections = [
    document.querySelector(".impact-stats-section"),
    document.querySelector(".video-section"),
    document.querySelector(".commitment-section"),
  ];

  // Check if we're in any of the "About" sections
  for (const section of aboutSections) {
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        // We're in an "About" section - keep "About" active
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#hero") {
            link.classList.add("active");
          }
        });
        return; // Exit early, no need to check other sections
      }
    }
  }

  // Default behavior for other sections
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Set active nav based on current page
function setActiveNavByPage() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop() || "index.html";

  // Check if we're on a case study page (in work folder)
  const isWorkPage =
    currentPath.includes("/work/") || currentPage === "work.html";

  allNavLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    // Check if link matches current page
    if (linkHref === currentPage || linkHref.includes(currentPage)) {
      link.classList.add("active");
    }
    // If we're on a case study page, make work.html active
    else if (
      isWorkPage &&
      (linkHref === "work.html" || linkHref === "../work.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Run on page load
setActiveNavByPage();

// Client logos flip animation
const clientBoxes = document.querySelectorAll(".client-box");
let availableBoxes = [...clientBoxes];

function flipRandomClient() {
  if (clientBoxes.length === 0) return;

  // If all boxes have been flipped, reset the pool
  if (availableBoxes.length === 0) {
    availableBoxes = [...clientBoxes];
  }

  // Pick a random box from available ones (ensures all cards get flipped)
  const randomIndex = Math.floor(Math.random() * availableBoxes.length);
  const box = availableBoxes[randomIndex];
  if (!box) return;

  // Remove from available pool
  availableBoxes.splice(randomIndex, 1);

  // Skip if already flipping
  if (box.classList.contains("flipping")) return;

  // Add flipping class
  box.classList.add("flipping");

  // Keep flipped for a random duration (3-6 seconds) before flipping back
  const flipDuration = 3000 + Math.random() * 3000;
  setTimeout(() => {
    box.classList.remove("flipping");
  }, flipDuration);
}

// Start flipping at random intervals
function scheduleNextFlip() {
  const delay = 600 + Math.random() * 700;
  setTimeout(() => {
    flipRandomClient();
    scheduleNextFlip();
  }, delay);
}

// Start the animation after a short delay
setTimeout(scheduleNextFlip, 1500);

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".form-submit");
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = "<span>Sending...</span>";
    submitBtn.disabled = true;
    formMessage.className = "form-message";
    formMessage.style.display = "none";

    try {
      const formData = new FormData(contactForm);

      const response = await fetch("send-mail.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        formMessage.className = "form-message success";
        formMessage.textContent = result.message;
        formMessage.style.display = "block";
        contactForm.reset();

        // Scroll to message
        formMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        formMessage.className = "form-message error";
        formMessage.textContent =
          result.message || "Something went wrong. Please try again.";
        formMessage.style.display = "block";
      }
    } catch (error) {
      formMessage.className = "form-message error";
      formMessage.textContent =
        "Network error. Please check your connection and try again.";
      formMessage.style.display = "block";
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// ========== COMMITMENT HEADING WORD-BY-WORD FILL ANIMATION ==========
// function initCommitmentWordFill() {
//   gsap.registerPlugin(ScrollTrigger);

//   const section = document.querySelector(".commitment-section");
//   const heading = document.querySelector(".commitment-heading");
//   if (!section || !heading) return;

//   // Prevent double-init
//   if (heading.dataset.wordfillInit === "1") return;
//   heading.dataset.wordfillInit = "1";

//   // Save original (optional)
//   const originalHTML = heading.innerHTML;

//   // Build word spans while preserving inline elements if needed
//   const processNode = (node) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       return (node.textContent || "")
//         .split(/\s+/)
//         .filter(Boolean)
//         .map((w) => ({ text: w }));
//     }
//     if (node.nodeType === Node.ELEMENT_NODE) {
//       const el = node;
//       return (el.textContent || "")
//         .split(/\s+/)
//         .filter(Boolean)
//         .map((w) => ({
//           text: w,
//           element: el.cloneNode(false),
//         }));
//     }
//     return [];
//   };

//   const allWords = [];
//   Array.from(heading.childNodes).forEach((child) =>
//     allWords.push(...processNode(child)),
//   );

//   heading.innerHTML = "";

//   allWords.forEach((info, i) => {
//     const span = document.createElement("span");
//     span.className = "word-fill";
//     span.style.display = "inline-block";
//     span.style.color = "#919191";

//     if (info.element) {
//       const inner = info.element.cloneNode(false);
//       inner.textContent = info.text;
//       span.appendChild(inner);
//     } else {
//       span.textContent = info.text;
//     }

//     heading.appendChild(span);
//     if (i < allWords.length - 1)
//       heading.appendChild(document.createTextNode(" "));
//   });

//   const wordEls = heading.querySelectorAll(".word-fill");
//   const total = wordEls.length;

//   ScrollTrigger.create({
//     trigger: section,
//     start: "top 80%", // later start
//     end: "bottom 75%", // longer range = smoother word-by-word
//     scrub: 1, // keep 1–2 for crispness (avoid 4+ if it feels “laggy”)
//     onUpdate(self) {
//       const p = self.progress;

//       wordEls.forEach((word, index) => {
//         const wordStart = index / total;
//         const wordEnd = (index + 1) / total;

//         let wp = 0;
//         if (p > wordStart) {
//           wp = Math.min(1, (p - wordStart) / (wordEnd - wordStart));
//         }

//         // Interpolate color from gray -> white
//         const v = Math.round(145 + wp * (255 - 145)); // 145(#919191) to 255(#ffffff)
//         gsap.set(word, { color: `rgb(${v},${v},${v})` });
//       });
//     },
//   });

//   // Optional cleanup helper if needed later:
//   // return () => { heading.innerHTML = originalHTML; ScrollTrigger.getAll().forEach(t => t.kill()); };
// }

function initAboutAnimations() {
  var aboutSection = document.querySelector(".commitment-section");
  var aboutText = document.querySelector(".commitment-heading");

  if (!aboutSection || !aboutText) return;

  var textContent = aboutText.textContent.trim().replace(/\s+/g, " ");
  var words = textContent.split(" ").filter(function (word) {
    return word.trim().length > 0;
  });

  aboutText.innerHTML = words
    .map(function (word) {
      return '<span class="about-word">' + word + "</span>";
    })
    .join(" ");

  var wordSpans = aboutText.querySelectorAll(".about-word");
  var totalWords = wordSpans.length;

  // Set initial color
  for (var i = 0; i < totalWords; i++) {
    wordSpans[i].style.color = "rgba(145, 145, 145, 1)";
  }

  // Color update function
  function updateWordColors(progress) {
    for (var i = 0; i < totalWords; i++) {
      var wordStart = i / totalWords;
      var wordEnd = (i + 1) / totalWords;
      var wordProgress = (progress - wordStart) / (wordEnd - wordStart);

      if (wordProgress < 0) wordProgress = 0;
      if (wordProgress > 1) wordProgress = 1;

      var alpha = 0.22 + wordProgress * 0.78;
      wordSpans[i].style.color =
        "rgba(255, 255, 255, " + alpha.toFixed(2) + ")";
    }
  }

  var lastProgress = -1;

  ScrollTrigger.create({
    trigger: aboutSection,
    start: "top 60%",
    end: "bottom 85%",
    onUpdate: function (self) {
      var progress = self.progress;
      if (Math.abs(progress - lastProgress) < 0.005) return;
      lastProgress = progress;
      updateWordColors(progress);
    },
  });
}

document.addEventListener("DOMContentLoaded", initAboutAnimations);

// ========== CULTURE SLIDER WITH AUTO-WIDTH IMAGES ==========
function initCultureSlider() {
  const track = document.querySelector(".culture-slider-track");
  if (!track) return;

  const images = track.querySelectorAll(".culture-image");
  if (images.length === 0) return;

  // Number of unique images (before duplication)
  const uniqueImageCount = images.length / 2;

  // Wait for all images to load
  const imageElements = Array.from(images)
    .slice(0, uniqueImageCount)
    .map((wrapper) => wrapper.querySelector("img"));

  Promise.all(
    imageElements.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }),
  ).then(() => {
    // Calculate the total width of first set of images
    let totalWidth = 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;

    for (let i = 0; i < uniqueImageCount; i++) {
      totalWidth += images[i].getBoundingClientRect().width;
    }

    // Add gaps (there are uniqueImageCount - 1 gaps between images, plus 1 gap before the duplicate set)
    totalWidth += gap * uniqueImageCount;

    // Create dynamic keyframe animation
    const styleId = "culture-scroll-animation";
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Update the keyframe with calculated width
    styleEl.textContent = `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth}px);
        }
      }
    `;

    // Apply animation to track
    track.style.animation = "scroll 50s linear infinite";
  });
}

// Initialize culture slider
if (document.querySelector(".culture-slider-track")) {
  initCultureSlider();
}

// ========== TEAM SHOWCASE ==========

// ========== TEAM ALTERNATIVE SCROLL EFFECT ==========

document.addEventListener("DOMContentLoaded", function () {
  const nameItems = document.querySelectorAll(".team-alt-name-item");
  const images = document.querySelectorAll(".team-alt-image");

  if (nameItems.length === 0 || images.length === 0) return;

  let currentActiveIndex = -1;
  let ticking = false;

  // Function to update active name and image
  function updateActiveState(index) {
    if (index === currentActiveIndex) return;
    currentActiveIndex = index;

    // Remove all active states
    nameItems.forEach((item) => item.classList.remove("in-view"));
    images.forEach((img) => img.classList.remove("active"));

    // Add active state to current index
    if (index >= 0 && index < nameItems.length) {
      nameItems[index].classList.add("in-view");
      images[index].classList.add("active");
    }
  }

  // Function to find and activate closest name to viewport center
  function findAndActivateClosest() {
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    nameItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    updateActiveState(closestIndex);
  }

  // Use requestAnimationFrame for smooth updates
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        findAndActivateClosest();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Scroll event listener with passive flag for better performance
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Also update on resize to handle viewport changes
  window.addEventListener("resize", handleScroll, { passive: true });

  // Initial state
  findAndActivateClosest();
});

// ========== CTA PAGE ANIMATIONS ==========
document.addEventListener("DOMContentLoaded", function () {
  // CTA Animation Setup
  const headingWrapper = document.querySelector(".cta-heading-wrapper");
  const line1 = document.querySelector(".cta-heading-line1");
  const line2 = document.querySelector(".cta-heading-line2");
  const buttonContainer = document.querySelector(".cta-button-container");
  const startButton = document.getElementById("startButton");
  const twoColumn = document.querySelector(".cta-two-column");
  const leftColumn = document.querySelector(".cta-left-column");
  const rightColumn = document.querySelector(".cta-right-column");

  // Chat elements
  const chatMessages = document.getElementById("chatMessages");
  const chatAssistantBtn = document.getElementById("chatAssistantBtn");
  const sendEmailBtn = document.getElementById("sendEmailBtn");
  const chatContainer = document.querySelector(".chat-container");
  const chatInputWrapper = document.getElementById("chatInputWrapper");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  let animationTriggered = false;

  // ========== AI CHAT STATE ==========
  let chatState = {
    mode: null, // 'assistant' | 'email' | null
    history: [], // Conversation history for AI
    leadCapture: {
      name: "",
      email: "",
      emailSent: false, // Track if we already sent lead notification
    },
    pendingCalendar: false, // Track if we're waiting for email for calendar invite
    calendarSent: false, // Track if calendar invite already sent
    chatEnded: false, // Track if chat has ended (calendar sent or completed)
    isProcessing: false,
    userTimezone: null, // IANA timezone string (e.g., 'America/New_York')
    userCountry: null, // Country name from IP geolocation
    userCity: null, // City name from IP geolocation
  };

  // Detect user timezone + location via IP geolocation (ip-api.com, free, no key)
  // Falls back to browser Intl API if request fails
  (async function detectTimezone() {
    try {
      const resp = await fetch(
        "http://ip-api.com/json/?fields=status,country,city,timezone",
        { signal: AbortSignal.timeout(3000) },
      );
      const data = await resp.json();
      if (data.status === "success" && data.timezone) {
        chatState.userTimezone = data.timezone;
        chatState.userCountry = data.country || null;
        chatState.userCity = data.city || null;
        console.log(
          "[Chat] IP timezone:",
          data.timezone,
          "| Location:",
          data.city,
          data.country,
        );
      } else {
        throw new Error("IP lookup failed");
      }
    } catch (e) {
      // Fallback to browser Intl API
      try {
        chatState.userTimezone =
          Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(
          "[Chat] Fallback browser timezone:",
          chatState.userTimezone,
        );
      } catch (e2) {
        chatState.userTimezone = null;
      }
    }
  })();

  // Parse basic markdown to HTML for bot messages
  function parseMarkdown(text) {
    // Escape HTML first to prevent XSS
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold: **text**
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Italic: *text* (but not inside words or already processed strong tags)
    html = html.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, "<em>$1</em>");

    // Split into lines, filter out empty lines between list items
    const lines = html.split("\n");
    let result = [];
    let inOl = false;
    let inUl = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const olMatch = line.match(/^\d+\.\s+(.+)/);
      const ulMatch = line.match(/^[-•]\s+(.+)/);

      // Skip blank lines if we're inside a list and next non-blank line is also a list item
      if (line === "" && (inOl || inUl)) {
        let hasMoreItems = false;
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine === "") continue;
          if (inOl && nextLine.match(/^\d+\.\s+/)) hasMoreItems = true;
          if (inUl && nextLine.match(/^[-•]\s+/)) hasMoreItems = true;
          break;
        }
        if (hasMoreItems) continue; // Skip blank line between list items
      }

      if (olMatch) {
        if (!inOl) {
          result.push("<ol>");
          inOl = true;
        }
        result.push("<li>" + olMatch[1] + "</li>");
      } else if (ulMatch) {
        if (!inUl) {
          result.push("<ul>");
          inUl = true;
        }
        result.push("<li>" + ulMatch[1] + "</li>");
      } else {
        if (inOl) {
          result.push("</ol>");
          inOl = false;
        }
        if (inUl) {
          result.push("</ul>");
          inUl = false;
        }
        if (line === "") {
          result.push("<br>");
        } else {
          result.push(line);
        }
      }
    }
    if (inOl) result.push("</ol>");
    if (inUl) result.push("</ul>");

    return result.join(" ").replace(/(<br>\s*){3,}/g, "<br><br>");
  }

  // Detect name from AI response when it acknowledges a name
  function detectNameFromResponse(response, userMessage) {
    // Check if AI acknowledged a name like "Nice to meet you, John!"
    const namePatterns = [
      /nice to meet you,?\s+([A-Z][a-z]+)/i,
      /nice,?\s+([A-Z][a-z]+)!/i,
      /got it,?\s+([A-Z][a-z]+)/i,
      /thanks,?\s+([A-Z][a-z]+)/i,
      /hey,?\s+([A-Z][a-z]+)!/i,
      /hi,?\s+([A-Z][a-z]+)!/i,
    ];

    for (const pattern of namePatterns) {
      const match = response.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  // If no chat elements, nothing to do on this page
  if (!chatMessages) return;

  // ========== CHAT PAGE LANDING (contact.html) ==========
  const chatLanding = document.getElementById("chatLanding");
  const chatPageInterface = document.getElementById("chatPageInterface");
  const promptCards = document.querySelectorAll(".chat-prompt-card");

  function startChatFromLanding(initialMessage, useEmailFlow) {
    if (!chatLanding || !chatPageInterface) return;

    // Reset chat state
    chatState.mode = useEmailFlow ? "email" : "assistant";
    chatState.history = [];
    chatState.leadCapture = { name: "", email: "", emailSent: false };
    chatState.calendarSent = false;
    chatState.calendarFailed = false;
    chatState.pendingCalendar = false;
    chatState.chatEnded = false;

    // Show input
    if (chatInputWrapper) chatInputWrapper.style.display = "flex";

    const chatPageContent = document.querySelector(".chat-page-content");

    if (typeof gsap === "undefined") {
      chatLanding.style.display = "none";
      chatPageInterface.style.display = "flex";
      chatPageContent.classList.add("chat-active");
      if (useEmailFlow) {
        launchEmailFlow(initialMessage);
      } else {
        const greeting = "Hello, how can I assist you today?";
        addBotMessage(greeting);
        chatState.history.push({ role: "assistant", content: greeting });
        if (initialMessage) {
          addUserMessage(initialMessage);
          handleAIChatMessage(initialMessage);
        }
      }
      return;
    }

    // Fade out entire landing
    gsap.to(chatLanding, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => {
        chatLanding.style.display = "none";
        chatPageInterface.style.display = "flex";
        chatPageContent.classList.add("chat-active");

        if (useEmailFlow) {
          launchEmailFlow(initialMessage);
        } else {
          const greeting = "Hello, how can I assist you today?";
          addBotMessage(greeting);
          chatState.history.push({ role: "assistant", content: greeting });
          if (initialMessage) {
            addUserMessage(initialMessage);
            handleAIChatMessage(initialMessage);
          }
        }

        // Fade in chat interface
        gsap.fromTo(
          chatPageInterface,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power1.out" },
        );
      },
    });
  }

  // Quick prompt card clicks — first card triggers email flow, others use AI assistant
  promptCards.forEach((card, index) => {
    card.addEventListener("click", function () {
      const prompt = this.getAttribute("data-prompt");
      const useEmailFlow = index === 0;
      startChatFromLanding(prompt, useEmailFlow);
    });
  });

  // If on chat page and user types directly in input (before picking a prompt)
  if (chatLanding && chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        chatLanding.style.display !== "none"
      ) {
        const msg = chatInput.value.trim();
        if (msg) {
          chatInput.value = "";
          startChatFromLanding(msg);
        }
        e.preventDefault();
      }
    });

    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        if (chatLanding.style.display !== "none") {
          const msg = chatInput.value.trim();
          if (msg) {
            if (_stopMic) _stopMic();
            chatInput.value = "";
            startChatFromLanding(msg);
          }
        }
      });
    }
  }

  // Initialize GSAP
  if (typeof gsap !== "undefined") {
    console.log("GSAP is ready for CTA animations");
  }

  // ── Scroll-down arrow button ──────────────────────────────────────
  if (isChatPage) {
    const chatPageBox = document.querySelector(".chat-page-box");
    const scrollDownBtn = document.createElement("button");
    scrollDownBtn.className = "scroll-down-btn";
    scrollDownBtn.setAttribute("aria-label", "Scroll to bottom");
    scrollDownBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    chatPageBox.appendChild(scrollDownBtn);

    // Track if user manually scrolled up during streaming
    let userScrolledUp = false;

    function updateScrollBtn() {
      if (!chatMessages) return;
      const nearBottom =
        chatMessages.scrollTop + chatMessages.clientHeight >=
        chatMessages.scrollHeight - 30;
      const hasOverflow =
        chatMessages.scrollHeight > chatMessages.clientHeight + 10;
      if (hasOverflow && !nearBottom) {
        scrollDownBtn.classList.add("visible");
        userScrolledUp = true;
      } else {
        scrollDownBtn.classList.remove("visible");
        if (nearBottom) userScrolledUp = false;
      }
    }

    // Throttled scroll — follows text line by line during streaming
    let _scrollThrottle = null;
    window.scrollToLatest = function () {
      if (!chatMessages || userScrolledUp) return;
      if (_scrollThrottle) return;
      _scrollThrottle = setTimeout(() => {
        if (chatMessages && !userScrolledUp) {
          chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: "smooth",
          });
        }
        _scrollThrottle = null;
      }, 60);
    };

    if (chatMessages) {
      chatMessages.addEventListener("scroll", updateScrollBtn);
    }

    scrollDownBtn.addEventListener("click", () => {
      if (chatMessages) {
        chatMessages.scrollTo({
          top: chatMessages.scrollHeight,
          behavior: "smooth",
        });
        userScrolledUp = false;
      }
    });

    // Reset userScrolledUp when new conversation starts
    window.resetScrollState = function () {
      userScrolledUp = false;
    };

    // Update scroll btn when new content is added
    if (chatMessages) {
      new MutationObserver(updateScrollBtn).observe(chatMessages, {
        childList: true,
        subtree: true,
      });
    }
  }

  // ── Fade prompts when typing ──────────────────────────────────────
  if (isChatPage && chatInput) {
    const landingPrompts = document.querySelector(".chat-landing-prompts");
    chatInput.addEventListener("input", function () {
      if (
        !chatLanding ||
        chatLanding.style.display === "none" ||
        !landingPrompts
      )
        return;
      if (this.value.trim()) {
        gsap.to(landingPrompts, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
          pointerEvents: "none",
        });
      } else {
        gsap.to(landingPrompts, {
          opacity: 1,
          duration: 0.25,
          ease: "power1.out",
          pointerEvents: "auto",
        });
      }
    });
  }

  // Check screen width - skip animation on devices below 1160px
  function checkAndSetupLayout() {
    if (isChatPage) return;
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 1160) {
      // Show two-column layout immediately for smaller screens
      animationTriggered = true; // Prevent button animation from triggering

      // Hide the centered heading wrapper
      headingWrapper.style.display = "none";

      // Show two-column layout immediately
      twoColumn.style.visibility = "visible";
      twoColumn.style.opacity = "1";

      // Move heading to left column
      headingWrapper.style.position = "relative";
      headingWrapper.style.top = "auto";
      headingWrapper.style.left = "auto";
      headingWrapper.style.right = "auto";
      headingWrapper.style.transform = "none";
      headingWrapper.style.display = "block";

      // Set responsive font size for mobile
      const targetFontSize = 64;
      line1.style.fontSize = `${targetFontSize}px`;
      line2.style.fontSize = `${targetFontSize}px`;
      line1.style.width = "fit-content";
      line1.style.marginLeft = "0px";
      line1.style.marginRight = "auto";
      line2.style.width = "fit-content";
      line2.style.marginLeft = "0px";
      line2.style.marginRight = "auto";

      // Move heading into left column
      leftColumn.appendChild(headingWrapper);

      // Remove button container
      if (buttonContainer && buttonContainer.parentElement) {
        buttonContainer.remove();
      }
    }
  }

  // Check on load
  checkAndSetupLayout();

  // Recheck on window resize
  window.addEventListener("resize", function () {
    if (!animationTriggered && window.innerWidth < 1160) {
      checkAndSetupLayout();
    }
  });

  // Handle start button click
  // CTA button now redirects to contact.html - transition animation commented out
  /* startButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (animationTriggered) return;

        animationTriggered = true;

        if (typeof gsap === 'undefined') return;

        // Disable pointer events
        startButton.style.pointerEvents = 'none';

        // Make two-column visible for position calculation (but keep opacity 0)
        twoColumn.style.visibility = 'visible';
        twoColumn.style.opacity = '0';

        // Create timeline
        const timeline = gsap.timeline();

        // 1. Fade out button
        timeline.to(buttonContainer, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
        });

        // 2. Move heading to left and top, resize font simultaneously
        timeline.to(headingWrapper, {
            top: '32px',
            left: '32px',
            right: 'auto',
            transform: 'translateY(0)',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '-=0.25');

        // Animate margins on individual heading lines for left alignment
        timeline.to([line1, line2], {
            marginLeft: '0px',
            marginRight: 'auto',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '<');

        // Calculate the target font size based on viewport width
        // Formula: clamp(48px, 1.79vw + 29.67px, 64px)
        const viewportWidth = window.innerWidth;
        const calculatedSize = (1.79 * viewportWidth / 100) + 29.67;
        const targetFontSize = Math.max(48, Math.min(64, calculatedSize));

        // Resize font size in parallel - fluid responsive (64px at 1920px, 48px at 1024px)
        timeline.to([line1, line2], {
            fontSize: `${targetFontSize}px`,
            duration: 1.5,
            ease: 'power2.inOut'
        }, '<');

        // 3. Fade in two-column layout
        timeline.to(twoColumn, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                // After animation completes, move heading into left column
                headingWrapper.style.position = 'relative';
                headingWrapper.style.top = 'auto';
                headingWrapper.style.left = 'auto';
                headingWrapper.style.right = 'auto';
                headingWrapper.style.transform = 'none';

                // Keep the h2 styles intact (they already have marginLeft: 0px from animation)
                line1.style.width = 'fit-content';
                line1.style.marginLeft = '0px';
                line1.style.marginRight = 'auto';
                line2.style.width = 'fit-content';
                line2.style.marginLeft = '0px';
                line2.style.marginRight = 'auto';

                leftColumn.appendChild(headingWrapper);

                // Remove button container
                if (buttonContainer && buttonContainer.parentElement) {
                    buttonContainer.remove();
                }
            }
        }, '-=0.5');
    }); */

  // Handle Chat Assistant button click
  if (chatAssistantBtn) {
    chatAssistantBtn.addEventListener("click", function () {
      // Set mode to assistant
      chatState.mode = "assistant";
      chatState.history = [];
      chatState.leadCapture = {
        email: "",
        emailSent: false,
      };
      chatState.calendarSent = false;
      chatState.calendarFailed = false;
      chatState.pendingCalendar = false;

      // Hide buttons
      const buttonsContainer = document.querySelector(".chat-buttons");
      if (buttonsContainer) {
        gsap.to(buttonsContainer, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          onComplete: () => {
            buttonsContainer.style.display = "none";

            // Instant greeting - no typing indicator needed
            handleAIChatMessage("hello", true);
          },
        });
      }
    });
  }

  // ========== AI CHAT HANDLER FUNCTIONS ==========

  // Show status indicator while processing
  function showStatusIndicator(text) {
    // Remove existing if any
    hideStatusIndicator();

    const statusDiv = document.createElement("div");
    statusDiv.className = "status-indicator";
    statusDiv.id = "statusIndicator";
    statusDiv.innerHTML = `
            <div class="status-icon"><div class="spinner"></div></div>
            <span class="status-text">${text}</span>
        `;
    chatMessages.appendChild(statusDiv);
  }

  // Hide status indicator
  function hideStatusIndicator() {
    const statusIndicator = document.getElementById("statusIndicator");
    if (statusIndicator) {
      statusIndicator.remove();
    }
  }

  // Main AI chat message handler - simplified, no intent classification for speed
  async function handleAIChatMessage(message, isGreeting = false) {
    chatState.isProcessing = true;

    // Disable input while processing
    chatInput.disabled = true;
    sendBtn.disabled = true;
    chatInput.style.opacity = "0.5";
    sendBtn.style.opacity = "0.5";
    if (_stopMic) _stopMic();
    if (micBtn) {
      micBtn.disabled = true;
      micBtn.style.opacity = "0.4";
    }
    sendBtn.style.cursor = "not-allowed";

    try {
      hideTypingIndicator();

      // For greeting, show typing animation then stream the message
      if (isGreeting) {
        const greetings = [
          "Hey 👋 What are you looking to build, improve, or scale right now?",
          "Hey 👋 What are you working on that needs building or improving?",
          "Hey 👋 What's the project you're exploring right now?",
        ];
        const greeting =
          greetings[Math.floor(Math.random() * greetings.length)];

        // Show typing indicator first
        showTypingIndicator();

        // Wait a moment to simulate "thinking"
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Hide typing indicator and create message element
        hideTypingIndicator();

        const messageDiv = document.createElement("div");
        messageDiv.className = "chat-message bot-message";
        if (isChatPage) {
          messageDiv.innerHTML = `<div class="bot-msg-row">${BOT_AVATAR}<div class="bot-msg-content"><p></p><div class="msg-actions"><button class="msg-action-btn copy-btn" title="Copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button><button class="msg-action-btn retry-btn" title="Retry"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg></button></div></div></div>`;
        } else {
          messageDiv.innerHTML = "<p></p>";
        }
        const messageP = messageDiv.querySelector("p");
        chatMessages.appendChild(messageDiv);

        // Stream the greeting character by character
        let charIndex = 0;
        await new Promise((resolve) => {
          const streamInterval = setInterval(() => {
            if (charIndex < greeting.length) {
              messageP.textContent += greeting[charIndex];
              charIndex++;
            } else {
              clearInterval(streamInterval);
              resolve();
            }
          }, 20); // 20ms per character for smooth streaming
        });

        if (isChatPage) attachMsgActions(messageDiv);

        // Add to history
        chatState.history.push({ role: "assistant", content: greeting });
      } else {
        // For user messages, call the AI
        await streamResponse("general_chat", {}, message, isGreeting);
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      hideTypingIndicator();
    } finally {
      chatState.isProcessing = false;
      if (isGreeting) {
        chatInputWrapper.style.display = "block";
        gsap.from(chatInputWrapper, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        });
      }
      enableInput();
    }
  }

  // Stream response from AI with typing indicator animation
  async function streamResponse(intent, parameters, userMessage, isGreeting) {
    return new Promise((resolve, reject) => {
      // Show typing indicator first (like email flow)
      showTypingIndicator();

      let messageDiv = null;
      let messageP = null;
      let fullResponse = "";
      let hasReceivedContent = false;
      let displayedLength = 0;
      let streamInterval = null;

      // Timeout handler
      const responseTimeout = setTimeout(() => {
        if (!hasReceivedContent) {
          hideTypingIndicator();
          if (!messageDiv) {
            addBotMessage(
              "Connection timed out. Want to try again, or reach out at hello@alphaventure.com?",
            );
          }
          resolve();
        }
      }, 30000);

      let streamComplete = false;
      let pendingCalendarTag = false;
      let pendingRescheduleTag = false;

      // Function to animate text display character by character (like greeting)
      function animateText() {
        if (displayedLength < fullResponse.length) {
          displayedLength += 2;
          if (displayedLength > fullResponse.length)
            displayedLength = fullResponse.length;
          messageP.innerHTML = parseMarkdown(
            fullResponse.substring(0, displayedLength),
          );
          if (window.scrollToLatest) window.scrollToLatest();
        } else if (streamComplete && displayedLength >= fullResponse.length) {
          // Animation complete - now handle post-stream actions
          clearInterval(streamInterval);

          // Final parse to ensure complete markdown rendering
          messageP.innerHTML = parseMarkdown(fullResponse);

          // Attach copy action and show actions for chat page
          if (isChatPage && messageDiv) {
            attachMsgActions(messageDiv);
            const actionsEl = messageDiv.querySelector(".msg-actions");
            if (actionsEl) {
              actionsEl.style.opacity = "1";
              actionsEl.style.pointerEvents = "";
            }
          }

          // UPDATE HISTORY
          if (fullResponse) {
            if (!isGreeting) {
              chatState.history.push({ role: "user", content: userMessage });
            }
            chatState.history.push({
              role: "assistant",
              content: fullResponse,
            });
            console.log("History updated, count:", chatState.history.length);

            // Detect and store name from AI response
            if (!chatState.leadCapture.name) {
              const detectedName = detectNameFromResponse(
                fullResponse,
                userMessage,
              );
              if (detectedName) {
                chatState.leadCapture.name = detectedName;
                console.log("Name detected and stored:", detectedName);
              }
            }
          }

          // Trigger calendar invite if tag was present and we have email
          if (
            pendingCalendarTag &&
            chatState.leadCapture.email &&
            !chatState.calendarSent
          ) {
            console.log("Calendar invite triggered after animation");
            setTimeout(() => {
              sendCalendarInvite(chatState.leadCapture.email);
            }, 500);
          }

          // Send reschedule request notification to team
          if (pendingRescheduleTag && chatState.leadCapture.email) {
            console.log("Reschedule request triggered after animation");
            sendRescheduleRequest(chatState.leadCapture.email);
          }

          resolve();
        }
      }

      // Create EventSource-like fetch for SSE
      fetch("api/chat-response.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: intent,
          parameters: parameters,
          message: userMessage,
          history: chatState.history,
          stored_name: chatState.leadCapture.name || "",
          stored_email: chatState.leadCapture.email || "",
          calendar_failed: chatState.calendarFailed || false,
          user_timezone: chatState.userTimezone || "",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            clearTimeout(responseTimeout);
            hideTypingIndicator();
            addBotMessage("Something went wrong on my end. Want to try again?");
            resolve();
            return;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          function processStream() {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  clearTimeout(responseTimeout);

                  // Mark stream complete - let animation handle the rest
                  if (!streamComplete) {
                    streamComplete = true;
                  }

                  // If no content received at all, show error
                  if (!hasReceivedContent && !fullResponse) {
                    hideTypingIndicator();
                    addBotMessage(
                      "Didn't catch that. What are you looking to build or improve?",
                    );
                    resolve();
                  }

                  // Check for calendar intent in response (for chatState tracking)
                  if (fullResponse) {
                    const askingForEmail =
                      /email.*calendar|calendar.*email|send.*invite|what('s| is) your email/i.test(
                        fullResponse,
                      );
                    if (askingForEmail && !chatState.calendarSent) {
                      chatState.pendingCalendar = true;
                    }
                  }

                  // Animation will call resolve() when complete
                  return;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop();

                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    const data = line.slice(6).trim();

                    if (data === "[DONE]") {
                      clearTimeout(responseTimeout);

                      // Check for tags BEFORE cleaning
                      pendingCalendarTag =
                        fullResponse.includes("[CALENDAR_INVITE]");
                      pendingRescheduleTag = fullResponse.includes(
                        "[RESCHEDULE_REQUEST]",
                      );

                      // Clean any tags from display
                      fullResponse = fullResponse
                        .replace(/\[CALENDAR_INVITE\]/g, "")
                        .replace(/\[RESCHEDULE_REQUEST\]/g, "")
                        .trim();

                      // Mark stream as complete - let animation finish naturally
                      streamComplete = true;

                      // If no content was received, handle error
                      if (!hasReceivedContent) {
                        hideTypingIndicator();
                        addBotMessage(
                          "Didn't catch that. What are you looking to build or improve?",
                        );
                        resolve();
                      }
                      return;
                    }

                    try {
                      const parsed = JSON.parse(data);
                      if (parsed.error) continue;

                      // Check both 'content' and 'reasoning' (zai-glm uses 'reasoning')
                      const content =
                        parsed.choices?.[0]?.delta?.content ||
                        parsed.choices?.[0]?.delta?.reasoning;
                      if (content) {
                        // First content - hide typing, show message bubble
                        if (!hasReceivedContent) {
                          hasReceivedContent = true;
                          hideTypingIndicator();

                          // Create message bubble (like addBotMessage)
                          messageDiv = document.createElement("div");
                          messageDiv.className = "chat-message bot-message";
                          if (isChatPage) {
                            messageDiv.innerHTML = `<div class="bot-msg-row">${BOT_AVATAR}<div class="bot-msg-content"><p></p><div class="msg-actions" style="opacity:0;pointer-events:none;"><button class="msg-action-btn copy-btn" title="Copy">${COPY_ICON}</button></div></div></div>`;
                          } else {
                            messageDiv.innerHTML = "<p></p>";
                          }
                          chatMessages.appendChild(messageDiv);
                          messageP = messageDiv.querySelector("p");

                          // Start character-by-character animation (same as greeting)
                          streamInterval = setInterval(animateText, 12);
                        }

                        fullResponse += content;
                      }
                    } catch (e) {
                      // Skip invalid JSON
                    }
                  }
                }

                processStream();
              })
              .catch((err) => {
                clearTimeout(responseTimeout);
                if (streamInterval) clearInterval(streamInterval);
                hideTypingIndicator();
                if (!fullResponse) {
                  addBotMessage("Connection issue. Want to try that again?");
                }
                resolve();
              });
          }

          processStream();
        })
        .catch((err) => {
          clearTimeout(responseTimeout);
          hideTypingIndicator();
          addBotMessage("Something went wrong. Mind trying again?");
          resolve();
        });
    });
  }

  // Check if email is test/temp/disposable - NEVER send emails to these
  function isTestOrTempEmail(email) {
    email = email.toLowerCase();
    const localPart = email.split("@")[0];
    const domain = email.split("@")[1] || "";

    // Disposable/temp email domains
    const disposableDomains = [
      "tempmail.com",
      "temp-mail.org",
      "guerrillamail.com",
      "guerrillamail.org",
      "mailinator.com",
      "maildrop.cc",
      "fakeinbox.com",
      "throwaway.email",
      "getnada.com",
      "tempail.com",
      "dispostable.com",
      "mailnesia.com",
      "tempmailaddress.com",
      "throwawaymail.com",
      "yopmail.com",
      "sharklasers.com",
      "trashmail.com",
      "mytrashmail.com",
      "10minutemail.com",
      "10minutemail.net",
      "minutemail.com",
      "emailondeck.com",
      "mohmal.com",
      "tempinbox.com",
      "fakemailgenerator.com",
      "emailfake.com",
      "temp.email",
      "tmpmail.org",
      "example.com",
      "test.com",
      "fake.com",
      "invalid.com",
      "none.com",
      "noemail.com",
      "null.com",
      "xyz.com",
      "abc.com",
      "asd.com",
      "asdf.com",
      "temp.com",
    ];

    // Check domain
    if (disposableDomains.includes(domain)) return true;

    // Fake local parts
    const fakeLocalParts = [
      "test",
      "testing",
      "tester",
      "asd",
      "asdf",
      "qwerty",
      "abc",
      "xyz",
      "fake",
      "temp",
      "dummy",
      "sample",
      "null",
      "none",
      "admin",
      "user",
      "example",
      "asdfgh",
    ];
    if (fakeLocalParts.includes(localPart)) return true;

    // Test patterns
    if (/^test\d*$/.test(localPart)) return true;
    if (/^[a-z]$/.test(localPart)) return true; // Single letter
    if (/^\d+$/.test(localPart)) return true; // Numbers only

    return false;
  }

  // Handle AI mode send
  function handleAIModeSend() {
    const message = chatInput.value.trim();
    if (!message || chatInput.disabled || chatState.isProcessing) return;

    if (_stopMic) _stopMic();
    addUserMessage(message);
    chatInput.value = "";

    // Check if user provided an email - just store it, don't auto-trigger calendar
    // AI will ask for preferred day/time and use [CALENDAR_INVITE] tag when ready
    const emailMatch = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    if (emailMatch) {
      const detectedEmail = emailMatch[0];
      const matchIndex = message.indexOf(detectedEmail);
      // Reject if there's a space inside what was typed before the @
      // e.g. "john smith@gmail.com" — the local part has a space, not a valid single email
      const hasSpaceInEmail =
        matchIndex > 0 && /\S/.test(message[matchIndex - 1]);

      if (hasSpaceInEmail) {
        console.log("Email with space detected, NOT storing:", message);
        // Don't store — AI will handle the invalid email response
      } else if (!isTestOrTempEmail(detectedEmail)) {
        chatState.leadCapture.email = detectedEmail;
        console.log("Valid email detected and stored:", detectedEmail);
      } else {
        console.log("Test/temp email detected, NOT storing:", detectedEmail);
      }
      // Don't auto-trigger calendar - let AI ask for day/time first
    }

    // AI chat - let AI respond naturally (typing indicator shown in streamResponse)
    handleAIChatMessage(message);
  }

  // Send calendar invite and notify team
  // GPT-4o extracts lead info from conversation on the backend
  async function sendCalendarInvite(email) {
    chatState.isProcessing = true;
    chatInput.disabled = true;
    sendBtn.disabled = true;
    if (_stopMic) _stopMic();
    if (micBtn) {
      micBtn.disabled = true;
      micBtn.style.opacity = "0.4";
    }

    showTypingIndicator();

    try {
      const response = await fetch("api/chat-calendar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          history: chatState.history,
          user_timezone: chatState.userTimezone || "",
          user_country: chatState.userCountry || "",
          user_city: chatState.userCity || "",
        }),
      });

      const result = await response.json();
      console.log("Calendar API response:", result);

      hideTypingIndicator();

      if (result.success) {
        chatState.calendarSent = true;
        chatState.pendingCalendar = false;
        chatState.calendarFailed = false;
        addBotMessage(
          `Done! I've sent the calendar invite to ${email} for ${result.meeting_date}. Check your inbox — see you soon! 👋`,
        );

        // Add to history
        chatState.history.push({ role: "user", content: email });
        chatState.history.push({
          role: "assistant",
          content: `Calendar invite sent for ${result.meeting_date}`,
        });

        // End the chat - hide input like email flow does
        chatInputWrapper.style.display = "none";
        chatState.chatEnded = true;
      } else if (result.error === "past_date") {
        // Date is in the past - ask for a future date
        chatState.pendingCalendar = true; // Keep waiting for valid date
        addBotMessage(
          `Oops! That date has already passed. What day and time in the future works best for you?`,
        );
        // Add to history so AI knows to ask for new date
        chatState.history.push({
          role: "assistant",
          content: `That date has passed. Please provide a future date.`,
        });
      } else if (result.invalid_email) {
        // Invalid/test/disposable email detected
        chatState.pendingCalendar = true; // Keep waiting for valid email
        addBotMessage(
          `That looks like a test or temporary email. Could you share your actual email address so I can send the calendar invite?`,
        );
      } else {
        console.error("Calendar failed:", result.debug);
        chatState.calendarFailed = true;
        chatState.pendingCalendar = false;
        // Graceful failure - acknowledge and offer alternative
        addBotMessage(
          `Got it! I've noted your email (${email}). Our team will reach out shortly to schedule a call. You can also book directly at calendly.com/alphaventure/strategy or email hello@alphaventure.com. Anything else I can help with?`,
        );

        // Add to history so AI remembers we tried
        chatState.history.push({ role: "user", content: email });
        chatState.history.push({
          role: "assistant",
          content: `Noted email ${email}. Team will reach out to schedule a call.`,
        });
      }
    } catch (error) {
      console.error("Calendar invite error:", error);
      hideTypingIndicator();
      chatState.calendarFailed = true;
      chatState.pendingCalendar = false;
      // Graceful failure with alternative
      addBotMessage(
        `I've saved your email (${email}). Our team will follow up to schedule a call, or you can book directly at calendly.com/alphaventure/strategy. What else can I help you with?`,
      );

      // Add to history so AI remembers
      chatState.history.push({ role: "user", content: email });
      chatState.history.push({
        role: "assistant",
        content: `Saved email ${email}. Team will follow up for scheduling.`,
      });
    } finally {
      chatState.isProcessing = false;
      // Only re-enable input if chat hasn't ended
      if (!chatState.chatEnded) {
        enableInput();
      }
    }
  }

  // Send reschedule request notification to team
  async function sendRescheduleRequest(email) {
    try {
      const response = await fetch("api/chat-reschedule.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          history: chatState.history,
          user_timezone: chatState.userTimezone || "",
          user_country: chatState.userCountry || "",
          user_city: chatState.userCity || "",
        }),
      });
      const result = await response.json();
      console.log("Reschedule request sent:", result);
    } catch (error) {
      console.error("Reschedule request error:", error);
    }
  }

  // Handle send button click for AI mode
  if (sendBtn && chatInput) {
    sendBtn.addEventListener(
      "click",
      function (e) {
        // Check if in AI assistant mode (not email flow)
        if (chatState.mode === "assistant") {
          e.stopImmediatePropagation();
          handleAIModeSend();
        }
      },
      true,
    );

    chatInput.addEventListener(
      "keypress",
      function (e) {
        if (
          e.key === "Enter" &&
          !e.shiftKey &&
          chatState.mode === "assistant"
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleAIModeSend();
        }
      },
      true,
    );
  }

  // ========== EMAIL FLOW HANDLER ==========

  function launchEmailFlow(initialMessage) {
    chatState.mode = "email";
    emailFlowState = {
      step: 0,
      name: "",
      email: "",
      phone: "",
      company: "",
      building: "",
      project: "",
    };

    const greeting = "Hello, how can I assist you today?";
    addBotMessage(greeting);
    chatState.history.push({ role: "assistant", content: greeting });

    if (initialMessage) addUserMessage(initialMessage);
    showTypingIndicator();

    const initialMessages = [
      "Great! Let's get started. " + randomPick(questionVariations.name),
      "Awesome! I'd love to learn more about you. " +
        randomPick(questionVariations.name),
      "Perfect! Let me gather a few details. " +
        randomPick(questionVariations.name),
    ];
    setTimeout(() => {
      hideTypingIndicator();
      streamBotMessage(randomPick(initialMessages), () => {
        emailFlowState.step = 1;
        chatInput.placeholder = "Enter your name...";
        chatInput.type = "text";
        enableInput();
      });
    }, 1200);
  }

  // Email flow state tracking
  let emailFlowState = {
    step: 0,
    name: "",
    email: "",
    phone: "",
    company: "",
    building: "",
    project: "",
  };

  // Common greetings to detect
  const greetings = [
    "hi",
    "hello",
    "hey",
    "hii",
    "hiii",
    "hiiii",
    "helo",
    "hellow",
    "yo",
    "sup",
    "whatsup",
    "what's up",
    "wassup",
    "howdy",
    "good morning",
    "good afternoon",
    "good evening",
    "morning",
    "greetings",
    "salaam",
    "salam",
    "assalam",
    "aoa",
    "asc",
  ];

  // Common affirmative/filler responses (not actual answers)
  const fillerResponses = [
    "sure",
    "ok",
    "okay",
    "yes",
    "yeah",
    "yep",
    "yup",
    "ya",
    "yea",
    "alright",
    "fine",
    "cool",
    "great",
    "sounds good",
    "go ahead",
    "proceed",
    "continue",
    "lets go",
    "let's go",
    "start",
    "begin",
    "k",
    "kk",
    "okie",
    "okk",
    "hmm",
    "hm",
    "umm",
    "um",
    "uh",
    "no problem",
    "np",
    "got it",
    "understood",
    "right",
    "correct",
  ];

  // Check if message is just a greeting
  function isGreeting(message) {
    const cleaned = message
      .toLowerCase()
      .trim()
      .replace(/[!.,?]/g, "");
    return greetings.some((g) => cleaned === g || cleaned.startsWith(g + " "));
  }

  // Check if message is just a filler/affirmative (not a real answer)
  function isFillerResponse(message) {
    const cleaned = message
      .toLowerCase()
      .trim()
      .replace(/[!.,?]/g, "");
    return fillerResponses.some(
      (f) => cleaned === f || cleaned.startsWith(f + " "),
    );
  }

  // Extract actual name from common phrases
  function extractName(message) {
    const cleaned = message.trim();
    const lower = cleaned.toLowerCase();

    // Patterns to extract name from
    const patterns = [
      /(?:you can call me|call me|i'?m|i am|my name is|name is|it'?s|this is|i go by)\s+(.+)/i,
      /^(.+?)\s+(?:here|speaking|is my name)$/i,
    ];

    for (const pattern of patterns) {
      const match = cleaned.match(pattern);
      if (match && match[1]) {
        // Clean up the extracted name
        let name = match[1].trim();
        // Remove trailing punctuation
        name = name.replace(/[.,!?]+$/, "").trim();
        // Capitalize first letter of each word
        name = name
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
        return name;
      }
    }

    // If no pattern matched, return the original (cleaned up)
    // Capitalize first letter of each word for names
    return cleaned
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  // Random picker helper
  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Greeting responses
  const greetingResponses = [
    "Hey there! 👋 Let's get started.",
    "Hello! 😊 Nice to hear from you.",
    "Hi! Great to connect with you.",
  ];

  // Question variations for each step
  const questionVariations = {
    name: [
      "What's your name?",
      "May I know your name?",
      "What should I call you?",
    ],
    email: [
      "What's your email address?",
      "Could you share your email?",
      "What email can we reach you at?",
    ],
    phone: [
      "What's your phone number?",
      "Could you share your contact number?",
      "What number can we reach you at?",
    ],
    company: [
      "What's your company name?",
      "Which company are you with?",
      "What company do you represent?",
    ],
    project: [
      "Tell us about your project. What are you trying to build or solve?",
      "What's the project you have in mind? Tell us more.",
      "Share some details about your project. What problem are you solving?",
    ],
  };

  // List of disposable/temporary email domains
  const disposableEmailDomains = [
    "tempmail.com",
    "throwaway.com",
    "guerrillamail.com",
    "mailinator.com",
    "temp-mail.org",
    "10minutemail.com",
    "fakeinbox.com",
    "trashmail.com",
    "yopmail.com",
    "getnada.com",
    "maildrop.cc",
    "dispostable.com",
    "mailnesia.com",
    "tempail.com",
    "mohmal.com",
    "temp-mail.io",
    "emailondeck.com",
    "crazymailing.com",
    "tempmailo.com",
    "tempr.email",
    "discard.email",
    "discardmail.com",
    "spamgourmet.com",
    "mytrashmail.com",
    "mailcatch.com",
    "jetable.org",
    "bugmenot.com",
    "mintemail.com",
    "sharklasers.com",
    "guerrillamail.info",
    "grr.la",
    "spam4.me",
    "tempmailaddress.com",
    "fakemailgenerator.com",
    "tempinbox.com",
    // Common fake/test domains
    "temp.com",
    "test.com",
    "fake.com",
    "example.com",
    "null.com",
    "abc.com",
    "xyz.com",
    "asdf.com",
    "qwerty.com",
  ];

  // Fake/test local parts (before the @)
  const fakeLocalParts = [
    "test",
    "testing",
    "tester",
    "test123",
    "temp",
    "temporary",
    "asd",
    "asdf",
    "asdfgh",
    "abc",
    "xyz",
    "fake",
    "dummy",
    "qwerty",
    "admin",
    "user",
    "sample",
    "demo",
    "null",
    "none",
    "noemail",
    "na",
    "no",
    "nope",
    "x",
    "xx",
    "xxx",
  ];

  // Common legitimate email domains
  const legitimateDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
    "mail.com",
    "gmx.com",
    "yandex.com",
    "fastmail.com",
    "hey.com",
    "pm.me",
    "tutanota.com",
    "msn.com",
    "comcast.net",
    "verizon.net",
    "att.net",
    "sbcglobal.net",
    "bellsouth.net",
    "cox.net",
    "earthlink.net",
    "juno.com",
    "netzero.net",
  ];

  // Common valid TLDs for business emails
  const validBusinessTLDs = [
    "com",
    "org",
    "net",
    "io",
    "co",
    "ai",
    "app",
    "dev",
    "tech",
    "cloud",
    "digital",
    "agency",
    "studio",
    "design",
    "solutions",
    "consulting",
    "services",
    "software",
    "systems",
    "group",
    "edu",
    "gov",
    "mil",
    "int",
    "biz",
    "info",
    "pro",
    "name",
    "uk",
    "us",
    "ca",
    "au",
    "de",
    "fr",
    "es",
    "it",
    "nl",
    "be",
    "ch",
    "at",
    "se",
    "no",
    "dk",
    "fi",
    "pl",
    "ru",
    "jp",
    "cn",
    "kr",
    "in",
    "br",
    "mx",
    "ar",
    "za",
    "ae",
    "sa",
    "pk",
    "sg",
    "hk",
    "tw",
    "nz",
    "ie",
    "pt",
    "gr",
    "cz",
    "hu",
    "ro",
    "bg",
    "hr",
    "sk",
    "si",
    "rs",
    "ua",
    "tr",
    "il",
    "eg",
    "ng",
    "ke",
    "co.uk",
    "co.in",
    "co.jp",
    "co.nz",
    "co.za",
    "com.au",
    "com.br",
    "com.mx",
    "com.ar",
    "com.pk",
    "com.sa",
    "com.eg",
    "com.ng",
  ];

  // Email validation function
  function validateEmail(email) {
    // Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: "Please enter a valid email address with @ symbol.",
      };
    }

    // Extract domain and parts
    const domain = email.split("@")[1].toLowerCase();
    const domainParts = domain.split(".");
    const tld = domainParts.slice(-1)[0];
    const domainName = domainParts[0];

    // Check for disposable email domains
    if (
      disposableEmailDomains.some(
        (d) => domain === d || domain.endsWith("." + d),
      )
    ) {
      return {
        valid: false,
        message: "Please use a non-temporary email address.",
      };
    }

    // Check for common patterns of random/fake emails
    const localPart = email.split("@")[0].toLowerCase();

    // Check for fake/test local parts
    if (fakeLocalParts.includes(localPart)) {
      return {
        valid: false,
        message:
          "That looks like a test email. Please enter your real email address.",
      };
    }

    // Check for test patterns like test123, temp456
    if (/^(test|temp|fake|demo)\d*$/.test(localPart)) {
      return {
        valid: false,
        message:
          "That looks like a test email. Please enter your real email address.",
      };
    }

    // Check if local part has too many consecutive numbers at end
    if (/\d{4,}$/.test(localPart)) {
      return { valid: false, message: "Please use your real email address." };
    }

    // Check for very short domains (likely fake)
    if (domain.length < 4) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    // If it's a known legitimate domain, accept it
    if (legitimateDomains.includes(domain)) {
      return { valid: true };
    }

    // Check if TLD is valid
    const fullTld =
      domainParts.length > 2 ? domainParts.slice(-2).join(".") : tld;
    if (
      !validBusinessTLDs.includes(tld) &&
      !validBusinessTLDs.includes(fullTld)
    ) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    // Check for random-looking domain names (gibberish detection)
    // A domain is suspicious if:
    // 1. It has no vowels (except for very short domains like 'xyz')
    // 2. It has too many consonants in a row (more than 4)
    // 3. It's very short with random characters

    const vowels = "aeiou";
    const hasVowel = [...domainName].some((c) => vowels.includes(c));
    const consonantStreak = domainName.match(/[bcdfghjklmnpqrstvwxyz]{5,}/i);

    // Check for random character patterns
    if (domainName.length >= 4 && domainName.length <= 10) {
      // No vowels in a domain of 4+ characters is suspicious
      if (!hasVowel && domainName.length > 3) {
        return {
          valid: false,
          message: "Please enter a valid business email address.",
        };
      }

      // Too many consonants in a row
      if (consonantStreak) {
        return {
          valid: false,
          message: "Please enter a valid business email address.",
        };
      }

      // Check vowel-to-consonant ratio (very low ratio = likely gibberish)
      const vowelCount = [...domainName].filter((c) =>
        vowels.includes(c),
      ).length;
      const ratio = vowelCount / domainName.length;

      // If less than 15% vowels in a word 5+ chars, likely random
      if (domainName.length >= 5 && ratio < 0.15) {
        return {
          valid: false,
          message: "Please enter a valid business email address.",
        };
      }
    }

    return { valid: true };
  }

  // Name validation function
  function validateName(name) {
    // Remove extra spaces
    const cleanName = name.trim();

    // Check if name is too short
    if (cleanName.length < 2) {
      return { valid: false, message: "Please enter your full name." };
    }

    // Check for numbers - not allowed in names
    if (/\d/.test(cleanName)) {
      return {
        valid: false,
        message: "Name should only contain letters, not numbers.",
      };
    }

    // Check if name contains only letters, spaces, hyphens, and apostrophes
    // This allows names like "Mary-Jane", "O'Connor", "Jean Pierre"
    if (!/^[a-zA-Z\s\-']+$/.test(cleanName)) {
      return {
        valid: false,
        message: "Please enter a valid name using letters only.",
      };
    }

    // Check if at least some letters are present
    if (!/[a-zA-Z]/.test(cleanName)) {
      return { valid: false, message: "Please enter your actual name." };
    }

    return { valid: true };
  }

  // Handle Send Email button click
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", function () {
      // Set mode to email (not assistant)
      chatState.mode = "email";

      // Reset email flow state
      emailFlowState = {
        step: 0,
        name: "",
        email: "",
        phone: "",
        company: "",
        building: "",
        project: "",
      };

      // Hide buttons
      const buttonsContainer = document.querySelector(".chat-buttons");
      if (buttonsContainer) {
        gsap.to(buttonsContainer, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          onComplete: () => {
            buttonsContainer.style.display = "none";

            // Show typing indicator
            showTypingIndicator();

            const initialMessages = [
              "Great! Let's get started. " +
                randomPick(questionVariations.name),
              "Awesome! I'd love to learn more about you. " +
                randomPick(questionVariations.name),
              "Perfect! Let me gather a few details. " +
                randomPick(questionVariations.name),
            ];

            // After delay, ask for name
            setTimeout(() => {
              hideTypingIndicator();
              addBotMessage(randomPick(initialMessages));
              emailFlowState.step = 1;

              // Show input area
              chatInputWrapper.style.display = "block";
              chatInput.placeholder = "Enter your name...";
              gsap.from(chatInputWrapper, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power2.out",
              });
            }, 1500);
          },
        });
      }
    });
  }

  // Email flow input handler
  function handleEmailFlowInput(message) {
    // Check for greetings at any step and re-ask the current question
    if (isGreeting(message)) {
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        let response = randomPick(greetingResponses) + " ";
        switch (emailFlowState.step) {
          case 1:
            response += randomPick(questionVariations.name);
            break;
          case 2:
            response += randomPick(questionVariations.email);
            break;
          case 3:
            response += randomPick(questionVariations.company);
            break;
          case 6:
            response += randomPick(questionVariations.project);
            break;
        }
        streamBotMessage(response, () => enableInput());
      }, 1000);
      return;
    }

    // Check for filler/affirmative responses and re-ask the current question
    if (isFillerResponse(message)) {
      showTypingIndicator();
      const fillerAcknowledgments = [
        "I appreciate that! But I need a bit more info.",
        "Thanks! Let me ask again.",
        "Got it! Just need your actual response.",
      ];
      setTimeout(() => {
        hideTypingIndicator();
        let response = randomPick(fillerAcknowledgments) + " ";
        switch (emailFlowState.step) {
          case 1:
            response += randomPick(questionVariations.name);
            break;
          case 2:
            response += randomPick(questionVariations.email);
            break;
          case 3:
            response += randomPick(questionVariations.company);
            break;
          case 6:
            response += randomPick(questionVariations.project);
            break;
        }
        streamBotMessage(response, () => enableInput());
      }, 1000);
      return;
    }

    switch (emailFlowState.step) {
      case 1: // Name step
        const extractedName = extractName(message);
        const nameValidation = validateName(extractedName);
        if (!nameValidation.valid) {
          showTypingIndicator();
          setTimeout(() => {
            hideTypingIndicator();
            streamBotMessage(nameValidation.message, () => enableInput());
          }, 1000);
          return;
        }
        emailFlowState.name = extractedName;
        showTypingIndicator();
        const nameResponses = [
          `Nice to meet you, ${extractedName}! ${randomPick(questionVariations.email)}`,
          `Great to have you here, ${extractedName}! ${randomPick(questionVariations.email)}`,
          `Thanks, ${extractedName}! ${randomPick(questionVariations.email)}`,
        ];
        setTimeout(() => {
          hideTypingIndicator();
          streamBotMessage(randomPick(nameResponses), () => {
            chatInput.placeholder = "Enter your email...";
            chatInput.type = "email";
            emailFlowState.step = 2;
            enableInput();
          });
        }, 1500);
        break;

      case 2: // Email step
        const emailValidation = validateEmail(message);
        if (!emailValidation.valid) {
          showTypingIndicator();
          setTimeout(() => {
            hideTypingIndicator();
            streamBotMessage(emailValidation.message, () => enableInput());
          }, 1000);
          return;
        }
        emailFlowState.email = message;
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          streamBotMessage(randomPick(questionVariations.company), () => {
            chatInput.placeholder = "Enter your company name...";
            chatInput.type = "text";
            emailFlowState.step = 3;
            enableInput();
          });
        }, 1500);
        break;

      case 3: // Company step
        emailFlowState.company = message;
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          addBotMessageWithOptions("What are you building?", [
            "Product",
            "Brand",
            "Website",
            "Not sure yet",
          ]);
          // Keep input visible but disable it and show hint
          chatInput.placeholder = "Select an option above...";
          chatInput.disabled = true;
          sendBtn.disabled = true;
          if (_stopMic) _stopMic();
          if (micBtn) {
            micBtn.disabled = true;
            micBtn.style.opacity = "0.4";
          }
          chatInput.style.opacity = "0.5";
          sendBtn.style.opacity = "0.5";
          emailFlowState.step = 5;
          // Scroll to bottom to show options
        }, 1500);
        break;

      case 6: // Project step
        emailFlowState.project = message;
        showTypingIndicator();

        // Hide input after final submission
        chatInputWrapper.style.display = "none";

        // Scroll to show typing indicator

        const finalMessages = [
          "Thanks for sharing! Our team will review your request and reach out to you soon. Have a great day! 👋",
          "Perfect! We've got all the details. Someone from our team will be in touch shortly. Talk soon! 👋",
          "Awesome! Thanks for the info. We'll review everything and get back to you very soon. Take care! 👋",
        ];

        setTimeout(() => {
          hideTypingIndicator();
          streamBotMessage(randomPick(finalMessages), () => {
            sendEmailFlowData();
          });
        }, 1500);
        break;
    }
  }

  // Add bot message with clickable options
  function addBotMessageWithOptions(text, options) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message bot-message";

    let optionsHTML = '<div class="chat-options">';
    options.forEach((option) => {
      optionsHTML += `<button class="chat-option-btn" data-value="${option}">${option}</button>`;
    });
    optionsHTML += "</div>";

    if (isChatPage) {
      messageDiv.innerHTML = `<div class="bot-msg-row">${BOT_AVATAR}<div class="bot-msg-content"><p>${text}</p>${optionsHTML}<div class="msg-actions"><button class="msg-action-btn copy-btn" title="Copy">${COPY_ICON}</button></div></div></div>`;
    } else {
      messageDiv.innerHTML = `<p>${text}</p>${optionsHTML}`;
    }
    chatMessages.appendChild(messageDiv);

    // Add click handlers to options
    const optionBtns = messageDiv.querySelectorAll(".chat-option-btn");
    optionBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const value = this.getAttribute("data-value");

        // Disable all option buttons and dim unselected ones
        optionBtns.forEach((b) => {
          b.disabled = true;
          b.style.opacity = "0.4";
          b.style.cursor = "default";
        });

        // Highlight selected option using CSS class
        this.style.opacity = "1";
        this.classList.add("selected");

        // Add user response
        addUserMessage(value);

        // Scroll to show user message

        // Process the selection
        emailFlowState.building = value;
        showTypingIndicator();

        // Scroll again to show typing indicator

        setTimeout(() => {
          hideTypingIndicator();
          streamBotMessage(randomPick(questionVariations.project), () => {
            chatInput.placeholder = "Describe your project...";
            emailFlowState.step = 6;
            enableInput();
          });
        }, 1500);
      });
    });
  }

  // Enable input field
  function enableInput() {
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.style.opacity = "1";
    sendBtn.style.opacity = "1";
    if (micBtn) {
      micBtn.disabled = false;
      micBtn.style.opacity = "1";
    }
    sendBtn.style.cursor = "pointer";
    chatInput.focus();
  }

  // Send email flow data to server
  function sendEmailFlowData() {
    const formData = new FormData();
    formData.append("name", emailFlowState.name);
    formData.append("email", emailFlowState.email);
    formData.append("phone", emailFlowState.phone);
    formData.append("company", emailFlowState.company);
    formData.append("building", emailFlowState.building);
    formData.append("project", emailFlowState.project);
    formData.append("source", "chat_email_flow");

    fetch("send-chat-email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("Email send failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  }

  // Override the send handler when in email flow
  if (sendBtn && chatInput) {
    const originalClickHandler = sendBtn.onclick;

    sendBtn.addEventListener(
      "click",
      function (e) {
        if (emailFlowState.step > 0 && emailFlowState.step !== 5) {
          e.stopImmediatePropagation();
          const message = chatInput.value.trim();
          if (message && !chatInput.disabled) {
            addUserMessage(message);
            chatInput.value = "";

            // Disable input while processing
            chatInput.disabled = true;
            sendBtn.disabled = true;
            chatInput.style.opacity = "0.5";
            if (_stopMic) _stopMic();
            if (micBtn) {
              micBtn.disabled = true;
              micBtn.style.opacity = "0.4";
            }
            sendBtn.style.opacity = "0.5";
            sendBtn.style.cursor = "not-allowed";

            handleEmailFlowInput(message);
          }
        }
      },
      true,
    ); // Use capture phase to run first

    chatInput.addEventListener(
      "keypress",
      function (e) {
        if (
          e.key === "Enter" &&
          !e.shiftKey &&
          emailFlowState.step > 0 &&
          emailFlowState.step !== 5
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const message = chatInput.value.trim();
          if (message && !chatInput.disabled) {
            addUserMessage(message);
            chatInput.value = "";

            // Disable input while processing
            chatInput.disabled = true;
            sendBtn.disabled = true;
            chatInput.style.opacity = "0.5";
            if (_stopMic) _stopMic();
            if (micBtn) {
              micBtn.disabled = true;
              micBtn.style.opacity = "0.4";
            }
            sendBtn.style.opacity = "0.5";
            sendBtn.style.cursor = "not-allowed";

            handleEmailFlowInput(message);
          }
        }
      },
      true,
    ); // Use capture phase to run first
  }

  // COMMENTED OUT: Email form functionality - Planning to use for chat assistant integration
  // // Handle Send Email button click - Flip the container
  // if (sendEmailBtn) {
  //     sendEmailBtn.addEventListener('click', function() {
  //         if (chatContainer) {
  //             chatContainer.classList.add('flipped');

  //             // Show flip back side
  //             const flipBack = document.getElementById('chatFlipBack');
  //             if (flipBack) {
  //                 flipBack.style.display = 'flex';
  //             }

  //             // Set form time for anti-spam
  //             const emailFormTime = document.getElementById('emailFormTime');
  //             if (emailFormTime) {
  //                 emailFormTime.value = Date.now();
  //             }
  //         }
  //     });
  // }

  // // Handle Back to Chat button click - Flip back to chat
  // const backToChatBtn = document.getElementById('backToChatBtn');
  // if (backToChatBtn) {
  //     backToChatBtn.addEventListener('click', function() {
  //         if (chatContainer) {
  //             chatContainer.classList.remove('flipped');

  //             // Hide flip back side after animation
  //             setTimeout(() => {
  //                 const flipBack = document.getElementById('chatFlipBack');
  //                 if (flipBack) {
  //                     flipBack.style.display = 'none';

  //                     // Reset form and show form content again
  //                     const formContent = document.getElementById('formContent');
  //                     const successMessage = document.getElementById('successMessage');
  //                     const emailForm = document.getElementById('emailForm');

  //                     if (formContent) formContent.style.display = 'flex';
  //                     if (successMessage) successMessage.style.display = 'none';
  //                     if (emailForm) emailForm.reset();

  //                     // Reset pill buttons
  //                     const pillBtns = document.querySelectorAll('.pill-btn');
  //                     pillBtns.forEach(btn => btn.classList.remove('active'));

  //                     const buildingInput = document.getElementById('formBuilding');
  //                     if (buildingInput) buildingInput.value = '';
  //                 }
  //             }, 600);
  //         }
  //     });
  // }

  // // Handle pill button clicks
  // const pillBtns = document.querySelectorAll('.pill-btn');
  // const buildingInput = document.getElementById('formBuilding');

  // if (pillBtns.length > 0 && buildingInput) {
  //     pillBtns.forEach(btn => {
  //         btn.addEventListener('click', function() {
  //             // Remove active class from all pills
  //             pillBtns.forEach(b => b.classList.remove('active'));

  //             // Add active class to clicked pill
  //             this.classList.add('active');

  //             // Set hidden input value
  //             buildingInput.value = this.getAttribute('data-value');
  //         });
  //     });
  // }

  // // Handle email form submission
  // const emailForm = document.getElementById('emailForm');
  // if (emailForm) {
  //     emailForm.addEventListener('submit', function(e) {
  //         e.preventDefault();

  //         // Validate building selection
  //         const buildingValue = document.getElementById('formBuilding').value;
  //         if (!buildingValue) {
  //             alert('Please select what you are building');
  //             return;
  //         }

  //         // Simple anti-spam check
  //         const formTimeValue = document.getElementById('emailFormTime').value;
  //         const honeypot = document.getElementById('formWebsite').value;

  //         if (honeypot || !formTimeValue || (Date.now() - parseInt(formTimeValue)) < 3000) {
  //             console.log('Spam detected');
  //             return;
  //         }

  //         // Collect form data
  //         const formData = new FormData(this);

  //         // Submit via fetch
  //         fetch(this.action, {
  //             method: 'POST',
  //             body: formData
  //         })
  //         .then(response => response.json())
  //         .then(data => {
  //             if (data.success) {
  //                 // Fade out form
  //                 const formContent = document.getElementById('formContent');
  //                 const successMessage = document.getElementById('successMessage');

  //                 if (formContent && successMessage) {
  //                     gsap.to(formContent, {
  //                         opacity: 0,
  //                         duration: 0.3,
  //                         onComplete: () => {
  //                             formContent.style.display = 'none';
  //                             successMessage.style.display = 'flex';
  //                             gsap.from(successMessage, {
  //                                 opacity: 0,
  //                                 y: 20,
  //                                 duration: 0.5,
  //                                 ease: 'power2.out'
  //                             });
  //                         }
  //                     });
  //                 }
  //             } else {
  //                 alert(data.message || 'Something went wrong. Please try again.');
  //             }
  //         })
  //         .catch(error => {
  //             console.error('Error:', error);
  //             alert('Something went wrong. Please try again.');
  //         });
  //     });
  // }

  // Helper functions
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML =
      '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chatMessages.appendChild(typingDiv);
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  const BOT_AVATAR = `<svg class="bot-avatar" width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="32" fill="white"/><path d="M50.4736 42.9909L45.3173 35.9368C45.029 35.5386 44.4689 35.4287 44.0436 35.6847L43.6605 35.9187C43.4271 36.0609 43.2669 36.2971 43.2207 36.565C43.1746 36.8314 43.2462 37.1063 43.4183 37.3165L48.9593 44.1406C49.1417 44.3635 49.4181 44.4914 49.7009 44.4914C49.7455 44.4914 49.7909 44.4883 49.8363 44.4819C50.1701 44.4345 50.4473 44.2219 50.5796 43.9146C50.711 43.6072 50.6711 43.2611 50.4736 42.9909Z" fill="#F06831"/><path d="M46.1675 33.3068L17.0804 51.2758C16.6359 51.5436 16.15 51.678 15.6632 51.678C15.0833 51.678 14.5162 51.4899 14.0302 51.1153C13.1397 50.4319 12.7892 49.294 13.1261 48.2232L24.2066 13.7188C24.5037 12.8219 25.2596 12.1787 26.1909 12.0317C27.1229 11.8839 28.0397 12.2593 28.5933 13.0234L29.0928 13.6919L28.7288 14.0941C27.7298 15.1782 27.001 16.4362 26.5557 17.8151C26.5015 17.936 26.488 18.0032 26.4609 18.0561L18.3629 44.3134C18.2824 44.635 18.4035 45.0096 18.7006 45.2505C18.9977 45.4916 19.3896 45.5318 19.7266 45.3715L40.6345 33.8292L27.9864 17.1869L27.8549 17.0107C27.8549 17.0107 28.516 15.6547 29.5078 14.6354C29.5134 14.6283 29.5214 14.6211 29.5286 14.614C29.5548 14.5872 29.5803 14.5619 29.6066 14.5358L42.9557 32.6921L45.2498 31.6205C45.7223 31.393 46.2624 31.5676 46.5188 32.0212C46.761 32.4771 46.6128 33.0255 46.1675 33.3068Z" fill="#F06831"/></svg>`;
  const COPY_ICON = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 3H0.75C0.551088 3 0.360322 3.07902 0.21967 3.21967C0.0790178 3.36032 0 3.55109 0 3.75V17.25C0 17.4489 0.0790178 17.6397 0.21967 17.7803C0.360322 17.921 0.551088 18 0.75 18H14.25C14.4489 18 14.6397 17.921 14.7803 17.7803C14.921 17.6397 15 17.4489 15 17.25V3.75C15 3.55109 14.921 3.36032 14.7803 3.21967C14.6397 3.07902 14.4489 3 14.25 3ZM13.5 16.5H1.5V4.5H13.5V16.5ZM18 0.75V14.25C18 14.4489 17.921 14.6397 17.7803 14.7803C17.6397 14.921 17.4489 15 17.25 15C17.0511 15 16.8603 14.921 16.7197 14.7803C16.579 14.6397 16.5 14.4489 16.5 14.25V1.5H3.75C3.55109 1.5 3.36032 1.42098 3.21967 1.28033C3.07902 1.13968 3 0.948912 3 0.75C3 0.551088 3.07902 0.360322 3.21967 0.21967C3.36032 0.0790178 3.55109 0 3.75 0H17.25C17.4489 0 17.6397 0.0790178 17.7803 0.21967C17.921 0.360322 18 0.551088 18 0.75Z" fill="#666666"/></svg>`;

  // Stream bot message character by character, call onDone when finished
  function streamBotMessage(text, onDone) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message bot-message";
    if (isChatPage) {
      messageDiv.innerHTML = `<div class="bot-msg-row">${BOT_AVATAR}<div class="bot-msg-content"><p></p><div class="msg-actions" style="opacity:0;pointer-events:none;"><button class="msg-action-btn copy-btn" title="Copy">${COPY_ICON}</button></div></div></div>`;
    } else {
      messageDiv.innerHTML = "<p></p>";
    }
    chatMessages.appendChild(messageDiv);
    const messageP = messageDiv.querySelector("p");

    let displayed = 0;
    const interval = setInterval(() => {
      displayed += 2;
      if (displayed > text.length) displayed = text.length;
      messageP.innerHTML = parseMarkdown(text.substring(0, displayed));
      if (window.scrollToLatest) window.scrollToLatest();
      if (displayed >= text.length) {
        clearInterval(interval);
        messageP.innerHTML = parseMarkdown(text);
        if (isChatPage) {
          attachMsgActions(messageDiv);
          const actions = messageDiv.querySelector(".msg-actions");
          if (actions) {
            actions.style.opacity = "1";
            actions.style.pointerEvents = "";
          }
        }
        if (onDone) onDone();
      }
    }, 12);
  }

  function addBotMessage(text, hideActions) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message bot-message";
    if (isChatPage) {
      messageDiv.innerHTML = `<div class="bot-msg-row">${BOT_AVATAR}<div class="bot-msg-content"><p>${parseMarkdown(text)}</p><div class="msg-actions" style="${hideActions ? "opacity:0;pointer-events:none;" : ""}"><button class="msg-action-btn copy-btn" title="Copy">${COPY_ICON}</button></div></div></div>`;
    } else {
      messageDiv.innerHTML = `<p>${parseMarkdown(text)}</p>`;
    }
    chatMessages.appendChild(messageDiv);
    if (isChatPage) attachMsgActions(messageDiv);
    return messageDiv;
  }

  function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "user-message";
    messageDiv.innerHTML = `<div class="user-message-pill">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    if (window.resetScrollState) window.resetScrollState();
    // Scroll to bottom — shows user message + space where typing indicator will appear
    setTimeout(() => {
      if (
        chatMessages &&
        chatMessages.scrollHeight > chatMessages.clientHeight
      ) {
        chatMessages.scrollTo({
          top: chatMessages.scrollHeight + 300,
          behavior: "smooth",
        });
      }
    }, 50);
  }

  const COPY_BTN_ORIGINAL = `${COPY_ICON}`;
  const COPY_BTN_DONE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="#F06831" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span style="font-size:var(--alphaai-body-medium);color:#F06831;font-family:'Satoshi',sans-serif;">Copied</span>`;

  function attachMsgActions(messageDiv) {
    const copyBtn = messageDiv.querySelector(".copy-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        if (copyBtn.dataset.copying) return;
        const text = messageDiv.querySelector("p")?.textContent || "";
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.dataset.copying = "1";
          copyBtn.innerHTML = COPY_BTN_DONE;
          copyBtn.style.display = "flex";
          copyBtn.style.alignItems = "center";
          copyBtn.style.gap = "4px";
          setTimeout(() => {
            copyBtn.innerHTML = COPY_BTN_ORIGINAL;
            copyBtn.style.display = "";
            copyBtn.style.alignItems = "";
            copyBtn.style.gap = "";
            delete copyBtn.dataset.copying;
          }, 3000);
        });
      });
    }
  }

  // Mic button — speech to text
  const micBtn = document.getElementById("micBtn");
  const MIC_ICON = micBtn ? micBtn.innerHTML : "";
  const WAVE_HTML = `<span class="mic-waves"><span></span><span></span><span></span><span></span><span></span></span>`;

  let _stopMic = null; // accessible to send button

  if (
    micBtn &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  ) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isListening = false;

    function stopListening() {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.stop();
      }
      isListening = false;
      micBtn.classList.remove("mic-active");
      micBtn.innerHTML = MIC_ICON;
    }

    _stopMic = stopListening;

    let finalTranscript = "";

    micBtn.addEventListener("click", () => {
      if (isListening) {
        stopListening();
        return;
      }

      finalTranscript = "";

      function createRecognition() {
        const rec = new SpeechRecognition();
        rec.lang = "en-US";
        rec.continuous = false; // false — avoids mobile duplicate-word bugs
        rec.interimResults = true;
        rec.maxAlternatives = 1;

        rec.onresult = (event) => {
          let interim = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          console.log(
            "[Mic] result — final:",
            finalTranscript,
            "| interim:",
            interim,
          );
          const text = finalTranscript + interim;
          if (chatInput && text) {
            chatInput.value = text;
            chatInput.dispatchEvent(new Event("input"));
            try {
              chatInput.scrollLeft = chatInput.scrollWidth;
            } catch (err) {}
            chatInput.focus();
          }
        };

        rec.onend = () => {
          console.log("[Mic] onend — isListening:", isListening);
          if (isListening) {
            // Session ended (normal for continuous=false after each utterance).
            // Create a fresh instance to keep listening — finalTranscript carries over.
            try {
              recognition = createRecognition();
              recognition.start();
            } catch (err) {
              stopListening();
            }
          }
        };

        rec.onerror = (event) => {
          console.log("[Mic] error:", event.error);
          if (event.error !== "no-speech" && event.error !== "aborted")
            stopListening();
        };

        return rec;
      }

      recognition = createRecognition();
      recognition.start();
      isListening = true;
      micBtn.classList.add("mic-active");
      micBtn.innerHTML = WAVE_HTML;
    });
  }

  function scrollToBottom() {
    if (chatMessages) {
      if (isChatPage) {
        // On chat page, scroll the window to the last message
        const lastChild = chatMessages.lastElementChild;
        if (lastChild) {
          lastChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        chatMessages.scrollTo({
          top: chatMessages.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }
});

/* ========== PROCESS STICKY SECTION ANIMATION ========== */
// Sticky scroll animation for process section
// - Content items scroll up attached to mouse scroll
// - Only one item visible at a time (full height, centered)
// - Videos change based on which item is in view
// - Disabled on tablet and mobile devices (≤1024px) where grid layout is used
document.addEventListener("DOMContentLoaded", function () {
  const processStickySection = document.querySelector(
    ".process-sticky-section",
  );
  const processStickyContainer = document.querySelector(
    ".process-sticky-container",
  );
  const processContentItemsWrapper = document.querySelector(
    ".process-content-items",
  );
  const processContentItems = document.querySelectorAll(
    ".process-content-item",
  );
  const processVideos = document.querySelectorAll(".process-video");

  if (
    !processStickySection ||
    !processStickyContainer ||
    !processContentItems.length
  )
    return;

  // Skip animation on tablet and mobile devices (≤1024px)
  if (window.innerWidth <= 1024) return;

  const itemCount = processContentItems.length;

  // Set first video as active initially
  if (processVideos[0]) {
    processVideos[0].classList.add("active");
  }

  // Main scroll animation - moves content items up with scroll
  gsap.to(processContentItemsWrapper, {
    y: () => -(itemCount - 1) * (window.innerHeight * 1.05), // Move up by (itemCount - 1) * 105vh
    ease: "none",
    immediateRender: false, // Prevent rendering before ScrollTrigger calculates properly
    scrollTrigger: {
      trigger: processStickyContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // Attached to scroll movement
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Calculate which item should be active based on scroll progress
        const progress = self.progress;
        const activeIndex = Math.min(
          Math.floor(progress * itemCount),
          itemCount - 1,
        );

        // Update active video
        processVideos.forEach((video, index) => {
          if (index === activeIndex) {
            video.classList.add("active");
          } else {
            video.classList.remove("active");
          }
        });
      },
    },
  });

  // Refresh ScrollTrigger on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  // Refresh ScrollTrigger after all assets are loaded to handle mid-page reloads
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});





// immigration page


// Testimonials Swiper
const testimonialsSwiper = new Swiper('.testimonials-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.testimonial-next',
    prevEl: '.testimonial-prev',
  },
})

// What We Do Accordion
;(function () {
  const accordionItems = document.querySelectorAll('.accordion-item')
  const featureImages = document.querySelectorAll('.feature-image')

  if (!accordionItems.length || !featureImages.length) return

  // First item (tallest, 3-line desc) is active on load — lock container to that height
  const accContainer = accordionItems[0].closest('.accordion-container')
  if (accContainer) {
    accContainer.style.minHeight = accContainer.offsetHeight + 'px'
  }

  accordionItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imageIndex = item.getAttribute('data-image')

      // Disable scroll anchoring so the browser doesn't shift the page
      // while the description expand/collapse transition runs
      document.documentElement.style.overflowAnchor = 'none'

      // Remove active class from all items
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove('active')
      })

      // Add active class to clicked item
      item.classList.add('active')

      // Switch images
      featureImages.forEach((image) => {
        image.classList.remove('active')
        if (image.getAttribute('data-index') === imageIndex) {
          image.classList.add('active')
        }
      })

      // Re-enable scroll anchoring after transitions finish
      setTimeout(() => {
        document.documentElement.style.overflowAnchor = ''
      }, 350)
    })
  })
})()

// ========== RESULTS TABLE CUSTOM SCROLLBAR ==========
;(function () {
  document.querySelectorAll('.results-table').forEach(function (table) {
    var track = table.nextElementSibling
    while (track && !track.classList.contains('results-scrollbar')) track = track.nextElementSibling
    if (!track) return
    var thumb = track.querySelector('.results-scrollbar-thumb')
    if (!thumb) return

    function updateThumb() {
      var ratio = table.clientWidth / table.scrollWidth
      var thumbWidth = Math.max(ratio * track.clientWidth, 40)
      var maxScroll = table.scrollWidth - table.clientWidth
      var maxThumbLeft = track.clientWidth - thumbWidth
      var thumbLeft = maxScroll > 0 ? (table.scrollLeft / maxScroll) * maxThumbLeft : 0
      thumb.style.width = thumbWidth + 'px'
      thumb.style.left = thumbLeft + 'px'
    }

    table.addEventListener('scroll', updateThumb)
    window.addEventListener('resize', updateThumb)
    updateThumb()

    var isDragging = false
    var startX = 0
    var startScrollLeft = 0

    thumb.addEventListener('pointerdown', function (e) {
      isDragging = true
      startX = e.clientX
      startScrollLeft = table.scrollLeft
      thumb.setPointerCapture(e.pointerId)
      e.preventDefault()
    })

    thumb.addEventListener('pointermove', function (e) {
      if (!isDragging) return
      var dx = e.clientX - startX
      var tw = thumb.offsetWidth
      var maxThumbLeft = track.clientWidth - tw
      var maxScroll = table.scrollWidth - table.clientWidth
      table.scrollLeft = startScrollLeft + (dx / maxThumbLeft) * maxScroll
    })

    thumb.addEventListener('pointerup', function () { isDragging = false })
    thumb.addEventListener('pointercancel', function () { isDragging = false })

    track.addEventListener('click', function (e) {
      if (e.target === thumb) return
      var rect = track.getBoundingClientRect()
      var clickX = e.clientX - rect.left
      var tw = thumb.offsetWidth
      var maxThumbLeft = track.clientWidth - tw
      var maxScroll = table.scrollWidth - table.clientWidth
      table.scrollLeft = ((clickX - tw / 2) / maxThumbLeft) * maxScroll
    })
  })
})()


