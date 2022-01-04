import {apiClientTokenAuth, apiClient} from "./apiClient"
import { useEffect, useState } from "react";
import errorMessages from "./errorStrings"


const endpoint = "/video";

async function apiGetVideos(){  
    const response = await apiClient().get(endpoint)
    return {   
            "data":response.data?.videos ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
    }


async function apiGetVideo(video_id){  
    const response = await apiClient().get(endpoint+`/${video_id}`)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}

async function apiPostVideo(data, token){  
    const response = await apiClientTokenAuth(token).post(endpoint, data)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}


async function apiPutVideo(video_id,  data, token){  
    const response = await apiClientTokenAuth(token).put(endpoint+`/${video_id}`, data)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}

async function apiDeleteVideo(video_id, token){  
    const response = await apiClientTokenAuth(token).delete(endpoint+`/${video_id}`)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}
            

async function apiGetVideosByUserID(user_id){  
    const response = await apiClient().get(endpoint+`/user/${user_id}`)
    return {   
        "data":response.data?.videos ?? null,
        "response_code":response.status,
        "error":errorMessages[response.status] ?? ''
    }
}
            

export {
    apiGetVideos,
    apiGetVideo,
    apiPostVideo,
    apiPutVideo,
    apiDeleteVideo,
    apiGetVideosByUserID

}