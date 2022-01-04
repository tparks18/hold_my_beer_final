import { useEffect, useState } from "react";
import {apiPutUser} from "../api/apiUser"


export default function usePutUser(user_id, data, token){  
    const [res, setRes] = useState({})

    useEffect(
        ()=>{
            const runHook=async ()=>{
                const apiRes = await apiPutUser(user_id, data, token)
                setRes(apiRes)
            }
            if (Object.entries(data).length === 0) return;
            runHook()
            return
        }, [user_id, token, data]
    )
    return res
}