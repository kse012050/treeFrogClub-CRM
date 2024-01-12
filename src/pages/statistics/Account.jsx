import React from 'react';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';

export default function Account() {
    return (
        <>
            <h2>그룹/계정별 유효율</h2>

            <DropBox title="검색 항목" arrow>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">그룹명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">캠페인 진행기간</label>
                                <div>
                                    <Select name={'year'} />
                                    <Select name={'month'} />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="reset" value="초기화" className='btn-gray-white'/>
                        <input type="submit" value="검색" className='btn-point'/>
                    </div>
                </form>
            </DropBox>

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case02'/>
                <b className='total'>123</b>

                <div className='board-top'>
                    <span>No.</span>
                    <button>그룹명</button>
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
                </div>
                <ol className="board-center">
                    <li>
                        <span>123456</span>
                        <Link to="">청개구리투자그룹</Link>
                        <span>5</span>
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
                    </li>
                </ol>
            </div>
        </>
    );
}

