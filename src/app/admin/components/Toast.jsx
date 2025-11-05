"use client";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => removeToast(id), 3000); // Auto remove
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3">
        {toasts.map(({ id, type, message }) => (
          <div
            key={id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white flex items-center gap-2 animate-slide-in
            ${
              type === "success"
                ? "bg-green-600"
                : type === "error"
                ? "bg-red-600"
                : type === "warning"
                ? "bg-yellow-600"
                : "bg-blue-600"
            }`}
          >
            <span className="font-medium">{message}</span>
            <button
              className="text-white/80 hover:text-white ml-3"
              onClick={() => removeToast(id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
