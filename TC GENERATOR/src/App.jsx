import { BrowserRouter, Routes, Route } from "react-router-dom";
 

import Home from "./pages/Home";
import About from "./pages/About";
import NewAdmission from "./pages/NewAddmission";
import GenerateTC from "./pages/GenerateTC";
function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<NewAdmission />} />
        <Route path="/tc" element={<GenerateTC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;