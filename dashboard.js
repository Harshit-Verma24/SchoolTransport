// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    initAreaSelection();
    initPlanSelection();
    initBooking();
    initAnimations();
    initInteractions();
}

// Area Selection
function initAreaSelection() {
    const areaSelect = document.getElementById('areaSelect');
    const selectedAreaInfo = document.getElementById('selectedAreaInfo');
    
    if (areaSelect) {
        areaSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.dataset.price;
            const distance = selectedOption.dataset.distance;
            const areaName = selectedOption.text.split(' - ')[0];
            
            if (this.value) {
                // Show selected area info
                document.getElementById('areaName').textContent = areaName;
                document.getElementById('areaDistance').textContent = `Distance: ${distance}`;
                document.getElementById('areaPrice').textContent = `₹${price}/month`;
                
                selectedAreaInfo.style.display = 'block';
                selectedAreaInfo.classList.add('slide-in-top');
                
                // Update pricing
                updatePricing();
            } else {
                selectedAreaInfo.style.display = 'none';
                updatePricing();
            }
        });
    }
}

// Plan Selection
function initPlanSelection() {
    const planSelect = document.getElementById('planSelect');
    const selectedPlanInfo = document.getElementById('selectedPlanInfo');
    
    if (planSelect) {
        planSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const multiplier = selectedOption.dataset.multiplier;
            const planText = selectedOption.text;
            const planName = planText.split(' - ')[0];
            const planDescription = planText.split(' - ')[1];
            
            if (this.value) {
                // Show selected plan info
                document.getElementById('planName').textContent = planName;
                document.getElementById('planDescription').textContent = planDescription;
                document.getElementById('planBadge').textContent = `${multiplier}x`;
                
                // Add plan features
                const planFeatures = getPlanFeatures(this.value);
                const featuresContainer = document.getElementById('planFeatures');
                featuresContainer.innerHTML = '';
                
                planFeatures.forEach(feature => {
                    const featureDiv = document.createElement('div');
                    featureDiv.className = 'plan-feature-item';
                    featureDiv.innerHTML = `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>${feature}</span>
                    `;
                    featuresContainer.appendChild(featureDiv);
                });
                
                selectedPlanInfo.style.display = 'block';
                selectedPlanInfo.classList.add('slide-in-top');
                
                // Update pricing
                updatePricing();
            } else {
                selectedPlanInfo.style.display = 'none';
                updatePricing();
            }
        });
    }
}

// Get Plan Features
function getPlanFeatures(planId) {
    const features = {
        '1': ['Morning or Evening', '5 days/week', 'Basic tracking'],
        '2': ['Morning & Evening', '5 days/week', 'Live tracking', 'SMS alerts'],
        '3': ['Flexible timing', '6 days/week', 'Live tracking', 'SMS alerts', 'Priority support']
    };
    
    return features[planId] || [];
}

// Update Pricing
function updatePricing() {
    const areaSelect = document.getElementById('areaSelect');
    const planSelect = document.getElementById('planSelect');
    const pricingDisplay = document.getElementById('pricingDisplay');
    const emptyState = document.getElementById('emptyState');
    
    if (areaSelect && planSelect) {
        const selectedArea = areaSelect.options[areaSelect.selectedIndex];
        const selectedPlan = planSelect.options[planSelect.selectedIndex];
        
        if (areaSelect.value && planSelect.value) {
            const basePrice = parseInt(selectedArea.dataset.price);
            const multiplier = parseFloat(selectedPlan.dataset.multiplier);
            const calculatedPrice = Math.round(basePrice * multiplier);
            
            // Update pricing display
            document.getElementById('priceAmount').textContent = calculatedPrice;
            document.getElementById('priceAreaName').textContent = selectedArea.text.split(' - ')[0];
            document.getElementById('pricePlanName').textContent = selectedPlan.text.split(' - ')[0];
            
            // Show pricing display, hide empty state
            pricingDisplay.style.display = 'block';
            emptyState.style.display = 'none';
            
            // Add animation
            pricingDisplay.classList.add('slide-in-bottom');
        } else {
            // Show empty state, hide pricing display
            pricingDisplay.style.display = 'none';
            emptyState.style.display = 'block';
        }
    }
}

// Booking Handler
function initBooking() {
    const bookNowBtn = document.getElementById('bookNowBtn');
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBooking);
    }
}

async function handleBooking() {
    const areaSelect = document.getElementById('areaSelect');
    const planSelect = document.getElementById('planSelect');
    
    if (!areaSelect.value || !planSelect.value) {
        window.SchoolTransport.showToast('Please select both area and plan', 'error');
        return;
    }
    
    const selectedArea = areaSelect.options[areaSelect.selectedIndex];
    const selectedPlan = planSelect.options[planSelect.selectedIndex];
    const areaName = selectedArea.text.split(' - ')[0];
    const planName = selectedPlan.text.split(' - ')[0];
    
    // Show loading state
    window.SchoolTransport.showLoading(this);
    
    try {
        // Simulate booking process
        await simulateBooking();
        
        // Save booking data
        const bookingData = {
            area: areaName,
            plan: planName,
            price: document.getElementById('priceAmount').textContent,
            bookingTime: new Date().toISOString(),
            status: 'confirmed'
        };
        
        window.SchoolTransport.setLocalStorage('currentBooking', bookingData);
        
        // Show success message
        window.SchoolTransport.showToast(`Booking Successful! Your transport service for ${areaName} has been booked.`, 'success');
        
        // Reset form after successful booking
        setTimeout(() => {
            areaSelect.value = '';
            planSelect.value = '';
            document.getElementById('selectedAreaInfo').style.display = 'none';
            document.getElementById('selectedPlanInfo').style.display = 'none';
            document.getElementById('pricingDisplay').style.display = 'none';
            document.getElementById('emptyState').style.display = 'block';
        }, 2000);
        
    } catch (error) {
        window.SchoolTransport.showToast('Booking failed. Please try again.', 'error');
    } finally {
        window.SchoolTransport.hideLoading(this);
    }
}

// Simulate Booking Process
function simulateBooking() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Booking failed'));
            }
        }, 2000);
    });
}

// Animations
function initAnimations() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.feature-card, .performance-card');
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
                cardsObserver.unobserve(entry.target);
            }
        });
    });
    
    cards.forEach(card => {
        cardsObserver.observe(card);
    });
}

// Animate Number Counting
function animateValue(element) {
    const value = element.textContent;
    const duration = 2000;
    const start = 0;
    const end = parseInt(value.replace(/\D/g, '')) || 0;
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        if (value.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (value.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (value.includes('/')) {
            element.textContent = Math.floor(current) + '/5';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Interactive Elements
function initInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .performance-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click feedback to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Load User Data
function loadUserData() {
    const userData = window.SchoolTransport.getLocalStorage('userData');
    const userSession = window.SchoolTransport.getLocalStorage('userSession') || 
                      JSON.parse(sessionStorage.getItem('userSession') || 'null');
    
    if (userData) {
        // Update welcome message with user name
        const welcomeSection = document.querySelector('.welcome-section h1');
        if (welcomeSection && userData.name) {
            welcomeSection.textContent = `Welcome back, ${userData.name}!`;
        }
    }
    
    // Load existing booking if any
    const existingBooking = window.SchoolTransport.getLocalStorage('currentBooking');
    if (existingBooking) {
        // Show booking summary
        showBookingSummary(existingBooking);
    }
}

// Show Booking Summary
function showBookingSummary(booking) {
    const summaryHtml = `
        <div class="booking-summary" style="background: linear-gradient(to right, #ecfdf5, #dbeafe); border: 2px solid #10b981; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1f2937;">Current Booking</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <div>
                    <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Area</p>
                    <p style="font-weight: 600; color: #1f2937;">${booking.area}</p>
                </div>
                <div>
                    <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Plan</p>
                    <p style="font-weight: 600; color: #1f2937;">${booking.plan}</p>
                </div>
                <div>
                    <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Monthly Fee</p>
                    <p style="font-weight: 600; color: #10b981;">₹${booking.price}/month</p>
                </div>
                <div>
                    <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Status</p>
                    <p style="font-weight: 600; color: #10b981;">${booking.status}</p>
                </div>
            </div>
        </div>
    `;
    
    // Insert after dashboard header
    const dashboardHeader = document.querySelector('.dashboard-header');
    if (dashboardHeader) {
        dashboardHeader.insertAdjacentHTML('afterend', summaryHtml);
    }
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
});

// Export dashboard functions
window.Dashboard = {
    updatePricing,
    handleBooking,
    loadUserData,
    showBookingSummary
};