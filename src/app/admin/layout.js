"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ToastProvider } from "./components/Toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true); // avoid flicker

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // If user visits /admin/login
    if (pathname === "/admin/login") {
      // If already logged in → redirect to dashboard
      if (token) {
        router.replace("/admin");
      }
      setCheckingAuth(false);
      return;
    }

    // Protect all other /admin routes
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setCheckingAuth(false);
  }, [pathname, router]);

  // 🔄 Loading screen while checking token
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        Checking authentication...
      </div>
    );
  }

  // Public login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Protected admin pages
  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-in-out">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
