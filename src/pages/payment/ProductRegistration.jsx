import React from 'react';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';

export default function ProductRegistration() {
    return (
        <>
            <h2>상품 등록</h2>

            <div className='dropBox'>
                <b>검색 항목</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">상품코드</label>
                                <div>
                                    <input type="text" />
                                    <button className='btn-gray-black'>중복확인</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상품명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">애널리스트</label>
                                <div>
                                    <input type="search" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제시 고객구분</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="">비고</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={''} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="저장" className='btn-point'/>
                    </div>
                </form>
            </div>
        </>
    );
}

