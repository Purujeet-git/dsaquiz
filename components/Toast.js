"use client";

import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${styles[type]} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3`}>
        <span className="text-xl">
          {type === "success" && "✓"}
          {type === "error" && "✗"}
          {type === "info" && "ℹ"}
        </span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}