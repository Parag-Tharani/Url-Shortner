import { useNavigate } from "react-router-dom"
import { Box, Button, TextField} from "@mui/material"
import React from "react";
import { Api_Url } from "../navbar/navbar";
import ("../auth/auth.css")

export const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [error , setError] = React.useState(false)
    const navigate = useNavigate()


    const HandleLogin = () => {

        const payload = {
            input: email,
            password: password
        }

        fetch(`${Api_Url}/LogginUser`,{
            method:"POST",
            body: JSON.stringify(payload),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((token) => {
            localStorage.setItem("token" , token.encryptionToken)
            setError(false)
            navigate("/")
        })
        .catch((err) => setError(true))
    
        
    }

     return (
        <div id="login">

            <Box component="form" sx={{width:"20vw", height:"50vh", margin:"auto",marginTop:1,padding:5}}>
                <h2>Login Details</h2>

                {error?
                <Box sx={{color:"red", fontSize:"13px", marginBottom:"10px"}}>Please Provide Valid Credentials</Box>
                :null}

                <TextField label="Email" variant="filled" color="primary" value={ email } onChange={(e) => setEmail(e.target.value)}></TextField><br/>
                <TextField label="Password" variant="filled" type={"password"} value={ password } onChange={(e) => setPassword(e.target.value)} color="primary"></TextField><br/>
                <Button variant="contained" color="primary" sx={{marginTop:3}} onClick={HandleLogin} >Log In</Button>
            </Box>

        </div>
     )
}