import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * Enterprise Button component supporting primary, blue, gold-outline, and blue-outline variants.
 * Styled purely with Tailwind CSS.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  ...props
}) {
  const variantStyles = {
    primary: "bg-domenion-gold text-white hover:bg-domenion-gold-hover shadow-sm hover:shadow no-underline text-decoration-none",
    blue: "bg-domenion-blue text-white hover:bg-domenion-blue-dark shadow-sm hover:shadow no-underline text-decoration-none",
    dark: "bg-domenion-blue text-white hover:bg-domenion-blue-dark shadow-sm no-underline text-decoration-none",
    "gold-outline": "border border-domenion-gold text-domenion-gold hover:bg-domenion-gold hover:text-white no-underline text-decoration-none",
    "blue-outline": "border border-domenion-blue text-domenion-blue hover:bg-domenion-blue hover:text-white no-underline text-decoration-none",
    outline: "border border-neutral-border text-domenion-blue hover:border-domenion-gold hover:text-domenion-gold bg-white no-underline text-decoration-none",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-extrabold tracking-wider uppercase",
    md: "px-6 py-3 text-sm font-bold tracking-wide",
    lg: "px-8 py-4 text-base font-bold tracking-wide",
  };

  const baseClasses = [
    "inline-flex items-center justify-center gap-2 rounded font-heading transition-all duration-200 cursor-pointer select-none no-underline text-decoration-none",
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    fullWidth ? "w-full" : "",
    disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => (
    <>
      {loading && <Loader2 className="ds-btn-spinner" size={16} />}
      {!loading && Icon && iconPosition === "left" && (
        <Icon className="ds-btn-icon ds-btn-icon-left" size={16} />
      )}
      <span className="ds-btn-text">{children}</span>
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="ds-btn-icon ds-btn-icon-right" size={16} />
      )}
    </>
  );

  if (to && !disabled && !loading) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick} {...props}>
        {renderContent()}
      </Link>
    );
  }

  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
}
