 
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ArrowLeft,
  GraduationCap,
  ClipboardList,
  CalendarDays,
  FileText,
  UserRound,
  Building2,
  Languages,
  Users,
  Globe2,
  BookOpen,
  RotateCcw,
  Send,
  Hash,
} from "lucide-react";

const initialForm = {
  tcNumber: "",
  recordNumber: "",
  pageNumber: "",
  enrollmentNumber: "",
  instituteName: "Government Polytechnic, Ambad",
  registrationNumber: "",
  candidateName: "",
  rollNumber: "",
  motherName: "",
  motherTongue: "Marathi",
  caste: "",
  subCaste: "",
  religion: "Hindu",
  category: "Open",
  placeOfBirth: "",
  nationality: "Indian",
  dob: "",
  dobWords: "",
  lastInstitute: "",
  admissionDate: "",
  progress: "",
  progressOther: "",
  conduct: "",
  conductOther: "",
  leavingDate: "",
  course: "Diploma in Information Technology",
  year: "",
  fromDate: "",
};

const inputClass =
  "w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  icon: Icon,
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-slate-200"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${inputClass} ${Icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-slate-200"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionHeading({ children, icon: Icon }) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-white/5 px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
        <Icon size={19} className="text-cyan-400" />
      </div>

      <h3 className="font-bold text-white">{children}</h3>
    </div>
  );
}

export default function NewAdmission() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const handleReset = () => {
    setForm(initialForm);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Admission Details:", form);

    setMessage(
      "Form submitted in the browser. Backend connection is required to save the record permanently."
    );
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

      {/* Dark Overlay - Home Page Theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-slate-950/65"
      />

      <div className="relative z-10">
        {/* College Header */}
        <header className="relative z-30 w-full border-b border-white/10 bg-[#0c1b32] text-white shadow-2xl">
          <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:px-10">
            {/* College Logo and Details */}
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

            {/* Shared Navbar */}
            <div className="min-w-0 flex-1 lg:px-2">
              <Navbar />
            </div>

            {/* Academic Session */}
            <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30 sm:w-44">
              <p className="text-xs text-slate-400">
                Academic Session
              </p>

              <p className="mt-1 font-bold text-white">
                2026–2027
              </p>

              <p className="mt-1 text-xs text-emerald-400">
                ● Administrative Portal
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

          {/* Page Heading */}
          <section className="mb-6 flex w-full max-w-[500px] flex-col gap-4 rounded-2xl border border-cyan-400/30 bg-[#0c1b32]/95 p-5 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:p-6">
  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-900/40">
    <GraduationCap size={34} />
  </div>

  <div>
    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-400">
      Student Mnagement Portal
    </p>

    <h2 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
      New{" "}
      <span className="text-cyan-400">Admission</span>
    </h2>
  </div>
</section>

          {/* Admission Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#0c1b32]/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Form Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-4 sm:px-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                <ClipboardList size={22} />
              </div>

              <div>
                <h3 className="font-extrabold text-white">
                  Student & Record Details
                </h3>

                <p className="text-xs text-slate-400">
                  Official register and institute information
                </p>
              </div>
            </div>

            <div className="space-y-7 p-4 sm:p-6 lg:p-7">
              {/* Record Information */}
              <div>
                <SectionHeading icon={FileText}>
                  Record & Register Information
                </SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <Field
                    label="TC Number"
                    name="tcNumber"
                    value={form.tcNumber}
                    onChange={handleChange}
                    placeholder="Enter TC number"
                    icon={FileText}
                    required
                  />

                  <Field
                    label="(1) Record Number"
                    name="recordNumber"
                    value={form.recordNumber}
                    onChange={handleChange}
                    placeholder="Enter record number"
                    required
                  />

                  <Field
                    label="Page Number"
                    name="pageNumber"
                    value={form.pageNumber}
                    onChange={handleChange}
                    placeholder="Enter page number"
                    required
                  />

                  <Field
                    label="Enrollment Number"
                    name="enrollmentNumber"
                    value={form.enrollmentNumber}
                    onChange={handleChange}
                    placeholder="e.g. 24510280085"
                    required
                  />
                </div>
              </div>

              {/* Student Information */}
              <div>
                <SectionHeading icon={UserRound}>
                  Institute & Student Information
                </SectionHeading>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Field
                    label="(2) Name of the Institute"
                    name="instituteName"
                    value={form.instituteName}
                    onChange={handleChange}
                    icon={Building2}
                    required
                  />

                  <Field
                    label="Registration Number"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                  />

                  <Field
                    label="(3) Name of the Candidate"
                    name="candidateName"
                    value={form.candidateName}
                    onChange={handleChange}
                    placeholder="Full name as per previous TC / marksheet"
                    icon={UserRound}
                    required
                  />

                  <Field
                    label="Roll Number"
                    name="rollNumber"
                    value={form.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                    icon={Hash}
                  />

                  <Field
                    label="(4) Mother's Name"
                    name="motherName"
                    value={form.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                    icon={UserRound}
                    required
                  />

                  <Field
                    label="Mother Tongue"
                    name="motherTongue"
                    value={form.motherTongue}
                    onChange={handleChange}
                    placeholder="Enter mother tongue"
                    icon={Languages}
                  />
                </div>
              </div>

              {/* Social Category */}
              <div>
                <SectionHeading icon={Users}>
                  (5) Social Category & Religion Details
                </SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <Field
                    label="Race and Caste"
                    name="caste"
                    value={form.caste}
                    onChange={handleChange}
                    placeholder="e.g. Maratha"
                    icon={Users}
                  />

                  <Field
                    label="Sub-Caste"
                    name="subCaste"
                    value={form.subCaste}
                    onChange={handleChange}
                    placeholder="Enter sub-caste"
                  />

                  <SelectField
                    label="Religion"
                    name="religion"
                    value={form.religion}
                    onChange={handleChange}
                    options={[
                      "Hindu",
                      "Muslim",
                      "Christian",
                      "Buddhist",
                      "Jain",
                      "Sikh",
                      "Other",
                    ]}
                  />

                  <SelectField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    options={[
                      "Open",
                      "SC",
                      "ST",
                      "VJ-A",
                      "NT-B",
                      "NT-C",
                      "NT-D",
                      "OBC",
                      "SBC",
                      "EWS",
                      "Other",
                    ]}
                  />
                </div>
              </div>

              {/* Birth Details */}
              <div>
                <SectionHeading icon={Globe2}>
                  (6–8) Birth Details
                </SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <Field
                    label="(6) Place of Birth"
                    name="placeOfBirth"
                    value={form.placeOfBirth}
                    onChange={handleChange}
                    placeholder="Enter place of birth"
                    required
                  />

                  <Field
                    label="Nationality"
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    placeholder="Enter nationality"
                  />

                  <Field
                    label="(7) Date of Birth"
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    icon={CalendarDays}
                    required
                  />

                  <div className="sm:col-span-2 xl:col-span-3">
                    <Field
                      label="(8) DOB in Words"
                      name="dobWords"
                      value={form.dobWords}
                      onChange={handleChange}
                      placeholder="Enter DOB in words"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div>
                <SectionHeading icon={BookOpen}>
                  (9–14) Academic & Leaving Details
                </SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <Field
                    label="(9) Last Institute Attended"
                    name="lastInstitute"
                    value={form.lastInstitute}
                    onChange={handleChange}
                    placeholder="Enter last institute attended"
                  />

                  <Field
                    label="(10) Date of Admission"
                    name="admissionDate"
                    type="date"
                    value={form.admissionDate}
                    onChange={handleChange}
                    icon={CalendarDays}
                  />

                  <SelectField
                    label="(11) Progress"
                    name="progress"
                    value={form.progress}
                    onChange={handleChange}
                    options={[
                      "Excellent",
                      "Very Good",
                      "Good",
                      "Satisfactory",
                      "Other",
                    ]}
                  />

                  {form.progress === "Other" && (
                    <Field
                      label="Specify Progress"
                      name="progressOther"
                      value={form.progressOther}
                      onChange={handleChange}
                      placeholder="Enter progress"
                    />
                  )}

                  <SelectField
                    label="(12) Conduct"
                    name="conduct"
                    value={form.conduct}
                    onChange={handleChange}
                    options={[
                      "Excellent",
                      "Very Good",
                      "Good",
                      "Satisfactory",
                      "Other",
                    ]}
                  />

                  {form.conduct === "Other" && (
                    <Field
                      label="Specify Conduct"
                      name="conductOther"
                      value={form.conductOther}
                      onChange={handleChange}
                      placeholder="Enter conduct"
                    />
                  )}

                  <Field
                    label="(13) Date of Leaving This Institute"
                    name="leavingDate"
                    type="date"
                    value={form.leavingDate}
                    onChange={handleChange}
                    icon={CalendarDays}
                  />

                  <div className="sm:col-span-2">
                    <Field
                      label="(14) Course in Which Admitted"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      placeholder="Diploma in Information Technology"
                      icon={BookOpen}
                      required
                    />
                  </div>

                  <SelectField
                    label="Year"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    options={[
                      "First Year",
                      "Second Year",
                      "Third Year",
                    ]}
                  />

                  <Field
                    label="From Date"
                    name="fromDate"
                    type="date"
                    value={form.fromDate}
                    onChange={handleChange}
                    icon={CalendarDays}
                  />
                </div>
              </div>

              {/* Status Message */}
              {message && (
                <p
                  role="status"
                  className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100"
                >
                  {message}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-400">
                  <span className="text-red-400">*</span> Required fields
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10"
                  >
                    <RotateCcw size={17} />
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600"
                  >
                    <Send size={17} />
                    Submit Admission
                  </button>
                </div>
              </div>

              <p className="text-xs leading-5 text-slate-400">
                Note: Backend API connection is needed to permanently save
                admission records.
              </p>
            </div>
          </form>

          {/* Footer */}
          <footer className="py-7 text-center text-xs text-slate-300">
            Government Polytechnic, Ambad · Admission Portal 2026–2027
          </footer>
        </main>
      </div>
    </div>
  );
}
