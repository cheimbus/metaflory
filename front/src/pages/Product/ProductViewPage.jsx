import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductViewPage(){

    const {productId} = useParams();

    return (

        <div>
            전달받은 제품 id {productId} ,
            
            제품 상세 페이지입니당
        </div>
    );
}