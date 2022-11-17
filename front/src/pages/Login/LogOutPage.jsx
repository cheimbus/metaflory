import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LogOutPage(){
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['lTkn']);
    useEffect(()=>{
        console.log("RemoveCooke", {path:'/'});
        removeCookie('lTkn', {path:'/'});
        navigate("/",{replace:true})
    },[])

    return <></>;
}