import { Loader2 } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  badgeText,
}) {
  const colorThemes = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    cyan: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    red: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  const currentTheme = colorThemes[color] || colorThemes.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
          {title}
        </span>
        {badgeText && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 flex-shrink-0">
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          {value === null ? (
            <Loader2 size={24} className="animate-spin text-slate-400 my-1" />
          ) : (
            <h3 className="text-3xl font-extrabold text-slate-900 font-heading">
              {value}
            </h3>
          )}
        </div>

        <div
          className={`w-11 h-11 rounded-lg border flex items-center justify-center ${currentTheme}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
