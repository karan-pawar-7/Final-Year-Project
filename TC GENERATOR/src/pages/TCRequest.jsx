import { useState } from "react";
import { FileText, Search, CheckCircle2, AlertCircle } from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function TCRequest() {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [reason, setReason] = useState(
    "Request for a duplicate Transfer Certificate"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    const enrollment = enrollmentNo.trim();

    if (!enrollment) {
      setMessage("Please enter your enrollment number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/${encodeURIComponent(
          enrollment
        )}/tc-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit request.");
      }

      setSuccess(true);
      setMessage(result.message || "Request submitted successfully.");
    } catch (error) {
      setSuccess(false);
      setMessage(
        error.message || "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="bg-slate-900 px-6 py-7 text-white sm:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <FileText size={27} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Duplicate TC Request
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Transfer Certificate application
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          <div>
            <label
              htmlFor="enrollmentNo"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Enrollment Number
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-600">
              <Search size={19} className="text-slate-400" />

              <input
                id="enrollmentNo"
                value={enrollmentNo}
                onChange={(event) =>
                  setEnrollmentNo(event.target.value)
                }
                placeholder="Enter your enrollment number"
                className="w-full bg-transparent py-3.5 outline-none"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reason"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Request Reason
            </label>

            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          {message && (
            <div
              role="status"
              className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
                success
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {success ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit TC Request"}
          </button>

          <p className="text-xs leading-5 text-slate-500">
            A duplicate certificate request can be submitted only
            after the first TC has been generated. The request must
            be reviewed by the administrator.
          </p>
        </form>
      </section>
    </main>
  );
}