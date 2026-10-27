import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  House,
  UserRoundPlus,
  UsersRound,
  FileText,
  ChevronDown,
  History,
  FileCheck,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: House },
  { name: "New Admission", path: "/admissions", icon: UserRoundPlus },
  { name: "Student Records", path: "/students", icon: UsersRound },
  { name: "Generate TC", path: "/tc", icon: FileText },
  { name: "TC Approval", path: "/admin/tc-approval-requests", icon: ShieldCheck },
];

const moreItems = [
  { name: "Bonafide Certificate", path: "/bonafide", icon: FileCheck, color: "text-cyan-700" },
  { name: "Student History", path: "/history", icon: History, color: "text-purple-700" },
  { name: "Certificate History", path: "/certificates", icon: FileText, color: "text-emerald-700" },
];

const SESSIONS = ["2024-2025", "2025-2026", "2026-2027"];

function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [session, setSession] = useState("2026-2027");

  const moreRef = useRef(null);
  const sessionRef = useRef(null);

  // dropdown ke bahar click karne par band ho jaye
  useEffect(() => {
    const handleClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
      if (sessionRef.current && !sessionRef.current.contains(e.target)) setSessionOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeCls = "bg-blue-700 text-white shadow-md";
  const idleCls = "text-slate-200 hover:bg-white/10 hover:text-white";

  // Desktop links: compact, taaki sab ek hi line me aaye
  const desktopLink = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
      isActive ? activeCls : idleCls
    }`;

  // Mobile links: bade aur full width
  const mobileLink = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
      isActive ? activeCls : idleCls
    }`;

  const closeMenus = () => {
    setMoreOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c1b32] text-white shadow-lg">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 lg:px-6 xl:flex-nowrap 2xl:px-8">
        {/* ---------- Brand ---------- */}
        <Link to="/" onClick={closeMenus} className="flex shrink-0 items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Government Polytechnic Ambad"
            className="h-14 w-14 rounded-full bg-white object-contain xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
          />
          <div>
            <h1 className="text-base font-extrabold tracking-wide sm:text-lg xl:text-base 2xl:text-xl">
              GOVERNMENT POLYTECHNIC, AMBAD
            </h1>
            <p className="mt-0.5 hidden text-sm text-slate-300 sm:block xl:hidden 2xl:block">
              College Admission &amp; Certificate Management Portal
            </p>
          </div>
        </Link>

        {/* ---------- Mobile toggle ---------- */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto rounded-lg p-2 hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* ---------- Desktop navigation ---------- */}
        <nav className="order-last hidden w-full items-center gap-1 border-t border-white/10 pt-3 lg:flex xl:order-none xl:ml-auto xl:w-auto xl:border-0 xl:pt-0">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={closeMenus}
              className={desktopLink}
            >
              {/* xl se 2xl ke beech icons hide, jagah bachane ke liye */}
              <Icon size={18} className="xl:max-2xl:hidden" />
              {name}
            </NavLink>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                moreOpen ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/10"
              }`}
            >
              More
              <ChevronDown
                size={16}
                className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-2xl">
                {moreItems.map(({ name, path, icon: Icon, color }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-blue-50"
                  >
                    <Icon size={19} className={color} />
                    <span>{name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ---------- Academic session (compact) ---------- */}
        <div
          ref={sessionRef}
          className="relative flex w-full shrink-0 flex-col rounded-xl border border-white/10 bg-white/5 px-4 py-2 sm:w-44 lg:ml-auto xl:ml-0"
        >
          <span className="text-[11px] leading-4 text-slate-400">Academic Session</span>
          <button
            type="button"
            onClick={() => setSessionOpen(!sessionOpen)}
            aria-expanded={sessionOpen}
            className="flex items-center justify-between gap-2 text-base leading-6"
          >
            <strong>{session}</strong>
            <ChevronDown
              size={16}
              className={`transition-transform ${sessionOpen ? "rotate-180" : ""}`}
            />
          </button>
          <span className="flex items-center gap-1.5 text-[11px] leading-4 text-emerald-400">
            <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Administrative Portal
          </span>

          {sessionOpen && (
            <ul className="absolute inset-x-0 top-full mt-2 rounded-xl border border-white/10 bg-[#0c1b32] p-1.5 shadow-2xl">
              {SESSIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => {
                      setSession(s);
                      setSessionOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-blue-700 ${
                      s === session ? "bg-blue-700" : ""
                    }`}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ---------- Mobile navigation ---------- */}
        {mobileOpen && (
          <div className="order-last w-full space-y-1 border-t border-white/10 pt-3 lg:hidden">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={closeMenus}
                className={mobileLink}
              >
                <Icon size={19} />
                {name}
              </NavLink>
            ))}

            <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              More Services
            </p>

            {moreItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenus}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
              >
                <Icon size={19} />
                {name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;