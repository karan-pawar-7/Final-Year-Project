import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const modules = [
  {
    title: "New Admission",
    description: "Register new students and create admission records.",
    icon: "👨‍🎓",
    path: "/admissions",
    color: "blue",
  },
  {
    title: "Student Records",
    description: "Search students and view their academic information.",
    icon: "📋",
    path: "/students",
    color: "indigo",
  },
  {
    title: "Student History",
    description: "View admission details and certificate history.",
    icon: "🕘",
    path: "/history",
    color: "purple",
  },
  {
    title: "Transfer Certificate",
    description: "Prepare, review and print student TC documents.",
    icon: "📄",
    path: "/tc",
    color: "amber",
  },
  {
    title: "Bonafide Certificate",
    description: "Generate bonafide certificates for eligible students.",
    icon: "📑",
    path: "/bonafide",
    color: "cyan",
  },
  {
    title: "Certificate History",
    description: "Find previously generated and issued certificates.",
    icon: "🗂️",
    path: "/certificates",
    color: "emerald",
  },
];

function Home() {
  return (
    <div className="relative isolate min-h-screen text-white">

      {/* Fixed College Building Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"

        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}college-building.avif')`,
        }}

      />

      {/* College Header */}
      {/* <header className="relative z-20 w-full border-b border-slate-700 bg-[#0c1b32] text-white shadow-lg">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:px-10">

         
          <div className="flex min-w-0 shrink-0 items-center gap-4">
            <img
              src="/college-logo.png"
              alt="Government Polytechnic Ambad College Logo"
              className="h-20 w-20 shrink-0 rounded-full border border-white/20 bg-[#ead0b7] object-contain p-1"
            />

            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-wide sm:text-xl xl:text-2xl">
                GOVERNMENT POLYTECHNIC, AMBAD
              </h1>

              <p className="mt-1 text-sm text-slate-300">
                College Admission &amp; Certificate Management Portal
              </p>

               
            </div>
          </div>

          <div className="min-w-0 flex-1 lg:px-2">
            <Navbar />
          </div>

         
          <div className="w-full shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:w-40">
            <p className="text-xs text-slate-400">
              Academic Session
            </p>

            <p className="mt-1 font-semibold text-white">
              2026–2027
            </p>

            <p className="mt-1 text-xs text-emerald-400">
              ● Administrative Portal
            </p>
          </div>

        </div>
      </header> */}
      {/* <div className="min-w-0 flex-1 sticky">
            <Navbar />
          </div> */}
      <Navbar />


      {/* Main Content */}
      <main className="relative z-10 w-full">

        <section className="w-full p-0">
          <Hero />
        </section>

        {/* Administrative Services - Transparent Background */}
        <section className="relative w-full bg-transparent px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1600px]">

            {/* Section Heading */}
            {/* Administrative Services Heading */}
            <div className="relative mb-10 flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[#0c1b32]/65 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:flex-row lg:items-center">

              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-10 -bottom-20 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

              <div className="relative z-10">
                {/* Small Label */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200">
                    Portal Modules
                  </p>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Administrative{" "}
                  <span className="text-cyan-300">Services</span>
                </h2>

                {/* Accent Line */}
                <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" />


              </div>

              {/* Academic Year Badge */}
              <div className="relative z-10 shrink-0">
                <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 shadow-lg backdrop-blur-md">
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    Academic Year
                  </p>

                  <p className="mt-2 text-xl font-bold text-white">
                    2026
                    <span className="mx-2 text-cyan-300">—</span>
                    2027
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-300">
                      Admission Portal Active
                    </span>
                  </div>
                </div>
              </div>

              <span className="w-fit rounded-full border border-white/20 bg-[#102139]/80 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
                Academic Year 2026–27
              </span>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((item, index) => (
                <Link
                  to={item.path}
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#102139]/85 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-[#142c49]/90 hover:shadow-xl"
                >

                  {/* Decorative Circle */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/5 transition-colors duration-300 group-hover:bg-cyan-400/15" />

                  {/* Icon and Arrow */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-2xl transition-colors duration-300 group-hover:bg-cyan-400/15">
                      {item.icon}
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-slate-300 transition-all duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
                      →
                    </span>
                  </div>

                  {/* Service Details */}
                  <div className="relative z-10 mt-6">
                    <p className="mb-2 text-xs font-bold tracking-widest text-cyan-300">
                      SERVICE {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-200">
                      {item.title}
                    </h3>

                    <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-semibold text-cyan-300">
                      Open Service
                    </span>

                    <span className="text-sm text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-300">
                      →
                    </span>
                  </div>

                </Link>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#0c1b32]/90 px-5 py-6 text-center backdrop-blur-md">
        <p className="text-sm font-semibold text-white">
          Government Polytechnic, Ambad
        </p>

        <p className="mt-1 text-xs text-slate-300">
          Student Admission &amp; Certificate Management Portal · 2026–27
        </p>

        <p className="mt-2 text-xs text-slate-400">
          For authorized administrative use
        </p>
      </footer>

    </div>
  );
}

export default Home;