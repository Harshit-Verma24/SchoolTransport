// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initBackToTop();
    initScrollAnimations();
    initToastNotifications();
    initButtonActions();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('active')) {
                icon.innerHTML = `
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                `;
            } else {
                icon.innerHTML = `
                    <path d="M4 12h16"></path>
                    <path d="M4 18h16"></path>
                    <path d="M4 6h16"></path>
                `;
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('fade-in');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation
    const animatedElements = document.querySelectorAll('[data-delay]');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card, .timeline-card, .value-card, .team-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.dataset.delay = (index * 100) + 'ms';
        observer.observe(card);
    });
}

// Toast Notifications
function initToastNotifications() {
    window.showToast = function(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                </svg>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
        
        // Manual close
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                toast.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        }
    };
}

// Button Actions
function initButtonActions() {
    // Book Now Button
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    // Learn More Button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            window.location.href = 'about.html';
        });
    }
    
    // Call Us Button
    const callUsBtn = document.getElementById('callUsBtn');
    if (callUsBtn) {
        callUsBtn.addEventListener('click', function() {
            window.location.href = 'tel:+919876543210';
        });
    }
    
    // Send Inquiry Button
    const sendInquiryBtn = document.getElementById('sendInquiryBtn');
    if (sendInquiryBtn) {
        sendInquiryBtn.addEventListener('click', function() {
            window.location.href = 'mailto:Mandeep6767@gmail.com?subject=Transport Service Inquiry&body=Hi, I would like to inquire about your school transport services.';
        });
    }
    
    // Contact Us Button (About page)
    const contactUsBtn = document.getElementById('contactUsBtn');
    if (contactUsBtn) {
        contactUsBtn.addEventListener('click', function() {
            window.location.href = 'mailto:Mandeep6767@gmail.com?subject=Transport Service Inquiry&body=Hi, I would like to inquire about your school transport services.';
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s\-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validatePassword(password) {
    return password.length >= 6;
}

// Loading States
function showLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnSpinner = button.querySelector('.btn-spinner');
    
    if (btnText) btnText.classList.add('hidden');
    if (btnSpinner) btnSpinner.classList.remove('hidden');
    
    button.disabled = true;
}

function hideLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnSpinner = button.querySelector('.btn-spinner');
    
    if (btnText) btnText.classList.remove('hidden');
    if (btnSpinner) btnSpinner.classList.add('hidden');
    
    button.disabled = false;
}

// Local Storage Helpers
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}

function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing from localStorage:', e);
    }
}

// URL Parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
}

// Date Formatting
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString(undefined, options);
}

// Number Formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-IN').format(number);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Performance Monitoring
if (window.performance && window.performance.navigation) {
    const navigationType = window.performance.navigation.type;
    if (navigationType === 1) {
        console.log('Page reloaded');
    }
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for use in other files
window.SchoolTransport = {
    showToast,
    showLoading,
    hideLoading,
    validateEmail,
    validatePhone,
    validatePassword,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    getUrlParameter,
    setUrlParameter,
    formatDate,
    formatTime,
    formatCurrency,
    formatNumber,
    debounce,
    throttle
};