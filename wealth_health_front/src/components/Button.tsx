import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button style variant: 'primary' | 'secondary' | 'danger'
   */
  variant?: "primary" | "secondary" | "danger";
  /**
   * Show a loading spinner and disable the button
   */
  loading?: boolean;
}

/**
 * Global reusable button component for HRnet.
 * Supports variants, loading state, and accessibility.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed";
  let variantClass = "";
  switch (variant) {
    case "secondary":
      variantClass =
        "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 focus:ring-indigo-400";
      break;
    case "danger":
      variantClass =
        "bg-red-600 text-white border-red-700 hover:bg-red-700 focus:ring-red-400";
      break;
    default:
      variantClass =
        "bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700 focus:ring-indigo-400";
  }
  return (
    <button
      type={props.type || "button"}
      className={`${base} ${variantClass} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}>
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
