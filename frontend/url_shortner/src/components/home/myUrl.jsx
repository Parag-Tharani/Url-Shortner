import { useNavigate } from "react-router";
import { Box, Button, TextField } from "@mui/material"
import { Api_Url, home_url } from "../navbar/navbar"
import jwt_decode from "jwt-decode";
import React from "react";
import ("./home.css")


export const UserUrls = () => {

    const navigate = useNavigate()
    const [temp_arr, setTempArr] = React.useState([])
    const [urlArr, setUrlArr] = React.useState([])
    let token = localStorage.getItem("token")


    React.useEffect(() => {
        
        if(token !== null && token !== "" && token !== undefined){
            
            const decoded = jwt_decode(token);
            console.log(decoded.id)
            fetch(`${Api_Url}/getUser`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id:decoded.id})
            })
            .then((res) => res.json())
            .then((data) =>  data.Urls.forEach((items) => {
                setUrlArr((e) => [...e, items])
            }))
        }
    },[token])


    React.useEffect(() => {

        urlArr.forEach((items) => {
            fetch(`${Api_Url}/findUrl`,{
                method:"POST",
                body:JSON.stringify({
                    shortUrl: items
                }),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then((res) => res.json())
            .then((data) => setTempArr((e) => [...e, data]))
            .catch((err) => console.log(err))
        })

        
    },[urlArr])

    React.useEffect(() => {
        if(token === null || token === "" || token === undefined){
            navigate('/login')
        }
        // eslint-disable-next-line
    },[])

    return (
        <>
       <Box className="UrlDiv" sx={{width:"70vw", margin:"auto"}}>

                <h1 className="statsHeading">My Urls</h1>

                <Box className="flexedView" sx={{marginTop:"60px"}}>
                <Box><h1 style={{width:"30vw", marginRight:"10px", fontFamily:"monospace"}}>Long Url</h1></Box>
                <Box><h1 style={{width:"18vw", marginRight:"10px", fontFamily:"monospace"}}>Short Url</h1></Box>
                <Box style={{width:"10vw"}} ></Box>
                <Box></Box>
                </Box>
                {
                    temp_arr.map((items, index) => {
                        return <Box key={index} className="flexedView urlStats">
                            <TextField value={items.longUrl} variant="outlined" disabled sx={{width:"30vw", marginRight:"10px"}} />
                            <TextField value={home_url + "/shorten" + "/" + items.shortUrl} variant="outlined" onClick={() => navigate(`/shorten/${items.shortUrl}`)} sx={{width:"18vw", marginRight:"10px", cursor:"pointer"}} />
                            <Button variant={"outlined"} color="inherit" size="medium" sx={{height:"50px", width:"50px", marginRight:"10px"}} onClick={() => navigator.clipboard.writeText(home_url + "/shorten" + "/" + items.shortUrl)}>Copy</Button>
                            <Button variant={"outlined"} color="inherit" size="medium" sx={{height:"50px"}} onClick={() => navigate(`/stats/${items.shortUrl}`)}>View Stats</Button>
                        </Box>
                    })
                }
            </Box>
        </>
    )
}