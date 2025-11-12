/**
 * OpenDLP-LK Analytics Tracking
 * Privacy-respecting analytics for usage insights
 */

class Analytics {
    constructor() {
        this.enabled = this.checkConsent();
        this.sessionId = this.getOrCreateSessionId();
        
        if (this.enabled) {
            this.init();
        }
    }

    init() {
        // Track page view
        this.trackPageView();
        
        // Track outbound links
        this.trackOutboundLinks();
        
        // Track downloads
        this.trackDownloads();
        
        // Track scroll depth
        this.trackScrollDepth();
    }

    checkConsent() {
        // Check if user has consented to analytics
        const consent = localStorage.getItem('analytics-consent');
        return consent === 'true';
    }

    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('session-id');
        if (!sessionId) {
            sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('session-id', sessionId);
        }
        return sessionId;
    }

    trackPageView() {
        const data = {
            event: 'page_view',
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
        
        this.sendEvent(data);
    }

    trackOutboundLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (href && (href.startsWith('http') && !href.includes(window.location.hostname))) {
                this.sendEvent({
                    event: 'outbound_link',
                    url: href,
                    text: link.textContent.trim(),
                    timestamp: new Date().toISOString(),
                    sessionId: this.sessionId
                });
            }
        });
    }

    trackDownloads() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.csv'];
            
            if (href && downloadExtensions.some(ext => href.toLowerCase().endsWith(ext))) {
                this.sendEvent({
                    event: 'download',
                    file: href,
                    filename: href.split('/').pop(),
                    timestamp: new Date().toISOString(),
                    sessionId: this.sessionId
                });
            }
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                
                if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                    maxScroll = scrollPercent;
                    this.sendEvent({
                        event: 'scroll_depth',
                        depth: scrollPercent,
                        page: window.location.pathname,
                        timestamp: new Date().toISOString(),
                        sessionId: this.sessionId
                    });
                }
            }, 500);
        });
    }

    sendEvent(data) {
        if (!this.enabled) return;
        
        // Log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('[Analytics]', data);
            return;
        }
        
        // In production, you would send to your analytics endpoint
        // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(data) });
        
        // For GitHub Pages, you might use a service like Google Analytics, Plausible, or Umami
        // This is a placeholder implementation
    }
}

// Cookie Consent Banner
class ConsentBanner {
    constructor() {
        this.banner = null;
        this.init();
    }

    init() {
        const consent = localStorage.getItem('analytics-consent');
        if (consent === null) {
            this.showBanner();
        }
    }

    showBanner() {
        this.banner = document.createElement('div');
        this.banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg';
        this.banner.innerHTML = `
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="text-sm">
                    <p class="mb-2 md:mb-0">
                        🍪 We use minimal analytics to improve your experience. No personal data is collected.
                        <a href="/docs/privacy-policy.html" class="underline hover:text-blue-400">Learn more</a>
                    </p>
                </div>
                <div class="flex gap-2">
                    <button id="consent-accept" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition">
                        Accept
                    </button>
                    <button id="consent-decline" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold transition">
                        Decline
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.banner);
        
        document.getElementById('consent-accept').addEventListener('click', () => {
            this.setConsent(true);
        });
        
        document.getElementById('consent-decline').addEventListener('click', () => {
            this.setConsent(false);
        });
    }

    setConsent(accepted) {
        localStorage.setItem('analytics-consent', accepted.toString());
        this.hideBanner();
        
        if (accepted) {
            // Initialize analytics
            new Analytics();
        }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.remove();
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Show consent banner if needed
    new ConsentBanner();
    
    // Initialize analytics if consent given
    const consent = localStorage.getItem('analytics-consent');
    if (consent === 'true') {
        new Analytics();
    }
});
