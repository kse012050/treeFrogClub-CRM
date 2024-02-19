import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainBasic from './MainBasic';
// import MainSales from './MainSales';
import { api } from '../../api/api';

export default function Main() {
    const [dashboardAlarm, setDashboardAlarm] = useState()

    useEffect(()=>{
        api('board', 'dashboard_alarm')
            .then(({result, data})=>{
                if(result){
                    setDashboardAlarm(data)
                }
            })
    },[])

    return (
        <>
            { dashboardAlarm && 
                <Link to={`/notice/update/${dashboardAlarm.board_id}`} title="공지알림" data-new={dashboardAlarm.new_yn === 'y'}>
                    <time>{ dashboardAlarm.reg_data }</time>
                    <p>{ dashboardAlarm.title }</p>
                </Link>
            }

            <MainBasic />
            {/* <MainSales /> */}
        </>
    );
}

