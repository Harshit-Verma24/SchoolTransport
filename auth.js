// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAuthTabs();
    initPasswordToggles();
    initAuthForms();
});

// Tab Switching
function initAuthTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Password Toggle
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            
            if (input) {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                
                // Update icon
                const icon = this.querySelector('svg');
                if (type === 'text') {
                    icon.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    `;
                } else {
                    icon.innerHTML = `
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    `;
                }
            }
        });
    });
}

// Form Submissions
function initAuthForms() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const remember = document.getElementById('remember').checked;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validation
    if (!email || !password) {
        window.SchoolTransport.showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!window.SchoolTransport.validateEmail(email) && !window.SchoolTransport.validatePhone(email)) {
        window.SchoolTransport.showToast('Please enter a valid email or phone number', 'error');
        return;
    }
    
    if (!window.SchoolTransport.validatePassword(password)) {
        window.SchoolTransport.showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Show loading state
    window.SchoolTransport.showLoading(submitBtn);
    
    try {
        // Simulate API call
        await simulateApiCall();
        
        // Save user session
        const userData = {
            email: email,
            loginTime: new Date().toISOString(),
            remember: remember
        };
        
        if (remember) {
            window.SchoolTransport.setLocalStorage('userSession', userData);
        } else {
            sessionStorage.setItem('userSession', JSON.stringify(userData));
        }
        
        // Show success message
        window.SchoolTransport.showToast('Login Successful! Welcome back to School Link Transport', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        window.SchoolTransport.showToast('Login failed. Please try again.', 'error');
    } finally {
        window.SchoolTransport.hideLoading(submitBtn);
    }
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const terms = document.getElementById('terms').checked;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validation
    if (!name || !email || !phone || !password) {
        window.SchoolTransport.showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (name.length < 2) {
        window.SchoolTransport.showToast('Please enter a valid name', 'error');
        return;
    }
    
    if (!window.SchoolTransport.validateEmail(email)) {
        window.SchoolTransport.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!window.SchoolTransport.validatePhone(phone)) {
        window.SchoolTransport.showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!window.SchoolTransport.validatePassword(password)) {
        window.SchoolTransport.showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (!terms) {
        window.SchoolTransport.showToast('Please accept the Terms and Conditions', 'error');
        return;
    }
    
    // Show loading state
    window.SchoolTransport.showLoading(submitBtn);
    
    try {
        // Simulate API call
        await simulateApiCall();
        
        // Save user data
        const userData = {
            name: name,
            email: email,
            phone: phone,
            signupTime: new Date().toISOString()
        };
        
        window.SchoolTransport.setLocalStorage('userData', userData);
        
        // Show success message
        window.SchoolTransport.showToast('Account Created! Welcome to School Link Transport', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        window.SchoolTransport.showToast('Signup failed. Please try again.', 'error');
    } finally {
        window.SchoolTransport.hideLoading(submitBtn);
    }
}

// Simulate API Call
function simulateApiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('API call failed'));
            }
        }, 2000);
    });
}

// Check if user is logged in
function checkAuthStatus() {
    const userSession = window.SchoolTransport.getLocalStorage('userSession') || 
                       JSON.parse(sessionStorage.getItem('userSession') || 'null');
    
    if (userSession) {
        // User is logged in
        return true;
    }
    
    return false;
}

// Logout Function
function logout() {
    window.SchoolTransport.removeLocalStorage('userSession');
    window.SchoolTransport.removeLocalStorage('userData');
    sessionStorage.removeItem('userSession');
    
    window.SchoolTransport.showToast('Logged out successfully', 'info');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Auto-logout after inactivity
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (checkAuthStatus()) {
            window.SchoolTransport.showToast('Session expired due to inactivity', 'info');
            logout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset timer on user activity
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

// Initialize inactivity timer
resetInactivityTimer();

// Forgot Password Handler
function handleForgotPassword() {
    const email = prompt('Enter your email address:');
    if (email && window.SchoolTransport.validateEmail(email)) {
        window.SchoolTransport.showToast('Password reset link sent to your email', 'success');
    } else if (email) {
        window.SchoolTransport.showToast('Please enter a valid email address', 'error');
    }
}

// Social Login Handlers (placeholders)
function handleGoogleLogin() {
    window.SchoolTransport.showToast('Google login coming soon!', 'info');
}

function handleFacebookLogin() {
    window.SchoolTransport.showToast('Facebook login coming soon!', 'info');
}

// Form Field Validation
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldId = field.id;
    
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation based on field type
    switch (fieldId) {
        case 'signup-name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
            
        case 'login-email':
        case 'signup-email':
            if (!window.SchoolTransport.validateEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'signup-phone':
            if (!window.SchoolTransport.validatePhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'login-password':
        case 'signup-password':
            if (!window.SchoolTransport.validatePassword(value)) {
                isValid = false;
                errorMessage = 'Password must be at least 6 characters';
            }
            break;
    }
    
    // Show error if invalid
    if (!isValid && value) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input[required]');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
            const existingError = this.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        });
    });
});

// Export auth functions
window.Auth = {
    checkAuthStatus,
    logout,
    handleForgotPassword,
    handleGoogleLogin,
    handleFacebookLogin,
    validateField
};