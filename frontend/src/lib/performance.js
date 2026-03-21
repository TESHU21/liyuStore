import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

// Performance metrics storage
let metrics = {
  cls: null,
  inp: null, // Changed from fid to inp
  fcp: null,
  lcp: null,
  ttfb: null,
};

// Performance thresholds (based on Google recommendations)
const thresholds = {
  cls: { good: 0.1, needsImprovement: 0.25 },
  inp: { good: 200, needsImprovement: 500 }, // Changed from fid to inp
  fcp: { good: 1.8, needsImprovement: 3 },
  lcp: { good: 2.5, needsImprovement: 4 },
  ttfb: { good: 800, needsImprovement: 1800 },
};

// Get performance rating
function getRating(value, threshold) {
  if (value <= threshold.good) return "good";
  if (value <= threshold.needsImprovement) return "needs-improvement";
  return "poor";
}

// Log performance metrics
function logMetric(name, value, rating) {
  const metric = {
    name,
    value,
    rating,
    timestamp: new Date().toISOString(),
  };

  console.log(`🚀 Performance Metric - ${name}:`, metric);

  // Store for later analysis
  metrics[name.toLowerCase()] = metric;
  console.log("📊 Updated metrics object:", metrics);

  // Send to analytics service (optional)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "web_vitals", {
      event_category: "Performance",
      event_label: name,
      value: Math.round(value),
      custom_parameter_1: rating,
    });
  }
}

// Initialize performance tracking
export function initPerformanceTracking() {
  console.log("🚀 Initializing performance tracking...");

  // Cumulative Layout Shift
  onCLS((value) => {
    console.log("📊 CLS metric received:", value);
    const actualValue = value.value !== undefined ? value.value : value;
    const rating = getRating(actualValue, thresholds.cls);
    logMetric("CLS", actualValue, rating);
  });

  // Interaction to Next Paint (replaces FID)
  onINP((value) => {
    console.log("📊 INP metric received:", value);
    const actualValue = value.value !== undefined ? value.value : value;
    const rating = getRating(actualValue, thresholds.inp);
    logMetric("INP", actualValue, rating);
  });

  // First Contentful Paint
  onFCP((value) => {
    console.log("📊 FCP metric received:", value);
    const actualValue = value.value !== undefined ? value.value : value;
    const rating = getRating(actualValue, thresholds.fcp);
    logMetric("FCP", actualValue, rating);
  });

  // Largest Contentful Paint
  onLCP((value) => {
    console.log("📊 LCP metric received:", value);
    const actualValue = value.value !== undefined ? value.value : value;
    const rating = getRating(actualValue, thresholds.lcp);
    logMetric("LCP", actualValue, rating);
  });

  // Time to First Byte
  onTTFB((value) => {
    console.log("📊 TTFB metric received:", value);
    const actualValue = value.value !== undefined ? value.value : value;
    const rating = getRating(actualValue, thresholds.ttfb);
    logMetric("TTFB", actualValue, rating);
  });
}

// Get all collected metrics
export function getMetrics() {
  return metrics;
}

// Check if performance is good
export function isPerformanceGood() {
  const ratings = Object.values(metrics).map((metric) => metric?.rating);
  return ratings.every(
    (rating) => rating === "good" || rating === "needs-improvement",
  );
}

// Get performance score (0-100)
export function getPerformanceScore() {
  const ratings = Object.values(metrics).map((metric) => {
    if (!metric) return 50; // Default score for missing metrics
    switch (metric.rating) {
      case "good":
        return 90;
      case "needs-improvement":
        return 60;
      case "poor":
        return 30;
      default:
        return 50;
    }
  });

  return Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
}

// Custom performance tracking for e-commerce
export function trackCustomEvent(eventName, duration, metadata = {}) {
  const event = {
    name: eventName,
    duration,
    metadata,
    timestamp: new Date().toISOString(),
  };

  console.log(`🛒 E-commerce Metric - ${eventName}:`, event);

  // Track slow user interactions
  if (duration > 1000) {
    console.warn(
      `⚠️ Slow interaction detected: ${eventName} took ${duration}ms`,
    );
  }

  return event;
}

// Track API performance
export function trackAPICall(url, duration, status, error = null) {
  const apiMetric = {
    url,
    duration,
    status,
    error,
    timestamp: new Date().toISOString(),
  };

  console.log(`🌐 API Performance - ${url}:`, apiMetric);

  // Track slow API calls
  if (duration > 2000) {
    console.warn(`⚠️ Slow API call: ${url} took ${duration}ms`);
  }

  return apiMetric;
}
