
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NewAdmission from "./pages/NewAddmission.jsx";
import GenerateTC from "./pages/GenerateTC.jsx";
import StudentAdmissions from "./pages/StudentAdmission.jsx";
import TCApprovalRequests from "./pages/TCApprovalRequests.jsx";
import TCRequest from "./Pages/TCRequest.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* New Admission Form */}
        <Route path="/admissions" element={<NewAdmission />} />

        {/* Generate TC */}
        <Route path="/tc" element={<GenerateTC />} />

      <Route path="/tc-request" element={<TCRequest />} />
<Route
  path="/admin/tc-approval-requests"
  element={<TCApprovalRequests />}
/>

        {/* Student Admissions Dashboard */}
        <Route path="/students" element={<StudentAdmissions />} />
        <Route
          path="/student-admissions"
          element={<StudentAdmissions />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
