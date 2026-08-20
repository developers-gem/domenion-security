import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, UserPlus } from "lucide-react";
import { leadsAPI, usersAPI } from "../../../../services/api";

function LeadFormModal({ lead, onClose, onSaved }) {
  const isEditing = Boolean(lead && lead._id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    sourceType: "direct",
    status: "new",
    priority: "medium",
    assignedTo: "",
    value: "",
    note: "",
  });

  const [staffUsers, setStaffUsers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    usersAPI
      .getUsers()
      .then((res) => {
        const usersList = res.data || res || [];
        if (Array.isArray(usersList)) {
          setStaffUsers(usersList);
        }
      })
      .catch(() => {});

    if (lead) {
      setFormData({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        sourceType: lead.sourceType || "direct",
        status: lead.status || "new",
        priority: lead.priority || "medium",
        assignedTo: lead.assignedTo?._id || lead.assignedTo || "",
        value: lead.value || "",
        note: "",
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please provide lead name and email address.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      company: formData.company.trim() || undefined,
      sourceType: formData.sourceType,
      status: formData.status,
      priority: formData.priority,
      assignedTo: formData.assignedTo || undefined,
      value: formData.value ? Number(formData.value) : undefined,
      note: formData.note.trim() || undefined,
    };

    try {
      setSaving(true);
      if (isEditing) {
        await leadsAPI.updateLead(lead._id, payload);
        setSuccess("Lead updated successfully!");
      } else {
        await leadsAPI.createLead(payload);
        setSuccess("New Sales Lead created successfully!");
      }

      setTimeout(() => {
        onSaved();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to save lead. Please check inputs.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white text-dark border-0 shadow-lg">
          <div className="modal-header border-bottom py-3">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <UserPlus className="text-danger" size={20} />
              {isEditing ? "Edit Sales Lead" : "Create New Sales Lead"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={saving} aria-label="Close" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {success && (
                <div className="alert alert-success d-flex align-items-center mb-3 small" role="alert">
                  <CheckCircle2 size={16} className="me-2" />
                  <div>{success}</div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-3 small" role="alert">
                  <AlertCircle size={16} className="me-2" />
                  <div>{error}</div>
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">LEAD NAME *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control bg-light"
                    placeholder="e.g. Robert Sterling"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control bg-light"
                    placeholder="r.sterling@enterprise.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control bg-light"
                    placeholder="+1 555 234 5678"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">COMPANY / ORGANIZATION</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control bg-light"
                    placeholder="e.g. Sterling Logistics Inc"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">SOURCE TYPE</label>
                  <select
                    name="sourceType"
                    className="form-select bg-light"
                    value={formData.sourceType}
                    onChange={handleChange}
                    disabled={saving || isEditing}
                  >
                    <option value="direct">Direct Prospect</option>
                    <option value="referral">Referral</option>
                    <option value="contact">Contact Request</option>
                    <option value="quote">Quote Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">PIPELINE STATUS</label>
                  <select
                    name="status"
                    className="form-select bg-light fw-bold"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">PRIORITY</label>
                  <select
                    name="priority"
                    className="form-select bg-light fw-bold"
                    value={formData.priority}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">ASSIGN TO STAFF MEMBER</label>
                  <select
                    name="assignedTo"
                    className="form-select bg-light"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="">-- Unassigned --</option>
                    {staffUsers.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">ESTIMATED CONTRACT VALUE ($)</label>
                  <input
                    type="number"
                    name="value"
                    className="form-control bg-light"
                    placeholder="e.g. 50000"
                    value={formData.value}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">INITIAL NOTE / PROSPECT SUMMARY</label>
                  <textarea
                    name="note"
                    rows="3"
                    className="form-control bg-light"
                    placeholder="Details about security requirements or opportunity..."
                    value={formData.note}
                    onChange={handleChange}
                    disabled={saving}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top py-2">
              <button type="button" className="btn btn-light btn-sm" onClick={onClose} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-danger btn-sm px-4" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={14} className="me-2 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  "Update Lead"
                ) : (
                  "Create Lead"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeadFormModal;
