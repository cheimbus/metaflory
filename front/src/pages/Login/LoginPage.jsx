import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import "../../css/loginPage.css";
import { SERVER_URL } from '../../utils/Common';
import {stringify} from 'querystring';
import { useQuery } from '@tanstack/react-query';
import { useCookies} from 'react-cookie';


export default function LoginPage({thirdparty}){
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['lTkn']);

    const {isLoading, isError,data} = useQuery({
        queryKey:['login'],
        queryFn: ()=>{
            console.log("windowlocationserarch",window.location.search);
            if(thirdparty=="kakao"){
                const params = new URLSearchParams(window.location.search); 
                const _kakaoToken = params.get('code');
                if(_kakaoToken.length<=0) return; 
                return axios({
                    url:SERVER_URL+"/users/kakao-redirect?"+stringify({code:_kakaoToken, state:params.get('state')}),
                    method:'GET',
                    timeout:10000
                }).then((res)=>{ 
                    setCookie("lTkn",res.data.data.serverAccessToken, {path:"/"});
                    console.log(res); 
                    navigate("/",{replace:true}); 
                    return 'GOOD';
                }).catch((err)=>{
                    alert('로그인 실패');
                    console.log(err);
                    navigate("/login",{replace:true}); 
                    return 'ERROR';
                })
               
            } else{
                return 'ERROR';
            }
        },
        staleTime:Infinity,
    })

    if(isLoading){
        if(thirdparty=="kakao"){
            return <span>Login....</span>
        }
    }
    if(isError){
        navigate("/login",{replace:true});
    }
 


    function kakaoLogin(){
        window.location.href= `${SERVER_URL}/users/kakaologin`;
    }

    return (
        <div className='login'>
 
            <div className="login__wrap">
                <h1>METAFLORIS</h1>

                <div className="btns">
                    <div className="btn" method="GET" onClick={kakaoLogin} >
                        <div className="btn__logo">
                            <img src="/img/etc/kakao.svg" alt="" />
                        </div>
                        <div className="btn__txt" >
                            카카오톡 계정으로 로그인
                        </div> 
                    </div>
                </div>

            </div>
        </div>



    )


}