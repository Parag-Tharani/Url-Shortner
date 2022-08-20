import React from "react";
import "./navbar.css"
import { Box, Button, Popover } from "@mui/material"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";

export const Api_Url = "http://localhost:8080"
export const home_url = "http://localhost:3000"

export const Navbar = () => {

    const navigate = useNavigate()

    const [loggedin , setLoggedin] = React.useState(false)
    const [name, setName] = React.useState("")
    let token = localStorage.getItem("token")

    React.useEffect(() => {
        
        if(token !== null && token !== "" && token !== undefined){
            
            const decoded = jwt_decode(token);

            fetch(`${Api_Url}/getUser`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id:decoded.id})
            })
            .then((res) => res.json())
            .then((data) =>  setName(data.user_name), setLoggedin(true))
        }else{
            setName("")
            setLoggedin(false)
        }


    },[token])


    const HandleLogout = () => {
        localStorage.removeItem("token")
        setLoggedin(false)
    }


    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    return (
        <>
        <Box className="navbar">

            <Box className="navbar1">
                <h1 className="heading">URL Shortner</h1>
            </Box>

            <Box className="navbar2 flexedView">
                <Box className="navbut" onClick={() => navigate("/")} >Home</Box>
                <Box className="navbut" onClick={() => navigate("/myUrls")} >My Urls</Box>

                {
                    loggedin?
                    <Box>
                    <Button variant="outlined" sx={{color:"white"}} className="navbut" onClick={handleClick}>{name}</Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    >
                        <Button size='small' sx={{padding:"4px", width:"10vw"}} variant="outlined" color="primary"  onClick={HandleLogout} >Logout</Button>
                    </Popover>
                    </Box>
                    :
                    <Box className="flexedView">
                        <Box className="navbut" onClick={() => navigate("/login")}>Login</Box>
                        <Box className="navbut" onClick={() => navigate("/signup")}>SignUp</Box>
                    </Box>

                }
            </Box>

        </Box>
        </>
    )
}