
import { useState } from "react";
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
} from "lucide-react";

function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: House },
    {
      name: "New Admission",
      path: "/admissions",
      icon: UserRoundPlus,
    },
    {
      name: "Student Records",
      path: "/students",
      icon: UsersRound,
    },
    {
      name: "Generate TC",
      path: "/tc",
      icon: FileText,
    },
  ];

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-700 text-white shadow-md"
        : "text-slate-200 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="relative z-50 border-t border-white/10 bg-[#0c1b32] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkStyle}
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                moreOpen
                  ? "bg-white/10 text-white"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              More
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-2xl">
                <Link
                  to="/bonafide"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-blue-50"
                >
                  <FileCheck size={19} className="text-cyan-700" />
                  <span>Bonafide Certificate</span>
                </Link>

                <Link
                  to="/history"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-blue-50"
                >
                  <History size={19} className="text-purple-700" />
                  <span>Student History</span>
                </Link>

                <Link
                  to="/certificates"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-blue-50"
                >
                  <FileText size={19} className="text-emerald-700" />
                  <span>Certificate History</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile brand */}
        <Link
          to="/"
          className="text-sm font-bold text-cyan-300 lg:hidden"
        >
          GP AMBAD
        </Link>

     
       
      </div> 

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="space-y-1 border-t border-white/10 px-4 py-3 lg:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMobileOpen(false)}
                className={linkStyle}
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}

          <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            More Services
          </p>

          <Link
            to="/bonafide"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
          >
            <FileCheck size={19} />
            Bonafide Certificate
          </Link>

          <Link
            to="/history"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
          >
            <History size={19} />
            Student History
          </Link>

          <Link
            to="/certificates"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
          >
            <FileText size={19} />
            Certificate History
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
