import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";
import { initPerformanceTracking } from "./lib/performance";
import PerformanceMonitor from "./components/PerformanceMonitor";

function App() {
  useEffect(() => {
    // Initialize performance tracking when app loads
    initPerformanceTracking();
  }, []);

  return (
    <div>
      <HelmetProvider>
        <AppRoutes />
        <PerformanceMonitor />
      </HelmetProvider>
    </div>
  );
}

export default App;
