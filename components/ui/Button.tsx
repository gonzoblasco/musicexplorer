// components/ui/Button.tsx
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  ...rest
}: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200";

  const variantClasses = disabled
    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
    : variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-800"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
