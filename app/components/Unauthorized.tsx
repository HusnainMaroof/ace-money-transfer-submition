import React from "react";
import { ShieldAlert, ArrowLeft, Lock, Home } from "lucide-react";

/**
 * A minimalist, centered "No Authorization" component.
 * Designed with a black background, clean typography, and Lucide icons.
 */
const Unauthorized = () => {
  const handleGoBack = () => {
    window.location.href = "/project";
  };

  const handleGoHome = () => {
    window.location.href = "/project";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans text-white">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        {/* Icon Header */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Darker, subtle glow for black background */}
            <div className="absolute inset-0 bg-red-900/30 rounded-full blur-3xl opacity-50 scale-150"></div>
            <div className="relative bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-zinc-800">
              <ShieldAlert
                size={48}
                className="text-red-500"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Access Restricted
          </h1>
          <p className="text-zinc-400 leading-relaxed max-w-xs mx-auto">
            You don't have the necessary permissions to view this page. Please
            contact your administrator or try logging in with a different
            account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleGoBack}
            className="w-full cursor-pointer  sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="w-full cursor-pointer sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
          >
            Go To Projects
          </button>
        </div>

        {/* Footer Detail */}
        <div className="pt-8 flex items-center justify-center space-x-2 text-zinc-600 text-sm">
          <Lock size={14} />
          <span>Error Code: 403 Forbidden</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
