// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});

function initAboutPage() {
    initScrollAnimations();
    initTimelineAnimations();
    initTeamAnimations();
    initContactAnimations();
    initCounterAnimations();
    initInteractiveElements();
}

// Enhanced Scroll Animations for About Page
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.timeline-card, .value-card, .team-card, .contact-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.dataset.delay = (index * 100) + 'ms';
        observer.observe(element);
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('slide-in-left');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'all 0.8s ease';
        timelineObserver.observe(card);
    });
}

// Team Card Animations
function initTeamAnimations() {
    const teamCards = document.querySelectorAll('.team-card');
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('scale-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);
                
                teamObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    teamCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'all 0.6s ease';
        teamObserver.observe(card);
    });
}

// Contact Card Animations
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('bounce');
                    entry.target.style.opacity = '1';
                }, index * 200);
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.6s ease';
        contactObserver.observe(card);
    });
}

// Counter Animations for Stats
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/\D/g, ''));
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let currentValue = 0;
                
                const updateCounter = () => {
                    currentValue += increment;
                    if (currentValue < finalValue) {
                        target.textContent = Math.floor(currentValue) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Value cards hover effect
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-8px)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            
            // Add glow effect
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = 'none';
            }
        });
    });
    
    // Team cards hover effect
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateY(5deg)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            
            const avatar = this.querySelector('.team-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1)';
                avatar.style.backgroundColor = '#f97316';
                avatar.style.color = 'white';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            
            const avatar = this.querySelector('.team-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1)';
                avatar.style.backgroundColor = '#e5e7eb';
                avatar.style.color = '#6b7280';
            }
        });
    });
    
    // Contact cards interactive effect
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) translateY(-8px)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.08) translateY(-8px)';
            }, 100);
        });
    });
    
    // Award cards hover effect
    const awardCards = document.querySelectorAll('.award-card');
    awardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            
            const icon = this.querySelector('.award-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.award-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Parallax effect for hero section
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            aboutHero.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Add floating animation to story bus icon
    const storyBus = document.querySelector('.story-image .bus-icon');
    if (storyBus) {
        storyBus.classList.add('floating');
    }
}

// Timeline Progress Indicator
function createTimelineProgress() {
    const timelineSection = document.querySelector('.timeline-section');
    if (!timelineSection) return;
    
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'timeline-progress';
    progressIndicator.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-dots">
            <div class="dot active" data-year="2009"></div>
            <div class="dot" data-year="2014"></div>
            <div class="dot" data-year="2019"></div>
            <div class="dot" data-year="2024"></div>
        </div>
    `;
    
    timelineSection.insertBefore(progressIndicator, timelineSection.firstChild);
    
    // Update progress on scroll
    const timelineCards = document.querySelectorAll('.timeline-card');
    const dots = progressIndicator.querySelectorAll('.dot');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const year = card.querySelector('.timeline-year').textContent;
                const dotIndex = Array.from(dots).findIndex(dot => dot.dataset.year === year);
                
                if (dotIndex !== -1) {
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index <= dotIndex);
                    });
                    
                    // Update progress bar
                    const progressFill = progressIndicator.querySelector('.progress-fill');
                    const progress = ((dotIndex + 1) / dots.length) * 100;
                    progressFill.style.width = `${progress}%`;
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineCards.forEach(card => {
        timelineObserver.observe(card);
    });
}

// Add smooth reveal for company story
function animateCompanyStory() {
    const storyContent = document.querySelector('.story-content');
    if (!storyContent) return;
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const storyText = entry.target.querySelector('.story-text');
                const storyImage = entry.target.querySelector('.story-image');
                
                if (storyText) {
                    storyText.classList.add('slide-in-left');
                }
                
                if (storyImage) {
                    setTimeout(() => {
                        storyImage.classList.add('slide-in-right');
                    }, 300);
                }
                
                storyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    storyObserver.observe(storyContent);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    createTimelineProgress();
    animateCompanyStory();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Export about page functions
window.AboutPage = {
    initScrollAnimations,
    initTimelineAnimations,
    initTeamAnimations,
    initContactAnimations,
    initCounterAnimations,
    createTimelineProgress,
    animateCompanyStory
};