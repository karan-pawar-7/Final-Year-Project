import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import collegeLogo from "../assets/Collage-logo.png";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock3,
  FileText,
  AlertCircle,
  ShieldCheck,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const STATUS_OPTIONS = ["All", "Pending", "Approved", "Rejected", "Used"];

const STATUS_STYLES = {
  Pending: "border-amber-300/30 bg-amber-400/15 text-amber-200",
  Approved: "border-emerald-300/30 bg-emerald-400/15 text-emerald-200",
  Rejected: "border-rose-300/30 bg-rose-400/15 text-rose-200",
  Used: "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function TCApprovalRequests() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const adminKey = import.meta.env.VITE_ADMIN_APPROVAL_KEY;

      if (!adminKey) {
        throw new Error(
          "Admin key is not configured. Check your frontend .env file."
        );
      }

      const requestsUrl =
        status === "All"
          ? `${API_BASE_URL}/api/tc-requests`
          : `${API_BASE_URL}/api/tc-requests?status=${encodeURIComponent(status)}`;

      const response = await fetch(requestsUrl, {
        method: "GET",
        headers: { "x-admin-key": adminKey },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Request failed (${response.status}).`
        );
      }

      setRequests(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.message || "Failed to load requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  async function reviewRequest(id, decision) {
    const action = decision === "Approved" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this request?`)) {
      return;
    }

    setWorkingId(id);
    setError("");
    setNotice("");

    try {
      const adminKey = import.meta.env.VITE_ADMIN_APPROVAL_KEY;

      if (!adminKey) {
        throw new Error("Admin key is not configured.");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/tc-requests/${encodeURIComponent(id)}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({ decision }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Request failed (${response.status}).`
        );
      }

      setNotice(result.message || `Request ${action}d successfully.`);
      await loadRequests();
    } catch (err) {
      setError(err.message || "Unable to review request.");
    } finally {
      setWorkingId("");
    }
  }

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  return (
    <div className="relative isolate min-h-screen text-white">
      {/* Same college-building background used on the Home page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"

        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}college-building.avif')`,
        }}

      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[#071426]/55" />

      <div className="relative z-10">
        {/* College Header — matching Home page */}
        {/* <header className="relative z-20 w-full border-b border-slate-700 bg-[#0c1b32] text-white shadow-lg">
          <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:px-10">
            <div className="flex min-w-0 shrink-0 items-center gap-4">
              <img
                src={collegeLogo}
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
                <p className="mt-1 text-xs text-cyan-200">
                  Transfer Certificate • Administration
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 lg:px-2">
              <Navbar />
            </div>

            <div className="w-full shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:w-40">
              <p className="text-xs text-slate-400">Academic Session</p>
              <p className="mt-1 font-semibold text-white">2026–2027</p>
              <p className="mt-1 text-xs text-emerald-400">● Administrative Portal</p>
            </div>
          </div>
        </header> */}

        {/* <div className="relative z-10">
          <Navbar />
           </div> */}
        <Navbar />

        <main className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12"></main>
      </div>

      <main className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="relative mb-10 flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[#0c1b32]/75 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:flex-row lg:items-center">
          <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-20 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200">
                Secure Administration Panel
              </p>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              TC Approval <span className="text-cyan-300">Requests</span>
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" />
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Review duplicate Transfer Certificate requests and manage each application from one place.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 shadow-lg backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">Academic Year</p>
              <p className="mt-2 text-xl font-bold text-white">2026 <span className="mx-2 text-cyan-300">—</span> 2027</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-300">Admission Portal Active</span>
              </div>
            </div>
            <button
              type="button"
              onClick={loadRequests}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              Refresh Requests
            </button>
          </div>
        </div>

        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/15 bg-[#102139]/85 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-300/30 hover:shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Pending Requests
                </p>
                <p className="mt-2 text-3xl font-black text-white">
                  {pendingCount}
                </p>
              </div>
              <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-amber-200">
                <Clock3 size={23} />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              In the currently displayed results
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#102139]/85 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-300/30 hover:shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Approved
                </p>
                <p className="mt-2 text-3xl font-black text-white">
                  {approvedCount}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-emerald-200">
                <CheckCircle2 size={23} />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Requests approved by admin
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#102139]/85 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-300/30 hover:shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Rejected
                </p>
                <p className="mt-2 text-3xl font-black text-white">
                  {rejectedCount}
                </p>
              </div>
              <div className="rounded-xl border border-rose-300/20 bg-rose-300/10 p-3 text-rose-200">
                <XCircle size={23} />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Requests not approved
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#102139]/85 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-300/30 hover:shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Filtered Results
                </p>
                <p className="mt-2 text-3xl font-black text-white">
                  {requests.length}
                </p>
              </div>
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                <ClipboardCheck size={23} />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Current filter: {status}
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/15 bg-[#102139]/90 shadow-2xl backdrop-blur-md">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Request Register
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Select a status to view matching applications.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setStatus(option)}
                    className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition sm:text-sm ${status === option
                      ? "border-cyan-300 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-950/40"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-200/30 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {notice && (
            <div
              role="status"
              className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100 sm:mx-6"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100 sm:mx-6"
            >
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <RefreshCw size={30} className="animate-spin text-cyan-300" />
              <p className="mt-4 font-semibold text-white">
                Loading TC requests...
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Fetching the latest records from the server.
              </p>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="rounded-2xl border border-cyan-200/15 bg-white/5 p-4 text-cyan-200">
                <FileText size={34} />
              </div>
              <h4 className="mt-4 text-lg font-bold text-white">
                No requests found
              </h4>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                There are no requests matching the selected status. Try
                another filter or refresh the list.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-[#0c1b32]/90 text-[11px] uppercase tracking-[0.13em] text-cyan-100/80">
                  <tr>
                    <th className="px-5 py-4 font-bold">Student / Enrollment</th>
                    <th className="px-5 py-4 font-bold">Request Reason</th>
                    <th className="px-5 py-4 font-bold">Requested At</th>
                    <th className="px-5 py-4 font-bold">Status</th>
                    <th className="px-5 py-4 font-bold">Reviewed At</th>
                    <th className="px-5 py-4 font-bold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {requests.map((request) => (
                    <tr
                      key={request._id}
                      className="align-top transition hover:bg-white/[0.06]"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg border border-cyan-200/15 bg-cyan-300/10 p-2 text-cyan-200">
                            <GraduationCap size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-white">
                              {request.enrollmentNo}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Transfer Certificate
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="max-w-xs whitespace-normal px-5 py-5 leading-6 text-slate-300">
                        {request.reason || "—"}
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-slate-300">
                        {formatDate(request.requestedAt)}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${STATUS_STYLES[request.status] ||
                            "border-white/10 bg-white/5 text-slate-200"
                            }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {request.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-slate-300">
                        {formatDate(request.reviewedAt)}
                      </td>

                      <td className="px-5 py-5">
                        {request.status === "Pending" ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={workingId === request._id}
                              onClick={() =>
                                reviewRequest(request._id, "Approved")
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 px-3 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <CheckCircle2 size={15} />
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={workingId === request._id}
                              onClick={() =>
                                reviewRequest(request._id, "Rejected")
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-xs font-bold text-rose-100 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <XCircle size={15} />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                            <CheckCircle2 size={14} />
                            Reviewed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/15 bg-[#102139]/85 p-4 text-xs leading-5 text-slate-400">
          <ShieldCheck size={17} className="mt-0.5 shrink-0 text-cyan-200" />
          <p>
            Administrative actions are validated by the backend. Approving a
            request does not itself generate the certificate; certificate
            generation must still follow the existing approved-request check.
          </p>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#0c1b32]/90 px-5 py-6 text-center text-xs text-slate-300 backdrop-blur-md">
        Government Polytechnic, Ambad · College Admission &amp; Certificate
        Management Portal · Academic Session 2026–2027
      </footer>

    </div>
  );
}
