import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import SelectMonth from '../../components/SelectMonth';
import SelectYear from '../../components/SelectYear';

export default function MainBasic() {
  
    return (
        <div className='basicPage'>
             <DashboardFirst />
             <DashboardSecond />
        </div>
    );
}


function DashboardFirst(){
    const [inputs, setInputs] = useState()
    const [dashboard, setDashboard] = useState()
    const [dashboardSum, setDashboardSum] = useState()
    const [tab, setTab] = useState('ByDepartment');

    useEffect(()=>{
        if(inputs?.year && inputs?.month){
            let funcType;
            if(tab === 'ByDepartment'){
                funcType = 'department_stat'
            }

            if(tab === 'ByUser'){
                funcType = 'user_stat'
            }

            if(funcType){
                api('dashboard', funcType, {'stat_date': `${inputs.year}-${inputs.month}`})
                    .then(({result, list})=>{
                        if(result){
                            // console.log(list);
                            setDashboard(list.filter(({ranking})=>ranking))
                            setDashboardSum(list.filter(({ranking})=>!ranking)[0])
                        }
                    })
            }
        }
    },[inputs?.year, inputs?.month, tab])

    return (
        <div>
            <ul>
                <li><button className={tab === 'ByDepartment' ? 'active' : ''} onClick={()=>setTab('ByDepartment')}>부서별 매출</button></li>
                <li><button className={tab === 'ByUser' ? 'active' : ''} onClick={()=>setTab('ByUser')}>사용자별 매출</button></li>
            </ul>
            <div className='selectArea'>
                <SelectYear setInputs={setInputs} changeName='year' tab={tab}/>
                {/* <Select type="year" current setInputs={setYear} changeName='year'/> */}
                { inputs?.year && 
                    <SelectMonth year={inputs.year} setInputs={setInputs} changeName='month' tab={tab}/>
                }
            </div>
            <div className='infoArea'>
                <div className='graphArea'>
                    <div></div>
                    <ul>
                        <li>사업지원팀</li>
                        <li>본부관리팀</li>
                        <li>외부영업</li>
                        <li>강남주식팀</li>
                        <li>대구코인팀</li>
                        <li>대구주식팀</li>
                        <li>문래지점</li>
                        <li>청개구리주식스쿨</li>
                        <li>청투TV</li>
                    </ul>
                </div>
                <div className='boardBox'>
                    { !!dashboard?.length && 
                        <>
                            <div className="board-top">
                                <b>순위</b>
                                <b>부서명</b>
                                <b>전월 총 매출금액</b>
                                <b>금월 총 매출금액</b>
                                <b>전월대비</b>
                            </div>
                            <ol className="board-center">
                                {dashboard.map((data)=>(
                                    <li key={data.ranking}>
                                        <span>{ data.ranking }</span>
                                        <span>{ data.department_name }</span>
                                        <span>{ data.pre_month_sales_price }</span>
                                        <span>{ data.current_month_sales_price }</span>
                                        <span>{ data.percent && `${data.percent}%`}</span>
                                    </li>
                                ))}
                            </ol>
                        </>
                    }
                    { dashboardSum &&
                        <div className="board-bottom">
                            <b></b>
                            <b>{ dashboardSum.department_name }</b>
                            <b>{ dashboardSum.pre_month_sales_price }</b>
                            <b>{ dashboardSum.current_month_sales_price }</b>
                            <b>{ dashboardSum.percent && `${dashboardSum.percent}%` }</b>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function DashboardSecond(){
    const [inputs, setInputs] = useState()
    const [dashboard, setDashboard] = useState()
    const [dashboardSum, setDashboardSum] = useState()
    const [tab, setTab] = useState('ByProduct');

    useEffect(()=>{
        if(inputs?.year && inputs?.month){
            let funcType;
            if(tab === 'ByProduct'){
                funcType = 'product_stat'
            }

            if(tab === 'ByAnalyst'){
                funcType = 'analyst_stat'
            }

            if(funcType){
                api('dashboard', funcType, {'stat_date': `${inputs.year}-${inputs.month}`})
                    .then(({result, list})=>{
                        if(result){
                            // console.log(list);
                            setDashboard(list.filter(({ranking})=>ranking))
                            setDashboardSum(list.filter(({ranking})=>!ranking)[0])
                            // console.log(list.filter(({ranking})=>!ranking)[0]);
                        }
                    })
            }
        }
    },[inputs?.year, inputs?.month, tab])

    return (
        <div>
            <ul>
                <li><button className={tab === 'ByProduct' ? 'active' : ''} onClick={()=>setTab('ByProduct')}>상품별 매출</button></li>
                <li><button className={tab === 'ByAnalyst' ? 'active' : ''} onClick={()=>setTab('ByAnalyst')}>애널리스트별 매출</button></li>
            </ul>
            <div className='selectArea'>
                <SelectYear setInputs={setInputs} changeName='year' tab={tab}/>
                {/* <Select type="year" current setInputs={setYear} changeName='year'/> */}
                { inputs?.year && 
                    <SelectMonth year={inputs.year} setInputs={setInputs} changeName='month' tab={tab}/>
                }
            </div>
            <div className='infoArea'>
                <div className='graphArea'>
                    <div></div>
                    <ul>
                        <li>사업지원팀</li>
                        <li>본부관리팀</li>
                        <li>외부영업</li>
                        <li>강남주식팀</li>
                        <li>대구코인팀</li>
                        <li>대구주식팀</li>
                        <li>문래지점</li>
                        <li>청개구리주식스쿨</li>
                        <li>청투TV</li>
                    </ul>
                </div>
                <div className='boardBox'>
                    { !!dashboard?.length && 
                        <>
                            <div className="board-top">
                                <b>순위</b>
                                <b>상품명</b>
                                <b>매출건수</b>
                                <b>금월 총 매출금액</b>
                                <b>매출점유율</b>
                            </div>
                            <ol className="board-center">
                                {dashboard.map((data)=>(
                                    <li key={data.ranking}>
                                        <span>{ data.ranking }</span>
                                        <span>{ data.product_name || data.analyst_admin_name }</span>
                                        <span>{ data.total_count }</span>
                                        <span>{ data.total_price }</span>
                                        <span>{ data.percent && `${data.percent}%`}</span>
                                    </li>
                                ))}
                            </ol>
                        </>
                    }
                    { dashboardSum &&
                        <div className="board-bottom">
                            <b></b>
                            <b>{ dashboardSum.product_name }</b>
                            <b>{ dashboardSum.total_count }</b>
                            <b>{ dashboardSum.total_price }</b>
                            <b>{ dashboardSum.percent && `${dashboardSum.percent}%` }{dashboardSum.percent}</b>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

