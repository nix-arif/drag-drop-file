import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar'
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
    <section className="flex gap-6">
      <Sidebar />
    

    
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
