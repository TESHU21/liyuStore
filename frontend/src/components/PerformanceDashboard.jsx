import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getMetrics,
  getPerformanceScore,
  isPerformanceGood,
} from "../lib/performance";

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [score, setScore] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getMetrics());
      setScore(getPerformanceScore());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getMetricColor = (rating) => {
    switch (rating) {
      case "good":
        return "text-green-600 bg-green-50";
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-50";
      case "poor":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getMetricIcon = (rating) => {
    switch (rating) {
      case "good":
        return "✅";
      case "needs-improvement":
        return "⚠️";
      case "poor":
        return "❌";
      default:
        return "⏳";
    }
  };

  if (!metrics) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          Loading performance metrics...
          <div className="mt-2 text-xs">
            Debug: Metrics object is null or undefined
          </div>
        </div>
      </div>
    );
  }

  // Debug: Show what metrics we actually have
  const metricKeys = Object.keys(metrics);
  const validMetrics = Object.entries(metrics).filter(
    ([, metric]) =>
      metric !== null && metric.rating && typeof metric.value === "number",
  );

  if (validMetrics.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          No valid metrics available yet
          <div className="mt-2 text-xs">
            Debug: Available keys: {metricKeys.join(", ") || "none"}
          </div>
          <div className="mt-1 text-xs">
            Debug: Raw metrics: {JSON.stringify(metrics, null, 2)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Dashboard</h2>
        <Button
          onClick={() => setRefreshKey((prev) => prev + 1)}
          variant="outline"
          size="sm"
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Overall Score Card */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-4xl font-bold p-6 rounded-lg text-center ${getScoreColor(score)}`}
          >
            {score}/100
          </div>
          <div className="text-center mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${getScoreColor(score)}`}
            >
              {isPerformanceGood()
                ? "🚀 Performance is Good"
                : "⚠️ Needs Improvement"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(metrics)
          .filter(
            ([, metric]) =>
              metric !== null &&
              metric.rating &&
              typeof metric.value === "number",
          )
          .map(([key, metric]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="uppercase font-medium">{key}</span>
                  <span>{getMetricIcon(metric.rating)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold mb-2 p-3 rounded ${getMetricColor(metric.rating)}`}
                >
                  {metric.value.toFixed(2)}
                </div>
                <div
                  className={`inline-block px-2 py-1 rounded text-xs ${getMetricColor(metric.rating)}`}
                >
                  {metric.rating}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {key === "cls" && (
                    <div>
                      <div className="font-medium">Cumulative Layout Shift</div>
                      <div>Measures visual stability. Lower is better.</div>
                      <div className="text-xs mt-1">
                        Good: &lt;0.1 | Needs work: 0.1-0.25 | Poor: &gt;0.25
                      </div>
                    </div>
                  )}
                  {key === "inp" && (
                    <div>
                      <div className="font-medium">
                        Interaction to Next Paint (ms)
                      </div>
                      <div>Measures responsiveness. Lower is better.</div>
                      <div className="text-xs mt-1">
                        Good: &lt;200ms | Needs work: 200-500ms | Poor:
                        &gt;500ms
                      </div>
                    </div>
                  )}
                  {key === "fcp" && (
                    <div>
                      <div className="font-medium">
                        First Contentful Paint (s)
                      </div>
                      <div>Time to first content render. Lower is better.</div>
                      <div className="text-xs mt-1">
                        Good: &lt;1.8s | Needs work: 1.8-3s | Poor: &gt;3s
                      </div>
                    </div>
                  )}
                  {key === "lcp" && (
                    <div>
                      <div className="font-medium">
                        Largest Contentful Paint (s)
                      </div>
                      <div>Main content load time. Lower is better.</div>
                      <div className="text-xs mt-1">
                        Good: &lt;2.5s | Needs work: 2.5-4s | Poor: &gt;4s
                      </div>
                    </div>
                  )}
                  {key === "ttfb" && (
                    <div>
                      <div className="font-medium">Time to First Byte (ms)</div>
                      <div>Server response time. Lower is better.</div>
                      <div className="text-xs mt-1">
                        Good: &lt;800ms | Needs work: 800-1800ms | Poor:
                        &gt;1800ms
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-sm text-gray-600">
                      {key === "cls" &&
                        `Layout shift score: ${metric.value.toFixed(3)}`}
                      {key === "inp" &&
                        `Response time: ${metric.value.toFixed(0)}ms`}
                      {key === "fcp" &&
                        `First paint: ${(metric.value * 1000).toFixed(0)}ms`}
                      {key === "lcp" &&
                        `Main content: ${(metric.value * 1000).toFixed(0)}ms`}
                      {key === "ttfb" &&
                        `Server response: ${metric.value.toFixed(0)}ms`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${getMetricColor(metric.rating)}`}
                    >
                      {key === "cls" || key === "fcp" || key === "lcp"
                        ? metric.value.toFixed(2)
                        : `${metric.value.toFixed(0)}ms`}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded ${getMetricColor(metric.rating)}`}
                    >
                      {metric.rating}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {score < 80 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Optimize Images:</strong> Consider using WebP
                  format and lazy loading for better performance.
                </p>
              </div>
            )}
            {metrics?.lcp?.rating === "poor" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  🚨 <strong>Slow LCP:</strong> Largest Contentful Paint is
                  slow. Optimize your hero image and critical resources.
                </p>
              </div>
            )}
            {metrics?.inp?.rating === "poor" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  ⚡ <strong>High INP:</strong> Interaction to Next Paint is
                  slow. Reduce JavaScript execution time and break up long
                  tasks.
                </p>
              </div>
            )}
            {score >= 80 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  🎉 <strong>Great Performance!</strong> Your app is performing
                  well. Keep monitoring for regressions.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <div className="text-center text-xs text-gray-500">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default PerformanceDashboard;
