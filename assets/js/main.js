/**
 * OpenDLP-LK Main JavaScript
 * Core functionality for the website
 */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initFormValidation();
    initTooltips();
    initCopyButtons();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = !mobileMenu.classList.contains('hidden');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    // Create back to top button if it doesn't exist
    if (!document.getElementById('back-to-top')) {
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition opacity-0 pointer-events-none z-40';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                btn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                btn.classList.add('opacity-0', 'pointer-events-none');
            }
        });
        
        // Scroll to top on click
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
                return false;
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('border-red-500');
    
    const error = document.createElement('div');
    error.className = 'text-red-600 text-sm mt-1';
    error.textContent = message;
    error.id = field.id + '-error';
    
    field.parentNode.appendChild(error);
}

function clearFieldError(field) {
    field.classList.remove('border-red-500');
    const error = document.getElementById(field.id + '-error');
    if (error) {
        error.remove();
    }
}

/**
 * Initialize Tooltips
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const text = this.getAttribute('data-tooltip');
            const tooltip = createTooltip(text);
            this.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginBottom = '0.5rem';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip absolute bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg whitespace-nowrap z-50';
    tooltip.textContent = text;
    return tooltip;
}

/**
 * Copy to Clipboard Functionality
 */
function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        if (pre.querySelector('.copy-btn')) return;
        
        const btn = document.createElement('button');
        btn.className = 'copy-btn absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition';
        btn.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
        btn.onclick = function() {
            copyToClipboard(block.textContent);
            btn.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
            }, 2000);
        };
        
        pre.style.position = 'relative';
        pre.appendChild(btn);
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/**
 * Progress Tracker for Checklists
 */
function updateChecklistProgress(checkboxes) {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = Math.round((checked / total) * 100);
    
    // Update progress bar if it exists
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    
    // Update progress text if it exists
    const progressText = document.querySelector('[data-progress-text]');
    if (progressText) {
        progressText.textContent = `${checked} of ${total} completed (${percentage}%)`;
    }
    
    return { total, checked, percentage };
}

/**
 * Local Storage Helpers
 */
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};

/**
 * Utility Functions
 */
const Utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format date
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-LK', options);
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Storage, Utils, updateChecklistProgress };
}
