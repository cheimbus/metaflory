import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import "../../css/loginPage.css";
import { SERVER_URL } from '../../utils/Common';
import {stringify} from 'querystring';


export default function LoginPage({thirdparty}){

    const [code, setCode] = useState('');

    useEffect(()=>{
        console.log("useEffect...");
        console.log("code..",code);
        if(thirdparty=="kakao" && code==''){
            const params = new URLSearchParams(window.location.search);
            console.log("useEffect",params);
            const _kakaoToken = params.get('code');
            if(_kakaoToken.length<=0) return;
            setCode(_kakaoToken);
            console.log("token ",_kakaoToken);
            axios({
                url:SERVER_URL+"/users/kakao-redirect?"+stringify({code:_kakaoToken, state:params.get('state')}),
                method:'GET'
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })

        }
    },[] );


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