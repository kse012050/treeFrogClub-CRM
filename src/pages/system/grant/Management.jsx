import React from 'react';
import Select from '../../../components/Select';
import { Link } from 'react-router-dom';

export default function Management() {
    return (
        <>
            <h2>역할 등록</h2>
            <div className="dropBox">
                <b>기본 정보</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">구분</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">역할명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">설명</label>
                                <div>
                                    <textarea name="" id=""></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className='limitArea'>
                        <b>접속제한 (로그인) 정보</b>
                        <input type="checkbox" />
                        <label htmlFor="">제한시간 설정 (설정한 시간에만 로그인 허용)</label>
                        <div className='timeArea'>
                            <Select name={'time'} />
                            <Select name={'time'} />
                            -
                            <Select name={'time'} />
                            <Select name={'time'} />
                        </div>
                        <input type="checkbox" />
                        <label htmlFor="">허용IP 설정 (0.0.X.X, 0.0.0.X 로 대역대 설정가능)</label>
                        <div className='ipArea'>
                            <input type="text" />
                            <button className='btn-gray-black'>등록</button>
                            <ul>
                                <li>
                                    211.192.182.113
                                    <button>IP 삭제</button>
                                </li>
                                <li>
                                    211.192.182.113
                                    <button>IP 삭제</button>
                                </li>
                                <li>
                                    211.192.182.113
                                    <button>IP 삭제</button>
                                </li>
                                <li>
                                    211.192.182.113
                                    <button>IP 삭제</button>
                                </li>
                                <li>
                                    211.192.182.113
                                    <button>IP 삭제</button>
                                </li>
                            </ul>
                        </div>
                    </fieldset>
                    <div>
                        <Link to={''} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point'/>
                    </div>
                </form>
            </div>
        </>
    );
}

