import React from "react";
import "./navbar.css"
import { Box } from "@mui/material"


export const Navbar = () => {

    return (
        <>
        <Box className="navbar">

            <Box className="navbar1">
                <h1 className="heading">URL Shortner</h1>
            </Box>

            <Box className="navbar2 flexedView">
                <Box className="navbut">Home</Box>
                <Box className="navbut">My Urls</Box>
                <Box className="navbut">Login</Box>
                <Box className="navbut">SignUp</Box>
            </Box>

        </Box>
        </>
    )
}