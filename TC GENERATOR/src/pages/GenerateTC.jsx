
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import dteLogoPng from "../assets/Collage-logo.png";
import {
  ArrowLeft,
  FileText,
  Hash,
  UserRound,
  Search,
  RotateCcw,
  GitBranch,
  ShieldCheck,
  AlertTriangle,
  X,
  CheckCircle,
  LoaderCircle,
} from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const formatDateDDMMYYYY = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const display = (value, fallback = "—") =>
  value !== undefined &&
  value !== null &&
  String(value).trim() !== ""
    ? value
    : fallback;

/* =========================================================
   TRANSFER / LEAVING CERTIFICATE
========================================================= */

function TransferCertificate({ data = {}, certificate = {} }) {
  const [imgError, setImgError] = useState(false);

  const student = certificate.snapshot || data || {};
  const issueDate = certificate.issueDate || new Date();

  const tcNo =
    student.tcNo ||
    student.tcNumber ||
    certificate.serialNo ||
    certificate.tcNo;

  const registrationNo =
    student.registrationNumber ||
    student.registrationNo ||
    student.recordNo ||
    student.recordNumber;

  const enrollmentNo =
    student.enrollmentNo || student.enrollmentNumber;

  const candidateName =
    student.fullName || student.candidateName || student.name;

  const instituteName =
    student.instituteName || "Government Polytechnic, Ambad";

  const raceAndCaste = student.raceAndCaste || student.caste;
  const subCaste = student.subCaste;

  const course =
    student.courseAdmitted ||
    student.course ||
    "Diploma in Information Technology";

  const yearOfStudy =
    student.yearOfStudy ||
    student.academicYear ||
    student.year ||
    "First Year";

  const reasonOfLeaving =
    student.reasonForLeaving || student.reasonOfLeaving || "";

  const renderReasonOfLeaving = () => {
    if (reasonOfLeaving) {
      return (
        <div className="space-y-1 font-normal text-[13.5px] leading-relaxed">
          {String(reasonOfLeaving)
            .split("\n")
            .map((line, index) => (
              <div key={`${index}-${line}`}>{line}</div>
            ))}
        </div>
      );
    }

    return (
      <div className="space-y-1 font-normal text-[13.5px] leading-relaxed">
        <div>(i) {course} With Result Fail in Exam Summer 2026</div>
        <div>(ii) As per the request of candidate/parent</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 text-black sm:p-6">
      <div className="mx-auto mb-4 flex max-w-[840px] justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Print / Save as PDF
        </button>
      </div>

      <div
        id="lc-certificate-print"
        className="lc-paper relative mx-auto w-full max-w-[840px] border-2 border-black bg-[#E2EDE2] p-2 text-black shadow-2xl"
        style={{
          minHeight: "1180px",
          fontFamily: "'Tinos', 'Times New Roman', Times, serif",
        }}
      >
        <div className="flex h-full min-h-[1160px] flex-col justify-between border border-black bg-[#E2EDE2] p-5 sm:p-8">
          <div>
            <div className="flex items-center justify-between border-b border-black pb-2.5">
              <div className="flex flex-shrink-0 items-center justify-center pl-1">
                {!imgError ? (
                  <img
                    src={dteLogoPng}
                    alt="Maharashtra Government DTE emblem"
                    className="h-16 w-16 flex-shrink-0 object-contain grayscale contrast-125 sm:h-20 sm:w-20"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black text-center text-[9px] font-bold sm:h-20 sm:w-20">
                    MAHARASHTRA
                    <br />
                    GOVERNMENT
                  </div>
                )}
              </div>

              <div className="flex-1 px-2 text-center">
                <div className="text-[13.5px] font-normal leading-tight">
                  Maharashtra Government
                </div>

                <div className="mt-0.5 text-[12px] italic font-normal leading-tight">
                  (Under Directorate of Technical Education, Mumbai M.S.)
                </div>

                <h1 className="my-1 text-[19px] font-bold uppercase leading-snug tracking-tight sm:text-[23px]">
                  GOVERNMENT POLYTECHNIC, AMBAD
                </h1>

                <div className="text-[10.5px] font-normal leading-tight sm:text-[11.5px]">
                  Mhada Colony, Pachod Road, Ambad, Dist. Jalna - 431 204
                </div>

                <div className="text-[10.5px] font-normal leading-tight sm:text-[11.5px]">
                  Phone: 02483 275110
                </div>

                <div className="mt-0.5 flex flex-wrap items-center justify-center gap-x-3 text-[9.5px] font-normal leading-tight sm:text-[11px]">
                  <span>Email: principal.gpambad@dtemaharashtra.gov.in</span>
                  <span>Website: www.gpambad.ac.in</span>
                </div>
              </div>

              <div
                className="h-16 w-16 flex-shrink-0 opacity-0 sm:h-20 sm:w-20"
                aria-hidden="true"
              />
            </div>

            <div className="mb-2 mt-3 text-center">
              <h2 className="inline-block text-[16px] font-bold uppercase tracking-normal sm:text-[17px]">
                ** LEAVING CERTIFICATE ** (Original Copy)
              </h2>

              <p className="mx-auto mt-1 max-w-2xl px-2 text-[9px] font-normal leading-normal sm:px-4 sm:text-[10px]">
                No change in any entry in the certificate shall be made
                except by the issuing authority and any infringements of
                this requirement are liable to involve the imposition of
                penalty even that of rustication.
              </p>
            </div>

            <div className="mb-3 mt-2 text-[14px] font-normal">
              TC NO. : <span className="text-[14.5px]">{display(tcNo)}</span>
            </div>
          </div>

          <div className="flex-1 space-y-3.5 py-1 text-[12px] font-normal leading-relaxed sm:space-y-4 sm:text-[13.5px]">
            <div className="flex flex-wrap items-baseline justify-between gap-y-1">
              <div className="flex min-w-0 items-baseline">
                <span className="w-7 flex-shrink-0">1.</span>
                <span>Registration No. :</span>
                <span className="ml-2 break-words uppercase">
                  {display(registrationNo)}
                </span>
              </div>

              <div className="mr-1 flex items-baseline sm:mr-8">
                <span>Enrollment No. :</span>
                <span className="ml-2 break-all">
                  {display(enrollmentNo)}
                </span>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">2.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Name of Institute
              </span>
              <span className="mr-3">:</span>
              <span className="break-words uppercase">{instituteName}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">3.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Name of Candidate
              </span>
              <span className="mr-3">:</span>
              <span className="break-words uppercase tracking-wide">
                {display(candidateName)}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-y-1">
              <div className="flex min-w-0 items-baseline">
                <span className="w-7 flex-shrink-0">4.</span>
                <span className="w-44 flex-shrink-0 sm:w-64">
                  Mother&apos;s Name
                </span>
                <span className="mr-3">:</span>
                <span className="break-words uppercase">
                  {display(student.motherName)}
                </span>
              </div>

              <div className="flex items-baseline sm:w-80">
                <span className="w-28 flex-shrink-0">Mother Tongue</span>
                <span className="mr-3">:</span>
                <span className="uppercase">
                  {display(student.motherTongue, "MARATHI")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-y-1">
              <div className="flex min-w-0 items-baseline">
                <span className="w-7 flex-shrink-0">5.</span>
                <span className="w-44 flex-shrink-0 sm:w-64">
                  Race and Caste
                </span>
                <span className="mr-3">:</span>
                <span className="break-words uppercase">
                  {display(raceAndCaste, "")}
                  {subCaste ? ` (${subCaste})` : ""}
                  {!raceAndCaste && !subCaste ? "—" : ""}
                </span>
              </div>

              <div className="flex items-baseline sm:w-80">
                <span className="w-28 flex-shrink-0">Religion</span>
                <span className="mr-3">:</span>
                <span className="uppercase">
                  {display(student.religion, "HINDU")}
                </span>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">6.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Place of Birth
              </span>
              <span className="mr-3">:</span>
              <span className="break-words uppercase">
                {display(student.placeOfBirth)}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-y-1">
              <div className="flex items-baseline">
                <span className="w-7 flex-shrink-0">7.</span>
                <span className="w-44 flex-shrink-0 sm:w-64">
                  Date of Birth
                </span>
                <span className="mr-3">:</span>
                <span>
                  {formatDateDDMMYYYY(student.dateOfBirth || student.dob)}
                </span>
              </div>

              <div className="flex items-baseline sm:w-80">
                <span className="w-28 flex-shrink-0">Nationality</span>
                <span className="mr-3">:</span>
                <span>{display(student.nationality, "Indian")}</span>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">8.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Date of Birth in words
              </span>
              <span className="mr-3">:</span>
              <span className="break-words">
                {display(student.dobInWords)}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">9.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Last School Attended
              </span>
              <span className="mr-3">:</span>
              <span className="break-words">
                {display(
                  student.lastInstituteAttended || student.lastInstitute
                )}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">10.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Date of Admission
              </span>
              <span className="mr-3">:</span>
              <span>
                {formatDateDDMMYYYY(
                  student.dateOfAdmission || student.admissionDate
                )}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">11.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">Progress</span>
              <span className="mr-3">:</span>
              <span>{display(student.progress, "Good")}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">12.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">Conduct</span>
              <span className="mr-3">:</span>
              <span>{display(student.conduct, "Good")}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">13.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">
                Date of Leaving this Institute
              </span>
              <span className="mr-3">:</span>
              <span>
                {formatDateDDMMYYYY(
                  student.dateOfLeaving ||
                    student.leavingDate ||
                    issueDate
                )}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline">
                <span className="w-7 flex-shrink-0">14.</span>
                <span className="w-44 flex-shrink-0 sm:w-64">
                  Course in which he/she admitted
                </span>
                <span className="mr-3">:</span>
                <span className="break-words">{display(course)}</span>
              </div>

              <div className="flex items-baseline pl-16 sm:pl-72">
                <span className="w-16 flex-shrink-0">Year</span>
                <span className="mr-3">:</span>
                <span>{display(yearOfStudy)}</span>
              </div>
            </div>

            <div className="flex items-start">
              <span className="w-7 flex-shrink-0 pt-0.5">15.</span>
              <span className="w-44 flex-shrink-0 pt-0.5 sm:w-64">
                Reason of Leaving this Institute :
              </span>
              <div className="min-w-0 flex-1">
                {renderReasonOfLeaving()}
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="w-7 flex-shrink-0">16.</span>
              <span className="w-44 flex-shrink-0 sm:w-64">Remark</span>
              <span className="mr-3">:</span>
              <span className="break-words">
                {display(
                  student.remarks,
                  "Certified that student record is complete and fees cleared."
                )}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-3">
            <div className="mb-3.5 border-t border-black" />

            <div className="mb-6 text-left text-[12px] font-normal sm:text-[13.5px]">
              Certified that the above information is in accordance with
              the Polytechnic / Institute Register.
            </div>

            <div className="grid grid-cols-3 items-end pb-2 text-[12px] font-normal sm:text-[13.5px]">
              <div className="space-y-1.5">
                <div>
                  Date&nbsp;&nbsp;: {formatDateDDMMYYYY(issueDate)}
                </div>
                <div>Place&nbsp;: Ambad</div>
              </div>

              <div className="text-center">
                <div className="h-16" />
                <div>Clerk</div>
                <div className="text-[11px] sm:text-[12px]">
                  (Student Section)
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-16" />
                <div className="text-[13px] font-bold uppercase sm:text-[14px]">
                  PRINCIPAL
                </div>
                <div className="text-[10px] leading-tight sm:text-[12px]">
                  Government Polytechnic Ambad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @page { size: A4 portrait; margin: 10mm; }
        @media print {
          html, body { background: #fff !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #lc-certificate-print, #lc-certificate-print * { visibility: visible; }
          #lc-certificate-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 190mm !important;
            min-height: 277mm !important;
            margin: 0 !important;
            padding: 2mm !important;
            box-shadow: none !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   STUDENT FIELDS
========================================================= */

const inputClass =
  "w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

const studentFields = [
  ["TC Number", "tcNo"],
  ["Record Number", "recordNo"],
  ["Page Number", "pageNo"],
  ["Enrollment Number", "enrollmentNo"],
  ["Institute Name", "instituteName"],
  ["Registration Number", "registrationNumber"],
  ["Student Name", "fullName"],
  ["Roll Number", "rollNumber"],
  ["Mother Name", "motherName"],
  ["Mother Tongue", "motherTongue"],
  ["Caste", "raceAndCaste"],
  ["Sub Caste", "subCaste"],
  ["Category", "category"],
  ["Religion", "religion"],
  ["Nationality", "nationality"],
  ["Other Nationality", "otherNationality"],
  ["Place of Birth", "placeOfBirth"],
  ["Date of Birth", "dateOfBirth"],
  ["Date of Birth (in words)", "dobInWords"],
  ["Last Institute Attended", "lastInstituteAttended"],
  ["Date of Admission", "dateOfAdmission"],
  ["Progress", "progress"],
  ["Other Progress", "progressOther"],
  ["Conduct", "conduct"],
  ["Other Conduct", "conductOther"],
  ["Course", "course"],
  ["Branch", "branch"],
  ["Academic Year", "academicYear"],
  ["Admission From", "admissionFrom"],
  ["Date of Leaving", "dateOfLeaving"],
  ["Address", "address"],
  ["Mobile Number", "mobileNo"],
  ["Email", "email"],
  ["Status", "status"],
];

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T/.test(value)
  ) {
    return new Date(value).toLocaleDateString("en-IN");
  }

  return String(value);
};

/* =========================================================
   GENERATE TC PAGE
========================================================= */

export default function GenerateTC() {
  const [searchType, setSearchType] = useState("enrollment");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [branch, setBranch] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showCertificate, setShowCertificate] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRequestingApproval, setIsRequestingApproval] = useState(false);
  const [approvalRequested, setApprovalRequested] = useState(false);

  const [certificateIssueDate, setCertificateIssueDate] = useState(null);

  const setFeedback = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const clearResults = () => {
    setStudentData(null);
    setShowCertificate(false);
    setShowDuplicateModal(false);
    setApprovalRequested(false);
    setCertificateIssueDate(null);
  };

  /* ---------------------------------------------------------
     SEARCH STUDENT
  --------------------------------------------------------- */

  const handleSearch = async (event) => {
    event.preventDefault();

    setFeedback("");
    clearResults();

    if (searchType !== "enrollment") {
      if (!studentName.trim() || !branch) {
        setFeedback(
          "Please enter the student name and select a branch.",
          "error"
        );
        return;
      }

      setFeedback(
        "For now, please search using the enrollment number.",
        "info"
      );
      return;
    }

    const enrollment = enrollmentNumber.trim();

    if (!enrollment) {
      setFeedback("Please enter the enrollment number.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/${encodeURIComponent(enrollment)}`
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            (response.status === 404
              ? "Student not found for this enrollment number."
              : "Could not fetch student information.")
        );
      }

      const student = result.data || result.student;

      if (!student) {
        throw new Error("Student information was not returned by the server.");
      }

      setStudentData(student);

      if (student.tcGenerated === true) {
        setShowDuplicateModal(true);
        setFeedback(
          "This student already has a generated TC. Approval is required for another copy.",
          "warning"
        );
      } else {
        setFeedback(
          "Student information fetched successfully. Verify the record and generate the TC.",
          "success"
        );
      }
    } catch (error) {
      setFeedback(
        error.message ||
          "Could not connect to the backend. Make sure the backend server is running.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------------------------------------------
     GENERATE TC
     The backend is responsible for preventing duplicate TCs.
  --------------------------------------------------------- */

  const handleGenerateTC = async () => {
    if (!studentData?.enrollmentNo) {
      setFeedback("Search for a student first.", "error");
      return;
    }

    setIsGenerating(true);
    setFeedback("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/${encodeURIComponent(
          studentData.enrollmentNo
        )}/generate-tc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (
        response.status === 409 ||
        result.code === "TC_ALREADY_GENERATED"
      ) {
        setShowCertificate(false);
        setShowDuplicateModal(true);
        setFeedback(
          "TC has already been generated. Request admin approval for another copy.",
          "warning"
        );
        return;
      }

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "TC generation failed.");
      }

      setShowDuplicateModal(false);
      setShowCertificate(true);
      setApprovalRequested(false);
      setCertificateIssueDate(new Date());

      // Update local state after successful backend generation.
      setStudentData((previous) => ({
        ...previous,
        ...(result.data || {}),
        tcGenerated: true,
        tcGeneratedAt: result.data?.tcGeneratedAt || new Date().toISOString(),
      }));

      setFeedback(
        "TC generated successfully. You can now print or save it as PDF.",
        "success"
      );
    } catch (error) {
      setFeedback(
        error.message ||
          "Could not generate TC. Please check the backend connection.",
        "error"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------------------------------------------------
     REQUEST ADMIN APPROVAL FOR DUPLICATE TC
  --------------------------------------------------------- */

  const handleRequestApproval = async () => {
    if (!studentData?.enrollmentNo) {
      setFeedback("Please search for the student again.", "error");
      return;
    }

    setIsRequestingApproval(true);
    setFeedback("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/${encodeURIComponent(
          studentData.enrollmentNo
        )}/tc-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: "Request for a duplicate Transfer Certificate",
          }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Could not submit the approval request."
        );
      }

      setApprovalRequested(true);

      setFeedback(
        result.message ||
          "Approval request submitted. After the admin approves it, click Generate TC Again.",
        "success"
      );
    } catch (error) {
      setFeedback(
        error.message ||
          "Could not submit the request. Please try again.",
        "error"
      );
    } finally {
      setIsRequestingApproval(false);
    }
  };

  /* ---------------------------------------------------------
     RESET
  --------------------------------------------------------- */

  const handleReset = () => {
    setEnrollmentNumber("");
    setStudentName("");
    setBranch("");
    setFeedback("");
    clearResults();
  };

  const changeSearchType = (type) => {
    setSearchType(type);
    setFeedback("");
    clearResults();
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
                  College Admission &amp; Certificate Management Portal
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 lg:px-2">
              <Navbar />
            </div>

            <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:w-44">
              <p className="text-xs text-slate-400">Academic Session</p>
              <p className="mt-1 font-bold text-white">2026–2027</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-[1700px] px-4 py-8 sm:px-6 lg:px-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-[#0c1b32]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:border-cyan-400 hover:bg-blue-900"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          {/* Heading */}
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
                  Generate <span className="text-cyan-400">TC</span>
                </h2>
              </div>
            </div>
          </section>

          {/* Student Search Card */}
          <section className="w-full overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#0c1b32]/95 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-4 sm:px-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <Search size={22} />
              </div>

              <div>
                <h3 className="font-extrabold text-white">Find Student</h3>
                <p className="text-xs text-slate-400">
                  Select a method to search for the student record
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-7">
              {/* Search Options */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      Using Name &amp; Branch
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
                  {searchType === "enrollment" ? (
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
                            setFeedback("");
                          }}
                          placeholder="Enter student enrollment number"
                          required
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  ) : (
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
                              setFeedback("");
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
                              setFeedback("");
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

                {/* Feedback */}
                {message && (
                  <div
                    role="status"
                    className={`mt-4 rounded-xl border p-4 text-sm leading-6 ${
                      messageType === "error"
                        ? "border-red-400/30 bg-red-400/10 text-red-100"
                        : messageType === "success"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                          : messageType === "warning"
                            ? "border-amber-400/30 bg-amber-400/10 text-amber-100"
                            : "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
                    }`}
                  >
                    {message}
                  </div>
                )}

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
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Search size={18} />
                    )}
                    {isLoading ? "Fetching Student..." : "Search Student"}
                  </button>
                </div>
              </form>

              {/* Student Information */}
              {studentData && (
                <section className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#071a30]/90 shadow-xl">
                  <div className="border-b border-white/10 bg-white/5 px-5 py-4 sm:px-7">
                    <h3 className="font-extrabold text-white">
                      Student Information
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Complete student record fetched from the college database
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-7">
                    {studentFields.map(([label, key]) => (
                      <div
                        key={key}
                        className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-3"
                      >
                        <p className="mb-1 text-xs font-semibold text-cyan-300">
                          {label}
                        </p>
                        <p className="break-words text-sm text-white">
                          {displayValue(studentData[key])}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Generate button: hidden once certificate is displayed */}
                  {!showCertificate && (
                    <div className="border-t border-white/10 p-5 sm:px-7">
                      <button
                        type="button"
                        onClick={handleGenerateTC}
                        disabled={isGenerating || studentData.tcGenerated === true}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {isGenerating ? (
                          <LoaderCircle size={18} className="animate-spin" />
                        ) : (
                          <FileText size={18} />
                        )}
                        {isGenerating ? "Generating TC..." : "Generate TC"}
                      </button>

                      {studentData.tcGenerated === true && (
                        <p className="mt-3 text-sm text-amber-200">
                          This TC has already been generated. Use the duplicate
                          request popup to seek admin approval.
                        </p>
                      )}
                    </div>
                  )}
                </section>
              )}

              {/* Certificate appears only after API success */}
              {studentData && showCertificate && (
                <div className="mt-8">
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                    <CheckCircle size={20} />
                    TC generation confirmed by the server.
                  </div>

                  <TransferCertificate
                    data={studentData}
                    certificate={{
                      issueDate: certificateIssueDate || new Date(),
                      serialNo: studentData.tcNo,
                    }}
                  />
                </div>
              )}

              {/* Verification Note */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-cyan-400"
                />

                <p className="text-xs leading-6 text-slate-400">
                  Student details must match the official college records.
                  The Transfer Certificate can be generated after the student
                  record is found and verified. Duplicate certificates require
                  approval.
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

      {/* =====================================================
          DUPLICATE TC APPROVAL MODAL
      ===================================================== */}
      {showDuplicateModal && studentData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="duplicate-tc-title"
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-amber-400/30 bg-[#0c1b32] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 bg-amber-400/10 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
                  <AlertTriangle size={26} />
                </div>

                <div>
                  <h2
                    id="duplicate-tc-title"
                    className="text-xl font-extrabold text-white"
                  >
                    TC Already Generated
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    A certificate has already been generated for this
                    enrollment number.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                aria-label="Close duplicate TC popup"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Student Details
                </p>

                <p className="mt-2 font-bold text-white">
                  {display(studentData.fullName)}
                </p>

                <p className="mt-1 break-all text-sm text-slate-300">
                  Enrollment No.: {display(studentData.enrollmentNo)}
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  TC Number: {display(studentData.tcNo)}
                </p>
              </div>

              {approvalRequested ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                  <div className="flex items-start gap-2 text-emerald-200">
                    <CheckCircle size={20} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">Approval request submitted</p>
                      <p className="mt-1 text-sm leading-6 text-emerald-100/80">
                        After the admin approves your request, click
                        &quot;Generate TC Again&quot;. If it is still pending,
                        the server will not generate another certificate.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-6 text-slate-300">
                  To generate another copy, first request admin approval.
                  The certificate will be generated only when the backend
                  confirms that an approved request is available.
                </p>
              )}

              <div className="flex flex-col gap-3 pt-1">
                {!approvalRequested && (
                  <button
                    type="button"
                    onClick={handleRequestApproval}
                    disabled={isRequestingApproval}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 font-bold text-slate-950 transition hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isRequestingApproval ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                    {isRequestingApproval
                      ? "Submitting Request..."
                      : "Request Admin Approval"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleGenerateTC}
                  disabled={isGenerating}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 font-bold text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <FileText size={18} />
                  )}
                  {isGenerating
                    ? "Checking Approval..."
                    : "Generate TC Again"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowDuplicateModal(false)}
                  className="w-full rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>

              <p className="text-center text-xs leading-5 text-slate-500">
                The backend validates duplicate generation and approval.
                Closing this popup does not approve the request.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
