import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import { Banner } from '../../components/Banner';
import { CategoryTab } from '../../components/CategoryTab'; 
import "../../css/mainPage.css";
import { loadAuthorCollection, loadFlowerNftCard, loadGiftCard } from '../../service/mainService';


export default function MainPage(){

    const images = [
        {imagePath:'http://localhost:3000/311668912096696.jpg', productName:'Sunah Ock Product',category:'꽃선물카드'},
        {imagePath:'http://localhost:3000/241668912294649.jpg', productName:'Sunah Ock Product2',category:'꽃선물카드'}, 
    ];

    //여기서 정보를 불러와서 던지ㅡㄴ게 맞을듯

    const [authorCollection, setAuthorCollection] = useState();
    const [flowerNftCollection, setFlowerNftCollection] = useState();
    const [giftCardCollection, setGiftCardCollection] = useState();
    
    
    const authorCollectionQuery = useQuery(
        {
            queryKey:['auColl'],
            queryFn:loadAuthorCollection,
            onSuccess: data=>{
                console.log("AuthorCollection...",data);

                let products = [];
                for(const item of data){
                    products.push({ id:item.id, name: item.name, imagePath : item.imagePath, type:'authorCard'});
                }

                setAuthorCollection({
                    categoryName:'작가컬렉션',
                    categoryContent:'내가 좋아하는 작가 스타일로 눈을 즐겁게', 
                    products:products
                }); 
            }
        }
    )
    const giftCardQuery = useQuery(
        {
            queryKey:['giftCard'],
            queryFn:loadGiftCard,
            onSuccess: data=>{
                setGiftCardCollection({
                    categoryName:data.category,
                    categoryContent:data.categoryContent,
                    products:data.productInfoForMain
                }); 
            }
        }
    )

    const flowerNftQuery = useQuery(
        {
            queryKey:['flowerNft'],
            queryFn:loadFlowerNftCard,
            onSuccess: data=>{
                setFlowerNftCollection({
                    categoryName:data.category,
                    categoryContent:data.categoryContent,
                    products:data.productInfoForMain
                }); 
            }
        }
    )
    return (
        <div className="main">
            <Banner images={images}/>
            <CategoryTab info={authorCollection}  lineBottom={true}/> 
            <CategoryTab info={giftCardCollection} lineBottom={true}/>
            <CategoryTab info={flowerNftCollection}/>
            
        </div>
    );
}