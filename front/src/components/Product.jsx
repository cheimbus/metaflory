import React , {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Product({line, empty, name, soldout, price, thumbnail, viewUri}){
    console.log(line, name);
    return (
        <div className="product"> 
            {line && line.l && <div className="line_l"></div>}
            {line && line.r && <div className="line_r"></div>}
            {line && line.bf && <div className="line_bf"></div>}
            {line && line.blf && <div className="line_blf"></div>}
            {line && line.brf && <div className="line_brf"></div>}
            {line && line.b && <div className="line_b"></div>}
            
            {empty==undefined &&
                <Link to={viewUri}>
                    <div className="img">
                        <img src={thumbnail} alt={name} />
                        {soldout &&<span className="msg">Sold Out</span> }
                    </div>
                    <div className="title">
                        {name}
                    </div>
                    <div className="price">
                        <span>{price}</span><span>원</span>
                    </div>
                </Link>
            }
        </div>
    );
}