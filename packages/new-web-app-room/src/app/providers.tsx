"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      {children}
      <Toaster 
        theme="dark" 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            color: 'white',
          },
        }}
      />
    </ThirdwebProvider>
  );
}
