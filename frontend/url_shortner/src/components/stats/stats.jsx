import { Box } from "@mui/material";
import React from "react";
import "./stat.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from "react-router";
import { Api_Url } from "../navbar/navbar";
// import { Pie } from 'react-chartjs-2';


export const UrlStats = (req,res) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [urlData, setData] = React.useState([])
    const [clickCount, setClickCount] = React.useState(Number)

    const { shortUrl } = useParams()

    function HandleData(data){
        setClickCount(data.click_count)
        
        data.location.forEach((items) => {
            setData((e) => [...e, items])
        })

        console.log(data.location)
    }

    React.useEffect(() => {

        fetch(`${Api_Url}/findUrl`,{
            method:"POST",
            body:JSON.stringify({
                shortUrl
            }),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {HandleData(data)})
        .catch((err) => console.log(err))

    // eslint-disable-next-line
    },[shortUrl])

    React.useEffect(() => {
        console.log(urlData)
    },[urlData])

    return (
        <>
        <Box className="statsBox">
        <h1 className="statsHeading">Statistics</h1>

        <Box className="statsBox2">
            <Box className="flexedView" sx={{width:"400px", margin:"auto"}}>
                <h2>Total number of clicks on URL :</h2>
                <h2>{clickCount}</h2>
            </Box>

            <Box sx={{textAlign:"center", width:"600px", margin:"auto", marginTop:'50px'}}>
                <h2>Number of clicks per City:</h2>
                {
                    urlData.map((items,index) => {
                        return <Box key={index} className="flexedView">
                            <p>City Name:{items.city}</p>
                            <p>Number of clicks:{items.value}</p>
                        </Box>
                    })
                }
            </Box>
        </Box>
        {/* <Pie data={urlData} /> */}
        </Box>
        </>
    )
}