import React from "react";
import "../../css/aboutPage.css";

export function AboutPage(){
    return (
        <div className="about">
            <div className="about__inner">
                <div className="header">
                    <h1>디지털 꽃으로 만들어 나가는 특별한 라운지</h1>
                    <h1>메타플로리S</h1>
                    <div className="line__b"></div>
                </div>
                <div className="content">
                    <p>우리는 사랑을 표현하고 기쁜 일을 축하할 때 등 다양한 상황에서 꽃으로 마음을 선물합니다.</p>
                    <p>이런 꽃의 매력을 고스란히 담아, 작가만의 감성을 녹인 디지털 꽃이라는 특별함을 만들었습니다.</p>
                    <p>세상에 단 하나뿐인 디지털 꽃</p>
                    <p>꽃에 담긴 의미와 마음을 소중한 사람들에게 선물해보세요.</p>
                </div>
            </div>
        </div>
    );
}