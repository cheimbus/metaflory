import React from 'react'
import { Banner } from '../../components/Banner';
import { CategoryTab } from '../../components/CategoryTab'; 

export default function MainPage(){


    return (
        <div className="main">
            <Banner/>
            <CategoryTab categoryName='Category1 배경화면 구매'/>
            <CategoryTab categoryName='Category2 작가컬렉션'/>
            <CategoryTab categoryName='Category3 꽃 선물 카드'/>
            <CategoryTab categoryName='Category3 NFT구매'/> 
        </div>
    );
}