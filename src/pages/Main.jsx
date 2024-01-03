import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/Select';

export default function Main() {
    return (
        <>
            <Link to="" title="공지알림">
                <time>2023/11/15 11:00</time>
                <p>
                    <span>사업지원팀 공통 공지사항입니다~! 사업지원팀 공통 공지사항입니다~! </span>
                </p>
            </Link>

            <div>
                <ul>
                    <li><button className='active'>부서별 매출</button></li>
                    <li><button>사용자별 매출</button></li>
                </ul>
                <div className='selectArea'>
                    <Select name="year"/>
                    <Select name="month"/>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

