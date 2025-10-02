import React from 'react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        {/* Sidebar placeholder */}
        <div className="p-4">Sidebar</div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-md">
          {/* Topbar placeholder */}
          <div className="p-4">Topbar</div>
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
