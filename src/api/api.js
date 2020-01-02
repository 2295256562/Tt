import axios from "../libs/ajaxRequest"


// let host = "http://127.0.0.1:8000";

//登陆
export const login = params => { return axios({ method:'post', url:/login/, data: params }) };
