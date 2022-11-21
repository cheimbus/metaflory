import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/User';
import './css/font/pretendard/pretendard.css';
import './index.css';  

import reportWebVitals from './reportWebVitals'; 
import PageRouter from './router/PageRouter';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <React.StrictMode>   
        <UserProvider>
          <PageRouter /> 
        </UserProvider>
     </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
