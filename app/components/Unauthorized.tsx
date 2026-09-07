import React from "react";
import { ShieldAlert, ArrowLeft, Lock, FolderKanban } from "lucide-react";

const Unauthorized = () => {
  const handleGoBack = () => {
    window.location.href = "/project";
  };

  const handleGoHome = () => {
    window.location.href = "/project";
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6 font-sans text-fg">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-3xl opacity-50 scale-150"></div>
            <div className="relative bg-surface p-6 rounded-3xl shadow-2xl border border-line">
              <ShieldAlert
                size={48}
                className="text-accent"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-fg tracking-tight">
            Access Restricted
          </h1>
          <p className="text-fg-muted leading-relaxed max-w-xs mx-auto">
            You don&apos;t have the necessary permissions to view this page.
            Please contact your administrator or try logging in with a different
            account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-fg text-canvas font-semibold hover:opacity-90 transition-opacity group cursor-pointer"
          >
            <ArrowLeft
              size={18}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-surface border border-line text-fg-muted font-medium hover:text-fg transition-colors cursor-pointer"
          >
            <FolderKanban size={18} className="mr-2" />
            Go To Projects
          </button>
        </div>

        <div className="pt-8 flex items-center justify-center space-x-2 text-fg-muted text-sm">
          <Lock size={14} />
          <span>Error Code: 403 Forbidden</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;