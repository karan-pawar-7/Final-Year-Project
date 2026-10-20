 
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ArrowLeft,
  FileText,
  Hash,
  UserRound,
  Search,
  RotateCcw,
  GitBranch,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

export default function GenerateTC() {
  const [searchType, setSearchType] = useState("enrollment");

  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [branch, setBranch] = useState("");

  const [message, setMessage] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setMessage("");

    if (searchType === "enrollment") {
      if (!enrollmentNumber.trim()) {
        setMessage("Please enter the enrollment number.");
        return;
      }

      setMessage(
        "Search submitted. Connect the backend API to find the student and generate the Transfer Certificate."
      );
    } else {
      if (!studentName.trim() || !branch) {
        setMessage("Please enter the student name and select a branch.");
        return;
      }

      setMessage(
        "Search submitted. Connect the backend API to find the student and generate the Transfer Certificate."
      );
    }
  };

  const handleReset = () => {
    setEnrollmentNumber("");
    setStudentName("");
    setBranch("");
    setMessage("");
  };

  const changeSearchType = (type) => {
    setSearchType(type);
    setMessage("");
  };

  return (
    <div className="min-h-screen text-white">
      {/* College Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/college-building.avif')",
        }}
      />

      {/* Dark Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-slate-950/65"
      />

      <div className="relative z-10">
        {/* College Header */}
        <header className="relative z-30 w-full border-b border-white/10 bg-[#0c1b32] shadow-2xl">
          <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:px-10">
            {/* College Logo */}
            <div className="flex min-w-0 shrink-0 items-center gap-4">
              <img
                src="/college-logo.png"
                alt="Government Polytechnic Ambad College Logo"
                className="h-20 w-20 shrink-0 rounded-full border border-white/20 bg-[#ead0b7] object-contain p-1"
              />

              <div className="min-w-0">
                <h1 className="text-lg font-extrabold tracking-wide sm:text-xl xl:text-2xl">
                  GOVERNMENT POLYTECHNIC, AMBAD
                </h1>

                <p className="mt-1 text-sm text-slate-300">
                  College Admission & Certificate Management Portal
                </p>

                
              </div>
            </div>

            {/* Navbar */}
            <div className="min-w-0 flex-1 lg:px-2">
              <Navbar />
            </div>

            {/* Academic Session */}
            <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:w-44">
              <p className="text-xs text-slate-400">
                Academic Session
              </p>

              <p className="mt-1 font-bold text-white">
                2026–2027
              </p>

               
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-[1700px] px-4 py-8 sm:px-6 lg:px-10">
          {/* Back Button */}
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-[#0c1b32]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:border-cyan-400 hover:bg-blue-900"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          {/* Generate TC Heading */}
    
<section className="relative mb-6 w-full max-w-[500px] overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-[#0c1b32] via-[#102744] to-[#071426] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
  <div className="flex items-center gap-4">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-900/40">
      <FileText size={32} />
    </div>

    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-400">
        Student Certificate Portal
      </p>

      <h2 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
        Generate{" "}
        <span className="text-cyan-400">TC</span>
      </h2>
    </div>
  </div>
</section>

{/* Student Search Card */}
<section className="w-full overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#0c1b32]/95 shadow-2xl backdrop-blur-xl">
  {/* Card Header */}
  <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-4 sm:px-7">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
      <Search size={22} />
    </div>

    <div>
      <h3 className="font-extrabold text-white">
        Find Student
      </h3>

      <p className="text-xs text-slate-400">
        Select a method to search for the student record
      </p>
    </div>
  </div>

  <div className="p-4 sm:p-7">
    {/* Two Search Options */}
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Enrollment Option */}
      <button
        type="button"
        onClick={() => changeSearchType("enrollment")}
        aria-pressed={searchType === "enrollment"}
        className={`flex max-w-[400px] items-center gap-3 rounded-2xl border p-3 text-left transition sm:p-4 ${
          searchType === "enrollment"
            ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-950/20"
            : "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10"
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
            searchType === "enrollment"
              ? "bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-cyan-500/30"
              : "bg-blue-600"
          }`}
        >
          <Hash size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="w-fit text-sm font-bold text-white">
            Using Enrollment Number
          </p>

          <p className="mt-1 w-fit text-xs leading-5 text-slate-400">
            Search with a unique enrollment ID
          </p>
        </div>

        {searchType === "enrollment" && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">
            ✓
          </span>
        )}
      </button>

      {/* Name and Branch Option */}
      <button
        type="button"
        onClick={() => changeSearchType("name")}
        aria-pressed={searchType === "name"}
        className={`flex max-w-[400px] items-center gap-3 rounded-2xl border p-3 text-left transition sm:p-4 ${
          searchType === "name"
            ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-950/20"
            : "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10"
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
            searchType === "name"
              ? "bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-cyan-500/30"
              : "bg-blue-600"
          }`}
        >
          <UserRound size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="w-fit text-sm font-bold text-white">
            Using Name & Branch
          </p>

          <p className="mt-1 w-fit text-xs leading-5 text-slate-400">
            Search with the student's name and branch
          </p>
        </div>

        {searchType === "name" && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">
            ✓
          </span>
        )}
      </button>
    </div>

    {/* Search Form */}
    <form onSubmit={handleSearch}>
      <div className="rounded-2xl border border-cyan-400/25 bg-[#071a30]/70 p-4 sm:p-6">
        {/* Option 1: Enrollment Number */}
        {searchType === "enrollment" && (
          <div>
            <label
              htmlFor="enrollmentNumber"
              className="mb-2 block w-fit text-sm font-semibold text-slate-200"
            >
              Enrollment Number
              <span className="ml-1 text-red-400">*</span>
            </label>

            <div className="relative">
              <Hash
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                id="enrollmentNumber"
                name="enrollmentNumber"
                type="text"
                value={enrollmentNumber}
                onChange={(event) => {
                  setEnrollmentNumber(event.target.value);
                  setMessage("");
                }}
                placeholder="Enter student enrollment number"
                required
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
        )}

        {/* Option 2: Student Name and Branch */}
        {searchType === "name" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="studentName"
                className="mb-2 block w-fit text-sm font-semibold text-slate-200"
              >
                Student Name
                <span className="ml-1 text-red-400">*</span>
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                />

                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={studentName}
                  onChange={(event) => {
                    setStudentName(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Enter full student name"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="branch"
                className="mb-2 block w-fit text-sm font-semibold text-slate-200"
              >
                Branch
                <span className="ml-1 text-red-400">*</span>
              </label>

              <div className="relative">
                <GitBranch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                />

                <select
                  id="branch"
                  name="branch"
                  value={branch}
                  onChange={(event) => {
                    setBranch(event.target.value);
                    setMessage("");
                  }}
                  required
                  className={`${inputClass} pl-10`}
                >
                  <option value="">Select Branch</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Civil Engineering">
                    Civil Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100"
        >
          {message}
        </div>
      )}

      {/* Reset and Search Buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10"
        >
          <RotateCcw size={17} />
          Reset
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600"
        >
          <Search size={18} />
          Search Student
        </button>
      </div>
    </form>

    {/* Verification Note */}
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <ShieldCheck
        size={20}
        className="mt-0.5 shrink-0 text-cyan-400"
      />

      <p className="text-xs leading-6 text-slate-400">
        Student details must match the official college records.
        The Transfer Certificate can be generated after the
        student record is found and verified.
      </p>
    </div>
  </div>
</section>
 

          {/* Footer */}
          <footer className="py-7 text-center text-xs text-slate-300">
            Government Polytechnic, Ambad · Certificate Portal 2026–2027
          </footer>
        </main>
      </div>
    </div>
  );
} 
