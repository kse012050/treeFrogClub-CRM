import React, { useState } from 'react';
import { DatePicker } from 'antd';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

export default function List() {
    const [search, setSearch] = useState(false)
    return (
        <>
            <h2>통합 고객 목록</h2>

            <div className='searchBox'>
                <button onClick={()=>setSearch((value)=>!value)} className={search ? 'active': ''}>검색 항목</button>
                {search &&
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객명</label>
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
                                <label htmlFor="">사이트</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">영업담당자</label>
                                <div>
                                    <input type="search" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">출처</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객구분</label>
                                <Select name={'customer'} />
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="">고객 상세구분</label>
                                <div>
                                    <input type="checkbox" />
                                    <label htmlFor="">무료회원(체험중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">무료회원(체험완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP회원(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP회원(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP회원(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP회원(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">소액투자반(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">소액투자반(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">교육(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">교육(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">S클럽(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">S클럽(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불방어매출(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불방어매출(이용완료)</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <input type="checkbox"/>
                                    <label htmlFor="">분배(신규)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">분배(재신청)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">유효DB</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">부재 1차</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">부재 2차</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">재통화</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">체험(카톡접속)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">체험</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">가망고객</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">예상가입자</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">거절</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불신청</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">해지완료</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">불량(본인아님)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">불량(전화번호)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">불량(신청한적없음)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈소액</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈VIP</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">시작일 검색</label>
                                    <input type="radio" />
                                    <label htmlFor="">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                        <span>-</span>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">시작일 검색</label>
                                    <input type="radio" />
                                    <label htmlFor="">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                        <span>-</span>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">최초 등록일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                        <span>-</span>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">신청 애널리스트</label>
                                <Select name={'customer'} />
                            </li>
                            <li>
                                <label htmlFor="">상품명</label>
                                <Select name={'customer'} />
                            </li>
                            <li>
                                <label htmlFor="">SMS 거부 요청</label>
                                <Select name={'customer'} />
                            </li>
                        </ul>
                    </fieldset>
                </form>
                }

            </div>
            <div className='boardBox'>
                <strong>목록</strong>
                <button className='btn-gray'>엑셀 다운로드</button>
                <button className='btn-gray'>중복고객 삭제</button>
                <button className='btn-gray'>검색고객 삭제</button>
                <button className='btn-gray'>검색고객 수신거부</button>
                <Link to={'modify'} className='btn-gray'>대량고객수정</Link>
                <ul>
                    <li>무료회원</li>
                    <li>VIP회원</li>
                    <li>VVIP회원</li>
                    <li>소액투자반</li>
                    <li>교육</li>
                    <li>S클럽</li>
                    <li>환불방어매출</li>
                </ul>
                <b className='total'>123</b>
                <span className='page'>1/10</span>
                <b className='choice'>1</b>
                <Select />
                <Select />
                <button className='btn-gray'>선택 변경</button>
                <span></span>
                <button className='btn-gray'>선택 삭제</button>
                <button className='btn-gray'>선택 수신거부</button>
                <div className="board-top">
                    <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div>
                    <button>No.</button>
                    <button>휴대폰</button>
                    <button>이름</button>
                    <button>담당자</button>
                    <button>고객구분</button>
                    <button>상담상태</button>
                    <button>무료체험<br/>시작일</button>
                    <button>무료체험<br/>종료일</button>
                    <button>유료<br/>시작일</button>
                    <button>유료<br/>종료일</button>
                    <span>보기</span>
                </div>
                
                <ol className="board-center">
                    <li>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor=""></label>
                        </div>
                        <span>123456</span>
                        <span>01055558888</span>
                        <span>홍길동</span>
                        <button>청개구리</button>
                        <span>환불방어매출</span>
                        <button>불량(신청한적없음)</button>
                        <time>2023/09/01</time>
                        <time>2023/09/01</time>
                        <time>2023/09/01</time>
                        <time>2023/09/01</time>
                        <Link to={''}>보기</Link>
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

