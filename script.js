/* ============================================
   壹嘉宠物医院 · Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Cursor Glow ---
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // --- Navigation Scroll Effect ---
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = scrollY;

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  // --- Mobile Nav Toggle ---
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Number Counter Animation ---
  const statNumbers = document.querySelectorAll('.hero-stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Hero Particles ---
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer && window.innerWidth > 768) {
    createParticles();
  }

  function createParticles() {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 10 + 10;

      Object.assign(particle.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        background: Math.random() > 0.5
          ? 'rgba(26, 171, 138, 0.15)'
          : 'rgba(212, 168, 83, 0.1)',
        left: x + '%',
        top: y + '%',
        animation: `particle-float ${duration}s ease-in-out ${delay}s infinite`,
        pointerEvents: 'none'
      });

      particlesContainer.appendChild(particle);
    }

    // Add particle animation
    if (!document.getElementById('particle-style')) {
      const style = document.createElement('style');
      style.id = 'particle-style';
      style.textContent = `
        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(${Math.random() * 30 - 15}px, -${Math.random() * 40 + 20}px) scale(1.2);
            opacity: 0.7;
          }
          50% {
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(0.8);
            opacity: 0.3;
          }
          75% {
            transform: translate(-${Math.random() * 30}px, ${Math.random() * 30 - 15}px) scale(1.1);
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Set minimum date to today
    const appointmentDateInput = document.getElementById('appointmentDate');
    if (appointmentDateInput) {
      const today = new Date().toISOString().split('T')[0];
      appointmentDateInput.setAttribute('min', today);
      
      // Set max date to 3 months from now
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      appointmentDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }

    // Phone number validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        // Remove non-numeric characters
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 11 digits
        if (value.length > 11) {
          value = value.slice(0, 11);
        }
        
        this.value = value;
        
        // Validate phone number format
        if (value.length === 11) {
          if (/^1[3-9]\d{9}$/.test(value)) {
            this.setCustomValidity('');
            this.style.borderColor = 'var(--teal-light)';
          } else {
            this.setCustomValidity('请输入正确的手机号码');
            this.style.borderColor = '#fca5a5';
          }
        } else if (value.length > 0) {
          this.setCustomValidity('手机号码必须是11位');
          this.style.borderColor = '#fca5a5';
        } else {
          this.setCustomValidity('');
          this.style.borderColor = '';
        }
      });
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Additional validation
      const phone = document.getElementById('phone').value;
      const appointmentDate = document.getElementById('appointmentDate').value;
      const appointmentTime = document.getElementById('appointmentTime').value;

      if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入正确的手机号码格式（11位数字）');
        return;
      }

      if (!appointmentDate) {
        alert('请选择预约日期');
        return;
      }

      if (!appointmentTime) {
        alert('请选择预约时间');
        return;
      }

      // Collect form data
      const formData = {
        ownerName: document.getElementById('ownerName').value,
        phone: phone,
        petType: document.getElementById('petType').value,
        petName: document.getElementById('petName').value || '未提供',
        petAge: document.getElementById('petAge').value || '未提供',
        serviceType: document.getElementById('serviceType').value,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        message: document.getElementById('message').value || '无'
      };

      const btn = this.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      btn.innerHTML = `
        <span style="display:flex;align-items:center;gap:8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
          提交中...
        </span>
      `;
      btn.disabled = true;

      // Add spin animation
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }

      // Simulate submission (in production, send to backend)
      console.log('预约信息：', formData);

      setTimeout(() => {
        btn.innerHTML = `
          <span style="display:flex;align-items:center;gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            预约成功！
          </span>
        `;
        btn.style.background = 'linear-gradient(135deg, #07c160, #06ad56)';

        // Show success message with appointment details
        const serviceNames = {
          'checkup': '健康体检',
          'vaccine': '疫苗接种',
          'internal': '内科诊疗',
          'surgery': '外科手术',
          'skin': '皮肤专科',
          'dental': '牙科护理',
          'emergency': '急诊服务',
          'other': '其他服务'
        };

        setTimeout(() => {
          alert(
            `预约成功！\n\n` +
            `预约信息：\n` +
            `宠主姓名：${formData.ownerName}\n` +
            `联系电话：${formData.phone}\n` +
            `预约服务：${serviceNames[formData.serviceType]}\n` +
            `预约时间：${formData.appointmentDate} ${formData.appointmentTime}\n\n` +
            `我们会尽快与您联系确认！\n` +
            `如有紧急情况，请直接致电：185-0795-7950`
          );

          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
          
          // Reset phone input border
          if (phoneInput) {
            phoneInput.style.borderColor = '';
          }
        }, 1500);
      }, 1500);
    });
  }

  // --- Active Nav Link Highlight ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-link-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--teal)';
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // --- Service Card Tilt Effect ---
  const serviceCards = document.querySelectorAll('.service-card');
  if (window.innerWidth > 768) {
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --- Parallax on Scroll ---
  const heroShapes = document.querySelectorAll('.hero-shape');
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroShapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.05;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
});
