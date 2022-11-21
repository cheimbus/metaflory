import React from "react"
import { useEffect, useState } from "react";
import Product from "./Product";

export function CategoryTab({info, lineBottom}){ 
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [flowers, setFlowers] = useState([]);
 
    function initSetting(){
        console.log("initSetting");
        const width = getWindowSize().innerWidth;
        settingFlowers(info.products, width);
    }

    useEffect(()=>{
        if(info && info.products) initSetting();
    },[info])

    useEffect(()=>{
        function handleWindowResize(){
            setWindowSize(getWindowSize());
            const width = getWindowSize().innerWidth;
            if(info){
                settingFlowers(info.products, width);
            }
            
        }
        window.addEventListener('resize',handleWindowResize); 
        return ()=>{
            window.removeEventListener('resize',handleWindowResize);
        }

    },[info]);

     //화면크기에 따른 제품 세팅
     function settingFlowers(originItems, width){
        const length = originItems.length;
        const items = [...originItems];
         
        if(width>=900){
            if(length%3>0){
                for(let i=0;i<3-length%3;i++){
                    items.push({empty:true});
                }
            }
        } else if(width>=600){
            if(length%2>0){
                for(let i=0;i<2-length%2;i++){
                    items.push({empty:true});
                }
            }
        }
  
        const itemLength = items.length;
        for(let i=0;i<itemLength;i++){
            items[i].line = calcLineInfo(i+1,itemLength, width);
        } 
        setFlowers(items);
    }

    function calcLineInfo(index, length, width){  
        if(width>=900){
            if(index%3==2){
                return {l:true, r:true};
            }

        } else if(width>=600){
            if(index%2==1){
                return {r:true}
            }
        } 
        return {} 
    }

    if(!info) {
        return (<></>)
    }
    else{  

        return (
            <div className="category">
                <div className="line__l"></div>
                <div className="line__r"></div> 
                {lineBottom && <div className="line__b"></div> }
                <div className="header">
                    <div className="title">
                        <h2>{info.categoryName}</h2>
                        <p>{info.categoryContent}</p>
                    </div>
                    <div className="more">
                        <div className="line__l"></div>
                        <span>전체보기 > </span>
                    </div>
                    <div className="line__b"></div>
                </div>
                <div className="content">
                    {flowers && (
                    <div className='list'>
                        { 
                        flowers.map((product)=>(
                                
                            <Product line={product.line} empty={product.empty} key={product.id} name={product.name} soldout={product.isSoldout} price={product.price} thumbnail={product.imagePath} category={product.category} type={product.type}/>
                                
                        ))}
                    </div>
                )}  
                </div>
            </div>
        )
    }

}


function getWindowSize(){
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
 