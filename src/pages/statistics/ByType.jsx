import React from 'react';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';

export default function ByType() {
    return (
        <div className='boardBox'>
            <strong>청개구리투자그룹 &gt; 계정별 유효율</strong>
            <Select name={'year'} />
            <Select name={'month'} />
            <hr className='case02'/>
            <b className='total'>5</b>

            <div className='board-top'>
                <span>No.</span>
                <span>계정</span>
                <span>캠페인</span>
                <span>
                    분배<br/>
                    (신규)
                </span>
                <span>
                    분배<br/>
                    (재신청)
                </span>
                <span>유효DB</span>
                <span>부재1차</span>
                <span>부재2차</span>
                <span>재통화</span>
                <span>
                    체험<br/>
                    (카톡접속)
                </span>
                <span>체험</span>
                <span>가망고객</span>
                <span>예상가입자</span>
                <span>거절</span>
                <span>환불신청</span>
            </div>
            <ol className="board-center">
                <li>
                    <span>5</span>
                    <span>asdfasdf</span>
                    <span>35</span>
                    <span>12%</span>
                    <span>10%</span>
                    <span>45%</span>
                    <span>30%</span>
                    <span>8%</span>
                    <span>10%</span>
                    <span>20%</span>
                    <span>14%</span>
                    <span>45%</span>
                    <span>0%</span>
                    <span>14%</span>
                    <span>0%</span>
                </li>
            </ol>
            <Link to={'/statistics/Account'} className='btn-gray-white'>목록</Link>
        </div>
    );
}

