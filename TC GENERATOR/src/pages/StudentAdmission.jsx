
import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  ShieldCheck,
  ExternalLink,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  ChevronDown,
} from "lucide-react";

const initialStudents = [
  {
    tc: "TC-3723",
    roll: "104",
    name: "BAYKEWAR NIKITA RAVINDRA",
    mother: "M. SAVITRABAI",
    enrollment: "24510280085",
    course: "Civil Engineering",
    year: "First Year",
    academic: "2024-25",
    category: "SC",
    religion: "HINDU",
    date: "30/08/2024",
    status: "Confirmed",
  },
  {
    tc: "TC-4355",
    roll: "285",
    name: "KASHID ADITYA PANDURANG",
    mother: "M. SANGITA",
    enrollment: "24510280099",
    course: "Mechanical Engineering",
    year: "Second Year",
    academic: "2025-26",
    category: "OPEN",
    religion: "HINDU",
    date: "20/08/2024",
    status: "Confirmed",
  },
  {
    tc: "TC-4356",
    roll: "312",
    name: "SHAIKH FARHAN ASLAM",
    mother: "M. RUKHSANA",
    enrollment: "24510280112",
    course: "Information Technology",
    year: "Third Year",
    academic: "2026-27",
    category: "OBC",
    religion: "MUSLIM",
    date: "14/08/2023",
    status: "Confirmed",
  },
  {
    tc: "TC-4357",
    roll: "42",
    name: "KARAN BHAUSAHEB PAWAR",
    mother: "M. SINDHU",
    enrollment: "24510280570",
    course: "Information Technology",
    year: "First Year",
    academic: "2026-27",
    category: "VJ/DT-A",
    religion: "HINDU",
    date: "17/10/2026",
    status: "Confirmed",
  },
  {
    tc: "TC-4360",
    roll: "156",
    name: "PATIL SNEHAL VILAS",
    mother: "M. ANITA",
    enrollment: "24510280641",
    course: "Mechanical Engineering",
    year: "First Year",
    academic: "2026-27",
    category: "OBC",
    religion: "HINDU",
    date: "22/10/2026",
    status: "Pending",
  },
];

const courses = [
  "Civil Engineering",
  "Mechanical Engineering",
  "Information Technology",
];

function StudentAdmissions() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [course, setCourse] = useState("All Courses");

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    const matchesSearch = [
      student.name,
      student.tc,
      student.roll,
      student.enrollment,
      student.course,
    ].some((value) => value.toLowerCase().includes(query));

    const matchesStatus =
      status === "All Statuses" || student.status === status;

    const matchesCourse =
      course === "All Courses" || student.course === course;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  function addAdmission() {
    const name = window.prompt("Enter student full name:");
    if (!name?.trim()) return;

    const enrollment = window.prompt("Enter enrollment number:");
    if (!enrollment?.trim()) return;

    const newStudent = {
      tc: `TC-${Date.now().toString().slice(-4)}`,
      roll: "-",
      name: name.trim().toUpperCase(),
      mother: "-",
      enrollment: enrollment.trim(),
      course: "Information Technology",
      year: "First Year",
      academic: "2026-27",
      category: "OPEN",
      religion: "-",
      date: new Date().toLocaleDateString("en-GB"),
      status: "Pending",
    };

    setStudents((previous) => [newStudent, ...previous]);
  }

  function editStudent(student) {
    const name = window.prompt("Edit student name:", student.name);
    if (!name?.trim()) return;

    setStudents((previous) =>
      previous.map((item) =>
        item.enrollment === student.enrollment
          ? { ...item, name: name.trim().toUpperCase() }
          : item
      )
    );
  }

  function viewStudent(student) {
    window.alert(
      `Student Details\n\nName: ${student.name}\nRoll No: ${student.roll}\nEnrollment: ${student.enrollment}\nCourse: ${student.course}\nCategory: ${student.category}\nAdmission Date: ${student.date}\nStatus: ${student.status}`
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f6fd] font-sans text-slate-800">
      {/* Top Government Bar */}
      <div className="border-b border-slate-700 bg-[#071426] px-4 py-2 text-xs text-slate-300 sm:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-teal-400">
              Government of Maharashtra
            </span>
            <span className="hidden text-slate-500 sm:inline">|</span>
            <span>
              Directorate of Technical Education, Mumbai (M.S.)
            </span>
            <span className="hidden text-slate-500 lg:inline">|</span>
            <span className="hidden lg:inline">
              DTE Code: GPA / Inst. 2009
            </span>
          </div>

          <a
            href="#admission-register"
            className="flex items-center gap-1 font-semibold text-teal-400 hover:text-teal-300"
          >
            <ShieldCheck size={14} />
            Document Authentication Portal
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* College Header */}
      <header className="border-b border-slate-700 bg-[#0b1c36] px-4 py-5 text-white shadow-md sm:px-8">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-400 bg-white/10">
            <GraduationCap size={30} className="text-cyan-300" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-blue-200">
              शासकीय तंत्रनिकेतन, अंबड • ESTD. 2009
            </p>
            <h1 className="mt-1 text-lg font-extrabold tracking-tight sm:text-2xl">
              GOVERNMENT POLYTECHNIC, AMBAD
            </h1>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">
              College Admission & Certificate Management Portal
            </p>
          </div>

          <button className="ml-auto hidden items-center gap-3 rounded-xl border border-slate-600 bg-white/5 px-4 py-3 text-left sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <ShieldCheck size={20} />
            </span>
            <span>
              <span className="block text-sm font-bold">
                Principal & Admin Office
              </span>
              <span className="block text-xs text-blue-200">
                Administrative Authority
              </span>
            </span>
            <ChevronDown size={16} className="text-slate-300" />
          </button>
        </div>
      </header>

      {/* Main Page - Full Width, No Sidebar */}
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-8 lg:px-12">
        {/* Page Title */}
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold tracking-wide text-blue-600">
              ADMINISTRATIVE PORTAL
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#10264a] sm:text-3xl">
              Student Admissions
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage student records, enrollment details and admission status.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800">
            <GraduationCap size={20} />
            Academic Year 2026–27
          </div>
        </div>

        {/* Search and Filter Panel */}
        <section className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(220px,1fr)_155px_180px_auto]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by Name, Roll No, Reg. No, Enrollment..."
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option>All Statuses</option>
              <option>Confirmed</option>
              <option>Pending</option>
            </select>

            <select
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option>All Courses</option>
              {courses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              onClick={addAdmission}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#192e69] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={19} />
              New Admission Record
            </button>
          </div>
        </section>

        {/* Admission Table */}
        <section
          id="admission-register"
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h3 className="flex items-center gap-3 font-extrabold text-[#15336e] sm:text-lg">
              <Users size={23} className="text-blue-600" />
              Admission Register
            </h3>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {filteredStudents.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] border-collapse text-left text-sm">
              <thead className="bg-[#f5f8fd] text-xs font-bold uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-5 py-4">TC / Roll</th>
                  <th className="px-5 py-4">Candidate Name</th>
                  <th className="px-5 py-4">Enrollment / Reg. No.</th>
                  <th className="px-5 py-4">Course & Year</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Admission Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.enrollment}
                    className="transition-colors hover:bg-blue-50/60"
                  >
                    <td className="whitespace-nowrap px-5 py-5">
                      <p className="font-bold text-[#183568]">
                        {student.tc}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Roll: {student.roll}
                      </p>
                    </td>

                    <td className="max-w-[200px] px-5 py-5">
                      <p className="font-bold leading-5 text-slate-800">
                        {student.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {student.mother}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5">
                      <p className="font-semibold text-[#183568]">
                        {student.enrollment}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        AY {student.academic}
                      </p>
                    </td>

                    <td className="max-w-[190px] px-5 py-5">
                      <p className="font-medium leading-5 text-slate-700">
                        Diploma in {student.course}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {student.year} ({student.academic})
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5">
                      <p className="font-semibold text-slate-700">
                        {student.category}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {student.religion}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-slate-600">
                      {student.date}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
                          student.status === "Confirmed"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {student.status === "Confirmed" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Clock size={14} />
                        )}
                        {student.status}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => viewStudent(student)}
                          title="View Student"
                          aria-label={`View ${student.name}`}
                          className="rounded-full bg-blue-50 p-2.5 text-blue-800 transition hover:bg-blue-100"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => editStudent(student)}
                          title="Edit Student"
                          aria-label={`Edit ${student.name}`}
                          className="rounded-full bg-blue-50 p-2.5 text-blue-800 transition hover:bg-blue-100"
                        >
                          <Pencil size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      <Search size={28} className="mx-auto mb-2 opacity-50" />
                      <p className="font-semibold">No student records found</p>
                      <p className="mt-1 text-xs">
                        Try a different search term or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-wrap justify-between gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs text-slate-500">
            <span>
              Government Polytechnic, Ambad&nbsp; • &nbsp;Student Admission Register
            </span>
            <span>Academic Year 2026–27</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default StudentAdmissions;
