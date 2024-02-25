import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { numberWithCommas } from '../../api/validation';

export default function PopupPayHistory({ close, popup}) {
    const [boardList, setBoardList] = useState()


    useEffect(()=>{
        api('payment', 'list', {'limit': '3', 'page': '1', 'customer_id': popup.id})
            .then(({result, list})=>{
                if(result){
                    setBoardList(()=>{
                        return list.map((listData, i )=>{
                            return {...listData, 'no': list.length - i}
                        })
                    })
                    // console.log(list);
                }
            })
    },[popup.id])

    return (
        <>
            <strong>결제 기록</strong>
            <div className='boardBox'>
                <div className="board-scroll">
                    <div className="board-top">
                        <span>No.</span>
                        <span>결제번호</span>
                        <span>휴대폰</span>
                        <span>이름</span>
                        <span>출처</span>
                        <span>담당자</span>
                        <span>부서</span>
                        <span>결제일</span>
                        <span>결제상품</span>
                        <span>결제방식</span>
                        <span>결제금액</span>
                        <span>환불일</span>
                        <span>환불금액</span>
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
                                    <span>{ data.no }</span>
                                    <span>{ data.payment_id }</span>
                                    <span>{ data.customer_mobile }</span>
                                    <span>{ data.customer_name }</span>
                                    <span>{ data.source }</span>
                                    <span>{ data.payment_person_in_charge_name }</span>
                                    <span>{ data.department_name }</span>
                                    <time>{ data.payment_date }</time>
                                    <span>{ data.product_name }</span>
                                    <span>{ data.payment_properties_name}</span>
                                    <span>{ data.payment_price ? numberWithCommas(data.payment_price) : '0' }</span>
                                    <time>{ data.refund_date }</time>
                                    <span>{ data.refund_price ? numberWithCommas(data.refund_price) : '0' }</span>
                                    <span>
                                        { data.payment_chasu }
                                            회차 결제
                                    </span>
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
                </div>
                <button className='btn-gray-white' onClick={close}>닫기</button>
            </div>
        </>
    );
}

