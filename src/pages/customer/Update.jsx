import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { inputChange } from '../../api/validation';
import { DatePicker } from 'antd';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import dayjs from 'dayjs';
import Popup from '../../components/popup/Popup';
import Pager from '../../components/Pager';

export default function Update() {
    const [popup, setPopup] = useState()
    const { id } = useParams()
    return (
        <>
            <h2>
                고객 수정
                <Link to={'bulk'} className='btn-point'>대량 고객 등록</Link>
            </h2>

            <Basic id={id} popup={popup} setPopup={setPopup}/>

            <Payment id={id} popup={popup} setPopup={setPopup}/>
          
            <History id={id}/>

            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}


function Basic({ id, setPopup }){
    const [inputs, setInputs] = useState()
    const [sales, setSales] = useState()

    useEffect(()=>{
        api('customer', 'detail', {'customer_id': id})
            .then(({result, data})=>{
                if(result){
                    if(data.sales_admin_id){
                        setSales(data.sales_admin_name)
                    }
                    // console.log(data);
                    setInputs(data)
                }
            })
    },[id])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        api('customer', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }

    return (
        <>
            <DropBox title="기본 정보" open>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객구분</label>
                                <div>
                                    <Select type={'customer'} current={inputs?.customer_properties_id} changeName='customer_properties_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <Select type={'counsel'} current={inputs?.counsel_properties_id} changeName='counsel_properties_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">영업담당자</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={sales || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'sales',
                                            'func': (data)=>{
                                                setInputs((input)=>({...input, 'sales_admin_id': data.admin_id}))
                                                setSales(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">고객명</label>
                                <div>
                                    <input type="text" name='customer_name' id='customer_name' defaultValue={inputs?.customer_name} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">휴대폰</label>
                                <div>
                                    <input type="text" name='customer_mobile' id='customer_mobile' defaultValue={inputs?.customer_mobile} data-formet="numb" onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">체험 기간</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_start_date')} format={'YYYY-MM-DD'}/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_end_date')} value={dayjs(inputs?.experience_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                    </div>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="memo">메모</label>
                                <div>
                                    <textarea name="memo" id="memo" defaultValue={inputs?.memo} onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={'/customer/list'} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </DropBox>
        </>
    )
}


function Payment({ id, setPopup }){
    const [inputs, setInputs] = useState({ 'customer_id': id })
    const [paymentList, setPaymentList] = useState()
    const [analystList, setAnalystList] = useState()

    useEffect(()=>{
        api('properties', 'properties_list', {'classification_id': '4'})
            .then(({result, list})=>{
                if(result){
                    setPaymentList(list)
                }
            })

        
        api('user', 'analyst_list')
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setAnalystList(list)
                }
            })
    },[])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log(inputs);
        api('payment', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }

    return (
        <DropBox title="결제 정보" arrow>
            <form>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="">매출 구분</label>
                            <div>
                                <Select type='sales' setInputs={setInputs} changeName='sales_properties_id'/>
                            </div>
                        </li>
                        <li className='fill-two'>
                            <label htmlFor="">결제 구분</label>
                            { paymentList &&
                                <div>
                                    { paymentList.map((data)=>(
                                        <span key={data.properties_id}>
                                            <input type="radio" name='payment_properties_id' id={`payment_properties_${data.properties_id}`} value={data.properties_id} onChange={(e)=>inputChange(e, setInputs)}/>
                                            <label htmlFor={`payment_properties_${data.properties_id}`}>{ data.name }</label>
                                        </span>
                                    ))}
                                </div>
                            }
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="payment_price">결제금액</label>
                            <div>
                                <input type="text" name='payment_price' id='payment_price' data-formet="numb" onChange={(e)=>inputChange(e, setInputs)}/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">결제일</label>
                            <div>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date')} format={'YYYY-MM-DD'}/>
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
                                <Select type='period' setInputs={setInputs} changeName='period'/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">유료 기간<span>결제기준</span></label>
                            <div>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_start_date')} format={'YYYY-MM-DD'}/>
                                    <span>-</span>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_end_date')} format={'YYYY-MM-DD'}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">유료 기간<span>서비스기간 포함</span></label>
                            <div>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_start_date')} format={'YYYY-MM-DD'}/>
                                    <span>-</span>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_end_date')} format={'YYYY-MM-DD'}/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <ul>
                        <li className='fill-three'>
                            <label htmlFor="">신청 애널리스트</label>
                            { analystList &&
                                <div>
                                    { analystList.map((data)=>(
                                        <span key={data.admin_id}>
                                            <input type="radio" name='product_id' id={`product_${data.admin_id}`} value={data.admin_id} onChange={(e)=>inputChange(e, setInputs)}/>
                                            <label htmlFor={`product_${data.admin_id}`}>
                                                { data.department_name && `[${data.department_name}]`}
                                                { data.name }
                                            </label>
                                        </span>
                                    ))}
                                </div>
                            }
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <ul>
                        <li className='fill-three'>
                            <label htmlFor="memo">결제 특이사항</label>
                            <div>
                                <textarea name='memo' id='memo' onChange={(e)=>inputChange(e, setInputs)}></textarea>
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <div>
                    <input type="submit" value="결제" className='btn-point' 
                        onClick={(e)=>{
                            e.preventDefault()
                            setPopup({
                                'type': 'finFunc',
                                'title': '결제',
                                'description': `결제를 진행하시겠습니까?`,
                                'func': onSubmit
                            })
                        }}
                    />
                </div>
            </form>
        </DropBox>
    )
}

function History({ id }){
    const [relatedActive, setRelatedActive] = useState(0);
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1', 'customer_id': id});
    const [paymentInfo, setPaymentInfo] = useState()
    const [historyPayment, setHistoryPayment] = useState()
    const [historyUpdata, setHistoryUpdata] = useState()
    const [updateInfo, setUpdateInfo] = useState()

    const [refundPopupActive, setRefundPopupActive] = useState()
    const [updatePopupActive, setUpdatePopupActive] = useState()

    useEffect(()=>{
        api('payment','user_payment_list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setPaymentInfo(data)
                    setHistoryPayment(list)
                    // console.log(data);
                }
            })
        
        
        api('payment','user_payment_history_list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setUpdateInfo(data)
                    setHistoryUpdata(list)
                    // console.log(list);
                }
            })
    },[inputs])

    return(
        <>
            <DropBox title="관련 정보" arrow>
                <div className='boardBox'>
                    <button data-count="0" className={relatedActive === 0 ? 'active' : ''} onClick={()=>setRelatedActive(0)}>상담이력</button>
                    <button data-count={paymentInfo?.total_count} className={relatedActive === 1 ? 'active' : ''} onClick={()=>setRelatedActive(1)}>결제내역</button>
                    <button data-count={updateInfo?.total_count} className={relatedActive === 2 ? 'active' : ''} onClick={()=>setRelatedActive(2)}>결제수정내역</button>
                    <button data-count="0" className={relatedActive === 3 ? 'active' : ''} onClick={()=>setRelatedActive(3)}>삭제된 결제내역</button>
                    {/* <b className='total'>123</b>
                    <span className='page'>1/10</span> */}

                    {relatedActive === 0 &&
                        <HistoryConsult />
                    }
                    {relatedActive === 1 &&
                        <>
                            <b className='total'>{ paymentInfo?.total_count }</b>
                            <span className='page'>{ paymentInfo?.current_page }/{ paymentInfo?.total_page }</span>
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
                                { historyPayment && 
                                    <ol className="board-center">
                                        { historyPayment.map((data)=>(
                                            <li key={ data.payment_id }>
                                                <span>{ data.payment_id }</span>
                                                <span>{ data.payment_properties_name }</span>
                                                <span>{ data.payment_person_in_charge_name }</span>
                                                <span>{ data.product_name.replaceAll(' ','\n') }</span>
                                                <time>{ data.payment_date.replaceAll('-','/') }</time>
                                                <span>{ data.payment_price }</span>
                                                <time>{ data?.refund_date?.replaceAll('-','/') }</time>
                                                <span>{ data?.refund_price }</span>
                                                <time>
                                                    { data.standard_service_end_date.replaceAll('-','/') }<br/>
                                                    ~ { data.standard_service_start_date.replaceAll('-','/') }
                                                </time>
                                                <div>
                                                    <button className='popup' onClick={()=>setRefundPopupActive({'type': 'children', 'id': data.payment_id})}>환불</button>
                                                    <button className='popup' onClick={()=>setUpdatePopupActive({'type': 'children', 'id': data.payment_id})}>수정</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                }
                            </div>
                            <div className='board-pagination' data-styleidx='a'>
                                <Pager pagerInfo={paymentInfo} setInputs={setInputs}/>
                            </div>
                        </>
                    }
                    {relatedActive === 2 &&
                        <>
                            <div className='board-scroll2'>
                                <div className="board-top">
                                    <button>결제번호</button>
                                    <button>항목</button>
                                    <button>수정 전</button>
                                    <button>수정 후</button>
                                    <button>수정일</button>
                                    <button>수정자</button>
                                </div>
                
                                
                                { historyUpdata && 
                                    <ol className="board-center">
                                        { historyUpdata.map((data, i)=>(
                                            <li key={ i }>
                                                <span>{ data.payment_id }</span>
                                                <span>{ data.item }</span>
                                                <time>{ data.modify_before_info.replaceAll('-', '/') }</time>
                                                <time>{ data.modify_after_info.replaceAll('-', '/') }</time>
                                                <time>{ data.reg_date.split(' ')[0] }</time>
                                                <span>{ data.modify_admin_name }</span>
                                            </li>
                                        ))}
                                    </ol>
                                }
                            </div>
                            <div className='board-pagination' data-styleidx='a'>
                                <Pager pagerInfo={updateInfo} setInputs={setInputs}/>
                            </div>
                        </>
                    }
                    {relatedActive === 3 &&
                        <HistoryDelete />
                    }

                    
                </div>
            </DropBox>
            { refundPopupActive &&
                <RefundPopup refundPopupActive={refundPopupActive} setRefundPopupActive={setRefundPopupActive}/>
            }
            { updatePopupActive &&
                <UpdatePopup updatePopupActive={updatePopupActive} setUpdatePopupActive={setUpdatePopupActive}/>
            }
        </>
    )
}

function HistoryDelete(){
    return (
        <>
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
            <div className='board-pagination' data-styleidx='a'>
                <Link to={''}>첫 페이지</Link>
                <Link to={''}>이전 페이지</Link>
                <ol>
                    <li className='active'><Link to={''}>1</Link></li>
                </ol>
                <Link to={''}>다음 페이지</Link>
                <Link to={''}>마지막 페이지</Link>
            </div>
        </>
    )
}

function HistoryConsult(){
    return (
        <>
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
            <div className='board-pagination' data-styleidx='a'>
                <Link to={''}>첫 페이지</Link>
                <Link to={''}>이전 페이지</Link>
                <ol>
                    <li className='active'><Link to={''}>1</Link></li>
                </ol>
                <Link to={''}>다음 페이지</Link>
                <Link to={''}>마지막 페이지</Link>
            </div>
        </>
    )
}

function RefundPopup({ refundPopupActive, setRefundPopupActive }){
    const [inputs, setInputs] = useState({'payment_id': refundPopupActive.id})
    const [info, setInfo] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('payment', 'detail', {'payment_id': refundPopupActive.id})
            .then(({result, data})=>{
                if(result){
                    console.log(data);
                    setInfo(data)
                }
            })
    },[])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log(inputs);
        api('payment', 'refund', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setRefundPopupActive('')
                        }
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })

    }

    return (
        <>
            <Popup popup={refundPopupActive} setPopup={setRefundPopupActive}>
                <div className="refundPopup">
                    <strong>환불</strong>
                    <b>결제 정보</b>
                    <table>
                        <tbody>
                            <tr>
                                <th>신청 애널리스트</th>
                                <th>매출 구분</th>
                                <th>결제 구분</th>
                                <th>결제일</th>
                                <th>결제금액</th>
                            </tr>
                            <tr>
                                <td>{ info?.product_name }</td>
                                <td>{ info?.sales_properties_name }</td>
                                <td>{ info?.payment_properties_name }</td>
                                <td>{ info?.payment_date.replaceAll('-', '/') }</td>
                                <td>{ info?.payment_price }</td>
                            </tr>
                            <tr>
                                <th>기간</th>
                                <th>유료기간 (결제기준)</th>
                                <th>유료기간 (서비스기간 포함)</th>
                            </tr>
                            <tr>
                                <td>{ info?.period }</td>
                                <td>
                                    { info?.standard_payment_start_date.replaceAll('-', '/') }
                                    ~
                                    { info?.standard_payment_end_date.replaceAll('-', '/') }
                                </td>
                                <td>
                                    { info?.standard_service_start_date.replaceAll('-', '/') }
                                    ~
                                    { info?.standard_service_end_date.replaceAll('-', '/') }
                                </td>
                            </tr>
                            <tr>
                                <th>결제 특이사항</th>
                            </tr>
                            <tr>
                                <td>{ info?.memo || '없음' }</td>
                            </tr>
                        </tbody>
                    </table>

                    <form>
                        <fieldset>
                            <b>환불 처리</b>
                            <ul>
                                <li>
                                    <label htmlFor="">환불 구분</label>
                                    <div>
                                        <Select type='refund' setInputs={setInputs} changeName='refund_properties_id'/>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">환불일</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'refund_date')} format={'YYYY-MM-DD'}/>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="refund_price">환불금액</label>
                                    <div>
                                        <input type="text" name='refund_price' id='refund_price' data-formet="numb" onChange={(e)=>inputChange(e, setInputs)}/>
                                    </div>
                                </li>
                            </ul>
                            <ul className='settingArea' data-subtext="*환불 금액에 따른 이용기간이 변경되는 경우 설정하세요.">
                                <li>
                                    <label htmlFor="">기간</label>
                                    <div>
                                        <Select type='period' setInputs={setInputs} changeName='period'/>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">유료 기간<span>결제기준</span></label>
                                    <div>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_start_date')} format={'YYYY-MM-DD'}/>
                                            <span>-</span>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_end_date')} format={'YYYY-MM-DD'}/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">유료 기간<span>서비스 기간 포함</span></label>
                                    <div>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_start_date')} format={'YYYY-MM-DD'}/>
                                            <span>-</span>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_end_date')} format={'YYYY-MM-DD'}/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label htmlFor="memo">환불 특이사항</label>
                                    <div>
                                        <textarea name="memo" id="memo" onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                        <div className="btnArea-end">
                            <button type="button" className='btn-gray-white' onClick={()=>setRefundPopupActive('')}>닫기</button>
                            <input type="submit" value='저장' className='btn-point' onClick={onSubmit}/>
                        </div>
                    </form>
                </div>
            </Popup>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}

function UpdatePopup({ updatePopupActive, setUpdatePopupActive }){
    const [inputs, setInputs] = useState({'payment_id': updatePopupActive.id})
    const [paymentList, setPaymentList] = useState()
    const [analystList, setAnalystList] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('properties', 'properties_list', {'classification_id': '4'})
            .then(({result, list})=>{
                if(result){
                    setPaymentList(list)
                }
            })

        
        api('user', 'analyst_list')
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setAnalystList(list)
                }
            })

        api('payment', 'detail', inputs)
            .then(({result, data})=>{
                if(result){
                    console.log(data);
                    setInputs((input)=>({...input, ...data}))
                }
            })
    },[])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log(inputs);
        api('payment', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setUpdatePopupActive('')
                        }
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }


    return (
        <>
            <Popup popup={updatePopupActive} setPopup={setUpdatePopupActive}>
                <div className='updatePopup'>
                    <strong>수정</strong>
                    <form>
                        <fieldset>
                            <ul>
                                <li>
                                    <label htmlFor="">매출 구분</label>
                                    <div>
                                        <Select type='sales' current={inputs?.sales_properties_id} setInputs={setInputs} changeName='sales_properties_id'/>
                                    </div>
                                </li>
                                <li className='fill-two'>
                                    <label htmlFor="">결제 구분</label>
                                    { paymentList &&
                                        <div>
                                            { paymentList.map((data)=>(
                                                <span key={data.properties_id}>
                                                    <input type="radio" 
                                                        name='payment_properties_id'
                                                        id={`payment_properties_update_${data.properties_id}`} 
                                                        defaultChecked={inputs.payment_properties_id === data.properties_id}
                                                        value={data.properties_id} 
                                                        onChange={(e)=>inputChange(e, setInputs)}
                                                    />
                                                    <label htmlFor={`payment_properties_update_${data.properties_id}`}>{ data.name }</label>
                                                </span>
                                            ))}
                                        </div>
                                    }
                                </li>
                            </ul>
                        </fieldset>
                        <fieldset>
                            <ul>
                                <li>
                                    <label htmlFor="payment_price">결제금액</label>
                                    <div>
                                        <input type="text" name='payment_price' id='payment_price' data-formet="numb" defaultValue={inputs.payment_price} onChange={(e)=>inputChange(e, setInputs)}/>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">결제일</label>
                                    <div>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date')} value={dayjs(inputs?.payment_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
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
                                        <Select type='period' setInputs={setInputs} current={inputs?.period} changeName='period'/>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">유료 기간<span>결제기준</span></label>
                                    <div>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_start_date')} value={dayjs(inputs?.standard_payment_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                            <span>-</span>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_end_date')} value={dayjs(inputs?.standard_payment_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">유료 기간<span>서비스기간 포함</span></label>
                                    <div>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_start_date')} value={dayjs(inputs?.standard_service_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                            <span>-</span>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_end_date')} value={dayjs(inputs?.standard_service_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                        <fieldset>
                            <ul>
                                <li className='fill-three'>
                                    <label htmlFor="">신청 애널리스트</label>
                                    { analystList &&
                                        <div>
                                            { analystList.map((data)=>(
                                                <span key={data.admin_id}>
                                                    <input type="radio" 
                                                        name='product_id'
                                                        id={`product_update_${data.admin_id}`}
                                                        defaultChecked={inputs?.product_id === data.product_id}
                                                        value={data.admin_id}
                                                        onChange={(e)=>inputChange(e, setInputs)}
                                                    />
                                                    <label htmlFor={`product_update_${data.admin_id}`}>
                                                        { data.department_name && `[${data.department_name}]`}
                                                        { data.name }
                                                    </label>
                                                </span>
                                            ))}
                                        </div>
                                    }
                                </li>
                            </ul>
                        </fieldset>
                        <fieldset>
                            <ul>
                                <li className='fill-three'>
                                    <label htmlFor="memo">결제 특이사항</label>
                                    <div>
                                        <textarea name='memo' id='memo' onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                        <div className='btnArea-end'>
                            <input type="submit" value="저장" className='btn-point' 
                                onClick={onSubmit}
                            />
                        </div>
                    </form>
                </div>
            </Popup>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}

