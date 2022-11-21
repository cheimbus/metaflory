import axios from "axios";  
import { SERVER_URL } from "../utils/Common";
import * as HttpUtil from "../utils/HttpUtil";
 
export function loadProductList(){ 

    return HttpUtil.GET({url: `${SERVER_URL}/products`})
        .then((res)=>{
            return res.data.data;
        })
        .catch((err)=>{
            return [];
        });
}

export function loadProductInfo(productName){ 

    return HttpUtil.GET({url: `${SERVER_URL}/products/${productName}`})
        .then((res)=>{
            return res.data.data;
        })
        .catch((err)=>{
            return [];
        });
}

