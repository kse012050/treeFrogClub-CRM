import React from 'react';
import { Link } from 'react-router-dom';
// import MainBasic from './MainBasic';
import MainSales from './MainSales';

export default function Main() {
    return (
        <>
            <Link to="" title="공지알림">
                <time>2023/11/15 11:00</time>
                <p>
                사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~!
                    {/* <span>사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~!</span> */}
                </p>
            </Link>

            {/* <MainBasic /> */}
            <MainSales />
        </>
    );
}

