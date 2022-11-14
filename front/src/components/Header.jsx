import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';


export default function Header(){

    const {login, setLogin} = useState(false);  

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