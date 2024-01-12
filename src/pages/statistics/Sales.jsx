import React from 'react';
import Select from '../../components/Select';

export default function Sales() {
    return (
        <>
            <h2>매출현황</h2>

            <div className='boardBox'>
                <div className="tabBox">
                    <button className='active'>캠페인별 매출현황</button>
                    <button>사용자별 매출현황</button>
                </div>
                <hr className='case02'/>
                {/* 검색 결과 */}
                {/* <b>[테마주 홈페이지 랜딩] 사용자별 매출현황</b> */}
                <Select name={'year'} />
                <Select name={'month'} />
                <div className='board-search'>
                    <input type="search" placeholder='캠페인명'/>
                    <button>검색</button>
                </div>
                <b className='total'>123</b>
                
                <div className='board-top'>
                    <span>No.</span>
                    <button>사용자</button>
                    <button>DB개수</button>
                    <button>투자금액</button>
                    <button>결제금액</button>
                    <button>환불금액</button>
                    <button>매출금액</button>
                    <button>결제 수</button>
                    <button>결제율</button>
                    <button>ROAS</button>
                </div>
                <ol className="board-center">
                    <li>
                        <span>123456</span>
                        <span>홍길동</span>
                        <span>100</span>
                        <span>5,000,000</span>
                        <span>15,000,000</span>
                        <span>15,000,000</span>
                        <span>15,000,000</span>
                        <span>50</span>
                        <span>50%</span>
                        <span>200%</span>
                    </li>
                </ol>
                {/* 검색 결과 */}
                <button class="btn-gray-white">목록</button>
            </div>
        </>
    );
}

