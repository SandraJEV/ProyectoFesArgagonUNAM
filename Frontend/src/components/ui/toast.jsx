import { useEffect, useState } from "react";
import { Toast } from "@/components/tailgrids/core/toast";

export default function AppToast({
  variant = "default",
  message,
  duration = 5000, 
  onClose,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-10 right-5 z-50  bg-white rounded-md ">
      <Toast
        variant={variant}
        message={message}
      />
    </div>
  );
}