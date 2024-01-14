import React from 'react';
import { Link } from 'react-router-dom';

export default function Announcement() {
    return (
        <>
            <h2>공지사항 등록</h2>
            <div className="dropBox">
                <b>공지사항</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">열람범위</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor=""> 전체</label>
                                    <input type="radio" />
                                    <label htmlFor=""></label>
                                    <label htmlFor="" className='btn-gray-black'>부서 선택</label>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">제목</label>
                                <div>
                                    <input type="text" name="" id="" />
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">내용</label>
                                <div>
                                    <textarea name="" id=""></textarea>
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

