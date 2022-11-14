import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const queryClient = new QueryClient();

export default function App(){
    return (
        <div>
            <Header/> 
            <QueryClientProvider client={queryClient}>
                <Outlet/> 
            </QueryClientProvider>
            <Footer/> 
        </div>
    );
}