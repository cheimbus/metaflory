import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Modal from "../../components/Modal";
import { SERVER_URL } from "../../utils/Common";
import * as HttpUtils from "../../utils/HttpUtil";

export function AdmProductsListPage(){ 
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const cookies = new Cookies(); 
    const [file, setFile] = useState(); 

    const [values, setValues] = useState({name:'',content:'',flowerLanguage:'',price:'',author:'',quantityMax:0,categoryName:'',categoryContent:''});
    const [author, setAuthor] = useState('');
    const [categoryDto, setCategoryDto] = useState({name:'', content:''});
 

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setValues({...values, [name]:value});
    }
    const handleAuthor = (event)=>{
        setAuthor(event.target.value);
    }
    const handleCategory = (event)=>{
        const {name,value} = event.target;
        setCategoryDto({...categoryDto, [name]:value});
    }



    const [modalOpen, setModalOpen] = useState(false);
    
    const productQuery = useQuery({
        queryKey:['productList'],
        queryFn: ()=>{ 
            const adminAccessToken = cookies.get('aTkn');
            console.log("AdminAccessToken..",adminAccessToken);
            if(!adminAccessToken) {
                navigate("/adm/login",{replace:false});  
                return "ERROR"; 
            }

           return HttpUtils.GET({url:`${SERVER_URL}/products/admin`, token:adminAccessToken})
            .then((res)=>{
                return res.data.data;
            })
            .catch((err)=>{
                navigate("/adm/login",{replace:false});  
                console.log("ERROR");
                return "ERROR";
            })
            
        },
        staleTime:Infinity,
    })


    const authorQuery = useQuery({
        queryKey:['authorList'],
        queryFn: ()=>{ 
            const adminAccessToken = cookies.get('aTkn');
            console.log("AdminAccessToken..",adminAccessToken);
            if(!adminAccessToken) { 
                return "ERROR"; 
            }

           return HttpUtils.GET({url:`${SERVER_URL}/authors`, token:adminAccessToken})
            .then((res)=>{
                console.log("SUCCESS_category");
                    const temp = res.data.data;
                    console.log("temp",temp);
                    return res.data.data;
               
            })
            .catch((err)=>{  
                return "ERROR";
            }) 
        },
        staleTime:Infinity,
    })

    const categoryQuery = useQuery({
        queryKey:['categoryList'],
        queryFn: ()=>{ 
            const adminAccessToken = cookies.get('aTkn');
            console.log("AdminAccessToken..",adminAccessToken);
            if(!adminAccessToken) { 
                return "ERROR"; 
            }

           return HttpUtils.GET({url:`${SERVER_URL}/category/list`, token:adminAccessToken})
            .then((res)=>{
                console.log("SUCCESS_category");
                    const temp = res.data.data;
                    console.log("temp",temp);
                    return res.data.data;
               
            })
            .catch((err)=>{  
                return "ERROR";
            }) 
        },
        staleTime:Infinity,
    })
 

    const openModal = ()=>{
        console.log("Modal Open~");
        setModalOpen(true);
    };

    const closeModal = ()=>{
        setModalOpen(false);
    }
    const saveData = (e)=>{
        
        e.preventDefault();
        const adminAccessToken = cookies.get('aTkn');

        if(!adminAccessToken){
            alert('Token Not exist');
            return;
        }
        console.log("Form values..", values);

        let body = new FormData();

        for(let key in values){
            body.append(key, values[key]);
        }
        body.append('image',file, encodeURI(file.name));

        console.log("Body.. ", body);

        HttpUtils.POST({
            url:`${SERVER_URL}/products/admin`, 
            header:{
                'Content-Type': 'multipart/form-data',
            },
            token:adminAccessToken,
            body:body})
            .then((res)=>{
                console.log("RES.. ", res);
                queryClient.invalidateQueries({queryKey:['productList']});
            })
            .catch((err)=>{
                console.log("Err,..",err);
                navigate("/adm/login",{replace:true});
            })
    }
    const fileUpload = (e)=>{
        console.log("file..",e.target.files  );
        setFile(e.target.files[0]); 
    }


    const saveAuthorData = (e)=>{ 
        e.preventDefault();
        const adminAccessToken = cookies.get('aTkn');

        if(!adminAccessToken){
            alert('Token Not exist');
            return;
        }
 
        let body = new FormData();
        body.append('image',file, encodeURI(file.name));
        body.append('name',author);

        HttpUtils.POST({
            url:`${SERVER_URL}/authors`, 
            header:{
                'Content-Type': 'multipart/form-data',
            },
            token:adminAccessToken,
            body:body})
            .then((res)=>{
                console.log("RES.. ", res); 
                queryClient.invalidateQueries({queryKey:['authorList']});
            })
            .catch((err)=>{
                console.log("Err,..",err);
                navigate("/adm/login",{replace:true});
            })
    }

    const saveCategoryData = (e)=>{
        const adminAccessToken = cookies.get('aTkn');

        if(!adminAccessToken){
            alert('Token Not exist');
            return;
        }
 
        let body = new FormData();
        body.append('name',categoryDto.name);
        body.append('content',categoryDto.content);

        HttpUtils.POST({
            url:`${SERVER_URL}/categories`, 
            header:{
                'Content-Type': 'multipart/form-data',
            },
            token:adminAccessToken,
            body:body})
            .then((res)=>{
                console.log("RES.. ", res);
                queryClient.invalidateQueries({queryKey:['categoryList']});
            })
            .catch((err)=>{
                console.log("Err,..",err);
                navigate("/adm/login",{replace:true});
            })
    }

    
    const DrawProductList = ()=>{  
        if(productQuery.isLoading || productQuery.isError ||  productQuery.data=='ERROR' || productQuery.data.length<=0) return (
            <ul><li>-</li></ul>
        );
        else{

            return (
                <ul> 
                    {productQuery.data.map(item=>{
                        return <li key={item.name}>{item.name} - {item.price} -{item.isSoldout} -</li>
                    })} 
                </ul>
            );  
        } 
    }


    const DrawAuthorList = ()=>{
         
        
        if(authorQuery.isLoading || authorQuery.isError || authorQuery.data=='ERROR' ||  authorQuery.data.length<=0) return (
            <ul><li>-</li></ul>
        );
        else{

            return (
                <ul> 
                    {authorQuery.data.map(item=>{
                        return <li key={item.name}>{item.name} - {item.imagePath}</li>
                    })} 
                </ul>
            );  
        } 
    }
 
    const DrawCategoryList = ()=>{

        console.log("CategoryQuery..print",categoryQuery);
        console.log("Draw cate",categoryQuery.data);
        
        if(categoryQuery.isLoading || categoryQuery.isError ||  categoryQuery.data=='ERROR' || categoryQuery.data.length<=0) return (
            <ul><li>-</li></ul>
        );
        else{

            return (
                <ul> 
                    {categoryQuery.data.map(item=>{
                        return <li key={item.name}>{item.name} - {item.content}</li>
                    })} 
                </ul>
            );  
        } 
    }

    return (
      <div className="productPage"> 
        <button onClick={openModal}>제품생성</button>

        
        <Modal name="adm__modal__product" open={modalOpen}>
            <div>
                <input type="file" name="image" id="" onChange={fileUpload} />
                <input type="text" name="name" id="" placeholder="제품이름" value={values.name} onChange={handleChange} />
                <input type="text" name="content" id="" placeholder="제품설명" value={values.content} onChange={handleChange} />
                <input type="text" name="flowerLanguage" id="" placeholder="꽃말" value={values.flowerLanguage} onChange={handleChange} />
                <input type="text" name="price" id="" placeholder="가격" value={values.price} onChange={handleChange} />
                <input type="text" name="author" id="" placeholder="작가명" value={values.author} onChange={handleChange} />
                <input type="text" name="quantityMax" placeholder="판매수량" value={values.quantityMax} onChange={handleChange}  />
                <input type="text" name="category" placeholder="카테고리명" value={values.category} onChange={handleChange} /> 
                <div className="btns">
                    <button onClick={saveData}>저장</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </Modal>

        <div className="productList">
            <DrawProductList/>
        </div>

        <Modal name="adm__modal__author" open={modalOpen}>
            <div>
                <input type="file" name="image" id="" onChange={fileUpload} />
                <input type="text" name="name" id="" placeholder="작가이름" value={author} onChange={handleAuthor} />
                <div className="btns">
                    <button onClick={saveAuthorData}>저장</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </Modal>

        <div className="authorList">
            <DrawAuthorList/>
        </div>


        <Modal name="adm__modal__category" open={modalOpen}>
            <div> 
                <input type="text" name="name" id="" placeholder="카테고리이름" value={categoryDto.name} onChange={handleCategory} />
                <input type="text" name="content" id="" placeholder="카테고리설명" value={categoryDto.content} onChange={handleCategory} />
                <div className="btns">
                    <button onClick={saveCategoryData}>저장</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </Modal>
  



        <div className="categoryList"> 
            <DrawCategoryList/> 
        </div>
      </div>  
    );
}