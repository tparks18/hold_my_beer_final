import {apiClient, apiClientTokenAuth} from "./apiClient"
import { useEffect, useState } from "react";
import errorMessages from "./errorStrings"

const endpoint = "/user";



async function apiGetUsers(){  
    const response = await apiClient().get(endpoint)
    return {   
            "data":response.data.users ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
    
}

async function apiGetUser(user_id){  
    const response = await apiClient().get(endpoint+`/${user_id}`)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
}

async function apiPostUser(data){  
    const response = await apiClient().post(endpoint, data)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
    }

async function apiPutUser(user_id, data, token){  
    const response = await apiClientTokenAuth(token).put(endpoint+`/${user_id}`, data)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
}

async function apiDeleteUser(user_id, token){  
            const response = await apiClientTokenAuth(token).delete(endpoint+`/${user_id}`)
            return {   
                    "data":response.data ?? null,
                    "response_code":response.status,
                    "error":errorMessages[response.status] ?? ''
                }
}


export {
    apiGetUsers,
    apiGetUser,
    apiPostUser,
    apiPutUser,
    apiDeleteUser
    
}