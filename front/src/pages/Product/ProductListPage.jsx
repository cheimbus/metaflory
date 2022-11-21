import { useQuery } from '@tanstack/react-query';
import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../../components/Product';
import { loadProductList } from '../../service/ProductService';
import '../../css/productPageList.css';
import { useEffect,  useState } from 'react';

export default function ProductListPage(){
 

    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [flowers, setFlowers] = useState([]);
    const {isLoading, error, data:products} = useQuery(
        {
            queryKey:['products'],
            queryFn: loadProductList,  
            onSuccess: data=>{
                const width = getWindowSize().innerWidth; 
                settingFlowers(data, width); 
            },
        }
    )

    //width 에 따라 몇개씩 보여줄지 정해서  l,r,b,f노출상태도 같이 전달해야할듯 
    //화면의 크기따라  emptyObj가 늘어났다 줄어들었다해야할거같음.  
    useEffect(()=>{
        function handleWindowResize(){
            setWindowSize(getWindowSize());
            const width = getWindowSize().innerWidth;
            settingFlowers(products, width);
        }
        window.addEventListener('resize',handleWindowResize);


        return ()=>{
            window.removeEventListener('resize',handleWindowResize);
        }

    },[products]);

    //화면크기에 따른 제품 세팅
    function settingFlowers(originItems, width){
        const length = originItems.length;
        const items = [...originItems];
        
        /**
         * width : 900 이상 3개
         * 600이상 2개
         * 나머지1개
         */
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
 
        //top이냐 bottom이냐 미들이냐 따라 적용할 라인이 다름
        const itemLength = items.length;
        for(let i=0;i<itemLength;i++){
            items[i].line = calcLineInfo(i+1,itemLength, width);
        } 
        setFlowers(items);
    }

    function calcLineInfo(index, length, width){ 
        if(width>=900){
            if(length<=3){ 
                if(index%3==1 || index%3==0){
                    return {l:true, r:true}
                } else{
                    return {};
                }
            } else if(length<=6){
                if(index<=3){
                    if(index%3==1){
                        return {l:true, r:true, blf:true};
                    } else if(index%3==0){
                        return {l:true, r:true, brf:true};
                    }  else{
                        return {bf:true};
                    }
                }
                else{
                    if(index%3==1){
                        return {l:true, r:true};
                    } else if(index%3==0){
                        return {l:true, r:true};
                    } else{
                        return {};
                    }
                }
            } else{
                //맨아래
                if(index>=(length%3==0?length-2:length-(length%3-1))){
                    if(index%3==1){
                        return {l:true, r:true};
                    } else if(index%3==0){
                        return {l:true, r:true};
                    }  else{
                        return {};
                    }
                }
                else{  
                    if(index%3==1){
                        return {l:true, r:true, blf:true};
                    } else if(index%3==0){
                        return {l:true, r:true, brf:true};
                    }  else{
                        return {bf:true};
                    }
                }
            }
        } else {
            if(length<=2){ 
                if(index%2==1){
                    return {l:true, r:true}
                } else{
                    return {r:true}
                } 
            } else if(length<=4){
                if(index<=2){
                    if(index%2==1){
                        return {l:true, r:true, blf:true};
                    } else{
                        return {r:true, brf:true};
                    }  
                }
                else{
                    if(index%2==1){
                        return {l:true, r:true};
                    } else  {
                        return {r:true};
                    }
                }
            } else{
                //맨아래
                if(index>  length%2==0?length-1:length-(length%2-1)){
                    if(index%2==1){
                        return {l:true, r:true};
                    } else{
                        return {  r:true};
                    }  
                }
                else{  
                    if(index%2==1){
                        return {l:true, r:true, blf:true};
                    } else {
                        return { r:true, brf:true};
                    }   
                }
            }
        } 
    }
 
     
    return(
        <div className="productsPage">
            <h1>Flowers
                <div className="line_b"></div>
            </h1> 
            {isLoading && <div>제품목록 로드중</div>}
            {error && <div>제품목록 조회 에러</div>}
            {flowers && (
                <div className='list'>
                    { 
                    flowers.map((product)=>(
                            
                        <Product line={product.line} empty={product.empty} key={product.id} name={product.name} soldout={product.isSoldout} price={product.price} thumbnail={product.imagePath} category={product.category}/>
                            
                    ))}
                </div>
            )}  
        </div>

    );
}

function getWindowSize(){
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
 