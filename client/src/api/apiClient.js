import {create} from "apisauce";
import base64 from "base-64";

const apiClientBasicAuth = (email, password) => create(
    {
        baseURL: window.location.hostname === 'localhost'||window.location.hostname==='127.0.0.1' ? "http://127.0.0.1:5000" : '',
        headers:{
            Authorization: "Basic " + base64.encode(email+":"+password),
        }
    }
);

 


const apiClientTokenAuth = (token) => create(
    {
        baseURL: window.location.hostname === 'localhost'||window.location.hostname==='127.0.0.1' ? "http://127.0.0.1:5000" : '',
        headers:{
            Authorization: "Bearer " + token
        }
    }
);

const apiClient = () => create(
    {
        baseURL: window.location.hostname === 'localhost'||window.location.hostname==='127.0.0.1' ? "http://127.0.0.1:5000" : '',
    }
);



export {
    apiClient,
    apiClientTokenAuth,
    apiClientBasicAuth
}