
import { Link } from "react-router-dom";

function Hero() {
  return (
   <section className="relative isolate flex min-h-[480px] w-full items-center overflow-hidden    bg-[#0b1b30] sm:min-h-[520px]">

     <div
  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
  style={{
   backgroundImage: `url('${import.meta.env.BASE_URL}college-building.avif')`,
    backgroundAttachment: "fixed",
  }}
/>

      {/* Dark Overlay - Left to Right */}
<div className="absolute inset-0 z-0 bg-gradient-to-r from-[#07182d]/65 via-[#07182d]/35 to-transparent" />


      {/* Left Side Compact Content Box */}
      <div className="relative z-10 m-5 w-full max-w-[620px] rounded-2xl border border-cyan-400/30 bg-[#0b1b30]/85 p-6 shadow-2xl backdrop-blur-sm sm:m-8 sm:p-8 lg:ml-12 lg:my-10 lg:p-9">

        <span className="inline-block rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white">
          Academic Year 2026–27
        </span>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Student Admission &amp;
          <span className="mt-2 block text-cyan-300">
            Certificate Control Center
          </span>
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-200">
          A centralized portal to manage student admissions, maintain
          academic records, track student history and prepare Transfer
          and Bonafide Certificates.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/admissions"
            className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            + New Admission
          </Link>

          <Link
            to="/students"
            className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Find Student →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Hero;
