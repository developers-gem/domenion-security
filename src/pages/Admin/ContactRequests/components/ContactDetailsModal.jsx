
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Calendar,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  UserCheck,
  X,
  BriefcaseBusiness,
  StickyNote,
} from "lucide-react";
import { contactAPI, leadsAPI, usersAPI } from "../../../../services/api";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
  { value: "archived", label: "Archived" },
];

function ContactDetailsModal({ contact, onClose, onUpdated }) {
  const [currentStatus, setCurrentStatus] = useState(
    contact?.status || "new"
  );

  const [assignedTo, setAssignedTo] = useState(
    contact?.assignedTo?._id || contact?.assignedTo || ""
  );

  const [newNote, setNewNote] = useState("");
  const [staffUsers, setStaffUsers] = useState([]);

  const [saving, setSaving] = useState(false);
  const [convertingLead, setConvertingLead] = useState(false);
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
      .catch(() => {
        // Non-admin or failover
      });
  }, []);

  if (!contact) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");

    try {
      setSaving(true);

      await contactAPI.updateContact(contact._id, {
        status: currentStatus,
        assignedTo: assignedTo || null,
        note: newNote.trim() || undefined,
      });

      setSuccess("Contact request updated successfully.");
      setNewNote("");

      onUpdated();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update contact request.");
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToLead = async () => {
    setError("");
    setSuccess("");

    try {
      setConvertingLead(true);

      await leadsAPI.createLead({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        sourceType: "contact",
        sourceId: contact._id,
        sourceTypeModel: "ContactRequest",
        status: "new",
        priority: "medium",
        assignedTo: assignedTo || undefined,
        note: `Converted from Contact Request: ${
          contact.subject || "General Inquire"
        }`,
      });

      setSuccess(
        "Successfully converted contact request to a new Sales Lead!"
      );

      onUpdated();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.message ||
          "Could not convert to Lead. Lead may already exist."
      );
    } finally {
      setConvertingLead(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-3 sm:p-4 md:p-6
        bg-slate-950/50
        backdrop-blur-sm
        overflow-y-auto
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative w-full max-w-3xl my-auto
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex flex-col
          text-gray-900
          max-h-[92vh]
        "
      >
        {/* =========================================================
            HEADER
        ========================================================== */}
        <div
          className="
            px-5 sm:px-6 py-4
            border-b border-gray-200
            bg-white
            flex items-center justify-between
            flex-shrink-0
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-domenion-gold/10
                border border-domenion-gold/30
                flex items-center justify-center
                text-domenion-gold
                flex-shrink-0
              "
            >
              <MessageSquare size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Contact Request
              </h2>

              <p className="text-xs text-domenion-gold font-medium truncate">
                {contact.name || "Contact Details"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9 h-9
              rounded-lg
              border border-gray-200
              bg-gray-50
              text-gray-400
              flex items-center justify-center
              hover:bg-gray-100
              hover:text-gray-800
              transition
              flex-shrink-0
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* =========================================================
            BODY
        ========================================================== */}
        <div
          className="
            p-5 sm:p-6
            overflow-y-auto
            space-y-5
            scrollbar-thin
            scrollbar-thumb-gray-200
          "
        >
          {/* SUCCESS */}
          {success && (
            <div
              className="
                flex items-start gap-3
                rounded-xl
                border border-emerald-200
                bg-emerald-50
                px-4 py-3
                text-emerald-700
              "
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div
              className="
                flex items-start gap-3
                rounded-xl
                border border-rose-200
                bg-rose-50
                px-4 py-3
                text-rose-700
              "
            >
              <AlertCircle
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* =======================================================
              CONTACT INFORMATION
          ======================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <UserCheck
                size={17}
                className="text-domenion-gold"
              />

              <h3 className="text-sm font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* NAME */}
              <div
                className="
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <User
                    size={15}
                    className="text-domenion-gold"
                  />

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Name
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-900 break-words">
                  {contact.name || "—"}
                </p>
              </div>

              {/* EMAIL */}
              <div
                className="
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail
                    size={15}
                    className="text-domenion-gold"
                  />

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-900 break-all">
                  {contact.email || "—"}
                </p>
              </div>

              {/* PHONE */}
              <div
                className="
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <Phone
                    size={15}
                    className="text-domenion-gold"
                  />

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Phone
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  {contact.phone || "—"}
                </p>
              </div>

              {/* COMPANY */}
              <div
                className="
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <Building
                    size={15}
                    className="text-domenion-gold"
                  />

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Company
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-900 break-words">
                  {contact.company || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* =======================================================
              MANAGEMENT
          ======================================================== */}
          <section
            className="
              rounded-xl
              border border-gray-200
              bg-gray-50
              p-4 sm:p-5
            "
          >
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseBusiness
                size={17}
                className="text-domenion-gold"
              />

              <h3 className="text-sm font-semibold text-gray-900">
                Contact Management
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ASSIGNED TO */}
              <div>
                <label
                  htmlFor="assignedTo"
                  className="
                    flex items-center gap-2
                    text-xs font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  <UserCheck size={14} className="text-domenion-gold" />
                  Assigned To
                </label>

                <select
                  id="assignedTo"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  disabled={saving}
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border border-gray-300
                    bg-white
                    px-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-domenion-gold
                    focus:ring-2
                    focus:ring-domenion-gold/20
                    disabled:opacity-60
                  "
                >
                  <option value="">Unassigned</option>

                  {staffUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name ||
                        user.fullName ||
                        user.email ||
                        "Staff User"}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}
              <div>
                <label
                  htmlFor="contactStatus"
                  className="
                    flex items-center gap-2
                    text-xs font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  <CheckCircle2
                    size={14}
                    className="text-domenion-gold"
                  />
                  Status
                </label>

                <select
                  id="contactStatus"
                  value={currentStatus}
                  onChange={(e) =>
                    setCurrentStatus(e.target.value)
                  }
                  disabled={saving}
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border border-gray-300
                    bg-white
                    px-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-domenion-gold
                    focus:ring-2
                    focus:ring-domenion-gold/20
                    disabled:opacity-60
                  "
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* =======================================================
              REQUEST MESSAGE
          ======================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare
                size={17}
                className="text-domenion-gold"
              />

              <h3 className="text-sm font-semibold text-gray-900">
                Request Message
              </h3>
            </div>

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-gray-50
                p-4
              "
            >
              {/* SUBJECT */}
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                  Subject
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {contact.subject || "General Inquiry"}
                </p>
              </div>

              {/* MESSAGE */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Message
                </p>

                <div
                  className="
                    rounded-lg
                    border border-gray-200
                    bg-white
                    p-3
                    text-sm
                    leading-6
                    text-gray-700
                    whitespace-pre-wrap
                    break-words
                  "
                >
                  {contact.message || "No message provided."}
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              EXISTING NOTES
          ======================================================== */}
          {Array.isArray(contact.notes) &&
            contact.notes.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <StickyNote
                    size={17}
                    className="text-domenion-gold"
                  />

                  <h3 className="text-sm font-semibold text-gray-900">
                    Internal Notes
                  </h3>
                </div>

                <div className="space-y-3">
                  {contact.notes.map((note, index) => (
                    <div
                      key={note._id || index}
                      className="
                        rounded-xl
                        border border-gray-200
                        bg-gray-50
                        p-4
                      "
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm leading-6 text-gray-700 whitespace-pre-wrap break-words">
                          {note.text ||
                            note.note ||
                            note.content ||
                            "—"}
                        </p>

                        {note.createdAt && (
                          <span
                            className="
                              flex-shrink-0
                              text-[10px]
                              text-gray-400
                            "
                          >
                            {new Date(
                              note.createdAt
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {note.createdBy && (
                        <p className="mt-2 text-[11px] text-gray-500">
                          Added by{" "}
                          <span className="font-medium text-gray-700">
                            {note.createdBy.name ||
                              note.createdBy.email ||
                              "Staff"}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* =======================================================
              ADD INTERNAL NOTE
          ======================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <PlusCircle
                size={17}
                className="text-domenion-gold"
              />

              <h3 className="text-sm font-semibold text-gray-900">
                Add Internal Note
              </h3>
            </div>

            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              disabled={saving}
              rows={4}
              placeholder="Add an internal note for your team..."
              className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm
                leading-6
                text-gray-900
                placeholder:text-gray-400
                outline-none
                resize-none
                transition
                focus:border-domenion-gold
                focus:ring-2
                focus:ring-domenion-gold/20
                disabled:opacity-60
              "
            />
          </section>

          {/* =======================================================
              META + CONVERT TO LEAD
          ======================================================== */}
          <section
            className="
              rounded-xl
              border border-gray-200
              bg-gray-50
              p-4
            "
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* RECEIVED */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar
                    size={15}
                    className="text-domenion-gold"
                  />

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Received
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  {contact.createdAt
                    ? new Date(contact.createdAt).toLocaleString()
                    : "—"}
                </p>
              </div>

              {/* CONVERT */}
              <div className="flex items-end sm:justify-end">
                <button
                  type="button"
                  onClick={handleConvertToLead}
                  disabled={convertingLead || saving}
                  className="
                    w-full sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-domenion-gold/40
                    bg-domenion-gold/10
                    text-domenion-gold
                    text-sm
                    font-semibold
                    hover:bg-domenion-gold/20
                    hover:border-domenion-gold/60
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {convertingLead ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Convert to Lead
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================
            FOOTER
        ========================================================== */}
        <div
          className="
            px-5 sm:px-6 py-4
            border-t border-gray-200
            bg-white
            flex flex-col-reverse sm:flex-row
            items-stretch sm:items-center
            justify-between
            gap-3
            flex-shrink-0
          "
        >
          <div className="text-xs text-gray-500">
            Contact Management
          </div>

          <div className="flex items-center gap-2">
            {/* CLOSE */}
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                h-10
                px-4
                rounded-xl
                border border-gray-200
                bg-white
                text-gray-700
                text-sm
                font-semibold
                hover:bg-gray-100
                hover:text-gray-900
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <X size={16} />
              Close
            </button>

            {/* SAVE */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || convertingLead}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                h-10
                px-5
                rounded-xl
                bg-domenion-gold
                border border-domenion-gold
                text-white
                text-sm
                font-semibold
                shadow-sm
                hover:bg-domenion-gold/90
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailsModal;
