import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Memu from '../components/Memu';

export default function Root() {
    const pageName = useLocation().pathname.slice(1);
    console.log(pageName);
    return (
        <>
            <header>
                <h1>
                    <Link to={''}>
                        <img src={require('../images/logo-header.png')} alt="개인투자자를 위한 주식정보회사 청개구리 투자클럽" />
                    </Link>
                    고객 DB 관리 시스템
                </h1>
                <strong>[영업1팀] 홍길동</strong>
                <Link to="">정보변경</Link>
                <button>로그아웃</button>
            </header>
            <div className={`subPage`}>
                <Memu />
                <div className={`${pageName}Page`}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

