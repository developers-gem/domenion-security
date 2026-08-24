import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import "./Button.css";

/**
 * Enterprise Button component supporting primary, outline, dark, and gold-outline variants.
 * Handles React Router navigation, external links, loading states, and icon positioning.
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
  const baseClasses = [
    "ds-btn",
    `ds-btn-${variant}`,
    `ds-btn-${size}`,
    fullWidth ? "ds-btn-full" : "",
    disabled || loading ? "ds-btn-disabled" : "",
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
