import React, { useEffect, useId, useState } from 'react';
import { api } from '../../api/api';
import { inputChange } from '../../api/validation';
import Popup from '../../components/popup/Popup';
import Select from '../../components/Select';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function UpdatePopup({ updatePopupActive, setUpdatePopupActive, currentData }) {
    const uuid = useId()
    const [inputs, setInputs] = useState({'payment_id': updatePopupActive.id})
    const [paymentList, setPaymentList] = useState()
    const [productList, setProductList] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('properties', 'properties_list', {'classification_id': '4'})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setPaymentList(list)
                }
            })

        api('payment', 'detail', {'payment_id': updatePopupActive.id})
            .then(({result, data})=>{
                if(result){
                    // console.log(data);
                    setInputs((input)=>({...input, ...data}))
                }
            })

        api('product', 'list', {'all_yn': 'y'})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    // setAnalystList(list)
                    setProductList(list)
                }
            })
    },[setInputs, updatePopupActive.id])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log(inputs);
        // console.log(inputs?.payment_price);
        // console.log(!inputs?.payment_price);
        if(!inputs?.payment_price){
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': '결제금액을 입력해주세요.'
            })
        }
        api('payment', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setUpdatePopupActive('')
                            currentData()
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
                                        <Select type='salesProperties' current={inputs?.sales_properties_id} setInputs={setInputs} changeName='sales_properties_id'/>
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
                                                        id={`payment_properties_update_${data.properties_id}_${uuid}`} 
                                                        checked={inputs.payment_properties_id === data.properties_id}
                                                        value={data.properties_id} 
                                                        onChange={(e)=>inputChange(e, setInputs)}
                                                    />
                                                    <label htmlFor={`payment_properties_update_${data.properties_id}_${uuid}`}>{ data.name }</label>
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
                                    <label htmlFor="">상품명</label>
                                    {
                                        productList && 
                                        <div>
                                            { productList.map((data)=>(
                                                <span key={data.product_id}>
                                                    <input type="radio" name='product_id' id={`product_${data.product_id}_${uuid}`} value={data.product_id} defaultChecked={data.product_id === inputs?.product_id} onChange={(e)=>inputChange(e, setInputs)}/>
                                                    <label htmlFor={`product_${data.product_id}_${uuid}`}>
                                                        { data.product_name }
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
                                        <textarea name='memo' id='memo' defaultValue={inputs.memo} onChange={(e)=>inputChange(e, setInputs)}></textarea>
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

