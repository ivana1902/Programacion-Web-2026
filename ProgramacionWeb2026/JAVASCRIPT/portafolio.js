// ==================== EFECTOS DE NAVEGACIÓN SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== ANIMACIONES AL SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.stat, .skill-category, .education-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = this.querySelector('input[placeholder="Tu Nombre"]').value;
        const email = this.querySelector('input[placeholder="Tu Email"]').value;
        const asunto = this.querySelector('input[placeholder="Asunto"]').value;
        const mensaje = this.querySelector('textarea').value;
        
        // Validación básica
        if (!nombre || !email || !asunto || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Simular envío
        const button = this.querySelector('button');
        const textOriginal = button.textContent;
        button.textContent = '¡Mensaje Enviado!';
        button.style.background = '#4CAF50';
        
        // Limpiar formulario
        this.reset();
        
        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            button.textContent = textOriginal;
            button.style.background = '';
        }, 3000);
    });
}

// ==================== EFECTO HOVER EN TARJETAS ====================
document.querySelectorAll('.project-card, .education-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== CONTADOR ANIMADO ====================
function animarNumeros() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent.match(/\d+/)[0] + (stat.textContent.includes('+') ? '+' : '%');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
            }
        }, 20);
    });
}

// Ejecutar animación cuando se ve la sección
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observerStats = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarNumeros();
                observerStats.unobserve(entry.target);
            }
        });
    });
    
    observerStats.observe(statsSection);
}

// ==================== EFECTO DE BARRA DE PROGRESO ====================
function animarProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = width;
        }, 100);
    });
}

// Ejecutar animación cuando se ve la sección de habilidades
const skillsSection = document.querySelector('.habilidades');
if (skillsSection) {
    const observerSkills = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarProgressBars();
                observerSkills.unobserve(entry.target);
            }
        });
    });
    
    observerSkills.observe(skillsSection);
}

// ==================== VALIDACIÓN DE EMAIL ====================
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validarEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.title = 'Email inválido';
        } else {
            this.style.borderColor = '';
            this.title = '';
        }
    });
});

// ==================== EFECTO PARALLAX (OPCIONAL) ====================
window.addEventListener('scroll', function() {
    const profileCircle = document.querySelector('.profile-circle');
    if (profileCircle && window.scrollY < window.innerHeight) {
        profileCircle.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// ==================== MENÚ RESPONSIVO ====================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Agregar evento al botón hamburguesa si lo hay
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// ==================== EFECTO DE SCROLL SUAVE EN NAVBAR ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    
    if (window.scrollY > lastScroll) {
        // Scrolling down
        navbar.style.boxShadow = '0 8px 25px rgba(155, 123, 168, 0.3)';
    }
    
    lastScroll = window.scrollY;
});

// ==================== CARGAR ELEMENTOS DINÁMICAMENTE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio cargado correctamente');
    
    // Agregar animación inicial
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// ==================== KEYFRAMES PARA ANIMACIONES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
