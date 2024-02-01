import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import { api } from '../../api/api';
import Pager from '../../components/Pager';

export default function List() {
    const [boardList, setBoardList] = useState()

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <h2>
                결제 목록
                <Link to="registration" className='btn-point'>대량결제 등록</Link>
            </h2>
            <DropBox title="검색 항목" arrow>
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
                                <label htmlFor="">출처</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">신청 애널리스트</label>
                                <div>
                                    <input type="search" />
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
                                    <input type="search" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제상품</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제방식</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">결제일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={onChange} />
                                        <span>-</span>
                                        <DatePicker onChange={onChange} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제 기준 검색</label>
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
                                <label htmlFor="">서비스기간 포함 검색</label>
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
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">매출구분</label>
                                <div>
                                    <input type="checkbox" />
                                    <label htmlFor="">신규결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">추가결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">재결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">오결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">상품변경</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">잔금</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">민원재결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">특별반</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">실전렌탈</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">초급렌탈</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">평생회원</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">목표수익반</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">목표수익반</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">청투TV</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">JL투자그룹</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">매출구분</label>
                                <div>
                                    <input type="checkbox" />
                                    <label htmlFor="">재결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">오결제</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">민원</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">상품변경</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">금액할인</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">수수료</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">서비스불만</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">운용손실</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">개인사정</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -재결제
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -오결제
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -민원
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -상품변경
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -금액할인
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -수수료
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -수수료
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -운용손실
                                    </label>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        환불대기<br/>
                                        -개인사정
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">매출구분</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">환불일 기준</label>
                                    <input type="radio" />
                                    <label htmlFor="">초기결제일 기준</label>
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

            <Board boardList={boardList} setBoardList={setBoardList}/>
        </>
    );
}

function Board({ boardList, setBoardList }){
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [pagerInfo, setPagerInfo] = useState()

    useEffect(()=>{
        api('payment', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setBoardList(list)
                    // console.log(list);
                }
            })
    },[inputs, setBoardList])

    return (
        <>
            <div className='boardBox'>
                <strong>목록</strong>
                <button className='btn-gray-black'>엑셀 다운로드</button>
                <hr className='case01'/>

                <table className='board-table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>결제건수</th>
                            <th>결제합계금액</th>
                            <th>취소건수</th>
                            <th>취소금액</th>
                            <th>총매출금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>2023년 10월</b></td>
                            <td>105</td>
                            <td>12,000,000원</td>
                            <td>2</td>
                            <td>300,000원</td>
                            <td><mark>11,500,000원</mark></td>
                        </tr>
                    </tbody>
                </table>

                
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>

                <div className="board-scroll">
                    <div className="board-top">
                        <button>No.</button>
                        <button>결제번호</button>
                        <button>휴대폰</button>
                        <button>이름</button>
                        <button>출처</button>
                        <button>담당자</button>
                        <button>부서</button>
                        <button>결제일</button>
                        <button>결제상품</button>
                        <button>결제방식</button>
                        <button>결제금액</button>
                        <button>환불일</button>
                        <button>환불금액</button>
                        <span>결제기록</span>
                        <div title='결제기준'>
                            <button>시작일</button>
                            <button>종료일</button>
                        </div>
                        <div title='서비스 기간 포함'>
                            <button>시작일</button>
                            <button>종료일</button>
                        </div>
                    </div>
                    { boardList && 
                        <ol className="board-center">
                            { boardList.map((data, i)=>(
                                <li key={i}>
                                    <span>{ data.source }</span>
                                    <span>{ data.payment_id }</span>
                                    <span>{ data.customer_mobile }</span>
                                    <span>{ data.customer_name }</span>
                                    <span>{ }청투TV</span>
                                    <span>{ data.payment_person_in_charge_name }</span>
                                    <span>{ data.department_name }</span>
                                    <time>{ data.payment_date }</time>
                                    <span>{ data.product_name }</span>
                                    <span>{ data.payment_properties_name}</span>
                                    <span>{ data.payment_price }</span>
                                    <time>{ data.refund_date }</time>
                                    <span>{ data.refund_price }</span>
                                    <button className='popup'>{ data.payment_chasu }회차 결제</button>
                                    <div>
                                        <span>{ data.standard_payment_start_date }</span>
                                        <span>{ data.standard_payment_end_date }</span>
                                    </div>
                                    <div>
                                        <span>{ data.standard_service_start_date }</span>
                                        <span>{ data.standard_service_end_date }</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    }

                    {/* <ol className="board-center">
                        <li>
                            <span>123456</span>
                            <span>123456</span>
                            <span>01055558888</span>
                            <span>홍길동</span>
                            <span>청투TV</span>
                            <span>청개구리</span>
                            <span>역삼1팀</span>
                            <time>2023/10/01</time>
                            <span>
                                [청투TV] 재료주헌터
                                헌터헌터
                            </span>
                            <span>카드</span>
                            <span>500,000</span>
                            <time>2023/10/01</time>
                            <span>500,000</span>
                            <button className='popup'>3회차 결제</button>
                            <div>
                                <span>2023/09/01</span>
                                <span>2023/09/30</span>
                            </div>
                            <div>
                                <span>2023/09/01</span>
                                <span>2023/09/30</span>
                            </div>
                        </li>
                    </ol> */}

                </div>

                <div className='board-pagination' data-styleidx='a'>
                    <Select type="pagerCount" current={inputs.limit} setInputs={setInputs} changeName='limit'/>
                    <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                </div>
            </div>
        </>
    )
}