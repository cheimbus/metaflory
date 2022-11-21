import React , {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Product({line, empty, name, soldout, price, thumbnail, category, type}){ 

    if(type=="authorCard"){
        return (
            <div className="product"> 
                {line && line.l && <div className="line_l"></div>}
                {line && line.r && <div className="line_r"></div>}
                {line && line.bf && <div className="line_bf"></div>}
                {line && line.blf && <div className="line_blf"></div>}
                {line && line.brf && <div className="line_brf"></div>}
                {line && line.b && <div className="line_b"></div>}
                
                {empty==undefined && 
                    <a>
                        <div className="img">
                            <img src={thumbnail} alt={name} /> 
                        </div>
                        <div className="title">
                            {name}
                        </div>
                        <div className="price">
                           
                        </div>
                    </a>
                }
            </div>
        );
    }
    else{
        return (
            <div className="product"> 
                {line && line.l && <div className="line_l"></div>}
                {line && line.r && <div className="line_r"></div>}
                {line && line.bf && <div className="line_bf"></div>}
                {line && line.blf && <div className="line_blf"></div>}
                {line && line.brf && <div className="line_brf"></div>}
                {line && line.b && <div className="line_b"></div>}
                
                {empty==undefined && 
                    <Link to={`/products/${name}`}>
                        <div className="img">
                            <img src={thumbnail} alt={name} />
                            {soldout==1 && <div className="soldout"><div className="diagonal"></div></div> }
                            {soldout==1 &&<span className="msg">Sold out</span> }
                        </div>
                        <div className="title">
                            [{category}] {name}
                        </div>
                        <div className="price">
                            <span>{price}</span><span>원</span>
                        </div>
                    </Link>
                }
            </div>
        );
    }
   
}