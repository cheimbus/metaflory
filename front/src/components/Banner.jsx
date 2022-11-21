import React from "react";
import Carousel from 'react-material-ui-carousel'; 

function NextIcon(){
    return (
        <div className="circle">
            <img src="/img/btn/next.svg" alt=""  />
        </div>
    );
}
function PrevIcon(){
    return (
        <div className="circle">
            <img src="/img/btn/prev.svg" alt=""  />
        </div>
    );
}


export function Banner({images}){
    return (
        <div className="banner"> 
            <div className="line__l"></div>
            <div className="line__r"></div>
            <div className="line__b"></div>
            <div className="banner__inner">
                <Carousel  
                    NextIcon={<NextIcon/>}
                    PrevIcon={<PrevIcon/>} 
                    navButtonsAlwaysVisible = {true} 
                    >
                    {
                        images.map((item,i)=><div className="item"><img src={item.imagePath} alt="" /></div>)
                    }
                </Carousel>
            </div>
            
        </div>


    );
}