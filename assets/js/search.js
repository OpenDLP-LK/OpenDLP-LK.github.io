/**
 * OpenDLP-LK Search Functionality
 * Simple client-side search for static content
 */

class SiteSearch {
    constructor() {
        this.searchIndex = [];
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    init() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));
        }
        
        // Build search index
        this.buildSearchIndex();
    }

    buildSearchIndex() {
        // Index key pages for search
        this.searchIndex = [
            {
                title: 'Home',
                url: '/',
                description: 'OpenDLP-LK - Open-source Data Loss Prevention for Sri Lankan enterprises',
                keywords: ['home', 'dlp', 'data loss prevention', 'pdpa', 'sri lanka']
            },
            {
                title: 'About',
                url: '/about.html',
                description: 'Learn about OpenDLP-LK mission and community',
                keywords: ['about', 'mission', 'community', 'contributors']
            },
            {
                title: 'Getting Started',
                url: '/getting-started.html',
                description: 'Quick start guide to implement DLP',
                keywords: ['getting started', 'quick start', 'guide', 'tutorial']
            },
            {
                title: 'Implementation Guide',
                url: '/implementation/',
                description: '5-phase DLP implementation roadmap',
                keywords: ['implementation', 'guide', 'phases', 'roadmap']
            },
            {
                title: 'Phase 1: Planning',
                url: '/implementation/phase1-planning.html',
                description: 'Planning and assessment phase',
                keywords: ['planning', 'assessment', 'stakeholders', 'gap analysis']
            },
            {
                title: 'Phase 2: Discovery',
                url: '/implementation/phase2-discovery.html',
                description: 'Data discovery and classification',
                keywords: ['discovery', 'classification', 'data inventory', 'sensitive data']
            },
            {
                title: 'Phase 3: Policy',
                url: '/implementation/phase3-policy.html',
                description: 'Policy development and controls',
                keywords: ['policy', 'controls', 'rules', 'procedures']
            },
            {
                title: 'Phase 4: Pilot',
                url: '/implementation/phase4-pilot.html',
                description: 'Pilot deployment and rollout',
                keywords: ['pilot', 'rollout', 'deployment', 'testing']
            },
            {
                title: 'Phase 5: Monitoring',
                url: '/implementation/phase5-monitoring.html',
                description: 'Continuous monitoring and improvement',
                keywords: ['monitoring', 'continuous', 'improvement', 'maintenance']
            },
            {
                title: 'Implementation Checklist',
                url: '/implementation/checklist.html',
                description: 'Complete task-by-task checklist',
                keywords: ['checklist', 'tasks', 'todo', 'implementation']
            },
            {
                title: 'PDPA Compliance',
                url: '/pdpa-compliance/',
                description: 'Sri Lankan PDPA compliance guide',
                keywords: ['pdpa', 'compliance', 'regulations', 'legal', 'sri lanka']
            },
            {
                title: 'Resources',
                url: '/resources/',
                description: 'Templates, patterns, tools and guides',
                keywords: ['resources', 'templates', 'tools', 'patterns', 'downloads']
            },
            {
                title: 'Data Champions Program',
                url: '/data-champions/',
                description: 'Train department leaders in data protection',
                keywords: ['champions', 'training', 'certification', 'leaders']
            },
            {
                title: 'Community',
                url: '/community/',
                description: 'Join the OpenDLP-LK community',
                keywords: ['community', 'contribute', 'discussions', 'events']
            }
        ];
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideResults();
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();
        const results = this.searchIndex.filter(item => {
            return item.title.toLowerCase().includes(normalizedQuery) ||
                   item.description.toLowerCase().includes(normalizedQuery) ||
                   item.keywords.some(keyword => keyword.includes(normalizedQuery));
        });

        this.displayResults(results, query);
    }

    displayResults(results, query) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="p-4 text-center text-gray-600">
                    <i class="fas fa-search text-3xl mb-2"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            this.showResults();
            return;
        }

        const html = results.map(result => `
            <a href="${result.url}" class="block p-4 hover:bg-gray-50 border-b border-gray-200 transition">
                <h3 class="font-semibold text-gray-900 mb-1">${this.highlightMatch(result.title, query)}</h3>
                <p class="text-sm text-gray-600">${this.highlightMatch(result.description, query)}</p>
            </a>
        `).join('');

        this.searchResults.innerHTML = html;
        this.showResults();
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    }

    showResults() {
        if (this.searchResults) {
            this.searchResults.classList.remove('hidden');
        }
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.classList.add('hidden');
            this.searchResults.innerHTML = '';
        }
    }

    debounce(func, wait) {
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
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new SiteSearch();
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    const searchContainer = document.getElementById('search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.classList.add('hidden');
        }
    }
});
