import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from "react-router-dom";
import ErrorPage from "../pages/Error/ErrorPage";
import LoginPage from "../pages/Login/LoginPage";
import MainPage from "../pages/Home/MainPage";
import Root from "../pages/RootPage";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductViewPage from "../pages/Product/ProductViewPage";



export default function PageRouter(){

    const router = createBrowserRouter([
        {
            path:'/',
            element:<Root/>,
            errorElement:<ErrorPage/>,
            children:[
                {index:true, element:<MainPage/>},
                {path:'/login',element:<LoginPage/>}, 
                {path:'/products',element:<ProductListPage/>},
                {path:'/products/:productId',element:<ProductViewPage/>}
                
            ]
        },
    ]);

    
    return <RouterProvider router={router}/>;
}