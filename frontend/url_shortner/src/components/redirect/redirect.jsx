import "./redirect.css"
import React from "react";
import { Box } from "@mui/material";
import { Api_Url } from "../navbar/navbar";
import { useParams } from "react-router";
import { useNavigate } from "react-router";


export const RedirectPage = () => {

    const navigate = useNavigate()
    const {shortUrl}  = useParams()
    const [error, setError] = React.useState(Boolean)


    async function fetchData(city){

        const body = {
            "city": city
        }
    
            await fetch(`${Api_Url}/${shortUrl}`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    "Content-Type":"application/json"
                },
            })
            .then((res) => res.json())
            .then((data) => {
                window.open(data.longUrl,'_blank')
                setError(false)
                navigate("/")
            })
            .catch((err) => setError(true))
    }

    React.useEffect(() => {

        fetch("https://ipinfo.io/json?token=d3947c18644626")
        .then((response) => response.json())
        .then((jsonResponse) => fetchData(jsonResponse.city))
        .catch((err) => console.log(err))


        // eslint-disable-next-line
    },[])

    return (
        <>
        <Box className="redirecPage">
            {
                error?
                <Box>
                    <h1 className="linkExpired">The Link You Followed Has Expired or Wrong Link</h1>
                </Box>
                :null
            }
        </Box>
        </>
    )
}