import axios from "axios";  
import { SERVER_URL } from "../utils/Common";
 
export async function loadProductList(){ 
    return axios({
        url: `${SERVER_URL}/products`,
        method:'GET'
    }) 
    .then(response => {
        if(response.data.success){
            return response.data.data;
        } else{
            alert('Load error');
            console.log(response.data);
            return [];
        }
    })
    .catch((err)=>{
        alert('Load error'+err); 
    }) 
}

