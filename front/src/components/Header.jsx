import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';  
import { GET } from '../utils/HttpUtil';
import { SERVER_URL } from '../utils/Common';
import UserContext from '../context/User';
import Cookies from 'universal-cookie';


export default function Header(){
    console.log("header");
 
    const cookies = new Cookies();

    const {state, actions} = useContext(UserContext); 
    const [login, setLogin] = useState(false);  

    useEffect(()=>{ 
        console.log("State",state);
        const accessToken = state.accessToken || cookies.get('lTkn');
        console.log("accessToken",accessToken); 
        if(!accessToken){
            setLogin(false);
            return ()=>{};
        } 
        GET({url:SERVER_URL+"/mypage", token:accessToken}).then((res)=>{
            console.log(res);
            if(res.data && res.data.data && res.data.success){
                console.log("Login");
                setLogin(true);
            } else{
                console.log("NOt Login");
                cookies.remove('lTkn',{path:'/'});
                actions.setAccessToken();
                setLogin(false); 
            } 
        }).catch((err)=>{
            cookies.remove('lTkn',{path:'/'});
            actions.setAccessToken();
            setLogin(false); 
        }) 
    },[state.accessToken]);
    
    const logout = ()=>{
        console.log("Logout...");
        cookies.remove('lTkn',{path:'/'});
        actions.setAccessToken();
    }

    const LoginButton = (props)=>{
        return (
            <Link to="/login">Login</Link>
        );
    }
        
    const LogOutButton = (props)=>{
        return (
            <>
                <Link to="/mypage">MyPage</Link>
                <Link to='' onClick={logout}>Logout</Link>
            </>
            
        ); 
    }


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