import React from 'react'
import { Link } from 'react-router-dom';

export default function ProductListPage(){
    return(
        <div>
            제품 목록 페이지
            <ul>
                <li><Link to='/products/1'>제품1</Link></li>
                <li><Link to='/products/2'>제품2</Link></li>
                <li><Link to='/products/3'>제품3</Link></li>
            </ul>
        </div>
    );
}