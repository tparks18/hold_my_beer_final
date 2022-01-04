import {apiClientBasicAuth} from "./apiClient"
import { useEffect, useState } from "react";
import errorMessages from "./errorStrings"


const endpoint = "/login";

async function apiLogin(email, password){  
    
    const response = await apiClientBasicAuth(email, password).get(endpoint)
    return {   
            "data":response.data,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
    }

export {
    apiLogin
}