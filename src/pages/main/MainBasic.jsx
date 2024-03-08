import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import SelectMonth from '../../components/SelectMonth';
import SelectYear from '../../components/SelectYear';
import { numberWithCommas } from '../../api/validation';
import Graph from '../../components/Graph';

export default function MainBasic() {
    const [clientcode, setClientcode] = useState()

    useEffect(()=>{
        api('clientcode', 'properties_list', {'all_yn': 'y'})
        .then(({result, list})=>{
            if(result){
                // console.log(list);
                setClientcode(list)
            }
        })
    },[])
  
    return (
        <div className='basicPage'>
             <DashboardFirst clientcode={clientcode}/>
             <DashboardSecond clientcode={clientcode}/>
        </div>
    );
}


function DashboardFirst({clientcode}){
    const [inputs, setInputs] = useState()
    const [dashboard, setDashboard] = useState()
    const [dashboardSum, setDashboardSum] = useState()
    const [tab, setTab] = useState('ByDepartment');
    const [graph, setGraph] = useState()
    const color = [
        '#FEA89B',
        '#FDBF6C',
        '#FCD665',
        '#7DDB83',
        '#74CBCA',
        '#79C0FC',
        '#BF9DFC',
        '#FFA6D7',
        '#B78F8F'
    ]

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
                api('dashboard', funcType, {'stat_date': `${inputs.year}-${inputs?.month}`})
                    .then(({result, list})=>{
                        if(result){
                            // console.log(list);
                            // console.log(result);
                            setDashboard(list.filter(({ranking})=>ranking))
                            setDashboardSum(list.filter(({ranking})=>!ranking)[0])
                        }
                    })
            }

           
        }
    },[inputs?.year, inputs?.month, tab])

    useEffect(()=>{
        // console.log(dashboard);
        if(dashboard && dashboardSum){
            setGraph(dashboard.map((data)=> {
                // console.log(data);
                return {
                    'percent': data.current_month_sales_price ? (data.current_month_sales_price / dashboardSum.current_month_sales_price * 100).toFixed(1) : '0',
                    'name': data.department_name
                 };
            }))
        }
    },[dashboard, dashboardSum])

    return (
        <div>
            <ul>
                <li><button className={tab === 'ByDepartment' ? 'active' : ''} onClick={()=>setTab('ByDepartment')}>부서별 매출</button></li>
                <li><button className={tab === 'ByUser' ? 'active' : ''} onClick={()=>setTab('ByUser')}>사용자별 매출</button></li>
            </ul>
            <div className='selectArea'>
                <SelectYear setInputs={setInputs} changeName='year' tab={tab}/>
                { inputs?.year && 
                    <SelectMonth year={inputs.year} setInputs={setInputs} changeName='month' tab={tab}/>
                }
            </div>
            <div className='infoArea' onClick={()=>console.log(graph)}>
                <div className='graphArea'>
                    { (!!dashboard?.length && graph)? 
                        <>
                            <Graph data={graph} color={color}/>
                            {/* { clientcode &&
                                <ul>
                                    { clientcode.map((data)=>
                                        <li key={data.properties_id} style={{'--bgColor': data.bg_color}}>
                                            { data.name }
                                        </li>
                                    )}
                                </ul>
                            } */}
                            
                            { !!dashboard?.length ?
                                <ul>
                                    {dashboard.map((data)=>(
                                        <li key={data.ranking}>
                                            { data.department_name }
                                        </li>
                                    ))}
                                </ul> :
                                <div className='data-none'>
                                    표시할 데이터가 없습니다.
                                </div>
                            }
                        </> :
                        <div className='data-none'>
                            표시할 데이터가 없습니다.
                        </div>
                    }
                </div>
                <div className='boardBox'>
                    <div className="board-top">
                        <b>순위</b>
                        <b>부서명</b>
                        { tab === 'ByUser' &&
                            <b>사용자</b>
                        }
                        <b>전월 총 매출금액</b>
                        <b>금월 총 매출금액</b>
                        <b>전월대비</b>
                    </div>
                    { !!dashboard?.length ?
                        <ol className="board-center">
                            {dashboard.map((data)=>(
                                <li key={data.ranking}>
                                    <span>{ data.ranking }</span>
                                    <span>{ data.department_name }</span>
                                    { tab === 'ByUser' &&
                                        <span>{ data.admin_name }</span>
                                    }
                                    <span>{ data.pre_month_sales_price ? numberWithCommas(data.pre_month_sales_price) : 0 }</span>
                                    <span>{ data.current_month_sales_price ? numberWithCommas(data.current_month_sales_price) : 0 }</span>
                                    <span>{ data.percent && `${data.percent}%`}</span>
                                </li>
                            ))}
                        </ol> :
                        <div className='data-none'>
                            표시할 데이터가 없습니다.
                        </div>
                    }
                    <div className="board-bottom">
                        <b></b>
                        <b>합계</b>
                        { tab === 'ByUser' &&
                            <b></b>
                        }
                        <b>{ dashboardSum?.pre_month_sales_price ? numberWithCommas(dashboardSum.pre_month_sales_price) : '-' }</b>
                        <b>{ dashboardSum?.current_month_sales_price ? numberWithCommas(dashboardSum.current_month_sales_price) : '-' }</b>
                        <b>{ dashboardSum?.percent ? `${dashboardSum.percent}%` : '-' }</b>
                    </div>
                </div>
            </div>
            {/* <div>
                표시할 데이터 없음
            </div> */}
        </div>
    )
}

function DashboardSecond({ clientcode }){
    const [inputs, setInputs] = useState()
    const [dashboard, setDashboard] = useState()
    const [dashboardSum, setDashboardSum] = useState()
    const [tab, setTab] = useState('ByProduct');
    const [graph, setGraph] = useState()
    const color = [
        '#FEA89B',
        '#FDBF6C',
        '#FCD665',
        '#7DDB83',
        '#74CBCA',
        '#79C0FC',
        '#BF9DFC',
        '#FFA6D7',
        '#B78F8F'
    ]

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
                            setDashboard(list ? list.filter(({ranking})=>ranking) : [])
                            setDashboardSum(list ? list.filter(({ranking})=>!ranking)[0] : [])
                            // console.log(list);
                            // console.log(list.filter(({ranking})=>!ranking)[0]);
                        }
                    })
            }
        }
    },[inputs?.year, inputs?.month, tab])

    useEffect(()=>{
        // console.log(dashboard);
        if(dashboard && dashboardSum){
            setGraph(dashboard.map((data)=> {
                // console.log(data);
                // console.log(data.total_price ? (data.total_price / dashboardSum.total_price * 100).toFixed(1) : '0');
                return {
                   'percent': data.total_price ? (data.total_price / dashboardSum.total_price * 100).toFixed(1) : '0',
                   'name': data.product_name
                };
            }))
        }
    },[dashboard, dashboardSum])

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
                    {(!!dashboard?.length && graph)? 
                        <>
                            <Graph data={graph} color={color}/>
                            { !!dashboard?.length ?
                                <ul>
                                    {dashboard.map((data)=>(
                                        <li key={data.ranking}>
                                            { data.product_name }
                                        </li>
                                    ))}
                                </ul> :
                                <div className='data-none'>
                                    표시할 데이터가 없습니다.
                                </div>
                            }
                        </> :
                        <div className='data-none'>
                            표시할 데이터가 없습니다.
                        </div>
                    }
                </div>
                <div className='boardBox'>
                    <div className="board-top">
                        <b>순위</b>
                        <b>
                            { tab === 'ByProduct' && '상품명'}
                            { tab === 'ByAnalyst' && '애널리스트'}
                        </b>
                        { tab === 'ByAnalyst' && 
                            <b>
                                상품개수
                            </b>
                        }
                        <b>매출건수</b>
                        <b>금월 총 매출금액</b>
                        <b>매출점유율</b>
                    </div>
                    { !!dashboard?.length ?
                        <ol className="board-center">
                            {dashboard.map((data)=>(
                                <li key={data.ranking}>
                                    <span>{ data.ranking }</span>
                                    <span>{ data.product_name || data.analyst_admin_name }</span>
                                    { tab === 'ByAnalyst' && 
                                        <span>
                                            { data.total_product_count }
                                        </span>
                                    }
                                    <span>{ data.total_count }</span>
                                    <span>{ data.total_price ? numberWithCommas(data.total_price) : 0 }</span>
                                    <span>{ data.percent && `${data.percent}%`}</span>
                                </li>
                            ))}
                        </ol> :
                        <div className='data-none'>
                            표시할 데이터가 없습니다.
                        </div>
                    }
                    
                    <div className="board-bottom">
                        <b></b>
                        <b>합계</b>
                        { tab === 'ByAnalyst' && 
                            <b>
                                { 'api 필요' }
                            </b>
                        }
                        <b>{ dashboardSum?.total_count ? numberWithCommas(dashboardSum.total_count) : '-' }</b>
                        <b>{ dashboardSum?.total_price ? numberWithCommas(dashboardSum.total_price) : '-' }</b>
                        <b>{ dashboardSum?.percent ? `${dashboardSum.percent}%` : '-' }</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

