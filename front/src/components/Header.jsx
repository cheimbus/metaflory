import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; 
import Navbar from './Navbar';
import {useCookies} from 'react-cookie';
import { GET } from '../utils/HttpUtil';
import { SERVER_URL } from '../utils/Common';


export default function Header(){

    const [cookies, setCookie, removeCookie] = useCookies(['lTkn']);
    const [login, setLogin] = useState(false);  
    useEffect(()=>{
        const accessToken = cookies.lTkn;
        console.log("accessToken",accessToken);
        if(!accessToken) {  setLogin(false); return;}
        GET({url:SERVER_URL+"/mypage", token:accessToken}).then((res)=>{
            console.log(res);
            if(res.data && res.data.data && res.data.success){
                console.log("Login");
                setLogin(true);
            } else{
                console.log("NOt Login");
                setLogin(false);
                removeCookie('lTkn');
            } 
        }).catch((err)=>{
            setLogin(false);
            removeCookie('lTkn');
        })
    });

    

    return (
        <header>
            <div className="logo">
                <Link to='/'><span>METAFLORIS</span></Link>
            </div>
            <div className="navbar">
                <nav>
                    <Link to='/products'>Flowers</Link>
                    <Link to='/about'>About us</Link>
                    <Link to='/howtouse'>How to use</Link>
                </nav>
            </div>
            <div className="btns">
                {!login && <LoginButton/>}
                {login && <LogOutButton/>}
            </div>
        </header>
        
    )
}

function LoginButton(props){
    return (
        <Link to="/login">Login</Link>
    );
}

function LogOutButton(props){
    return (
        <>
            <Link to="/mypage">MyPage</Link>
            <Link to="/logout">Logout</Link>
        </>
        
    );
}