import "./home.css"
import React from "react"
import { Box, Button, TextField } from "@mui/material"
import { Api_Url, home_url } from "../navbar/navbar"
import { useNavigate } from "react-router-dom"


export const Home = () => {

    const navigate = useNavigate()

    const [longUrl, setLongUrl] = React.useState("")
    const [shortUrl, setShortUrl] = React.useState("")
    const [temp_arr, setTempArr] = React.useState([])
    const [loggedIn, setloggedIn] = React.useState(false)
    const [errorBool, setErrorBool] = React.useState(false)
    const [errMsg, setErrorMsg] = React.useState("")
    const [dependArr, setDependArr] = React.useState(false)

    let token = localStorage.getItem("token")

    async function HandleGenerate(){
        
        await fetch(`${Api_Url}/createUrl`,{
            method:"POST",
            body: JSON.stringify({
                longUrl:longUrl,
                shortUrl:shortUrl
            }),
            headers:{
                "token":token,
                "Content-Type":"application/json"
            }
        })
        .then((res) => {
            if(res.status === 409){
                setErrorBool(true)
                setErrorMsg("Shorten URL is already in Use")
            }
            else if(res.status === 406){
                setErrorBool(true)
                setErrorMsg("Please Provide a valid URL")
            }
            else if(res.status === 201){
                setErrorBool(false)
                setErrorMsg("")
                setTempArr([])
                setDependArr(!dependArr)
            }
        })
        .catch((err) => console.log(err.error))
        
    }

    
    
    
    React.useEffect(() => {

        fetch(`${Api_Url}/getAllUrl`)
        .then((res) => res.json())
        .then((data) => data.forEach((items) => {
            if(Date.now() - Date.parse(items.time)> 172800000){
                
                try {
                    fetch(`${Api_Url}/deleteUrl`,{
                        method:"DELETE",
                        body:{
                            id: items.id
                        }
                    })
                } catch (error) {
                    console.log(error)
                }

            }else{
                setTempArr((e) => [...e, items])
            }
        }))

    },[dependArr])

    
    React.useEffect(() => {
        if(token === null || token === "" || token === undefined){
            setloggedIn(false)
        }else{
            setloggedIn(true)
        }
    },[loggedIn, token])

    return (
        <>
        <Box className="home">
            
            <Box className="InputBoxs flexedView">

            <TextField label="Long URL" variant="outlined" onChange={(e) => setLongUrl(e.target.value)} sx={{width:"30vw", marginRight:"10px"}} />
            <TextField label="Short URL (optional)" variant="outlined" onChange={(e) => setShortUrl(e.target.value)} sx={{width:"18vw", marginRight:"10px"}}/>
            <Button variant={"contained"} size="large" onClick={loggedIn?HandleGenerate:() => navigate("/login")} >Generate</Button>
            </Box>

            {
                errorBool?
                <p className="errorMsg" >{errMsg}</p>
                :null
            }

            <Box className="UrlDiv">
                <Box className="flexedView">
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
        </Box>
        </>
    )
}