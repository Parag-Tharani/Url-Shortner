import "./home.css"
import React from "react"
import { Box, Button, TextField } from "@mui/material"

export const Home = () => {

    


    async function HandleGenerate(){

        await fetch("https://ipinfo.io/json?token=d3947c18644626")
        .then((response) => response.json())
        .then((jsonResponse) => console.log(jsonResponse.ip, jsonResponse.city))

    }

    return (
        <>
        <Box className="home">
            
            <Box className="InputBoxs flexedView">

            <TextField label="Long URL" variant="outlined" sx={{width:"30vw", marginRight:"10px"}} />
            <TextField label="Short URL (optional)" variant="outlined" sx={{width:"18vw", marginRight:"10px"}}/>
            <Button variant={"contained"} size="large" onClick={HandleGenerate} >Generate</Button>

            </Box>

            <Box className="UrlDiv">

            </Box>
        </Box>
        </>
    )
}