import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from "react-router-dom";
import ErrorPage from "../pages/Error/ErrorPage";
import LoginPage from "../pages/Login/LoginPage";
import MainPage from "../pages/Home/MainPage";
import App from "../App";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductViewPage from "../pages/Product/ProductViewPage";
import MessageReceivePage from "../pages/Gift/MessageRecievePage";
import MyGrassPage from "../pages/Landing/MyGrassPage";
import AdmLoginPage from "../pages/Admin/LoginPage";
import LogOutPage from "../pages/Login/LogOutPage";



export default function PageRouter(){

    const router = createBrowserRouter([
        {
            path:'/',
            element:<App/>,
            errorElement:<ErrorPage/>,
            children:[
                {index:true, element:<MainPage/>},
                {path:'/login',element:<LoginPage/>}, 
                {path:'/login/kakao',element:<LoginPage thirdparty='kakao'/>}, 
                {path:'/logout', element:<LogOutPage/>},
                {path:'/products',element:<ProductListPage/>},
                {path:'/products/:productId',element:<ProductViewPage/>},
                {path:'/gift',element:<MessageReceivePage/>},
                {path:'/grass',element:<MyGrassPage/>} ,
                {path:'/adm/login',element:<AdmLoginPage/>},
            ]
        },
    ]);

    
    return <RouterProvider router={router}/>;
}

/*

경로 정리
/ -> 



*/