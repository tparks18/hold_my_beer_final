import { useEffect, useState } from "react";
import {apiPostUser} from "../api/apiUser"


export default function usePostUser(data){  
    const [res, setRes] = useState({})

    useEffect(
        ()=>{
            const runHook=async ()=>{
                const apiRes = await apiPostUser(data)
                setRes(apiRes)
            }
            if (!data.email || !data.password || !data.name || !data.location) return;
            runHook()
            return
        }, [data]
    )
    return res
}