// Analytics tracking functions
// This file handles custom event tracking for Google Analytics

// Track page views
export function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
        console.log('📊 Page view tracked:', pageName);
    }
}

// Track button clicks
export function trackButtonClick(buttonName, buttonLocation) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'button_click', {
            event_category: 'engagement',
            event_label: buttonName,
            button_location: buttonLocation
        });
        console.log('📊 Button click tracked:', buttonName);
    }
}

// Track form submissions
export function trackFormSubmission(formName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: formName
        });
        console.log('📊 Form submission tracked:', formName);
    }
}

// Track portfolio filter usage
export function trackPortfolioFilter(filterType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'portfolio_filter', {
            event_category: 'engagement',
            event_label: filterType
        });
        console.log('📊 Portfolio filter tracked:', filterType);
    }
}

// Track video plays
export function trackVideoPlay(videoName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_play', {
            event_category: 'engagement',
            event_label: videoName
        });
        console.log('📊 Video play tracked:', videoName);
    }
}

// Track social media clicks
export function trackSocialClick(platform) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            event_category: 'engagement',
            event_label: platform
        });
        console.log('📊 Social click tracked:', platform);
    }
}

// Track contact method clicks
export function trackContactClick(method) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_click', {
            event_category: 'engagement',
            event_label: method
        });
        console.log('📊 Contact click tracked:', method);
    }
}

// Track load more clicks
export function trackLoadMore(section) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'load_more', {
            event_category: 'engagement',
            event_label: section
        });
        console.log('📊 Load more tracked:', section);
    }
}

// Track scroll depth
export function trackScrollDepth(percentage) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            event_label: percentage + '%'
        });
        console.log('📊 Scroll depth tracked:', percentage + '%');
    }
}

// Initialize scroll tracking
export function initScrollTracking() {
    let scrollMarks = [25, 50, 75, 100];
    let trackedMarks = [];

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        scrollMarks.forEach(mark => {
            if (scrollPercent >= mark && !trackedMarks.includes(mark)) {
                trackedMarks.push(mark);
                trackScrollDepth(mark);
            }
        });
    }, { passive: true });
}

console.log('📊 Analytics module loaded');
