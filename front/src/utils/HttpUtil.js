import axios from "axios"; 

export function GET({url, header, params, token}){
 
    let _header = {...header};
    if(token){
        _header.Authorization = 'Bearer '+token;
    }
 
    return axios({
        url : url,
        method:'GET',
        headers : _header,
        params : params
    }).then((res)=>{
        return Promise.resolve(res);
    }).catch((err)=>{ 
        return Promise.reject(err);
    })

}

export function POST({url, header, body, token}){
    let _header = {...header};
    if(token){
        _header.Authorization = 'Bearer '+token;
    } 
    return axios({
        url : url,
        method:'POST',
        headers : _header,
        data : body
    }).then((res)=>{
        return Promise.resolve(res);
    }).catch((err)=>{ 
        return Promise.reject(err);
    })

}