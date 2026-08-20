import "./AdminComponent.css";

function StatCard({ title, value, icon: Icon, color = "red", badgeText = "Active API" }) {
  const tintClass = `stat-tint-${color}`;

  return (
    <div className="card admin-stat-card border shadow-sm bg-white">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex flex-column">
            <span className="text-secondary small fw-bold text-uppercase letter-spacing mb-1">{title}</span>
            <h2 className="fw-bold my-1 text-dark fs-1">{value !== undefined && value !== null ? value : "—"}</h2>
            {badgeText && (
              <div className="mt-2">
                <span className={`badge ${tintClass} border border-opacity-25 px-2 py-1 fs-8`}>
                  {badgeText}
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`stat-icon-wrapper ${tintClass} p-3 rounded-circle ms-2`}>
              <Icon size={26} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
