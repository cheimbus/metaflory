import React, {useState} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { SERVER_URL } from '../../utils/Common';
import { useNavigate } from 'react-router-dom';

export default function AdmLoginPage(){
    const cookies = new Cookies(); 
    const navigate = useNavigate();
  
 
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');

    const {emailR, setEmailR} = useState('');
    const {passwordR, setPasswordR} = useState('');


    const login = () => {
        axios({
            method:'post',
            url:`${SERVER_URL}/admins/login`,
            data:{
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }
        }).then(res=> {
            if(res.data.success){
                cookies.set('aTkn',res.data.data.accessToken, {path:'/'}); 
                console.log(res.data);
                navigate("/adm/products",{replace:true});  
            } else{
                alert('LoginFail');
            } 
            console.log(res);
        })
        .catch(err=>{
            alert(err);
        })
    };

    const register = () => {
        axios({
            method:'post',
            url:`${SERVER_URL}/admins/signup`,
            data:{
                email: document.getElementById('emailR').value,
                password: document.getElementById('passwordR').value
            }
        }).then(res=> {
            if(res.data.success){
                alert('Regist Complete');
            } else{
                alert('Regist Fail');
            } 
            console.log(res);
        })
        .catch(err=>{
            alert(err);
        })
    }

    return (
        
        <div className='login__adm'>
            <div className="inner"> 
                <div className="form">
                    <input type="text" name="email" id="email" placeholder='input email' onChange={setEmail} value={email}/>
                    <input type="password" name="password" id="password" placeholder='password' onChange={setPassword} value={password}/>
                    <button onClick={login}>로그인하기</button>  
                </div>
                  
                <div className="form">    
                    <input type="text" name="email" id="emailR" placeholder='input email' onChange={setEmailR} value={emailR}/>
                    <input type="password" name="password" id="passwordR" placeholder='password' onChange={setPasswordR}  value={passwordR}/>
                    <button onClick={register}>회원가입하기</button>
                </div>

                
            </div>

        </div>
    );

};