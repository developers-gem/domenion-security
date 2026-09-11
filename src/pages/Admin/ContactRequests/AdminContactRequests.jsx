import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import ContactDetailsModal from "./components/ContactDetailsModal";

import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  X,
} from "lucide-react";

import { contactAPI } from "../../../services/api";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
  { value: "archived", label: "Archived" },
];

function AdminContactRequests() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  /* =========================================================
     FETCH CONTACT REQUESTS
  ========================================================= */

  const fetchContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await contactAPI.getContacts();

      if (response && Array.isArray(response.data)) {
        setContacts(response.data);
      } else if (Array.isArray(response)) {
        setContacts(response);
      } else {
        setContacts([]);
      }
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load contact requests. Please check network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const handleInlineStatusChange = async (contactId, newStatus) => {
    try {
      setActionLoading(true);
      setError("");

      await contactAPI.updateContact(contactId, {
        status: newStatus,
      });

      setSuccess(`Updated status to '${newStatus}'.`);

      await fetchContacts();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err?.message || "Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     DELETE CONTACT
  ========================================================= */

  const handleDeleteContact = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await contactAPI.deleteContact(id);

      setSuccess("Contact request deleted successfully.");
      setDeleteConfirmId(null);

      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(null);
      }

      await fetchContacts();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err?.message || "Failed to delete contact request.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredContacts = contacts.filter((item) => {
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !term ||
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.company?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";

      case "contacted":
        return "bg-sky-500/10 text-sky-600 border-sky-500/20";

      case "qualified":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";

      case "closed":
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";

      case "archived":
        return "bg-slate-700/10 text-slate-700 border-slate-700/20";

      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-domenion-gold/15 border border-domenion-gold/40 text-domenion-gold font-mono text-[11px] font-bold uppercase tracking-wider">
                Inquiry Management
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-domenion-blue/5 border border-domenion-blue/15 flex items-center justify-center text-domenion-blue">
                <MessageSquare size={18} />
              </div>

              Contact Requests Management
            </h1>
          </div>
        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ===================================================== */}

        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 shadow-sm">
            <CheckCircle2
              size={16}
              className="text-emerald-600 flex-shrink-0"
            />

            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 shadow-sm">
            <AlertCircle
              size={16}
              className="text-rose-600 flex-shrink-0"
            />

            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* =====================================================
            SEARCH + FILTER TOOLBAR
        ===================================================== */}

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Search */}
            <div className="md:col-span-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>

              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors"
                placeholder="Search by name, email, company, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 z-10">
                <Filter size={16} />
              </div>

              <select
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:bg-white focus:border-domenion-gold appearance-none transition-colors cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTACT DATA TABLE
        ===================================================== */}

        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

          {loading ? (
            /* Loading */
            <div className="py-16 flex flex-col items-center justify-center text-slate-400">
              <Loader2
                size={32}
                className="animate-spin text-domenion-gold mb-3"
              />

              <p className="text-xs font-medium text-slate-500">
                Loading contact requests...
              </p>
            </div>
          ) : filteredContacts.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center text-slate-500 text-xs">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <MessageSquare
                  size={20}
                  className="text-slate-400"
                />
              </div>

              <p className="font-medium text-slate-600">
                No contact requests found matching your criteria.
              </p>

              {(searchTerm || statusFilter !== "all") && (
                <p className="text-slate-400 mt-1">
                  Try changing your search or filter.
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left text-xs">

                {/* Table Header */}
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200/70">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">
                      Contact Name
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Subject / Company
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Assigned To
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Date
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Status
                    </th>

                    <th className="py-3.5 px-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100 text-slate-700">

                  {filteredContacts.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >

                      {/* =================================================
                          CONTACT NAME
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <div className="font-heading font-semibold text-sm text-slate-900">
                          {item.name}
                        </div>

                        <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[220px]">
                          {item.email}
                        </div>
                      </td>

                      {/* =================================================
                          SUBJECT / COMPANY
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          <MessageSquare
                            size={13}
                            className="text-domenion-gold flex-shrink-0"
                          />

                          <span className="truncate max-w-[200px]">
                            {item.subject || "General Inquiry"}
                          </span>
                        </div>

                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {item.company || "Individual"}
                        </span>
                      </td>

                      {/* =================================================
                          ASSIGNED TO
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        {item.assignedTo ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium">
                            <UserCheck
                              size={12}
                              className="text-emerald-600"
                            />

                            {item.assignedTo.name ||
                              item.assignedTo.email}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* =================================================
                          DATE
                      ================================================= */}

                      <td className="py-3.5 px-4 text-slate-500">
                        <div className="inline-flex items-center gap-1.5">
                          <Calendar
                            size={12}
                            className="text-slate-400"
                          />

                          <span className="font-mono text-[11px]">
                            {new Date(
                              item.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* =================================================
                          STATUS
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <select
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border transition-colors cursor-pointer focus:outline-none disabled:opacity-50 ${getStatusBadge(
                            item.status
                          )}`}
                          style={{ minWidth: "120px" }}
                          value={item.status || "new"}
                          onChange={(e) =>
                            handleInlineStatusChange(
                              item._id,
                              e.target.value
                            )
                          }
                          disabled={actionLoading}
                        >
                          <option
                            value="new"
                            className="bg-white text-slate-900"
                          >
                            New
                          </option>

                          <option
                            value="contacted"
                            className="bg-white text-slate-900"
                          >
                            Contacted
                          </option>

                          <option
                            value="qualified"
                            className="bg-white text-slate-900"
                          >
                            Qualified
                          </option>

                          <option
                            value="closed"
                            className="bg-white text-slate-900"
                          >
                            Closed
                          </option>

                          <option
                            value="archived"
                            className="bg-white text-slate-900"
                          >
                            Archived
                          </option>
                        </select>
                      </td>

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">

                          {/* Details */}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedContact(item)
                            }
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-sm transition-colors"
                            title="View Request Details"
                          >
                            <Eye size={13} />

                            <span>Details</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirmId(item._id)
                            }
                            className="p-1.5 rounded-lg border border-rose-200/80 bg-rose-50/60 hover:bg-rose-500 hover:text-white text-rose-600 transition-colors shadow-sm disabled:opacity-50"
                            title="Delete Request"
                            disabled={actionLoading}
                          >
                            <Trash2 size={13} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* =====================================================
            DETAILS MODAL
        ===================================================== */}

        {selectedContact && (
          <ContactDetailsModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onUpdated={() => {
              fetchContacts();
            }}
          />
        )}

        {/* =====================================================
            DELETE CONFIRMATION MODAL
        ===================================================== */}

        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">

            <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl">

              {/* Modal Header */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2.5 text-rose-600 font-heading font-bold text-base">

                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <Trash2 size={18} />
                  </div>

                  <h3>
                    Confirm Delete Contact Request
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  disabled={actionLoading}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                  title="Close"
                >
                  <X size={18} />
                </button>

              </div>

              {/* Modal Body */}
              <div className="mt-4 space-y-3">

                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you sure you want to permanently delete this
                  contact request? This action cannot be undone.
                </p>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2.5 mt-5 pt-4 border-t border-slate-100">

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteContact(deleteConfirmId)
                  }
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {actionLoading && (
                    <Loader2
                      size={13}
                      className="animate-spin"
                    />
                  )}

                  {actionLoading
                    ? "Deleting..."
                    : "Permanently Delete"}
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminContactRequests;