import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumb } from './Breadcrumb';
import { NotificationToast } from '../common/NotificationToast';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-slate-800 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Breadcrumb />

        {/* Content body */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{children}</main>
      </div>

      {/* Notification Toast */}
      <NotificationToast />
    </div>
  );
};
