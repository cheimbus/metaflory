import axios from "axios"; 

export function GET({url, header, params, token}){
 
    let _header = {...header};
    if(token){
        _header.Authorization = 'Bearer '+token;
    }

    console.log("header , ",_header);
    return axios({
        url : url,
        headers : _header,
        params : params
    }).then((res)=>{
        return Promise.resolve(res);
    }).catch((err)=>{
        console.log("HTTP GET ERR",err);
        return Promise.reject(err);
    })

}