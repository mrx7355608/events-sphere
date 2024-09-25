import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Event Management System
                    </Typography>
                    <Button color="inherit">
                        <Link to="/user-login">Login</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/user-registration">Register</Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Welcome to Our Event Management System
                    </Typography>
                    <Typography variant="body1">
                        Discover, create, and manage events with ease.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
