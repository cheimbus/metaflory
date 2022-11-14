
import React, {useState} from 'react';



function LandingPage(){

    const [timer, setTimer ] = useState({
        day:'',
        hour:'',
        minute:'',
        second:''
    }); 
    const countDownDate = new Date("Nov 20, 2022 23:59:59").getTime(); 
    setInterval(()=>{
        let now = new Date().getTime();
        let distance = countDownDate - now;

        let days = Math.floor(distance/(1000*60*60*24));
        let hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        let minutes = Math.floor((distance%(1000*60*60))/(1000*60));
        let seconds = Math.floor((distance%(1000*60))/1000);

        
    },1000); 


    return (
        <div class="LandingPage"> 
            <div class="header__wrap">
                <div class="header">
                    <div class="header__l">
                        <img src="./img/logo.png" alt=""/>
                    </div>
                    <div class="header__center">DIGITAL FLOWER SHOP</div>
                    <div class="header__r">2022.11.21</div>
                </div>
            </div>
        
        <div class="body__wrap">
            <section class="countdown">

                <div class="countdown__wrap">
                    <div class="time"><span class="time__tit">Days</span><span class="time__txt" id="day">{}</span></div>
                    <div class="time"><span class="time__tit">Hours</span><span class="time__txt" id="hour"></span></div>
                    <div class="time"><span class="time__tit">Minutes</span><span class="time__txt" id="minute"></span></div>
                    <div class="time"><span class="time__tit">Seconds</span><span class="time__txt" id="second"></span></div>
                </div>

                <div class="countdown__desc">
                    <p class="t1">2022. 11. 21. Digital Flower Nft Shop OPEN!!</p>
                    <p class="d1"><a href="https://instagram.com/digital_flower_shop" target="_blank">@DigitalFlowerShop</a> </p>
                </div>

                <div class="countdown__instagram">
                    <span>2022.10.20~2022.11.20</span> 
                   <span>디지털 플라워 공모전 참여하기</span>
                     <a href="https://giwan2.notion.site/giwan2/Digital-Flower-Shop-1-7236c6d6e6384d3fb57a3228ee3780b7" target="_blank">Digital Flower Shop 1st Competition</a>
                </div>
            </section>
            <div class="footer"></div>
        </div>    
    </div>
    );
}

export default LandingPage;