
import { useEffect, useState } from "react";
import {apiLogin} from "../api/apiLogin"

const endpoint = "/login";

export default function useLogin(email, password){  
    const [res, setRes] = useState({})

    useEffect(()=>{
        const runHook=async ()=>{
            if (!email || !password) return
             const apiRes = await apiLogin(email, password)
             setRes(apiRes)
            }
            runHook()
            return
        }
        , [email, password]
    )
    return res
}

