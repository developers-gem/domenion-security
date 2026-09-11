import { useAuth } from "../../../context/AuthContext";
import { LogOut, User, Menu, Shield } from "lucide-react";

export default function AdminHeader({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-domenion-blue border-b border-domenion-gold/20 px-4 sm:px-6 flex items-center justify-between z-40 shadow-sm">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-domenion-gold/15 border border-domenion-gold/35 flex items-center justify-center text-domenion-gold">
            <Shield size={20} />
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-white uppercase block leading-none">
              Domenion Security
            </span>
            <span className="text-[10px] text-domenion-gold font-mono tracking-widest uppercase font-semibold">
              Operations Center
            </span>
          </div>
          <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full bg-domenion-gold/15 border border-domenion-gold/40 text-domenion-gold text-[10px] font-mono font-bold tracking-wider uppercase">
            Admin
          </span>
        </div>
      </div>

      {/* Admin User Badge & Logout Button */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-domenion-gold flex-shrink-0">
            <User size={18} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white truncate max-w-[140px] leading-tight">
              {user?.name || "Security Officer"}
            </p>
            <p className="text-[11px] text-slate-400 font-mono truncate max-w-[140px] leading-tight">
              {user?.email || "admin@domenionsecurity.com"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold transition-colors duration-150 shadow-sm"
          title="Sign out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
