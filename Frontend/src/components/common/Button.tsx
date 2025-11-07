import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button {...props} className={`${base} ${styles} ${props.className || ""}`}>
      {label}
    </button>
  );
};

export default Button;
