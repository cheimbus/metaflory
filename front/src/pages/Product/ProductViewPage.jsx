import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/productPageView.css';
import { loadProductInfo } from '../../service/ProductService';

export default function ProductViewPage(){

    const {productName} = useParams();
    const [infos, setInfos] = useState({author:'',category:'',content:'',
                                        flowerLanguage:'',imagePath:'',name:'',
                                        quantityMax:'',quantityNow:''});

    const {isloading, error, data:product} = useQuery(
        {
            queryKey:['product'],
            queryFn:()=>loadProductInfo(productName),
            onSuccess:data=>{
                console.log("ReadData...", data);
                setInfos({
                    author:data.author,
                    category:data.category,
                    content:data.content,
                    flowerLanguage:data.flowerLanguage,
                    imagePath:data.imagePath.length>0?data.imagePath[0]:'',
                    name:data.name,
                    price:data.price,
                    quantityMax:data.quantityMax,
                    quantityNow:data.quantityNow
                });
            } 
        }
    ) 

    return (
        <div className="product__view">
            <div className="line__l"></div>
            <div className="line__r"></div>
            <div className="product__view__inner">
                <h1>{infos.name}
                    <div className="line_b"></div>
                </h1> 
                <div className="info">
                    <div className="line__t"></div>
                    <div className="img">
                        <img src={infos.imagePath} alt="" />
                    </div>
                    <div className="title">
                        <div className="line__t"></div>
                        <h3>{infos.name}<span>({infos.category})</span></h3> 
                        
                        <div className="line__b"></div>
                    </div>
                    <div className="content">
                        <h5>{infos.flowerLanguage}</h5>
                        <p>{infos.content}</p>
                    </div>
                    <div className="priceInfo"> 
                        <div className="line__t"></div>
                        <div className="priceInfo__inner"> 
                            <div className="price">
                                {infos.price}원
                            </div>
                            <div className="quantity">
                                <div className="line__l"></div>
                                <span>{infos.quantityMax-infos.quantityNow}/{infos.quantityMax}</span>
                            </div> 
                        </div>
                        <div className="line__b"></div>
                    </div>
                    <div className="btns">
                        <button>구매하기</button>
                    </div>
                </div>
            </div>
        </div> 
    );
}