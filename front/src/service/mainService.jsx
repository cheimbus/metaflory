import axios from "axios";  
import { SERVER_URL } from "../utils/Common";
import * as HttpUtil from "../utils/HttpUtil";
 
export function loadGiftCard(){ 
    const categoryName = encodeURI('꽃선물카드');
    return HttpUtil.GET({url: `${SERVER_URL}/main/product/${categoryName}/new`})
        .then((res)=>{
            return res.data.data;
        })
        .catch((err)=>{
            return [];
        });
}
export function loadFlowerNftCard(){ 
    const categoryName = encodeURI('꽃NFT');
    return HttpUtil.GET({url: `${SERVER_URL}/main/product/${categoryName}/popular`})
        .then((res)=>{
            return res.data.data;
        })
        .catch((err)=>{
            return [];
        });
}
 
export function loadAuthorCollection(){  
    return HttpUtil.GET({url: `${SERVER_URL}/main/authors`})
        .then((res)=>{
            return res.data.data;
        })
        .catch((err)=>{
            return [];
        });
}
 