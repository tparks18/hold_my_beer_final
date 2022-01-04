import {apiClient, apiClientTokenAuth} from "./apiClient"
import { useEffect, useState } from "react";
import errorMessages from "./errorStrings"

const endpoint = "/vote";



async function apiGetVotes(){  
    const response = await apiClient().get(endpoint)
    return {   
            "data":response.data.votes ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}


async function apiGetVote(vote_id){  
    const response = await apiClient().get(endpoint+`/${vote_id}`)
    return {   
        "data":response.data ?? null,
        "response_code":response.status,
        "error":errorMessages[response.status] ?? ''
    }
}


async function apiPostVote(data, token){  
    const response = await apiClientTokenAuth(token).post(endpoint, data)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}

async function apiPutVote(vote_id, data, token){  
    const response = await apiClientTokenAuth(token).put(endpoint+`/${vote_id}`, data)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}

async function apiDeleteVote(vote_id, token){  
    const response = await apiClientTokenAuth(token).delete(endpoint+`/${vote_id}`)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}
    
async function apiGetUserVotes(user_id,flag){  
    const response = await apiClient().get(`/vote/user/${user_id}`)
    return {   
            "data":response.data.votes ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
    }


async function apiGetUserVotesVerbose(user_id){  
    const response = await apiClient().get(`/vote/user/video/${user_id}`)
    return {   
            "data":response.data.votes ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
    }
}



async function apiGetVotesByVideoUser(user_id, video_id){  
    const response = await apiClient().get(`/vote/user/video/${user_id}/${video_id}`)
    return {   
            "data":response.data ?? null,
            "response_code":response.status,
            "error":errorMessages[response.status] ?? ''
        }
    }



export {
    apiGetVotes,
    apiGetVote,
    apiPostVote,
    apiPutVote,
    apiDeleteVote,
    apiGetUserVotes,
    apiGetUserVotesVerbose,
    apiGetVotesByVideoUser
}