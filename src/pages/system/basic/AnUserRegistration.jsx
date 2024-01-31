import React from 'react';
import { DatePicker } from 'antd';
import Select from '../../../components/Select';
import { Link } from 'react-router-dom';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

export default function AnUserRegistration() {
    return (
        <>
            <h2>사용자 목록</h2>

            <div className='dropBox'>
                <b>기본 정보</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">로그인 아이디</label>
                                <div>
                                    <input type="text" />
                                    <button className='btn-gray-black'>중복 확인</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용자명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">휴대폰</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">회원사</label>
                                <div>
                                    <input type="text" value={'(주)청개구리투자클럽'} readOnly/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용자 구분</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">역할그룹</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">이메일</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용여부</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div>
                                    <input type="search" />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">입사일</label>
                                <div>
                                    <DatePicker onChange={onChange} />
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">비고</label>
                                <div>
                                    <textarea name="" id=""></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={''} className='btn-point'>임시 비밀번호 발급</Link>
                        <Link to={''} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point'/>
                    </div>
                </form>
            </div>
        </>
    );
}

