import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Memu() {
    const { user, menuPermission } = useContext(UserContext)
    // console.log(menuPermission);
    return (
        <nav>
            { (menuPermission?.['통합고객목록'] || menuPermission?.['고객등록']) && 
                <>
                    <strong>고객 DB 관리</strong>
                    <ul>
                        { menuPermission?.['통합고객목록'] &&
                            <li><NavLink to={'/customer/list'}>통합 고객 목록</NavLink></li>
                        }
                        { menuPermission?.['고객등록'] &&
                            <li><NavLink to={'/customer/registration'}>고객 등록</NavLink></li>
                        }
                    </ul>
                </>
            }
            { (menuPermission?.['결제목록'] || menuPermission?.['상품목록']) && 
                <>
                    <strong>결제 관리</strong>
                    <ul>
                        { menuPermission?.['결제목록'] && 
                            <li><NavLink to={'/payment/list'}>결제 목록</NavLink></li>
                        }
                        { menuPermission?.['상품목록'] && 
                            <li><NavLink to={'/payment/product'}>상품 목록</NavLink></li>
                        }
                    </ul>
                </>
            }
            <strong>통계</strong>
            <ul>
                <li><NavLink to={'/statistics/account'}>그룹/계정별 유효율</NavLink></li>
                <li><NavLink to={'/statistics/campaign'}>캠페인별 유효율</NavLink></li>
                <li><NavLink to={'/statistics/sales'}>매출현황</NavLink></li>
            </ul>
            { ( user?.type === 'super' || user?.type === "admin") &&
                <>
                    <strong>시스템 관리</strong>
                    <b>기본 설정</b>
                    <ul>
                        { menuPermission?.['사용자목록'] && 
                            <li><NavLink to={'/system/basic/anUser'}>사용자 목록</NavLink></li>
                        }
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
                        <li><NavLink to={'/system/member/connect'}>사용자접속이력</NavLink></li>
                        <li><NavLink to={'/system/member/delete'}>고객삭제이력</NavLink></li>
                    </ul>
                </>
            }
            <strong>게시판 관리</strong>
            <ul>
                <li><NavLink to={'/notice'}>공지사항</NavLink></li>
            </ul>
            <p>© 2023 Team1985</p>
        </nav>
    );
}

