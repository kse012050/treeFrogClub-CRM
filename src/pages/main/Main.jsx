import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainBasic from './MainBasic';
import MainSales from './MainSales';
import { api } from '../../api/api';
import { UserContext } from '../../context/UserContext';

export default function Main() {
    const { user } = useContext(UserContext)
    const [dashboardAlarm, setDashboardAlarm] = useState()
    // console.log(user);
    useEffect(()=>{
        api('board', 'dashboard_alarm')
            .then(({result, data})=>{
                if(result){
                    // console.log(data);
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
            { user && 
                ( user?.role_info.role_classification === '애널리스트' && <MainBasic /> )
            }
            { user && 
                ( user?.role_info.role_classification === '영업' && <MainSales /> )
            }
            {/* <MainBasic /> */}
            {/* <MainSales /> */}
        </>
    );
}

