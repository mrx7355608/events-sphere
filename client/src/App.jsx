import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import UserLogin from "./pages/UserLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ExhibitorPortal from "./pages/ExhibitorPortal";
import AttendeeInterface from "./pages/AttendeeInterface";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/user-registration"
                    element={<UserRegistration />}
                />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
