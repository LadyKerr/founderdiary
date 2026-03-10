"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible && !show) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: `color-mix(in srgb, var(--mint) 30%, transparent)`,
        backgroundColor: `color-mix(in srgb, var(--mint) 10%, var(--card))`,
        color: `var(--mint)`,
      }}
    >
      {message}
    </div>
  );
}
