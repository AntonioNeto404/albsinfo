// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                setTimeout(() => {
                    nav.style.display = 'none';
                }, 300); // Tempo da animação
            } else {
                nav.style.display = 'block';
                // Forçar reflow para permitir a animação
                nav.offsetHeight;
                nav.classList.add('active');
            }
        });
    }

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'block';
            nav.classList.remove('active');
        } else if (!nav.classList.contains('active')) {
            nav.style.display = 'none';
        }
    });

    // Product Category Filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show all products if 'todos' is selected
                if (filterValue === 'todos') {
                    productCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    // Show only products that match the selected category
                    productCards.forEach(card => {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Substituir alert por mensagem inline mais amigável
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.backgroundColor = '#d4edda';
                successMessage.style.color = '#155724';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.marginBottom = '20px';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                contactForm.prepend(successMessage);
                contactForm.reset();
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);
            } else {
                const errorInputs = [];
                if (!name) errorInputs.push('Nome');
                if (!email) errorInputs.push('Email');
                if (!message) errorInputs.push('Mensagem');
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.backgroundColor = '#f8d7da';
                errorMessage.style.color = '#721c24';
                errorMessage.style.padding = '15px';
                errorMessage.style.borderRadius = '4px';
                errorMessage.style.marginBottom = '20px';
                errorMessage.innerHTML = `<strong>Por favor, preencha os seguintes campos:</strong> ${errorInputs.join(', ')}`;
                
                contactForm.prepend(errorMessage);
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    errorMessage.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => errorMessage.remove(), 500);
                }, 5000);
            }
        });
    }

    // Product Query Buttons
    const productBtns = document.querySelectorAll('.product-btn');
    
    if (productBtns.length > 0) {
        productBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product name from closest product card
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Guardar texto original do botão
                const originalText = this.textContent;
                
                // Mudar texto e estilo do botão
                this.textContent = 'Enviado com Sucesso!';
                this.style.backgroundColor = '#28a745';
                this.style.borderColor = '#28a745';
                
                // Restaurar após um tempo
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.borderColor = '';
                }, 3000);
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Implementação do indicador de scroll
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const width = (scrollTop / documentHeight) * 100;
        scrollIndicator.style.width = width + '%';
        
        // Animar elementos quando entrarem na viewport
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    });
    
    // Adicionar classe fade-in a elementos que devem animar
    document.querySelectorAll('.service-card, .info-card, .section-title, .about-text p, .contact-item, .product-card').forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Melhorar feedback visual de formulários
    const formInputs = document.querySelectorAll('input[required], textarea[required]');
    formInputs.forEach(input => {
        // Adicionar ícone de validação
        const validIcon = document.createElement('i');
        validIcon.className = 'fas fa-check-circle feedback-icon valid-feedback';
        input.parentNode.appendChild(validIcon);
        
        // Adicionar ícone de erro
        const invalidIcon = document.createElement('i');
        invalidIcon.className = 'fas fa-times-circle feedback-icon invalid-feedback';
        input.parentNode.appendChild(invalidIcon);
        
        // Adicionar placeholder para melhorar UX
        if (!input.hasAttribute('placeholder')) {
            input.setAttribute('placeholder', ' ');
        }
    });
});