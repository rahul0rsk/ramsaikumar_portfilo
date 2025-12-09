// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const resumeLink = document.getElementById('resumeLink');
  const currentYearSpan = document.getElementById('currentYear');
  const skillItems = document.querySelectorAll('.skill-item');
  const typingText = document.querySelector('.typing-text');

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger icon
    const bars = menuToggle.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      const bars = menuToggle.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
      
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();

  // Typing Animation
  const texts = [
    'Full Stack Developer',
    'Python Programmer',
    'Java Developer',
    'Web Developer',
    'Data Analyst'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isEnd = true;
      setTimeout(type, 1500);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex++;
      if (textIndex === texts.length) textIndex = 0;
    }
    
    const speed = isDeleting ? 50 : 100;
    const delay = isEnd ? 1500 : speed;
    
    setTimeout(type, delay);
    
    if (isEnd) {
      isDeleting = true;
      isEnd = false;
    }
  }
  
  // Start typing animation after 1 second
  setTimeout(type, 1000);

  // Animate skill bars on scroll
  function animateSkillBars() {
    skillItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight - 100);
      
      if (isVisible && !item.classList.contains('animated')) {
        const level = item.getAttribute('data-level');
        const progressBar = item.querySelector('.skill-progress');
        
        // Animate progress bar
        progressBar.style.width = `${level}%`;
        
        // Add delay for each bar
        const index = Array.from(skillItems).indexOf(item);
        progressBar.style.transitionDelay = `${index * 0.2}s`;
        
        item.classList.add('animated');
      }
    });
  }

  // Initial check for skill bars
  animateSkillBars();
  
  // Check skill bars on scroll
  window.addEventListener('scroll', animateSkillBars);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate scroll position, accounting for fixed navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation on scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);

  // Contact Form Submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) return;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Simulate API call (replace with actual API endpoint)
      await simulateContactSubmission(data);
      
      // Show success message
      showFormMessage('Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
      
    } catch (error) {
      // Show error message
      showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
      
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  function validateForm(data) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return false;
    }
    
    // Required fields validation
    if (!data.name.trim() || !data.subject.trim() || !data.message.trim()) {
      showFormMessage('Please fill in all required fields.', 'error');
      return false;
    }
    
    return true;
  }

  async function simulateContactSubmission(data) {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() < 0.9) {
          console.log('Contact form submitted:', data);
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }

  // Download Resume/CV
  function downloadResume() {
    // Create resume content based on your PDF
    const resumeContent = `
      BALIJI RAMSAI KUMAR
      ===================
      
      Contact Information
      -------------------
      Address: Kottha Kummara Colony, Cheepurupalli, Vizianagaram 535128
      Phone: +91 7731004638
      Email: ramsaikumar07@gmail.com
      GitHub: https://github.com/rahul0rsk
      
      Objective
      ---------
      A highly driven individual looking for a challenging position to utilize my engineering skills 
      that can contribute to the company's growth and provide an impetus to my professional and 
      personal prosperity.
      
      Skills
      ------
      Programming Languages: C, Python, HTML, Java
      Frameworks & Tools: Web Development
      Other Skills: Microsoft Office Suite (Excel, Word, PowerPoint)
      Behavioral Skills: Leadership & Team Management, Time Management & Multi-tasking, 
                         Organizational Skills
      
      Education
      ---------
      • Bachelor of Technology
        R K College of Engineering, Vijayawada (2019–2023)
      
      • Intermediate
        Sri Chaitanya Junior College, Kakinada (2017–2019)
      
      • Secondary School Certificate (SSC)
        Siddhartha High School, Cheepurupalle (2016–2017)
        CGPA: 9.2
      
      Projects
      --------
      • Big Mart Sales Prediction
        Analyzed historical sales data, applied machine learning algorithms and created 
        predictive models to forecast future sales trends. Involved data cleaning, feature 
        selection, and model evaluation.
      
      • Real Time Traffic Monitor
        Using Python to track and analyze traffic patterns. Utilized OpenCV and TensorFlow 
        to process video feeds, detect vehicle movements, assess traffic density.
      
      • Portfolio Website
        Modern, responsive portfolio website showcasing skills and projects.
      
      Internship
      ----------
      • Python Full Stack at APSSDC, Vijayawada (July 2022 - August 2022)
        Worked on both front-end and back-end of web applications. Breaking down complex 
        problems into manageable steps and finding solutions.
      
      • Data Analysis using Python at APSSDC, Vijayawada (October 2020 – November 2020)
        Research and resolved data discrepancies with troubleshooting teams.
      
      Courses
      -------
      • Full Stack Web Development, Tap Academy (July 2023 - February 2024)
      • Full Stack Java Programming, Skillup (July 2022 - December 2023)
      
      Languages
      ---------
      • English
      • Hindi
      • Telugu
      
      Work Experience
      ---------------
      • Telechoice Health Care PVT Limited, Chennai
        Voice Process Executive (June 2024 – November 2024)
        Customer-oriented voice process executive with 6 months of experience in handling 
        inbound and outbound calls. Proficient in using CRM software.
      
      • Freelancer (9 months)
        Successfully managed end-to-end digital marketing campaigns, created impactful 
        portfolios, and delivered responsive front-end solutions.
      
      • Metrochem PVT Limited, Vishakapatnam (6 months)
        Ensured product quality by performing detailed quality assurance inspections and 
        process audits. Maintained compliance with industry safety and regulatory standards.
    `;
    
    // Create and download file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Baliji_Ramsai_Kumar_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show notification
    showNotification('Resume downloaded successfully!');
  }

  // Attach download functionality to both buttons
  downloadCvBtn.addEventListener('click', function(e) {
    e.preventDefault();
    downloadResume();
  });

  resumeLink.addEventListener('click', function(e) {
    e.preventDefault();
    downloadResume();
  });

  // Notification System
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      transform: translateX(150%);
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(150%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add parallax effect to hero image
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.image-frame');
    
    if (heroImage && window.innerWidth > 768) {
      const rate = scrolled * -0.5;
      heroImage.style.transform = `perspective(1000px) rotateY(-10deg) translateY(${rate}px)`;
    }
  });

  // Initialize animations when page loads
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // Add intersection observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Add fade-in class when section is in view
    section.classList.add('fade-in-observed');
  });

  // Add fade-in animation when section comes into view
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });
});
