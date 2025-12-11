
import React from 'react';
import { Toaster } from 'sonner';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      {children}
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
}
