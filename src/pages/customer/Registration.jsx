import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import { DatePicker } from 'antd';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

export default function Registration() {
    const [relatedBoard, setRelatedBoard] = useState(0);
    return (
        <>
            <h2>
                고객 등록
                <Link to={'bulk'} className='btn-point'>대량 고객 등록</Link>
            </h2>

            <DropBox title="기본 정보">
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객구분</label>
                                <div>
                                    <Select />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <Select />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">영업담당자</label>
                                <div>
                                    <input type="search" />
                                </div>
                            </li>
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
                                <label htmlFor="">체험 기간</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                        <span>-</span>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">메모</label>
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
            </DropBox>

            <DropBox title="결제 정보" arrow>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">매출 구분</label>
                                <div>
                                    <Select />
                                </div>
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="">결제 구분</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">카드 결제</label>
                                    <input type="radio" />
                                    <label htmlFor="">현금 결제</label>
                                    <input type="radio" />
                                    <label htmlFor="">카드/현금 분할결제</label>
                                    <input type="radio" />
                                    <label htmlFor="">실전 렌탈</label>
                                    <input type="radio" />
                                    <label htmlFor="">초급 렌탈</label>
                                    <input type="radio" />
                                    <label htmlFor="">고급 렌탈</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">결제금액</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">기간</label>
                                <div>
                                    <Select />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                        <span>-</span>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">유료 기간</label>
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
                            <li className='fill-three'>
                                <label htmlFor="">신청 애널리스트</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">[소액투자반] 김최우</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">[소액투자반] 김최우</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">[소액투자반] 김최우</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">[소액투자반] 김최우</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                    <input type="radio" />
                                    <label htmlFor="">청개구리투자자문</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">결제 특이사항</label>
                                <div>
                                    <textarea name="" id=""></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="submit" value="결제" className='btn-point'/>
                    </div>
                </form>
            </DropBox>
            
            <DropBox title="관련 정보" arrow>
                <div className='boardBox'>
                    <button data-count="0" className={relatedBoard === 0 ? 'active' : ''} onClick={()=>setRelatedBoard(0)}>상담이력</button>
                    <button data-count="0" className={relatedBoard === 1 ? 'active' : ''} onClick={()=>setRelatedBoard(1)}>결제내역</button>
                    <button data-count="0" className={relatedBoard === 2 ? 'active' : ''} onClick={()=>setRelatedBoard(2)}>결제수정내역</button>
                    <button data-count="0" className={relatedBoard === 3 ? 'active' : ''} onClick={()=>setRelatedBoard(3)}>삭제된 결제내역</button>
                    <b className='total'>123</b>
                    <span className='page'>1/10</span>

                    {relatedBoard === 0 &&
                        <div className='board-scroll1'>
                            <div className="board-top">
                                <button>결제번호</button>
                                <button>결제구분</button>
                                <button>
                                    결제<br/>
                                    담당자
                                </button>
                                <button>
                                    신청<br/>
                                    애널리스트
                                </button>
                                <button>결제일</button>
                                <button>결제금액</button>
                                <button>환불일</button>
                                <button>환불금액</button>
                                <button>
                                    유료기간<br/>
                                    (서비스기간포함)
                                </button>
                                <span>환불/수정</span>
                            </div>
                            <ol className="board-center">
                                <li>
                                    <span>123456</span>
                                    <span>
                                        카드/현금<br/>
                                        분할결제
                                    </span>
                                    <span>홍길동</span>
                                    <span>
                                        [청투TV]<br/>
                                        재료주헌터
                                    </span>
                                    <time>2023/09/27</time>
                                    <span>300,000</span>
                                    <time>2023/09/27</time>
                                    <span>300,000</span>
                                    <time>
                                        2023/10/01<br/>
                                        ~2023/11/01
                                    </time>
                                    <div>
                                        <button className='popup'>환불</button>
                                        <button className='popup'>수정</button>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    }
                    {relatedBoard === 1 &&
                        <div className='board-scroll2'>
                            <div className="board-top">
                                <button>결제번호</button>
                                <button>항목</button>
                                <button>수정 전</button>
                                <button>수정 후</button>
                                <button>수정일</button>
                                <button>수정자</button>
                            </div>
                            <ol className="board-center">
                                <li>
                                    <span>123456</span>
                                    <span>유료기간 (서비스기간 포함)</span>
                                    <time>2023/10/01~2023/11/01</time>
                                    <time>2023/10/01~2023/11/01</time>
                                    <time>2023/10/01</time>
                                    <span>홍길동</span>
                                </li>
                            </ol>
                        </div>
                    }
                    {relatedBoard === 2 &&
                        <div className='board-scroll3'>
                            <div className="board-top">
                                <button>결제번호</button>
                                <button>결제구분</button>
                                <button>
                                    신청<br/>
                                    애널리스트
                                </button>
                                <button>결제일</button>
                                <button>결제금액</button>
                                <button>환불일</button>
                                <button>환불금액</button>
                                <button>
                                    유료기간<br/>
                                    (결제기준)
                                </button>
                                <button>
                                    유료기간<br/>
                                    (서비스기간포함)
                                </button>
                                <button>삭제일</button>
                                <button>삭제자</button>
                            </div>
                            <ol className="board-center">
                                <li>
                                    <span>123456</span>
                                    <span>
                                        카드/현금<br/>
                                        분할결제
                                    </span>
                                    <span>
                                        [청투TV]<br/>
                                        재료주헌터
                                    </span>
                                    <time>2023/09/27</time>
                                    <span>300,000</span>
                                    <span></span>
                                    <span></span>
                                    <time>
                                        2023/10/01<br/>
                                        ~2023/11/01
                                    </time>
                                    <time>
                                        2023/10/01<br/>
                                        ~2023/11/01
                                    </time>
                                    <time>2023/09/27</time>
                                    <span>홍길동</span>
                                </li>
                            </ol>
                        </div>
                    }
                    {relatedBoard === 3 &&
                        <div className='board-scroll4'>
                            <div className="board-top">
                                <button>상담상태</button>
                                <span>상담내용</span>
                                <button>담당자</button>
                                <button>등록일시</button>
                            </div>
                            <ol className="board-center">
                                <li>
                                    <span>분배(신규)</span>
                                    <span>
                                        주식교육 - 실전반 결제금액 150 결제일 23.09.01<br></br>
                                        특이사항 : 주식으로 돈버는 기술 - 실전반 (1년 무제한 이용권) + 데일리 실전강의 1년 무료
                                    </span>
                                    <span>홍길동</span>
                                    <time>2023/09/30 12:12</time>
                                </li>
                            </ol>
                        </div>
                    }

                    <div className='board-pagination' data-styleidx='a'>
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

                
            </DropBox>
        </>
    );
}

