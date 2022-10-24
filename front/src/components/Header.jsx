import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';


export default function Header(){
    return (
        <header>
            <div>Logo</div>
            <Navbar/>
        </header>
        
    )
}