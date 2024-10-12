import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ExhibitorPortal from "./pages/ExhibitorPortal";
import Contact from "./pages/Contact";
import RegisterExpo from "./pages/RegisterExpo";
import Profile from "./pages/Profile";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import useUserStore from "./store/user";
import { Flex, Spinner } from "@chakra-ui/react";
import { GET_LOGGEDIN_USER } from "./queries/user";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";

function App() {
    const { loading, data } = useQuery(GET_LOGGEDIN_USER);
    const { loginUser } = useUserStore();

    useEffect(() => {
        if (!data || !data.authenticatedUser) return;
        loginUser(data.authenticatedUser);
        console.log(data.authenticatedUser);
    }, [data]);

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems={"center"} minH={"80vh"}>
                <Spinner size="lg" />
            </Flex>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/expo" element={<RegisterExpo />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/event-details" element={<EventDetails />} />
                {/* <Route path="/exhibitor-portal" element={<ExhibitorPortal />} /> */}
                {/* Add more routes for specific pages as needed */}
            </Routes>
        </Router>
    );
}

export default App;
