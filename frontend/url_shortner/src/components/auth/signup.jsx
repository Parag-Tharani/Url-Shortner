import { useNavigate } from "react-router-dom"
import { Box, Button, TextField} from "@mui/material"
import React from "react";
import { Api_Url } from "../navbar/navbar";
import ("../auth/auth.css")


export const Signup = () => {
    const [name, setName] = React.useState("")
    const [input, setInput] = React.useState()
    const [password, setPassword] = React.useState("")

    const [error , setError] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState("")
    const navigate = useNavigate()

    

    async function handleRegisOk(res){
        const data = await res.json()
        
            setError(false)
            setErrMsg("")
            localStorage.setItem("token", data.encryptionToken)
            navigate("/")
    }

    const HandleRegister = () => {

        let payload;
        // eslint-disable-next-line
        if(+input == input){
            payload = {
                name:name,
                input: +input,
                password:password
            }
        }else{
            payload = {
                name:name,
                input: input,
                password:password
            }
        }

        fetch(`${Api_Url}/RegisterUser`,{
            method:"POST",
            body: JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res) => {
            if(res.status === 406){
                setError(true)
                setErrMsg("Password must be more than 8 characters")
            }
            else if(res.status === 409){
                setError(true)
                setErrMsg("Provided Email / Phone Number is aleady registered")
            }
            else if(res.status === 201){
                handleRegisOk(res)
            }else{
                setError(true)
                setErrMsg("Please Enter a valid Email")
            }
        })
        .catch((err) => console.log(err))

    }

     return (
        <div>

            <Box component="form" sx={{width:"30vw", margin:"auto", marginTop:1, padding:5}}>
                <h2>SignUp</h2>

                {error?
                <Box sx={{color:"red", fontSize:"13px", marginBottom:"10px"}}>{errMsg}</Box>
                :null}

                <TextField label="First Name" variant="outlined" value={ name } onChange={(e) => setName(e.target.value)} className="inputField"></TextField><br/>
                <TextField label="Email / Phone Number" variant="outlined" value={ input } onChange={(e) => setInput(e.target.value)} className="inputField"></TextField><br/>
                <TextField label="Password" variant="outlined" value={ password } type="password" onChange={(e) => setPassword(e.target.value)} className="inputField"></TextField><br/>
                <Button variant="contained" color="primary" sx={{marginTop:3}} onClick={HandleRegister}>Register</Button>
            </Box>

        </div>
     )
}