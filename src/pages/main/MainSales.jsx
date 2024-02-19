import React, { useEffect, useState } from 'react';
import Select from '../../components/Select';
import { api } from '../../api/api';

export default function MainSales() {
    const [dashboard, setDashboard] = useState()
    
    useEffect(()=>{
        api('dashboard', 'month_sales_total_stat')
            .then((result)=>{
                console.log(result);
                // if(result){
                //     setDashboard(data)
                // }
            })
    },[])

    return (
        <div className='salesPage'>
            <div className='salesArea'>
                <strong>2023년 10월 매출현황</strong>
                <div>
                    <div className='progressArea'>
                        <span title='투자금액'></span>
                        <span title='최소할당매출'></span>
                        <b title='현재매출' data-percent="70"></b>
                        <span title='목표매출'></span>
                    </div>
                    <div className='amountArea'>
                        <b>매출 달성 금액</b>
                        <dl>
                            <dt>투자금액</dt>
                            <dd>3,300,000</dd>
                        </dl>
                        <dl>
                            <dt>최소할당매출</dt>
                            <dd>5,000,000</dd>
                        </dl>
                        <dl>
                            <dt>목표매출</dt>
                            <dd>12,000,000</dd>
                        </dl>
                        <dl>
                            <dt>현재매출</dt>
                            <dd>8,600,000</dd>
                        </dl>
                        <mark>목표매출까지 3,400,000 (30%) 남음</mark>
                    </div>
                </div>
            </div>
            
            <div className='boardBox'>
                <strong>나의 투자/매출현황</strong>
                <Select type="year"/>
                <Select type="month"/>
                <div className="board-top">
                    <b>분배일</b>
                    <b>DB 개수</b>
                    <b>DB 단가</b>
                    <b>일 투자금액</b>
                    <b>매출금액</b>
                    <b>결제회원 수</b>
                    <b>결제율</b>
                    <b>ROAS</b>
                </div>
                <ol className="board-center">
                        <li>
                            <span>2023/10/01 09:00</span>
                            <span>20</span>
                            <span>50,000</span>
                            <span>181,786,500</span>
                            <span>181,786,500</span>
                            <span>1</span>
                            <span>5%</span>
                            <span>300%</span>
                        </li>
                        <li>
                            <span>2023/10/01 09:00</span>
                            <span>20</span>
                            <span>50,000</span>
                            <span>181,786,500</span>
                            <span>181,786,500</span>
                            <span>1</span>
                            <span>5%</span>
                            <span>300%</span>
                        </li>
                        <li>
                            <span>2023/10/01 09:00</span>
                            <span>20</span>
                            <span>50,000</span>
                            <span>181,786,500</span>
                            <span>181,786,500</span>
                            <span>1</span>
                            <span>5%</span>
                            <span>300%</span>
                        </li>
                        <li>
                            <span>2023/10/01 09:00</span>
                            <span>20</span>
                            <span>50,000</span>
                            <span>181,786,500</span>
                            <span>181,786,500</span>
                            <span>1</span>
                            <span>5%</span>
                            <span>300%</span>
                        </li>
                        <li>
                            <span>2023/10/01 09:00</span>
                            <span>20</span>
                            <span>50,000</span>
                            <span>181,786,500</span>
                            <span>181,786,500</span>
                            <span>1</span>
                            <span>5%</span>
                            <span>300%</span>
                        </li>
                </ol>
                <div className="board-bottom">
                    <b>합계(평균)</b>
                    <b>678</b>
                    <b>-</b>
                    <b>874,198,132</b>
                    <b>874,198,132</b>
                    <b>123</b>
                    <b>-</b>
                    <b>(150%)</b>
                </div>
            </div>
        </div>
    );
}

