import { CheckCircle2, XCircle, User, Calendar, Award, X } from "lucide-react";

export default function ResultDetailsModal({ attempt, onClose }) {
  if (!attempt) return null;

  const isPass = attempt.result === "PASS";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl my-auto bg-slate-900 border border-domenion-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-white/10 bg-domenion-blue/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                isPass
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/15 border-rose-500/30 text-rose-400"
              }`}
            >
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                Assessment Result Details
              </h3>
              <p className="text-xs text-domenion-gold/80 font-mono tracking-wide">
                {attempt.assessmentTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - Scrollable Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-slate-800/70 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <User
                    size={16}
                    className="text-domenion-gold flex-shrink-0"
                  />
                  <span className="font-heading font-semibold text-sm">
                    {attempt.user?.name || "Employee"}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({attempt.user?.email || "N/A"})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Calendar size={13} className="text-slate-500" />
                  <span>
                    Submitted: {new Date(attempt.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:justify-end gap-3.5 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                <div className="text-left sm:text-right">
                  <div className="font-heading font-extrabold text-2xl text-white font-mono leading-none">
                    {attempt.score} / {attempt.totalQuestions}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Req: {attempt.passingScore} ({attempt.percentage}%)
                  </div>
                </div>

                <span
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-sm font-extrabold tracking-wider uppercase border shadow-sm flex items-center gap-1.5 ${
                    isPass
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {isPass ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  <span>{attempt.result}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Questions Snapshot Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300 font-mono">
                Question Snapshot &amp; Answer Analysis
              </h4>
              <span className="text-[10px] font-mono text-slate-400">
                {attempt.answers?.length || 0} Questions Evaluated
              </span>
            </div>

            <div className="space-y-3">
              {(attempt.answers || []).map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs space-y-2.5 transition-colors ${
                    ans.isCorrect
                      ? "border-emerald-500/25 bg-emerald-500/5"
                      : "border-rose-500/25 bg-rose-500/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium text-slate-200 leading-snug">
                      <span className="font-mono font-bold text-domenion-gold mr-1.5">
                        Q{idx + 1}.
                      </span>
                      {ans.question}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide flex-shrink-0 border ${
                        ans.isCorrect
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {ans.isCorrect ? (
                        <CheckCircle2 size={11} />
                      ) : (
                        <XCircle size={11} />
                      )}
                      <span>
                        {ans.isCorrect ? "Correct (+1)" : "Incorrect (0)"}
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                    <div className="p-2 rounded bg-slate-950/60 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-0.5">
                        Candidate Answer:
                      </span>
                      <span
                        className={`font-semibold ${
                          ans.isCorrect ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {ans.selectedAnswer || "No Response"}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-slate-950/60 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-0.5">
                        Correct Answer:
                      </span>
                      <span className="font-semibold text-emerald-400 font-mono">
                        {ans.correctAnswer}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-white/10 bg-slate-900/90 flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
