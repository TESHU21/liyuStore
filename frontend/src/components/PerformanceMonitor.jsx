import React, { useEffect, useState } from "react";
import {
  getMetrics,
  getPerformanceScore,
  isPerformanceGood,
} from "../lib/performance";

const PerformanceMonitor = ({ showInProduction = false }) => {
  const [metrics, setMetrics] = useState(null);
  const [score, setScore] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if explicitly enabled
    if (import.meta.env.DEV || showInProduction) {
      const updateMetrics = () => {
        const currentMetrics = getMetrics();
        const currentScore = getPerformanceScore();
        setMetrics(currentMetrics);
        setScore(currentScore);
      };

      // Update metrics every 5 seconds
      const interval = setInterval(updateMetrics, 5000);
      updateMetrics(); // Initial update

      return () => clearInterval(interval);
    }
  }, [showInProduction]);

  // Don't render in production unless explicitly enabled
  if (import.meta.env.PROD && !showInProduction) {
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMetricColor = (rating) => {
    switch (rating) {
      case "good":
        return "text-green-600";
      case "needs-improvement":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs hover:bg-gray-700 z-50"
      >
        📊 Performance
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ×
        </button>
      </div>

      {/* Overall Score */}
      {score !== null && (
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">Overall Score:</span>
            <span className={`font-bold ${getScoreColor(score)}`}>
              {score}/100
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {isPerformanceGood()
              ? "✅ Performance is good"
              : "⚠️ Performance needs improvement"}
          </div>
        </div>
      )}

      {/* Individual Metrics */}
      {metrics && (
        <div className="space-y-2">
          {Object.entries(metrics)
            .filter(
              ([, metric]) =>
                metric !== null &&
                metric.rating &&
                typeof metric.value === "number",
            )
            .map(([key, metric]) => (
              <div
                key={key}
                className="flex justify-between items-center text-xs"
              >
                <span className="font-medium uppercase">{key}</span>
                <div className="flex items-center space-x-2">
                  <span className={getMetricColor(metric.rating)}>
                    {metric.value.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs px-1 py-0.5 rounded ${getMetricColor(metric.rating)} bg-opacity-10`}
                  >
                    {metric.rating}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {!metrics && (
        <div className="text-xs text-gray-500">
          Loading performance metrics...
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
        Metrics update every 5 seconds
      </div>
    </div>
  );
};

export default PerformanceMonitor;
