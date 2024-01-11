import React from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';

export default function ProductList() {
    return (
        <>
            <h2>
                상품 목록
                <Link to="registration" className='btn-point'>추가</Link>
            </h2>

            
            <DropBox title="검색 항목" arrow>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">상품코드</label>
                                <div>
                                    <input type="text" />
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
                        <input type="reset" value="초기화" className='btn-gray-white'/>
                        <input type="submit" value="검색" className='btn-point'/>
                    </div>
                </form>
            </DropBox>
            
            <div className='boardBox'>
                <strong>목록</strong>
                <button className='btn-gray-black'>엑셀 다운로드</button>
                <hr className='case01'/>
                <b className='total'>123</b>
                <span className='page'>1/10</span>
                <b className='choice'>1</b>
                <button className='btn-gray-black'>선택 삭제</button>

                
                <div className="board-top">
                    <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div>
                    <button>상품코드</button>
                    <button>상품명</button>
                    <button>애널리스트</button>
                    <button>결제시 고객구분</button>
                    <button>비고</button>
                    <span>수정</span>
                </div>
                
                <ol className="board-center">
                    <li>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor=""></label>
                        </div>
                        <span>123456</span>
                        <span>[주식교육] 전업반</span>
                        <span>최나인</span>
                        <span>VIP회원</span>
                        <span></span>
                        <button className="popup">수정</button>
                    </li>
                </ol>

                <div className='board-pagination' data-styleidx='a'>
                    <Select name="pageCount"/>
                    <Link to={''}>첫 페이지</Link>
                    <Link to={''}>이전 페이지</Link>
                    <ol>
                        <li className='active'><Link to={''}>1</Link></li>
                        <li><Link to={''}>2</Link></li>
                        <li><Link to={''}>3</Link></li>
                        <li><Link to={''}>4</Link></li>
                        <li><Link to={''}>5</Link></li>
                        <li><Link to={''}>6</Link></li>
                        <li><Link to={''}>7</Link></li>
                        <li><Link to={''}>8</Link></li>
                        <li><Link to={''}>9</Link></li>
                        <li><Link to={''}>10</Link></li>
                    </ol>
                    <Link to={''}>다음 페이지</Link>
                    <Link to={''}>마지막 페이지</Link>
                </div>
            </div>
        </>
    );
}

