import React from 'react';

export default function Footer(){
    return (
        <footer>
            <div className="line__t"></div>
            <div className="footer__inner">
                <div className="footer__l">
                    <div className="logo"><h3>METAFLORIS</h3></div>
                    <div className="copyrights"><p> &copy; 2022 METAFLORIS ALL rights reserved.</p></div>
                </div>  
                <div className="footer__c">
                    <div className="part1 part"></div>
                    <div className="part2 part"></div>
                    <div className="part3 part">
                        <div className="line__l"></div>
                        <div className="table">
                            <div className="table__row">
                                <div className="table__l">
                                    제안, 문의
                                </div>
                                <div className="table__r">
                                    METAFLORIS
                                </div> 
                            </div> 
                            <div className="table__row">
                                <div className="table__l">
                                    이용 방법
                                </div>
                                <div className="table__r">
                                    <ul>
                                        <li>010-1234-1234</li>
                                        <li>22222-2222-22222</li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="footer__r"> 
                     
                </div> 
            </div> 
        </footer>
    );
}