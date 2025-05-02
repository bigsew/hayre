// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize preloader
  initPreloader()

  // Initialize theme
  initTheme()

  // Initialize custom cursor
  initCustomCursor()

  // Initialize smooth scrolling
  initSmoothScroll()

  // Initialize portfolio filtering
  initPortfolioFilter()

  // Initialize form validation
  initFormValidation()

  // Initialize scroll animations with AOS
  initAOS()

  // Initialize back to top button
  initBackToTop()

  // Initialize typing effect
  initTypingEffect()

  // Initialize particles.js
  initParticles()

  // Initialize navbar scroll behavior
  initNavbarScroll()

  // Initialize skill progress animation
  initSkillsProgress()
})

// Preloader Functionality
function initPreloader() {
  const preloader = document.getElementById("preloader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 300)
    }, 500)
  })
}

// Theme Toggle Functionality
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = themeToggle.querySelector("i")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Set initial theme
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark")
    themeIcon.classList.remove("bi-moon-fill")
    themeIcon.classList.add("bi-sun-fill")
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    let newTheme = "light"

    if (currentTheme !== "dark") {
      newTheme = "dark"
      themeIcon.classList.remove("bi-moon-fill")
      themeIcon.classList.add("bi-sun-fill")
    } else {
      themeIcon.classList.remove("bi-sun-fill")
      themeIcon.classList.add("bi-moon-fill")
    }

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  })
}

// Custom Cursor
function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-dot-outline")

  if (!cursorDot || !cursorOutline) return

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.opacity = "1"
    cursorOutline.style.opacity = "1"

    cursorDot.style.transform = `translate(${posX}px, ${posY}px)`
    cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`
  })

  // Add hover effect to links and buttons
  const hoverElements = document.querySelectorAll("a, button, .portfolio-card, .service-card")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorOutline.style.backgroundColor = "rgba(108, 99, 255, 0.1)"
    })

    element.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.backgroundColor = "rgba(108, 99, 255, 0.2)"
    })
  })

  // Hide cursor when leaving window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursorDot.style.opacity = "0"
      cursorOutline.style.opacity = "0"
    }
  })
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll("#mainNav .nav-link, .scroll-down-link, .footer-links a")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only prevent default if it's a hash link
      if (this.hash !== "") {
        e.preventDefault()

        const hash = this.hash
        const targetElement = document.querySelector(hash)

        if (targetElement) {
          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse")
          if (navbarCollapse.classList.contains("show")) {
            navbarCollapse.classList.remove("show")
          }

          // Calculate position with navbar offset
          const navbarHeight = document.querySelector("#mainNav").offsetHeight
          const targetPosition = targetElement.offsetTop - navbarHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Update active nav link
          document.querySelectorAll("#mainNav .nav-link").forEach((navLink) => {
            navLink.classList.remove("active")
          })

          document.querySelector(`#mainNav .nav-link[href="${hash}"]`)?.classList.add("active")
        }
      }
    })
  })
}

// Portfolio Filtering
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".portfolio-filters .btn-filter")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      // Show/hide portfolio items based on filter
      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"

          // Add a small delay for a smoother transition
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 50)
        } else {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"

          // Hide after transition
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true
      const formElements = contactForm.elements

      // Check each required field
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i]

        if (element.hasAttribute("required")) {
          const isEmail = element.type === "email"
          const value = element.value.trim()

          // Check if empty
          if (value === "") {
            setInvalid(element)
            isValid = false
          }
          // Check email format
          else if (isEmail && !isValidEmail(value)) {
            setInvalid(element)
            isValid = false
          }
          // Valid input
          else {
            setValid(element)
          }
        }
      }

      // If form is valid, show success message
      if (isValid) {
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show a success alert
        const formContainer = contactForm.closest(".contact-form-wrapper")

        // Create success message
        const successMessage = document.createElement("div")
        successMessage.className = "alert alert-success mt-4"
        successMessage.innerHTML = `
          <i class="bi bi-check-circle me-2"></i>
          Your message has been sent successfully! I'll get back to you soon.
        `

        // Add success message to form
        formContainer.appendChild(successMessage)

        // Reset form
        contactForm.reset()

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }
    })

    // Add input event listeners to clear validation on input
    const formInputs = contactForm.querySelectorAll("input, textarea")
    formInputs.forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("is-invalid")
        this.classList.remove("is-valid")
      })
    })
  }

  // Helper functions for validation
  function setInvalid(element) {
    element.classList.add("is-invalid")
    element.classList.remove("is-valid")
  }

  function setValid(element) {
    element.classList.remove("is-invalid")
    element.classList.add("is-valid")
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  }
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

  // Add animation classes to elements
  document.querySelectorAll(".section-heading, .divider").forEach((el) => {
    el.classList.add("fade-in")
  })

  document.querySelectorAll(".profile-img-container").forEach((el) => {
    el.classList.add("slide-in-left")
  })

  document.querySelectorAll(".skill-item").forEach((el) => {
    el.classList.add("fade-in")
  })

  document.querySelectorAll(".portfolio-item, .service-card").forEach((el) => {
    el.classList.add("fade-in")
  })

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
  }

  // Function to handle scroll animation
  function handleScrollAnimation() {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("active")
      }
    })
  }

  // Initial check on load
  handleScrollAnimation()

  // Check on scroll
  window.addEventListener("scroll", handleScrollAnimation)
}

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = "1"
        backToTopButton.style.visibility = "visible"
      } else {
        backToTopButton.style.opacity = "0"
        backToTopButton.style.visibility = "hidden"
      }
    })

    // Scroll to top when clicked
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Typing Effect
function initTypingEffect() {
  const typedTextElement = document.getElementById("typed-text")

  if (typedTextElement && typeof Typed !== "undefined") {
    new Typed(typedTextElement, {
      strings: ["Web Developer", "UI/UX Designer", "Creative Professional"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    })
  }
}

// Initialize Particles.js
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }
}

// Navbar Scroll Behavior
function initNavbarScroll() {
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll("#mainNav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbar) {
    // Function to update active nav link based on scroll position
    const updateActiveNavLink = () => {
      let currentSection = ""
      const scrollPosition = window.scrollY + navbar.offsetHeight + 50

      document.querySelectorAll("section, header").forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        const href = link.getAttribute("href")
        if (href === `#${currentSection}` || (currentSection === "page-top" && href === "#page-top")) {
          link.classList.add("active")
        }
      })
    }

    // Add shadow and shrink navbar on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-shrink")
      } else {
        navbar.classList.remove("navbar-shrink")
      }

      updateActiveNavLink()
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(e.target) &&
        !e.target.classList.contains("navbar-toggler")
      ) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      })
    })

    // Initial call to set active link on page load
    updateActiveNavLink()
  }
}

// Skills Progress Animation
function initSkillsProgress() {
  const skillsSection = document.getElementById("skills")

  if (skillsSection) {
    const progressBars = document.querySelectorAll(".skill-progress .progress-bar")

    const animateProgress = () => {
      progressBars.forEach((progressBar) => {
        const value = progressBar.getAttribute("aria-valuenow")
        progressBar.style.width = "0%"

        setTimeout(() => {
          progressBar.style.width = `${value}%`
        }, 100)
      })
    }

    // Animate on page load if skills section is in viewport
    const skillsSectionTop = skillsSection.offsetTop
    const skillsSectionHeight = skillsSection.offsetHeight

    if (
      window.scrollY >= skillsSectionTop - window.innerHeight &&
      window.scrollY < skillsSectionTop + skillsSectionHeight
    ) {
      animateProgress()
    }

    // Animate on scroll
    window.addEventListener("scroll", () => {
      if (
        window.scrollY >= skillsSectionTop - window.innerHeight &&
        window.scrollY < skillsSectionTop + skillsSectionHeight
      ) {
        animateProgress()
      }
    })
  }
}

var AOS, Typed, particlesJS, bootstrap

// download CV button

function downloadCV() {
  const link = document.createElement('a');
  link.href = 'cv.pdf'; // Change this to your actual file path
  link.download = 'Hayredin CV.pdf'; // This will be the name of the downloaded file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
