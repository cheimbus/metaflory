import React, {useState} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export default function AdmLoginPage(){
 
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');

    const {emailR, setEmailR} = useState('');
    const {passwordR, setPasswordR} = useState('');


    const login = () => {
        axios({
            method:'post',
            url:'http://127.0.0.1:3000/admins/login',
            data:{
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }
        }).then(res=> {
            if(res.data.success){
                alert('LoginSuccess');
            } else{
                alert('LoginFail');
            } 
            console.log(res);
        })
        .catch(err=>{
            alert(err);
        })
    };

    return (
        
        <div className='login__adm'>
            <div className="inner"> 
                <div className="form">
                    <input type="text" name="email" id="email" placeholder='input email' onChange={setEmail} value={email}/>
                    <input type="password" name="password" id="password" placeholder='password' onChange={setPassword} value={password}/>
                    <button onClick={login}>로그인하기</button>  
                </div>
                  
                <form action="http://127.0.0.1:3000/admins/signup" method='post'>    
                    <input type="text" name="email" id="" placeholder='input email' onChange={setEmailR} value={emailR}/>
                    <input type="password" name="password" id="" placeholder='password' onChange={setPasswordR}  value={passwordR}/>
                    <button type="submit">회원가입하기</button>
                </form>

                
            </div>

        </div>
    );

};