import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import CareerFormModal from "./components/CareerFormModal";
import ScreeningQuestionsModal from "./components/ScreeningQuestionsModal";

import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Lock,
  Unlock,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
} from "lucide-react";

import { careersAPI } from "../../../services/api";

function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Screening questions modal state
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [questionsCareer, setQuestionsCareer] = useState(null);
  const [questionsTab, setQuestionsTab] = useState("job");

  /* =========================================================
     FETCH CAREERS
  ========================================================= */

  const fetchCareers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await careersAPI.getCareers();

      if (response && Array.isArray(response.data)) {
        setCareers(response.data);
      } else if (Array.isArray(response)) {
        setCareers(response);
      } else {
        setCareers([]);
      }
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load careers. Please check network connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  /* =========================================================
     CREATE CAREER
  ========================================================= */

  const handleOpenCreateModal = () => {
    setSelectedCareer(null);
    setShowModal(true);
  };

  /* =========================================================
     EDIT CAREER
  ========================================================= */

  const handleOpenEditModal = (career) => {
    setSelectedCareer(career);
    setShowModal(true);
  };

  /* =========================================================
     TOGGLE CAREER STATUS
  ========================================================= */

  const handleToggleStatus = async (career) => {
    const newStatus = career.status === "open" ? "closed" : "open";

    try {
      setActionLoading(true);
      setError("");

      await careersAPI.updateCareer(career._id, {
        status: newStatus,
      });

      setSuccess(`Career status updated to '${newStatus}'.`);

      await fetchCareers();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err?.message || "Failed to update career status.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     DELETE CAREER
  ========================================================= */

  const handleDeleteCareer = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await careersAPI.deleteCareer(id);

      setSuccess("Career posting removed successfully.");
      setDeleteConfirmId(null);

      await fetchCareers();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err?.message || "Failed to delete career posting.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredCareers = careers.filter((career) => {
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !term ||
      career.title?.toLowerCase().includes(term) ||
      career.department?.toLowerCase().includes(term) ||
      career.location?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" || career.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const getStatusBadge = (status) => {
    if (status === "open") {
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    }

    if (status === "closed") {
      return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    }

    return "bg-slate-500/10 text-slate-600 border-slate-500/20";
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
            {/* Section Badge */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-domenion-gold/15 border border-domenion-gold/40 text-domenion-gold font-mono text-[11px] font-bold uppercase tracking-wider">
                Module Management
              </span>
            </div>

            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-domenion-blue/5 border border-domenion-blue/15 flex items-center justify-center text-domenion-blue">
                <Briefcase size={18} />
              </div>

              Career Postings Management
            </h1>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setQuestionsCareer({
                  _id: "global",
                  title: "Global Default Questions",
                  location: "All Positions",
                });

                setQuestionsTab("global");
                setShowQuestionsModal(true);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <HelpCircle size={16} />
              <span>Manage Global Questions</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <Plus size={17} />
              <span>Create Career Posting</span>
            </button>
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
                placeholder="Search by job title, department, or location..."
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
                <option value="all">All Statuses (Open & Closed)</option>
                <option value="open">Open Only</option>
                <option value="closed">Closed Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* =====================================================
            CAREERS DATA TABLE
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
                Loading career postings...
              </p>
            </div>
          ) : filteredCareers.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center text-slate-500 text-xs">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Briefcase size={20} className="text-slate-400" />
              </div>

              <p className="font-medium text-slate-600">
                No careers found matching your query.
              </p>

              {searchTerm || statusFilter !== "all" ? (
                <p className="text-slate-400 mt-1">
                  Try changing your search or filter.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                {/* Table Header */}
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200/70">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">
                      Job Title & Department
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Location
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Type
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Status
                    </th>

                    <th className="py-3.5 px-4 font-semibold">
                      Deadline
                    </th>

                    <th className="py-3.5 px-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCareers.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* =================================================
                          JOB TITLE
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <div className="font-heading font-semibold text-sm text-slate-900">
                          {item.title}
                        </div>

                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.department || "General"}
                        </div>
                      </td>

                      {/* =================================================
                          LOCATION
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin
                            size={13}
                            className="text-domenion-gold flex-shrink-0"
                          />

                          <span className="truncate max-w-[180px]">
                            {item.location || "Not specified"}
                          </span>
                        </div>
                      </td>

                      {/* =================================================
                          TYPE
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-medium">
                          {item.type || "Full-Time"}
                        </span>
                      </td>

                      {/* =================================================
                          STATUS
                      ================================================= */}

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-semibold uppercase ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status || "open"}
                        </span>
                      </td>

                      {/* =================================================
                          DEADLINE
                      ================================================= */}

                      <td className="py-3.5 px-4 text-slate-500">
                        <div className="inline-flex items-center gap-1.5">
                          <Clock
                            size={12}
                            className="text-slate-400 flex-shrink-0"
                          />

                          <span className="font-mono text-[11px]">
                            {item.applicationDeadline
                              ? new Date(
                                  item.applicationDeadline
                                ).toLocaleDateString()
                              : "Open until filled"}
                          </span>
                        </div>
                      </td>

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Screening Questions */}
                          <button
                            type="button"
                            onClick={() => {
                              setQuestionsCareer(item);
                              setQuestionsTab("job");
                              setShowQuestionsModal(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 font-medium text-xs transition-colors disabled:opacity-50"
                            title="Manage Screening Questions"
                            disabled={actionLoading}
                          >
                            <HelpCircle size={13} />

                            <span className="hidden xl:inline">
                              Questions (
                              {item.screeningQuestions?.length || 0})
                            </span>
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50"
                            title="Edit Career Posting"
                            disabled={actionLoading}
                          >
                            <Edit size={13} />
                          </button>

                          {/* Open / Close */}
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(item)}
                            className={`p-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
                              item.status === "open"
                                ? "border-amber-200 bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-600"
                                : "border-emerald-200 bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600"
                            }`}
                            title={
                              item.status === "open"
                                ? "Close Career Posting"
                                : "Reopen Career Posting"
                            }
                            disabled={actionLoading}
                          >
                            {item.status === "open" ? (
                              <Lock size={13} />
                            ) : (
                              <Unlock size={13} />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(item._id)}
                            className="p-1.5 rounded-lg border border-rose-200/80 bg-rose-50/60 hover:bg-rose-500 hover:text-white text-rose-600 transition-colors disabled:opacity-50"
                            title="Delete Career Posting"
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

                  <h3>Confirm Delete Career Posting</h3>
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
                  Are you sure you want to permanently delete this career
                  posting? This action cannot be undone.
                </p>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
                  <strong>Tip:</strong> If candidates have already applied for
                  this role, consider setting the status to{" "}
                  <strong>Closed</strong> instead of deleting.
                </div>
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
                  onClick={() => handleDeleteCareer(deleteConfirmId)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {actionLoading && (
                    <Loader2 size={13} className="animate-spin" />
                  )}

                  {actionLoading
                    ? "Deleting..."
                    : "Permanently Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            CREATE / EDIT CAREER MODAL
        ===================================================== */}

        {showModal && (
          <CareerFormModal
            career={selectedCareer}
            onClose={() => {
              setShowModal(false);
              setSelectedCareer(null);
            }}
            onSaved={() => {
              setShowModal(false);
              setSelectedCareer(null);
              fetchCareers();
            }}
          />
        )}

        {/* =====================================================
            SCREENING QUESTIONS MODAL
        ===================================================== */}

        {showQuestionsModal && questionsCareer && (
          <ScreeningQuestionsModal
            career={questionsCareer}
            initialTab={questionsTab}
            onClose={() => {
              setShowQuestionsModal(false);
              setQuestionsCareer(null);
            }}
            onUpdated={() => {
              fetchCareers();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCareers;