// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const downloadResumeBtn = document.getElementById('download-resume');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.innerHTML = navMenu.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate the scroll position, accounting for fixed navbar
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
  skillProgressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight - 100);
    
    if (isVisible && !bar.classList.contains('animated')) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
      bar.classList.add('animated');
    }
  });
};

// Initial check for skill bars
animateSkillBars();

// Check skill bars on scroll
window.addEventListener('scroll', animateSkillBars);

// Form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Simple validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    showFormMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (!isValidEmail(data.email)) {
    showFormMessage('Please enter a valid email address', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('.form-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  try {
    // In a real application, you would send this data to a server
    // For demo purposes, we'll simulate an API call
    await simulateApiCall(data);
    
    // Show success message
    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
  } catch (error) {
    showFormMessage('There was an error sending your message. Please try again.', 'error');
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Helper function to show form messages
function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Simulate API call (replace with real API call in production)
function simulateApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        console.log('Form data:', data);
        resolve({ success: true });
      } else {
        reject(new Error('Simulated API error'));
      }
    }, 1500);
  });
}

// Download resume button
downloadResumeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Create a sample resume content (in real app, this would be a PDF file)
  const resumeContent = `
    Baliji Ramsaikumar - Resume
    
    CONTACT INFORMATION
    Email: ramsaikumar07@gmail.com
    Phone: +91 7731004638
    GitHub: github.com/rahul0rsk
    LinkedIn: linkedin.com/in/baliji-ramsai-kumar-873205245
    
    EDUCATION
    B.Tech – RK College of Engineering, Vijayawada (2019–2023)
    Intermediate – Sri Chaitanya Junior College, Kakinada (2017–2019)
    SSC – Siddhartha High School, Cheepurupalle (2016–2017) | CGPA: 9.2
    
    SKILLS
    Programming: C, Python, HTML/CSS
    Web Development: Full Stack Development
    Technical: MS Office, Data Analysis, Machine Learning
    Soft Skills: Leadership, Team Management, Time Management
    
    EXPERIENCE
    Voice Process Executive – Telechoice Health Care Pvt Ltd, Chennai (June 2024 – Nov 2024)
    - Managed inbound/outbound customer calls
    - Ensured high customer satisfaction
    - Resolved queries using CRM tools
    
    PROJECTS
    Big Mart Sales Prediction: ML models to predict sales trends
    Real-Time Traffic Monitor: OpenCV and TensorFlow for traffic analysis
    
    CERTIFICATIONS
    Python Full Stack – APSSDC (Jul–Aug 2022)
    Data Analysis with Python – APSSDC (Oct–Nov 2020)
    Computer Networking – Nimra College (Aug–Sep 2021)
    Artificial Intelligence – Skillup (Jul–Aug 2022)
  `;
  
  // Create and trigger download
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Baliji_Ramsaikumar_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show download confirmation
  alert('Resume download started!');
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
  }
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll('section');
  
  const fadeInOnScroll = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const isVisible = (sectionTop <= window.innerHeight - 100);
      
      if (isVisible) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial styles
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Initial check
  fadeInOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', fadeInOnScroll);
  
  // Set current year in footer (optional)
  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector('.footer-bottom p:first-child');
  if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
  }
});
