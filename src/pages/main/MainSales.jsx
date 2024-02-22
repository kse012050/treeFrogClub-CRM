import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import SelectYear from '../../components/SelectYear';
import SelectMonth from '../../components/SelectMonth';
import { numberWithCommas } from '../../api/validation';

export default function MainSales() {
    const [dashboard, setDashboard] = useState()
    const [inputs, setInputs] = useState()
    const [boardList, setBoardList] = useState()
    const [boardTotal, setBoardTotal] = useState()
    
    useEffect(()=>{
        api('dashboard', 'month_sales_total_stat')
            .then(({result, data})=>{
                if(result){
                    setDashboard(data)
                }
            })
    },[])

    useEffect(()=>{
        if(inputs?.year && inputs?.month){
            // console.log(inputs);
            // console.log(`${inputs.year}-${inputs.month}`);
            api('dashboard', 'month_sales_stat_list', {'stat_date': `${inputs.year}-${inputs.month}`})
                .then(({result, data, list})=>{
                    if(result){
                        // console.log(list);
                        // console.log(data);
                        setBoardList(list)
                        setBoardTotal(data)
                    }
                })
        }
    },[inputs])

    return (
        <div className='salesPage'>
            <div className='salesArea'>
                <strong>2023년 10월 매출현황</strong>
                <div>
                    <div className='progressArea' 
                        style={{'--percent': `${dashboard?.achievement_percent}%`}}
                        // style={{'--percent': `${30}%`}}
                    >
                        <span 
                            title='투자금액'
                            style={{'--percent': `${dashboard?.investment_amount / dashboard?.goal_amount * 100}%`}}
                            ></span>
                        <span 
                            title='최소할당매출'
                            style={{'--percent': `${dashboard?.minimum_allocation_amount / dashboard?.goal_amount * 100}%`}}
                        ></span>
                        <b 
                            title='현재매출' 
                            data-percent={ parseInt(dashboard?.total_sales_amount / dashboard?.goal_amount * 100) || 0 }
                        ></b>
                        <span title='목표매출'></span>
                    </div>
                    <div className='amountArea'>
                        <b>매출 달성 금액</b>
                        <dl>
                            <dt>투자금액</dt>
                            <dd>{ numberWithCommas(dashboard?.investment_amount) }</dd>
                        </dl>
                        <dl>
                            <dt>최소할당매출</dt>
                            <dd>{ dashboard?.minimum_allocation_amount ? numberWithCommas(dashboard?.minimum_allocation_amount) : 0}</dd>
                        </dl>
                        <dl>
                            <dt>목표매출</dt>
                            <dd>{ numberWithCommas(dashboard?.goal_amount) }</dd>
                        </dl>
                        <dl>
                            <dt>현재매출</dt>
                            <dd>{ dashboard?.total_sales_amount ? numberWithCommas(dashboard?.total_sales_amount) : 0}</dd>
                        </dl>
                        <mark>
                            {`목표매출까지 
                            ${ numberWithCommas(dashboard?.goal_amount - dashboard?.total_sales_amount) }
                            (${ dashboard?.remain_achievement_percent }%) 남음`}
                        </mark>
                    </div>
                </div>
            </div>
            
            <div className='boardBox'>
                <strong>나의 투자/매출현황</strong>
                <SelectYear setInputs={setInputs} changeName='year'/>
                {/* <Select type="year" current setInputs={setYear} changeName='year'/> */}
                { inputs?.year && 
                    <SelectMonth year={inputs.year} setInputs={setInputs} changeName='month'/>
                }
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
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data, i)=>
                            <li key={i}>
                                <span>{ data.sales_admin_reg_date }</span>
                                <span>{ data.db_count }</span>
                                <span>{ numberWithCommas(data.db_price) }</span>
                                <span>{ numberWithCommas(data.day_investment_amount) }</span>
                                <span>{ numberWithCommas(data.total_sales_price) }</span>
                                <span>{ data.payment_customer_count }</span>
                                <span>{ data.payment_customer_percent }%</span>
                                <span>{ data.roas }%</span>
                            </li>
                        )}
                    </ol>
                }
                { (boardTotal && !!boardList.length) &&
                    <div className="board-bottom">
                        <b>합계(평균)</b>
                        <b>{ boardTotal.total_db_count }</b>
                        <b>{ numberWithCommas(boardTotal.total_db_price) }</b>
                        <b>{ numberWithCommas(boardTotal.total_day_investment_amount) }</b>
                        <b>{ numberWithCommas(boardTotal.total_sales_price) }</b>
                        <b>{ boardTotal.totalpayment_customer_count }</b>
                        <b>-</b>
                        <b>({ boardTotal.avg_roas }%)</b>
                    </div>
                }
            </div>
        </div>
    );
}

