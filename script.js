document.addEventListener("DOMContentLoaded", () => {
    // Remove technical overview skills section
    const technicalSkillsOverview = document.querySelector(".research-section");
    if (technicalSkillsOverview) {
      technicalSkillsOverview.remove();
    }
  
    // Remove bachelor's education section (assuming it's the second timeline item)
    const bachelorEducation = document.querySelectorAll(".education-section .timeline-item")[1];
    if (bachelorEducation) {
      bachelorEducation.remove();
    }
  
    // Alternative way to remove bachelor's education if the above doesn't work
    document.querySelectorAll(".education-item").forEach(item => {
      const degreeTitle = item.querySelector(".education-degree");
      if (degreeTitle && degreeTitle.textContent.includes("Bachelor")) {
        item.remove();
      }
    });
  
    // Performance optimization: Debounce function for scroll events
    function debounce(func, wait = 20, immediate = true) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  
    // Initialize libraries only if they exist
    // AOS (Animate on Scroll)
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true, // Changed to true for better performance
        mirror: false,
        disable: window.innerWidth < 768 // Disable on mobile for better performance
      });
    }
  
    // Initialize Lucide icons
    if (typeof window.lucide !== "undefined") {
      window.lucide.createIcons();
    }
  
    // Set current year in footer
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  
    // Theme toggle with error handling
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        try {
          const html = document.documentElement;
          const newTheme = html.classList.contains("dark") ? "light" : "dark";
          html.className = newTheme;
          localStorage.setItem("theme", newTheme);
          updateBodyStyles(newTheme);
        } catch (error) {
          console.error("Theme toggle error:", error);
        }
      });
    }
  
    // Check for saved theme preference
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.className = savedTheme;
        updateBodyStyles(savedTheme);
      }
    } catch (error) {
      console.error("Theme loading error:", error);
      // Fallback to dark theme
      document.documentElement.className = "dark";
      updateBodyStyles("dark");
    }
  
    function updateBodyStyles(theme) {
      if (!document.body) return;
     
      if (theme === "dark") {
        document.body.style.backgroundColor = "#1a1a35";
        document.body.style.color = "#f0f0ff";
      } else {
        document.body.style.backgroundColor = "#f5f0ff";
        document.body.style.color = "#2d2d40";
      }
    }
  
    // Mobile menu with error handling
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const closeMenuButton = document.getElementById("close-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
  
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("active");
      });
    }
  
    if (closeMenuButton && mobileMenu) {
      closeMenuButton.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    }
  
    // Scroll progress with performance optimization
    const scrollProgress = document.querySelector(".scroll-progress");
    if (scrollProgress) {
      const updateScrollProgress = debounce(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight === 0) return; // Prevent division by zero
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
      }, 10);
     
      window.addEventListener("scroll", updateScrollProgress);
    }
  
    // Typed text effect with error handling
    function typeText(element, text, speed, callback) {
      if (!element || !text) return;
  
      let i = 0;
      element.textContent = "";
  
      function typing() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        } else if (callback && typeof callback === 'function') {
          callback();
        }
      }
  
      typing();
    }
  
    // Type hero section text with error handling
    try {
      const heroTitleElement = document.getElementById("typed-hero");
      const heroQuestionElement = document.getElementById("typed-question");
      const heroDescriptionElement = document.getElementById("typed-description");
  
      if (heroTitleElement) {
        typeText(heroTitleElement, "HARSH GUJARATHI", 50, () => {
          if (heroQuestionElement) {
            // Add a pause between title and question
            setTimeout(() => {
              typeText(heroQuestionElement, "How can data transform decision-making?", 40, () => {
                if (heroDescriptionElement) {
                  // Add a pause between question and description
                  setTimeout(() => {
                    typeText(
                      heroDescriptionElement,
                      "By uncovering patterns hidden in the noise, we can turn raw information into actionable insights that drive innovation and solve complex problems.",
                      30
                    );
                  }, 500);
                }
              });
            }, 500);
          }
        });
      }
    } catch (error) {
      console.error("Typing animation error:", error);
      // Fallback: Set text directly if animation fails
      const heroTitleElement = document.getElementById("typed-hero");
      const heroQuestionElement = document.getElementById("typed-question");
      const heroDescriptionElement = document.getElementById("typed-description");
     
      if (heroTitleElement) heroTitleElement.textContent = "HARSH GUJARATHI";
      if (heroQuestionElement) heroQuestionElement.textContent = "How can data transform decision-making?";
      if (heroDescriptionElement) heroDescriptionElement.textContent = "By uncovering patterns hidden in the noise, we can turn raw information into actionable insights that drive innovation and solve complex problems.";
    }
  
    // Setup rotating titles with error handling
    try {
      const rotatingTitlesContainer = document.querySelector(".rotating-titles");
      if (rotatingTitlesContainer) {
        const titles = ["Data Analyst", "Data Engineer", "Data Scientist", "Machine Learning Enthusiast", "Problem Solver"];
       
        // Clear existing content
        rotatingTitlesContainer.innerHTML = "";
       
        const titleElement = document.createElement("span");
        titleElement.classList.add("rotating-title");
        rotatingTitlesContainer.appendChild(titleElement);
       
        let currentTitleIndex = 0;
       
        // Set initial title
        titleElement.textContent = titles[0];
        titleElement.classList.add("active");
       
        // Only start rotation if we're not on a mobile device (for performance)
        if (window.innerWidth >= 768) {
          setInterval(() => {
            titleElement.classList.remove("active");
           
            setTimeout(() => {
              currentTitleIndex = (currentTitleIndex + 1) % titles.length;
              titleElement.textContent = titles[currentTitleIndex];
              titleElement.classList.add("active");
            }, 500);
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Rotating titles error:", error);
    }
  
    // Skills section with error handling
    const skillsData = {
      "data-science": [
        {
          name: "Machine Learning",
          level: 90,
          category: "Data Science",
          description: "Extensive experience implementing various ML algorithms including regression, classification, clustering, and ensemble methods."
        },
        {
          name: "Statistical Analysis",
          level: 85,
          category: "Data Science",
          description: "Strong foundation in statistical methods including hypothesis testing, experimental design, and multivariate analysis."
        },
        {
          name: "Deep Learning",
          level: 80,
          category: "Data Science",
          description: "Implemented neural networks for various applications using TensorFlow and PyTorch."
        },
        {
          name: "Data Visualization",
          level: 95,
          category: "Data Science",
          description: "Expert in creating compelling visual narratives from complex data using tools like Matplotlib, Seaborn, Plotly, and Tableau."
        },
        {
          name: "Natural Language Processing",
          level: 75,
          category: "Data Science",
          description: "Experience with text preprocessing, sentiment analysis, topic modeling, and building chatbots."
        }
      ],
      "data-engineering": [
        {
          name: "ETL Pipelines",
          level: 90,
          category: "Data Engineering",
          description: "Extensive experience designing and implementing ETL pipelines using tools like IICS, AWS Glue, and custom Python scripts."
        },
        {
          name: "Snowflake",
          level: 85,
          category: "Data Engineering",
          description: "Proficient in Snowflake architecture, data modeling, and SQL optimization."
        },
        {
          name: "AWS",
          level: 80,
          category: "Data Engineering",
          description: "Strong knowledge of AWS services including S3, Lambda, Glue, Redshift, and CloudFormation."
        },
        {
          name: "SQL",
          level: 95,
          category: "Data Engineering",
          description: "Expert in writing complex SQL queries, optimizing database performance, and designing efficient schemas."
        },
        {
          name: "Data Modeling",
          level: 85,
          category: "Data Engineering",
          description: "Skilled in dimensional modeling, star schema design, and data warehouse architecture."
        }
      ],
      "programming": [
        {
          name: "Python",
          level: 95,
          category: "Programming",
          description: "Expert-level Python programming with extensive experience in data science, web development, and automation."
        },
        {
          name: "R",
          level: 80,
          category: "Programming",
          description: "Strong R programming skills for statistical analysis and data visualization."
        },
        {
          name: "SQL",
          level: 90,
          category: "Programming",
          description: "Advanced SQL skills including complex joins, window functions, CTEs, and performance optimization."
        },
        {
          name: "PySpark",
          level: 75,
          category: "Programming",
          description: "Proficient in using PySpark for large-scale data processing and analytics."
        },
        {
          name: "C++",
          level: 70,
          category: "Programming",
          description: "Solid foundation in C++ programming with experience in algorithm implementation."
        }
      ],
      "visualization": [
        {
          name: "Power BI",
          level: 95,
          category: "Visualization",
          description: "Expert in creating interactive dashboards and reports with Power BI."
        },
        {
          name: "Tableau",
          level: 85,
          category: "Visualization",
          description: "Strong skills in Tableau for data visualization and dashboard creation."
        },
        {
          name: "Matplotlib/Seaborn",
          level: 90,
          category: "Visualization",
          description: "Advanced proficiency in creating custom visualizations with Matplotlib and Seaborn in Python."
        },
        {
          name: "Plotly",
          level: 80,
          category: "Visualization",
          description: "Experience with Plotly for creating interactive, web-based visualizations."
        },
        {
          name: "D3.js",
          level: 70,
          category: "Visualization",
          description: "Working knowledge of D3.js for creating custom, interactive web-based visualizations."
        }
      ]
    };
  
    try {
      // Initialize skills section
      const skillsGrid = document.querySelector(".skills-grid");
      const skillCategoryButtons = document.querySelectorAll(".skill-category-btn");
      const skillDetailsPlaceholder = document.querySelector(".skill-details-placeholder");
      const skillDetailsContent = document.querySelector(".skill-details-content");
      const skillDetailsName = document.querySelector(".skill-details-name");
      const skillDetailsCategory = document.querySelector(".skill-details-category");
      const skillDetailsProficiencyValue = document.querySelector(".skill-details-proficiency-value");
      const skillDetailsProficiencyProgress = document.querySelector(".skill-details-proficiency-progress");
      const skillDetailsDescription = document.querySelector(".skill-details-description");
      const skillDetailsBack = document.querySelector(".skill-details-back");
  
      let activeCategory = "data-science";
  
      function renderSkills(category) {
        if (!skillsGrid || !skillsData[category]) return;
  
        skillsGrid.innerHTML = "";
  
        skillsData[category].forEach((skill) => {
          const skillItem = document.createElement("div");
          skillItem.classList.add("skill-item");
          skillItem.innerHTML = `
            <h4 class="skill-name">${skill.name || "Unnamed Skill"}</h4>
            <div class="skill-proficiency">
              <div class="skill-proficiency-header">
                <span>Proficiency</span>
                <span>${skill.level || 0}%</span>
              </div>
              <div class="skill-proficiency-bar">
                <div class="skill-proficiency-progress" style="width: 0%"></div>
              </div>
            </div>
          `;
  
          skillItem.addEventListener("click", () => {
            showSkillDetails(skill);
          });
  
          skillsGrid.appendChild(skillItem);
        });
  
        // Animate progress bars with a slight delay for better performance
        setTimeout(() => {
          const progressBars = document.querySelectorAll(".skill-proficiency-progress");
          progressBars.forEach((bar, index) => {
            if (skillsData[category] && skillsData[category][index]) {
              bar.style.width = `${skillsData[category][index].level || 0}%`;
            }
          });
        }, 100);
      }
  
      function showSkillDetails(skill) {
        if (
          !skillDetailsName ||
          !skillDetailsCategory ||
          !skillDetailsProficiencyValue ||
          !skillDetailsProficiencyProgress ||
          !skillDetailsDescription ||
          !skillDetailsPlaceholder ||
          !skillDetailsContent
        )
          return;
  
        skillDetailsName.textContent = skill.name || "Unnamed Skill";
        skillDetailsCategory.textContent = skill.category || "Uncategorized";
        skillDetailsProficiencyValue.textContent = `${skill.level || 0}%`;
        skillDetailsProficiencyProgress.style.width = `${skill.level || 0}%`;
        skillDetailsDescription.textContent = skill.description || "No description available";
  
        skillDetailsPlaceholder.style.display = "none";
        skillDetailsContent.style.display = "flex";
  
        // Highlight the selected skill
        const skillItems = document.querySelectorAll(".skill-item");
        skillItems.forEach((item) => {
          const itemName = item.querySelector(".skill-name")?.textContent;
          if (itemName === skill.name) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
  
      if (skillDetailsBack) {
        skillDetailsBack.addEventListener("click", () => {
          if (skillDetailsPlaceholder) skillDetailsPlaceholder.style.display = "flex";
          if (skillDetailsContent) skillDetailsContent.style.display = "none";
  
          // Remove highlight from all skills
          const skillItems = document.querySelectorAll(".skill-item");
          skillItems.forEach((item) => {
            item.classList.remove("active");
          });
        });
      }
  
      // Initialize with first category
      if (skillsGrid) {
        renderSkills(activeCategory);
      }
  
      // Category buttons
      skillCategoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const category = button.getAttribute("data-category");
          if (!category || !skillsData[category]) return;
  
          // Update active button
          skillCategoryButtons.forEach((btn) => {
            btn.classList.remove("active");
          });
          button.classList.add("active");
  
          // Update active category and render skills
          activeCategory = category;
          renderSkills(category);
  
          // Reset skill details view
          if (skillDetailsPlaceholder) skillDetailsPlaceholder.style.display = "flex";
          if (skillDetailsContent) skillDetailsContent.style.display = "none";
        });
      });
    } catch (error) {
      console.error("Skills section error:", error);
    }
  
    // Contact form with error handling
    try {
      const contactForm = document.getElementById("contact-form");
      const formSuccess = document.getElementById("form-success");
  
      if (contactForm && formSuccess) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();
  
          // Simulate form submission
          contactForm.style.display = "none";
          formSuccess.style.display = "block";
  
          // Reset form
          setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = "block";
            formSuccess.style.display = "none";
          }, 3000);
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
    }
  
    // Navigation active state based on scroll position with performance optimization
    try {
      const updateActiveNavItem = debounce(() => {
        const sections = document.querySelectorAll(".section");
        const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item, .floating-menu-item");
  
        if (!sections.length || !navItems.length) return;
  
        let currentSection = "";
        const scrollPosition = window.scrollY + 100; // Add offset for header
  
        sections.forEach((section) => {
          if (!section) return;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");
  
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
            currentSection = sectionId;
          }
        });
  
        navItems.forEach((item) => {
          if (!item) return;
          item.classList.remove("active");
          const href = item.getAttribute("href");
          if (!href) return;
         
          const targetId = href.substring(1);
          if (targetId === currentSection) {
            item.classList.add("active");
          }
        });
      }, 100);
  
      window.addEventListener("scroll", updateActiveNavItem);
  
      // Initialize active nav item on page load
      setTimeout(updateActiveNavItem, 500);
    } catch (error) {
      console.error("Navigation active state error:", error);
    }
  
    // Add smooth scrolling for anchor links with error handling
    try {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
  
          const targetId = this.getAttribute("href");
          if (!targetId) return;
         
          const targetElement = document.querySelector(targetId);
          if (!targetElement) return;
  
          const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
  
          // Close mobile menu if open
          const mobileMenu = document.getElementById("mobile-menu");
          if (mobileMenu && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
          }
        });
      });
    } catch (error) {
      console.error("Smooth scrolling error:", error);
    }
  });
  