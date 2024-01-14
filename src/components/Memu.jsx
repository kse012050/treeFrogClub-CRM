import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Memu() {
    return (
        <nav>
            <strong>고객 DB 관리</strong>
            <ul>
                <li><NavLink to={'/customer/list'}>통합 고객 목록</NavLink></li>
                <li><NavLink to={'/customer/registration'}>고객 등록</NavLink></li>
            </ul>
            <strong>결제 관리</strong>
            <ul>
                <li><NavLink to={'/payment/list'}>결제 목록</NavLink></li>
                <li><NavLink to={'/payment/productList'}>상품 목록</NavLink></li>
            </ul>
            <strong>통계</strong>
            <ul>
                <li><NavLink to={'/statistics/account'}>그룹/계정별 유효율</NavLink></li>
                <li><NavLink to={'/statistics/campaign'}>캠페인별 유효율</NavLink></li>
                <li><NavLink to={'/statistics/sales'}>매출현황</NavLink></li>
            </ul>
            <strong>시스템 관리</strong>
            <b>기본 설정</b>
            <ul>
                <li><NavLink to={'/system/basic/anUserList'}>사용자 목록</NavLink></li>
                <li><NavLink to={'/system/basic/bureau'}>부서 관리</NavLink></li>
                <li><NavLink to={'/system/basic/client'}>고객 구분 관리</NavLink></li>
                <li><NavLink to={'/system/basic/common'}>공통 코드 관리</NavLink></li>
                <li><NavLink to={'/system/basic/customer'}>고객목록 설정</NavLink></li>
                <li><NavLink to={'/system/basic/property'}>속성값 설정</NavLink></li>
            </ul>
            <b>권한 설정</b>
            <ul>
                <li><NavLink to={'/system/grant/management'}>역할 관리</NavLink></li>
                <li><NavLink to={'/system/grant/permissions'}>역할 권한 관리</NavLink></li>
            </ul>
            <b>회원사 관리</b>
            <ul>
                <li><Link to={''}>사용자접속이력</Link></li>
                <li><Link to={''}>고객삭제이력</Link></li>
            </ul>
            <strong>게시판 관리</strong>
            <ul>
                <li><Link to={''}>공지사항</Link></li>
            </ul>
            <p>© 2023 Team1985</p>
        </nav>
    );
}

