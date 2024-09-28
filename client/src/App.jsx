import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ExhibitorPortal from "./pages/ExhibitorPortal";
import AttendeeInterface from "./pages/AttendeeInterface";
import Contact from "./pages/Contact";
import RegisterExpo from "./pages/RegisterExpo";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/expo" element={<RegisterExpo />} />
                <Route path="/exhibitor-portal" element={<ExhibitorPortal />} />
                <Route
                    path="/attendee-interface"
                    element={<AttendeeInterface />}
                />
                {/* Add more routes for specific pages as needed */}
            </Routes>
        </Router>
    );
}

export default App;
