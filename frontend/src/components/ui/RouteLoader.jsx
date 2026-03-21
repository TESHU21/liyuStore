import React from 'react';

const RouteLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-l-blue-400 rounded-full animate-spin animation-delay-150"></div>
    </div>
    <div className="text-center">
      <p className="text-gray-600 font-medium">Loading...</p>
      <p className="text-gray-400 text-sm">Please wait while we prepare your page</p>
    </div>
  </div>
);

export default RouteLoader;
