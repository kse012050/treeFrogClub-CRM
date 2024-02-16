import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "../context/UserContext.js";
import Memu from '../components/Memu';
import {styleIdx} from '../js/style.js';
import { api, logout } from '../api/api.js';
import Popup from '../components/popup/Popup.jsx';

export default function Root({ children }) {
    const location = useLocation().pathname;
    const pageName = useLocation().pathname.slice(1).split('/');
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [company, setCompany] = useState()
    const [popup, setPopup] = useState()
    const { id } = useParams();

    
    useEffect(() => {
        window.scrollTo(0, 0);
        let pageName;
        if(location === '/main'){
            pageName = '대시보드'
        }else if(location === '/customer/list'){
            pageName = '고객 DB 관리 - 통합 고객 목록'
        }else if(location === '/customer/registration'){
            pageName = '고객 DB 관리 - 고객 등록'
        }else if(location === '/customer/registration/bulk'){
            pageName = '고객 DB 관리 - 대량 고객 등록'
        }else if(location.includes('/customer/registration/update')){
            pageName = '고객 DB 관리 - 고객 수정'
        }else if(location === '/payment/list'){
            pageName = '결제 관리 - 결제 목록'
        }else if(location === ''){
            pageName = ''
        }else if(location === ''){
            pageName = ''
        }else if(location === '/payment/list/registration'){
            pageName = '결제 관리 - 대량 결제 등록'
        }else if(location === '/payment/product'){
            pageName = '결제 관리 - 상품 목록'
        }else if(location === '/payment/product/registration'){
            pageName = '결제 관리 - 상품 등록'
        }else if(location.includes('/payment/product/update')){
            pageName = '결제 관리 - 상품 수정'
        }else if(location === '/statistics/account'){
            pageName = '통계 - 그룹/계정별 유효율'
        }else if(location === '/statistics/campaign'){
            pageName = '통계 - 캠페인별 유효율'
        }else if(location === '/statistics/campaign/by'){
            pageName = '통계 - 계정별 유효율'
        }else if(location === '/statistics/sales'){
            pageName = '통계 - 매출현황'
        }else if(location === '/system/basic/anUser'){
            pageName = '시스템 관리 - 기본 설정 - 사용자 목록'
        }else if(location === '/system/basic/anUser/registration'){
            pageName = '시스템 관리 - 기본 설정 - 사용자 등록'
        }else if(location.includes('/system/basic/anUser/update')){
            pageName = '시스템 관리 - 기본 설정 - 사용자 수정'
        }else if(location === '/system/basic/bureau'){
            pageName = '시스템 관리 - 기본 설정 - 부서 관리'
        }else if(location === '/system/basic/client'){
            pageName = '시스템 관리 - 기본 설정 - 고객 구분 관리'
        }else if(location === '/system/basic/client/registration'){
            pageName = '시스템 관리 - 기본 설정 - 고객 구분 등록'
        }else if(location.includes('/system/basic/client/update')){
            pageName = '시스템 관리 - 기본 설정 - 고객 구분 수정'
        }else if(location === '/system/basic/common'){
            pageName = '시스템 관리 - 기본 설정 - 공통 코드 관리'
        }else if(location === '/system/basic/common/registration'){
            pageName = '시스템 관리 - 기본 설정 - 공통 코드 등록'
        }else if(location.includes('/system/basic/common/update')){
            pageName = '시스템 관리 - 기본 설정 - 공통 코드 수정'
        }else if(location === '/system/basic/customer'){
            pageName = '시스템 관리 - 기본 설정 - 고객목록 설정'
        }else if(location === '/system/basic/property'){
            pageName = '시스템 관리 - 기본 설정 - 속성값 설정'
        }else if(location === '/system/grant/management'){
            pageName = '시스템 관리 - 권한 설정 - 역할 관리'
        }else if(location === '/system/grant/management/registration'){
            pageName = '시스템 관리 - 권한 설정 - 역할 등록'
        }else if(location.includes('/system/grant/management/update')){
            pageName = '시스템 관리 - 권한 설정 - 역할 수정'
        }else if(location === '/system/grant/permissions'){
            pageName = '시스템 관리 - 권한 설정 - 역할 권한 관리'
        }else if(location === ''){
            pageName = ''
        }else if(location === ''){
            pageName = ''
        }else if(location === '/notice'){
            pageName = '게시판 관리 - 공지사항'
        }else if(location === '/notice/registration'){
            pageName = '게시판 관리 - 공지사항 등록'
        }else if(location.includes('/notice/update')){
            pageName = '게시판 관리 - 공지사항 보기/수정'
        }

        // console.log(pageName);
        if(pageName){
            api('log', 'insert', {'log_type': '페이지로딩', 'log_value': pageName})
                .then(({result})=>{
                    if(result){
                    }
                })
        }
      }, [location]);

    useEffect(()=>{
        api('profile', 'detail')
            .then(({result, data})=>{
                if(result){
                    setUser(data)
                }
            })

        api('profile', 'company_info')
            .then(({result, data})=>{
                if(result){
                    setCompany(data)
                }
            })
    },[])

    useEffect(()=>{
        sessionStorage.getItem('authorization') || navigate('/');
        return(
            document.querySelectorAll('[data-styleidx]').length ? styleIdx() : undefined
        )
    },[pageName, children, navigate])
    return (
        <>
            <UserContext.Provider value={{user, company}} >
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

