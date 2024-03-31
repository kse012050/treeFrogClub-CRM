import React, { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "../context/UserContext.js";
import Memu from '../components/Memu';
import {styleIdx} from '../js/style.js';
import { api, logout } from '../api/api.js';
import Popup from '../components/popup/Popup.jsx';
import { pageHistory } from '../router/routers.js';
import { pagePermissionFilter } from '../api/common.js';

export default function Root({ children }) {
    const location = useLocation().pathname;
    const pageName = useLocation().pathname.slice(1).split('/');
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [company, setCompany] = useState()
    const [popup, setPopup] = useState()
    const { id } = useParams();
    const [pagePermission, setPagePermission] = useState()
    const [menuPermission, setMenuPermission] = useState()

    const userSettings = useCallback(()=>{
        api('profile', 'detail')
            .then(({result, data})=>{
                if(result){
                    setUser(data)
                    // console.log('정보 변경');
                }
            })
    },[])
    
    useEffect(() => {
        window.scrollTo(0, 0);
        // console.log(user);
        // console.log(pagePermissionFilter(user, location));
        if(user){
            // console.log(pagePermissionFilter(user, location)?.insert_yn);
            if(user?.type === 'user' && location.includes('system')){
                navigate('/main')
            }else{
                pageHistory(location)
                setPagePermission(pagePermissionFilter(user, location))
                // setPagePermission(undefined)
                setMenuPermission(()=>{
                    let obj = {}
                    user.role_list?.forEach((data)=>{
                        obj[data.screen_name] = (data.select_yn === 'y')
                        if(data.screen_name === '통합고객목록'){
                            obj['고객등록'] = (data.insert_yn === 'y')
                        }
                    })
                    // console.log(obj);
                    return user.type !== 'super' ? 
                        obj : 
                        {
                            '통합고객목록': true,
                            '고객등록': true,
                            '결제목록': true,
                            '상품목록': true,
                            '사용자목록': true,
                            '사용자_부서관리': true,
                            '고객구분관리': true,
                            '코드관리': true,
                            '고객목록관리': true,
                            '역할목록': true,
                            '역할권한관리': true,
                            '사용자_사용자접속이력': true,
                            '고객삭제이력': true,
                            '공지사항관리 목록': true,
                        }
                })
                console.log(pagePermissionFilter(user, location));
                /* if(pagePermissionFilter(user, location)?.select_yn !== 'y'){
                    navigate('/main')
                } */
            }
        }
      }, [location, user, navigate]);

    useEffect(()=>{
        userSettings()

        api('profile', 'company_info')
            .then(({result, data})=>{
                if(result){
                    setCompany(data)
                }
            })
    },[userSettings])

    useEffect(()=>{
        sessionStorage.getItem('authorization') || navigate('/');
        return(
            document.querySelectorAll('[data-styleidx]').length ? styleIdx() : undefined
        )
    },[pageName, children, navigate])
    return (
        <>
            <UserContext.Provider value={{user, company, userSettings, pagePermission, menuPermission}}>
                <header>
                    <h1>
                        <Link to={'/main'}>
                            <img src={require('../images/logo-header.png')} alt="개인투자자를 위한 주식정보회사 청개구리 투자클럽" />
                        </Link>
                        고객 DB 관리 시스템
                    </h1>
                    <strong>{user?.department_info && `[${user.department_info.name}]`} {user?.name}</strong>
                    {/* <Link to="">정보변경</Link> */}
                    <button onClick={()=> setPopup({'type': 'newPassword'})}>정보변경</button>
                    <button onClick={logout}>로그아웃</button>
                </header>
                <div className={`subPage`}>
                    <Memu />
                    <div className={`${pageName[0]}Page ${(pageName.length > 1 && id !== pageName.at(-1)) ? pageName.at(-1) + 'Page' : pageName.at(-2) + 'Page'}`}>
                        <Outlet />
                    </div>
                </div>
            </UserContext.Provider>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

