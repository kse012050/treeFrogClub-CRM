import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../../../components/Select';
import { ColorPicker } from 'antd';
import SubTitle from '../../../components/SubTitle';

export default function Client() {
    return (
        <>
            {/* <h2>
                고객 구분 관리
                <Link to="registration" className='btn-point'>추가</Link>
            </h2> */}
            <SubTitle text="고객 구분 관리" link="registration" />
            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case03'/>
                <b className='total'>123</b>
                <span className='page'>1/10</span>
                <b className='choice'>1</b>
                <button className='btn-gray-black'>선택 삭제</button>
            
                <div className="board-top">
                    <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div>
                    <button>분류유형</button>
                    <button>고객등급</button>
                    <button>코드</button>
                    <button>코드명</button>
                    <button>배경색상</button>
                    <button>폰트색상</button>
                    <button>정렬순서</button>
                    <button>사용여부</button>
                    <span>수정</span>
                </div>

                <ol className="board-center">
                    <li>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor=""></label>
                        </div>
                        <span>고객구분</span>
                        <span>무료</span>
                        <span>10</span>
                        <span>무료회원</span>
                        <div>
                            <ColorPicker showText />
                        </div>
                        <div>
                            <ColorPicker showText />
                        </div>
                        <span>10</span>
                        <span>Y</span>
                        <button className='popup'>수정</button>
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

