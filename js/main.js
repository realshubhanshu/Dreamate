// ============================================
// DREAMATE - PREMIUM WEBSITE JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // ---- INIT GSAP & SCROLL TRIGGER ----
  gsap.registerPlugin(ScrollTrigger);
  
  // Refresh ScrollTrigger after images load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // ============================================
  // HERO WORD ANIMATIONS
  // ============================================

  // Hero subtitle and CTA
  gsap.set('.hero-subtitle, .hero-cta, .hero-scroll-indicator', { opacity: 0 });
  gsap.to('.hero-subtitle', {
    opacity: 1,
    duration: 1,
    delay: 0.8,
    ease: 'power2.out'
  });
  gsap.to('.hero-cta', {
    opacity: 1,
    duration: 1,
    delay: 1.1,
    ease: 'power2.out'
  });
  gsap.to('.hero-scroll-indicator', {
    opacity: 1,
    duration: 1,
    delay: 1.3,
    ease: 'power2.out'
  });

  // ============================================
  // NAVIGATION
  // ============================================
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Smooth scroll only for pure hash links on same page
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            scrollTo: {
              y: target,
              offsetY: 80, // Account for fixed navbar
              autoKill: false,
            },
            duration: 1.2,
            ease: 'power2.inOut'
          });
        }
      }
    });
  });

  // MOBILE NAV TOGGLE
  const navToggleBtn = document.querySelector(".nav-toggle");
  const navLinksList = document.querySelector(".nav-links");

  if (navToggleBtn && navLinksList) {
    navToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinksList.classList.toggle("nav-links--open");
    });

    // Close menu when a nav link is clicked
    navLinksList.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        navLinksList.classList.remove("nav-links--open");
      }
    });
  }

  // CTA button scroll to products
  const ctaBtn = document.querySelector('.hero-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      const productsSection = document.querySelector('#products');
      if (productsSection) {
        gsap.to(window, {
          scrollTo: {
            y: productsSection,
            offsetY: 80,
            autoKill: false,
          },
          duration: 1.2,
          ease: 'power2.inOut'
        });
      }
    });
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================

  // ---- ABOUT SECTION ----
  if (document.querySelector('.about-content')) {
    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out'
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    ScrollTrigger.create({
      trigger: '.about-stats',
      start: 'top 85%',
      onEnter: () => {
        stats.forEach((stat, index) => {
          const values = [100, 15, 10000];
          animateCounter(stat, values[index]);
        });
      },
      once: true
    });
  }

  // ---- PROMISE CARDS ----
  const promiseCards = gsap.utils.toArray('.promise-card');
  promiseCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'back.out(1.7)'
    });

    // 3D tilt hover effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });

  // ---- PRODUCTS SECTION ----
  const productShowcases = gsap.utils.toArray('.product-showcase');
  productShowcases.forEach((showcase, index) => {
    const content = showcase.querySelector('.product-content');
    const image = showcase.querySelector('.product-image');
    
    // Content animation
    gsap.from(content, {
      scrollTrigger: {
        trigger: showcase,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      duration: 1,
      ease: 'power2.out'
    });

    // Image animation
    gsap.from(image, {
      scrollTrigger: {
        trigger: showcase,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: index % 2 === 0 ? 80 : -80,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out'
    });

    // Parallax floating effect
    gsap.to(image, {
      scrollTrigger: {
        trigger: showcase,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -40,
      ease: 'none'
    });

    // Stagger product features
    const features = showcase.querySelectorAll('.product-features li');
    gsap.from(features, {
      scrollTrigger: {
        trigger: showcase,
        start: 'top 75%',
      },
      opacity: 0,
      x: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  });

  // ---- TECHNOLOGY SECTION ----
  const techCards = gsap.utils.toArray('.tech-card');
  techCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.technology',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 60,
      rotationX: 15,
      duration: 0.8,
      delay: index * 0.08,
      ease: 'back.out(1.7)'
    });

    // Continuous floating for tech icons
    gsap.to(card.querySelector('.tech-icon'), {
      y: -12,
      duration: 2.5 + index * 0.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  });

  // Tech specs
  gsap.from('.spec-item', {
    scrollTrigger: {
      trigger: '.tech-specs',
      start: 'top 85%',
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // ---- WHY CHOOSE & CONTACT ----
  gsap.utils.toArray('.reason-card, .contact-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      scale: 0.9,
      y: 40,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'back.out(1.7)'
    });
  });

  // Company info
  gsap.from('.company-info', {
    scrollTrigger: {
      trigger: '.company-info',
      start: 'top 90%',
    },
    opacity: 0,
    scale: 0.95,
    rotation: 2,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });

  // Footer columns
  gsap.from('.footer-col', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // ============================================
  // PARALLAX & HERO BACKGROUND
  // ============================================
  if (document.querySelector('.hero-bg')) {
    gsap.to('.hero-bg', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
      yPercent: 20,
      ease: 'none'
    });
  }

  // ============================================
  // COUNTER ANIMATION FUNCTION
  // ============================================
  function animateCounter(element, finalValue, duration = 2000) {
    let startValue = 0;
    const increment = finalValue / (duration / 16);
    let timer = setInterval(() => {
      startValue += increment;
      if (startValue >= finalValue) {
        element.textContent = finalValue >= 1000 ? (finalValue/1000).toFixed(0) + 'K+' : finalValue + '%';
        clearInterval(timer);
      } else {
        element.textContent = startValue >= 1000 ? (startValue/1000).toFixed(0) + 'K+' : Math.ceil(startValue) + '%';
      }
    }, 16);
  }

  // ============================================
  // LOGO HOVER EFFECT
  // ============================================
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      gsap.to('.logo-img', {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
      gsap.to(logo, {
        letterSpacing: '2px',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    logo.addEventListener('mouseleave', () => {
      gsap.to('.logo-img', {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
      gsap.to(logo, {
        letterSpacing: '1px',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }

  // ============================================
  // MOBILE OPTIMIZATION
  // ============================================
  if (window.innerWidth < 768) {
    ScrollTrigger.config({ limitCallbacks: true });
  }

  console.log('🌙 Dreamate Website Fully Loaded!');
  console.log('✨ All animations active & optimized');
  console.log('🚀 Ready for premium sleep experience!');
});

// ============================================
// SMOOTH SCROLL TO TOP (on window load)
// ============================================
window.addEventListener('load', () => {
  window.scrollTo(0, 0);

  // =========================
  // CONTACT FORM – AJAX SUBMIT TO APPS SCRIPT
  // =========================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const scriptURL = "https://script.google.com/macros/s/AKfycbyrg-pyOyKjhM3RVbg7XiPRk_CVySygwBc3wQGB1Qc6LQhMgK9QgoIp1RV8VTkc2YY4/exec";

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // stop full navigation

      if (statusEl) {
        statusEl.textContent = "";
        statusEl.className = "form-status";
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
        submitBtn.querySelector("span").textContent = "Submitting...";
      }

      const formData = new FormData(contactForm);

      fetch(scriptURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            if (statusEl) {
              statusEl.textContent = "Thank you! Your enquiry has been submitted.";
              statusEl.classList.add("form-status--success");
            }
            contactForm.reset();

            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            if (statusEl) {
              statusEl.textContent = "Something went wrong. Please try again in a moment.";
              statusEl.classList.add("form-status--error");
            }
          }
        })
        .catch(() => {
          if (statusEl) {
            statusEl.textContent = "Something went wrong. Please try again in a moment.";
            statusEl.classList.add("form-status--error");
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("is-loading");
            submitBtn.querySelector("span").textContent = "Submit Enquiry";
          }
        });
    });
  }
});
