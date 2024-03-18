import React, { useCallback, useContext, useEffect, useId, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { inputChange, numberWithCommas, onSort } from '../../api/validation';
import { DatePicker } from 'antd';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import dayjs from 'dayjs';
import Popup from '../../components/popup/Popup';
import { UserContext } from '../../context/UserContext';
import BoardChkDelete from '../../components/boardChk/BoardChkDelete';
import BoardChkAll from '../../components/boardChk/BoardChkAll';
import BoardChk from '../../components/boardChk/BoardChk';
import PagerButton from '../../components/PagerButton';
import { logButton } from '../../api/common';

export default function Update() {
    const { pagePermission } = useContext(UserContext)

    const [popup, setPopup] = useState()
    const { id } = useParams()
    const [paymentInfo, setPaymentInfo] = useState()
    const [historyPayment, setHistoryPayment] = useState()
    const [counselValue, setCounselValue] = useState()

    const historyPaymentFunc = useCallback((inputs)=>{
        // console.log(inputs);
        api('payment','user_payment_list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPaymentInfo(data)
                    setHistoryPayment(list)
                    // console.log(list);
                }
            })
    },[])

    return (
        <>
            <h2>
                고객 수정
            </h2>

            <Basic id={id} popup={popup} setPopup={setPopup} counselValue={counselValue} setCounselValue={setCounselValue}/>

            { pagePermission?.update_yn === 'y' &&
                <Payment id={id} popup={popup} setPopup={setPopup} historyPaymentFunc={historyPaymentFunc}/>
            }
          
            <History id={id} paymentInfo={paymentInfo} counselValue={counselValue} setCounselValue={setCounselValue} historyPayment={historyPayment} setHistoryPayment={setHistoryPayment} historyPaymentFunc={historyPaymentFunc}/>

            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}


function Basic({ id, setPopup, counselValue, setCounselValue }){
    const { pagePermission } = useContext(UserContext)
    // console.log(pagePermission);
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
                    setCounselValue(data.counsel_properties_id)
                    setInputs(data)
                }
            })
    },[id, setCounselValue])

    useEffect(()=>{
        // console.log(counselValue);
        setInputs((input)=>({...input, 'counsel_properties_id': counselValue}))
    },[counselValue])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onDateBlur = (e, name) => {
        let value = e.target.value.replace(/-/g, "");
        if(/^\d+$/.test(value) && value.length < 9){
            if((0 < value && value < 13)){
                value = `2000-${value}-01`
            }else if(value === '0'){
                value = `2000-01-01`
            }else if(value.length === 2){
                value = `20${value}-01-01`
            }else if(value.length === 3){
                value = `2${value}-01-01`
            }else if(value.length === 4){
                value = `${value}-01-01`
            }else{
                const year = value.substring(0, 4)
                let month = value.substring(4, 6)
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = value.substring(6, 8)
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : 0 + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, name)
        }
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        if(!inputs?.customer_properties_id || !inputs?.counsel_properties_id || !inputs?.sales_admin_id || !inputs?.customer_name || inputs?.customer_mobile?.length !== 11){
            let errorMessage = ''
            setPopup(()=>({
                'type': 'confirm',
                'title': '실패',
            }))
            if(!inputs?.customer_properties_id){
                errorMessage = '고객구분을 선택해주세요.'
            }else if(!inputs?.counsel_properties_id){
                errorMessage = '상담상태를 선택해주세요.'
            }else if(!inputs?.sales_admin_id){
                errorMessage = '영업담당자를 선택해주세요.'
            }else if(!inputs?.customer_name){
                errorMessage = '고객명을 입력해주세요.'
            }else if(!inputs?.customer_mobile || inputs?.customer_mobile?.length !== 11){
                console.log(inputs?.customer_mobile);
                console.log(inputs?.customer_mobile?.length);
                console.log(inputs?.customer_mobile?.length !== 11);
                errorMessage = '휴대폰 번호를 입력해주세요.'
            }
            setPopup((popup)=>({
                ...popup,
                'description': errorMessage
            }))
            return
        }
        // api('customer', 'update', {'customer_id': inputs.customer_id, 'counsel_properties_id': inputs.counsel_properties_id})
        api('customer', 'update', {...inputs})
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': () =>{
                            setCounselValue(inputs.counsel_properties_id)
                        }
                    }))
                    logButton('고객 수정(수정)')
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
                                    <Select type={'customer'} current={inputs?.customer_properties_id} changeName='customer_properties_id' setInputs={setInputs} disabled={pagePermission?.update_yn === 'n'}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <Select type={'counsel'} current={inputs?.counsel_properties_id} changeName='counsel_properties_id' setInputs={setInputs} disabled={pagePermission?.update_yn === 'n'}/>
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
                                        disabled={pagePermission?.update_yn === 'n'}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" onClick={()=>console.log(inputs)}>고객명</label>
                                <div>
                                    <input type="text" name='customer_name' id='customer_name' value={inputs?.customer_name || ''} onChange={(e)=>inputChange(e, setInputs)} disabled={pagePermission?.update_yn === 'n'}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">휴대폰</label>
                                <div>
                                    <input type="text" name='customer_mobile' id='customer_mobile' value={inputs?.customer_mobile || ''} data-formet="numb" onChange={(e)=>inputChange(e, setInputs)} disabled={pagePermission?.update_yn === 'n'}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">체험 기간</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_start_date')} onBlur={(e)=>onDateBlur(e, 'experience_start_date')} value={dayjs(inputs?.experience_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} disabled={pagePermission?.update_yn === 'n'}/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_end_date')} onBlur={(e)=>onDateBlur(e, 'experience_end_date')} value={dayjs(inputs?.experience_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} disabled={pagePermission?.update_yn === 'n'}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="source">출처</label>
                                <div>
                                    <input type="text" name='source' id='source' defaultValue={inputs?.source} onChange={(e)=>inputChange(e, setInputs)} disabled={pagePermission?.update_yn === 'n'}/>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="memo">메모</label>
                                <div>
                                    <textarea name="memo" id="memo" defaultValue={inputs?.memo} onChange={(e)=>inputChange(e, setInputs)} disabled={pagePermission?.update_yn === 'n'}></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={'/customer/list'} className='btn-gray-white'>목록</Link>
                        { pagePermission?.update_yn === 'y' &&
                            <input type="submit" value="수정" className='btn-point' onClick={onSubmit}/>
                        }
                    </div>
                </form>
            </DropBox>
        </>
    )
}

function Payment({ id, historyPaymentFunc, setPopup }){
    const [inputs, setInputs] = useState({ 'customer_id': id })
    const [paymentList, setPaymentList] = useState()
    const [productList, setProductList] = useState()

    useEffect(()=>{
        api('properties', 'properties_list', {'classification_id': '4'})
            .then(({result, list})=>{
                if(result){
                    setPaymentList(list)
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
    },[])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onDateBlur = (e, name) => {
        let value = e.target.value.replace(/-/g, "");
        if(/^\d+$/.test(value) && value.length < 9){
            if((0 < value && value < 13)){
                value = `2000-${value}-01`
            }else if(value === '0'){
                value = `2000-01-01`
            }else if(value.length === 2){
                value = `20${value}-01-01`
            }else if(value.length === 3){
                value = `2${value}-01-01`
            }else if(value.length === 4){
                value = `${value}-01-01`
            }else{
                const year = value.substring(0, 4)
                let month = value.substring(4, 6)
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = value.substring(6, 8)
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : 0 + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, name)
        }
    };

    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log('초기화 어떻게 만들지');
        // setInputs({ 'customer_id': id })
        // console.log(inputs);
        if(
            !inputs?.sales_properties_id || 
            !inputs?.payment_properties_id || 
            !inputs?.payment_price || 
            !inputs?.payment_date || 
            !inputs?.product_id ||
            !inputs?.period ||
            !inputs?.standard_payment_start_date ||
            !inputs?.standard_payment_end_date ||
            !inputs?.standard_service_end_date ||
            !inputs?.standard_service_start_date
        ){
            let errorMessage = ''
            setPopup(()=>({
                'type': 'confirm',
                'title': '실패',
            }))
            if(!inputs?.sales_properties_id){
                errorMessage='매출 구분을 선택해주세요.'
            }else if(!inputs?.payment_properties_id){
                errorMessage='결제 구분을 선택해주세요.'
            }else if(!inputs?.payment_price){
                errorMessage='결제금액을 입력해주세요.'
            }else if(!inputs?.payment_date){
                errorMessage='결제일을 선택해주세요.'
            }else if(!inputs?.period){
                errorMessage='기간을 선택해주세요.'
            }else if(!inputs?.standard_payment_start_date || !inputs?.standard_payment_end_date){
                errorMessage='유료기간(결제 기준)을 선택해주세요.'
            }else if(!inputs?.standard_service_start_date || !inputs?.standard_service_end_date){
                errorMessage='유료기간(서비스기간 포함)을 선택해주세요.'
            }else if(!inputs?.product_id){
                errorMessage='상품명을 선택해주세요.'
            }
            setPopup((popup)=>({
                ...popup,
                'description': errorMessage
            }))
            return
        }
        setPopup({
            'type': 'finFunc',
            'title': '결제',
            'description': `결제를 진행하시겠습니까?`,
            'func': ()=>{
                api('payment', 'insert', inputs)
                    .then(({result, error_message})=>{
                        // if(error_message.includes('sales_properties_id')){
                        //     error_message = '매출 구분을 선택해주세요.'
                        // }else if(error_message.includes('payment_properties_id')){
                        //     error_message = '결제 구분을 선택해주세요.'
                        // }else if(error_message.includes('payment_price')){
                        //     error_message = '결제금액을 입력해주세요.'
                        // }else if(error_message.includes('payment_date')){
                        //     error_message = '결제일을 선택해주세요.'
                        // }else if(error_message.includes('product_id')){
                        //     error_message = '상품명을 선택해주세요.'
                        // }else if(error_message.includes('period')){
                        //     error_message = '기간을 선택해주세요.'
                        // }else if(error_message.includes('standard_payment')){
                        //     error_message = '유료기간(결제 기준)을 선택해주세요.'
                        // }else if(error_message.includes('standard_service')){
                        //     error_message = '유료기간(서비스기간 포함)을 선택해주세요.'
                        // }
                        setPopup({'type': 'confirm', 'description': error_message})
                        if(result){
                            setPopup((popup)=>({
                                ...popup,
                                'title': '완료',
                                confirmFunc: () => {
                                    historyPaymentFunc({'limit': '10', 'page': '1', 'customer_id': id})
                                    window.location.reload();
                                }
                            }))
                            logButton('고객 수정(결제)')
                        }else{
                            setPopup((popup)=>({
                                ...popup,
                                'title': '실패',
                            }))
                        }
                    })
            }
        })
    }

    return (
        <DropBox title="결제 정보" arrow>
            <form>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="" className='required' onClick={()=>console.log(inputs)}>매출 구분</label>
                            <div>
                                <Select type='salesProperties' current={inputs?.salesProperties || false} setInputs={setInputs} changeName='sales_properties_id'/>
                            </div>
                        </li>
                        <li className='fill-two'>
                            <label htmlFor="" className='required'>결제 구분</label>
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
                            <label htmlFor="payment_price" className='required'>결제금액</label>
                            <div>
                                <input type="text" name='payment_price' id='payment_price' data-formet="numb" onChange={(e)=>inputChange(e, setInputs)}/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="" className='required'>결제일</label>
                            <div>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date')} onBlur={(e)=>onDateBlur(e, 'payment_date')}  format={'YYYY-MM-DD'} placeholder='날짜 선택'/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="" className='required'>기간</label>
                            <div>
                                <Select type='period' setInputs={setInputs} changeName='period'/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="" className='required'>유료 기간<span>결제기준</span></label>
                            <div>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_start_date')} onBlur={(e)=>onDateBlur(e, 'standard_payment_start_date')} format={'YYYY-MM-DD'} placeholder='시작일'/>
                                    <span>-</span>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_end_date')} onBlur={(e)=>onDateBlur(e, 'standard_payment_end_date')} format={'YYYY-MM-DD'} placeholder='종료일'/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="" className='required'>유료 기간<span>서비스기간 포함</span></label>
                            <div>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_start_date')} onBlur={(e)=>onDateBlur(e, 'standard_service_start_date')} format={'YYYY-MM-DD'} placeholder='시작일'/>
                                    <span>-</span>
                                    <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_end_date')} onBlur={(e)=>onDateBlur(e, 'standard_service_end_date')} format={'YYYY-MM-DD'} placeholder='종료일'/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <ul>
                        <li className='fill-three'>
                            <label htmlFor="" className='required'>상품명</label>
                            {
                                productList && 
                                <div>
                                    { productList.map((data)=>(
                                        <span key={data.product_id}>
                                            <input type="radio" name='product_id' id={`product_${data.product_id}`} value={data.product_id} onChange={(e)=>inputChange(e, setInputs)}/>
                                            <label htmlFor={`product_${data.product_id}`}>
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
                                <textarea name='memo' id='memo' onChange={(e)=>inputChange(e, setInputs)}></textarea>
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <div>
                    <input type="submit" value="결제" className='btn-point' 
                        onClick={onSubmit}
                    />
                </div>
            </form>
        </DropBox>
    )
}

function History({ id, paymentInfo, counselValue, setCounselValue, historyPayment, setHistoryPayment, historyPaymentFunc }){
    const { pagePermission } = useContext(UserContext)
    const [relatedActive, setRelatedActive] = useState(0);
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1', 'customer_id': id});
    const [historyUpdata, setHistoryUpdata] = useState()
    const [updateInfo, setUpdateInfo] = useState()
    const [historyPaymentDelete, setHistoryPaymentDelete] = useState()
    const [historyPaymentDeleteInfo, setHistoryPaymentDeleteInfo] = useState()
    const [refundPopupActive, setRefundPopupActive] = useState()
    const [updatePopupActive, setUpdatePopupActive] = useState()
    const [consultCount, setConsultCount] = useState()
    const [deleteList, setDeleteList] = useState([])

    const historyUpdateFunc = useCallback(()=>{
        api('payment','user_payment_history_list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setUpdateInfo(data)
                    setHistoryUpdata(list)
                    // console.log(list);
                }
            })
    },[inputs])

    const historyPaymentDeleteFunc = useCallback(()=>{
        api('payment','user_delete_payment_list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setHistoryPaymentDeleteInfo(data)
                    setHistoryPaymentDelete(list)
                    // console.log(list);
                }
            })
    },[inputs])

    useEffect(()=>{
        historyPaymentFunc(inputs)
        historyUpdateFunc(inputs)
        historyPaymentDeleteFunc(inputs)
    },[inputs, historyPaymentFunc, historyUpdateFunc, historyPaymentDeleteFunc])

    return(
        <>
            <DropBox title="관련 정보" arrow>
                <div className='boardBox'>
                    <button data-count={consultCount} className={relatedActive === 0 ? 'active' : ''} onClick={()=>setRelatedActive(0)}>상담이력</button>
                    <button data-count={paymentInfo?.total_count} className={relatedActive === 1 ? 'active' : ''} onClick={()=>setRelatedActive(1)}>결제내역</button>
                    <button data-count={updateInfo?.total_count} className={relatedActive === 2 ? 'active' : ''} onClick={()=>setRelatedActive(2)}>결제수정내역</button>
                    <button data-count={historyPaymentDeleteInfo?.total_count} className={relatedActive === 3 ? 'active' : ''} onClick={()=>setRelatedActive(3)}>삭제된 결제내역</button>

                    {relatedActive === 0 &&
                        <HistoryConsult id={id} setConsultCount={setConsultCount} counselValue={counselValue} setCounselValue={setCounselValue}/>
                    }
                    {relatedActive === 1 &&
                        <>
                            { pagePermission?.update_yn === 'y' &&
                                <>
                                    <b className='choice'>{ deleteList.length }</b>
                                    <BoardChkDelete url='payment' idName='payment_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={()=>{historyPaymentFunc(inputs); historyPaymentDeleteFunc(inputs);}} logValue='고객 수정(결제 내역 선택 삭제)'/>
                                </>
                            }
                            <b className='total'>{ paymentInfo?.total_count }</b>
                            <span className='page'>{ paymentInfo?.current_page }/{ paymentInfo?.total_page }</span>
                            <div className='board-scroll2'>
                                <div className="board-top">
                                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={historyPayment?.map(({payment_id})=>payment_id)} />
                                    <button onClick={()=>onSort(setHistoryPayment, 'payment_id')}>결제번호</button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'payment_properties_name')}>결제구분</button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'payment_person_in_charge_name')}>
                                        결제<br/>
                                        담당자
                                    </button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'product_name')}>
                                        신청<br/>
                                        애널리스트
                                    </button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'payment_date')}>결제일</button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'payment_price')}>결제금액</button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'refund_date')}>환불일</button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'refund_price')}>환불금액</button>
                                    <button onClick={()=>onSort(setHistoryPayment, 'standard_service_start_date')}>
                                        유료기간<br/>
                                        (서비스기간포함)
                                    </button>
                                    <span>환불/수정</span>
                                </div>
                                { historyPayment && 
                                    <ol className="board-center">
                                        { historyPayment.map((data)=>(
                                            <li key={ data.payment_id }>
                                                <BoardChk id={data.payment_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                                <span>{ data.payment_id }</span>
                                                <span>{ data.payment_properties_name }</span>
                                                <span>{ data.payment_person_in_charge_name }</span>
                                                <span>{ data.product_name.replaceAll(' ','\n') }</span>
                                                <time>{ data.payment_date.replaceAll('-','/') }</time>
                                                <span>{ data.payment_price ? numberWithCommas(data.payment_price) : '' }</span>
                                                <time>{ data?.refund_date ? data?.refund_date?.replaceAll('-','/') : '' }</time>
                                                <span>{ data?.refund_price ? numberWithCommas(data?.refund_price) : ''}</span>
                                                <time>
                                                    { data.standard_service_start_date.replaceAll('-','/') }<br/>
                                                    ~ { data.standard_service_end_date.replaceAll('-','/') }
                                                </time>
                                                <div>
                                                    <button className='popup' onClick={()=>setRefundPopupActive({'type': 'children', 'id': data.payment_id, 'is': (!!data?.refund_price || data?.refund_date) || false})}>환불</button>
                                                    <button className='popup' onClick={()=>setUpdatePopupActive({'type': 'children', 'id': data.payment_id})}>수정</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                }
                            </div>
                            <div className='board-pagination' data-styleidx='a'>
                                <PagerButton pagerInfo={paymentInfo} setInputs={setInputs}/>
                            </div>
                        </>
                    }
                    {relatedActive === 2 &&
                        <>
                            <b className='total'>{ updateInfo?.total_count }</b>
                            <span className='page'>{ updateInfo?.current_page }/{ updateInfo?.total_page }</span>
                            <div className='board-scroll3'>
                                <div className="board-top">
                                    <button onClick={()=>onSort(setHistoryUpdata, 'payment_id')}>결제번호</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'item')}>항목</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'modify_before_info')}>수정 전</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'modify_after_info')}>수정 후</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'reg_date')}>수정일</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'modify_admin_name')}>수정자</button>
                                </div>
                
                                
                                { historyUpdata && 
                                    <ol className="board-center">
                                        { historyUpdata.map((data, i)=>(
                                            <li key={ i }>
                                                <span>{ data.payment_id }</span>
                                                <span>{ data.item }</span>
                                                { data.item === '결제금액' ?
                                                    <>
                                                        <span>{ data.modify_before_info ? numberWithCommas(data.modify_before_info) : '' }</span>
                                                        <span>{ data.modify_after_info ? numberWithCommas(data.modify_after_info) : '' }</span>
                                                    </> :
                                                    <>
                                                        <span>{ data.modify_before_info ? data.modify_before_info : '' }</span>
                                                        <span>{ data.modify_after_info ? data.modify_after_info : '' }</span>
                                                    </>
                                                }
                                                <time>{ data.reg_date.split(' ')[0].replaceAll('-','/') }</time>
                                                <span>{ data.modify_admin_name }</span>
                                            </li>
                                        ))}
                                    </ol>
                                }
                            </div>
                            <div className='board-pagination' data-styleidx='a'>
                                <PagerButton pagerInfo={updateInfo} setInputs={setInputs}/>
                            </div>
                        </>
                    }
                    {relatedActive === 3 &&
                        <>
                            <div className='board-scroll4'>
                                <div className="board-top">
                                    <button onClick={()=>onSort(setHistoryUpdata, 'payment_id')}>결제번호</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'payment_properties_name')}>결제구분</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'product_name')}>
                                        신청<br/>
                                        애널리스트
                                    </button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'payment_date')}>결제일</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'payment_price')}>결제금액</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'refund_date')}>환불일</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'refund_price')}>환불금액</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'standard_payment_start_date')}>
                                        유료기간<br/>
                                        (결제기준)
                                    </button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'standard_service_start_date')}>
                                        유료기간<br/>
                                        (서비스기간포함)
                                    </button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'del_date')}>삭제일</button>
                                    <button onClick={()=>onSort(setHistoryUpdata, 'del_admin_name')}>삭제자</button>
                                </div>
                                { historyPaymentDelete && 
                                    <ol className="board-center">
                                        { historyPaymentDelete.map((data)=>
                                            <li key={ data.payment_id }>
                                                <span>{ data.payment_id }</span>
                                                <span>{ data.payment_properties_name }</span>
                                                <span>{ data.product_name }</span>
                                                <time>{ data?.payment_date.replaceAll('-','/') }</time>
                                                <span>{ data.payment_price ? numberWithCommas(data.payment_price) : '0' }</span>
                                                <span>{ data?.refund_date?.replaceAll('-','/') }</span>
                                                <span>{ data.refund_price ? numberWithCommas(data.refund_price) : '0'}</span>
                                                <time>
                                                    { data.standard_payment_start_date.replaceAll('-','/') }<br/>
                                                    ~{ data.standard_payment_end_date.replaceAll('-','/') }
                                                </time>
                                                <time>
                                                    { data.standard_service_start_date.replaceAll('-','/') }<br/>
                                                    ~{ data.standard_service_end_date.replaceAll('-','/') }
                                                </time>
                                                <time>{ data?.del_date.split(' ')[0].replaceAll('-','/') }</time>
                                                <span>{ data.del_admin_name }</span>
                                            </li>
                                        )}
                                    </ol>
                                }
                            </div>
                            <div className='board-pagination' data-styleidx='a'>
                                <PagerButton pagerInfo={historyPaymentDeleteInfo} setInputs={setInputs}/>
                            </div>
                        </>
                    }

                    
                </div>
            </DropBox>
            { refundPopupActive &&
                <RefundPopup refundPopupActive={refundPopupActive} setRefundPopupActive={setRefundPopupActive} id={id} historyPaymentFunc={historyPaymentFunc}/>
            }
            { updatePopupActive &&
                <UpdatePopup updatePopupActive={updatePopupActive} setUpdatePopupActive={setUpdatePopupActive} historyUpdateFunc={historyUpdateFunc}/>
            }
        </>
    )
}

function HistoryConsult({ id, setConsultCount, counselValue, setCounselValue }){
    const { pagePermission } = useContext(UserContext)
    const [inputs, setInputs] = useState({'limit': '2', 'page': '1', 'customer_id': id})
    const [boardList, setBoardList] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState([])

    const currentData = useCallback(()=>{
        api('counsel', 'list', inputs)
            .then(({result, list, data})=>{
                if(result){
                    // console.log(list);
                    // console.log(data);
                    setConsultCount(data.total_count)
                    setBoardList(list)
                    setPagerInfo(data)
                }
            })
    },[inputs, setConsultCount])

    useEffect(()=>{
        currentData()
    },[currentData])

    return (
        <>
            { pagePermission?.update_yn === 'y' &&
                <>
                    <b className='choice'>{ deleteList.length }</b>
                    <BoardChkDelete url='counsel' idName='counsel_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData} logValue='고객 수정(상담 이력 선택 삭제)'/>
                </>
            }
            <b className='total'>{ pagerInfo?.total_count }</b>
            <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
            <div className='board-scroll1'>
                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({counsel_id})=>counsel_id)} />
                    <button onClick={()=>onSort(setBoardList, 'counsel_properties_name')}>상담상태</button>
                    <span>상담내용</span>
                    <button onClick={()=>onSort(setBoardList, 'manage_admin_name')}>담당자</button>
                    <button onClick={()=>onSort(setBoardList, 'register_date')}>등록일시</button>
                </div>
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>
                            <li key={ data.counsel_id }>
                                <BoardChk id={data.counsel_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.counsel_properties_name }</span>
                                <span>
                                    { data.counsel_memo }
                                </span>
                                <span>{ data.manage_admin_name }</span>
                                <time>{ data.register_date }</time>
                            </li>

                        )}
                    </ol>
                }
            </div>
            <div className='board-pagination' data-styleidx='a'>
                <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
            </div>
            { pagePermission?.update_yn === 'y' &&
                <HistoryConsultInput id={id} currentData={currentData} counselValue={counselValue} setCounselValue={setCounselValue}/>
            }
        </>
    )
}

function HistoryConsultInput({ id, currentData, counselValue, setCounselValue }){
    const { user } = useContext(UserContext)
    const [inputs, setInputs] = useState()
    const [registerDate, setRegisterDate] = useState()
    const [expectDate, setExpectDate] = useState()
    const [sales, setSales] = useState()
    const [popup, setPopup] = useState()

    const currentSettings = useCallback(()=>{
        setInputs({'customer_id': id, 'manage_admin_id': user?.admin_id, 'counsel_properties_id': counselValue})
        setSales(user?.name)

        const now = new Date();
        const year = now.getFullYear(); // 현재 연도
        const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1)
        const date = now.getDate(); // 현재 일
        const hour = now.getHours(); // 현재 시간 (24시간 표시)
        const minute = now.getMinutes(); // 현재 분

        setRegisterDate({
            'date': `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`,
            'hour': `${hour < 10 ? '0' + hour: hour}`,
            'minute': `${minute < 10 ? '0' + minute : minute}`
        })

        setExpectDate()

    },[id, user?.admin_id, user?.name, counselValue, setInputs])

    useEffect(()=>{
        currentSettings()
    },[currentSettings])

    useEffect(()=>{
        if( registerDate?.date && registerDate?.hour && registerDate?.minute ){
            setInputs((input)=>({...input, 'register_date': `${registerDate.date} ${registerDate.hour}:${registerDate.minute}`}))
        }
    },[registerDate])

    useEffect(()=>{
        if( expectDate?.date && expectDate?.hour && expectDate?.minute ){
            setInputs((input)=>({...input, 're_call_expect_date': `${expectDate.date} ${expectDate.hour}:${expectDate.minute}`}))
        }
    },[expectDate])

    const onRegister = (dateString, name) => {
        setRegisterDate((input)=>({...input, [name]: dateString}))
    };

    const onExpect = (dateString, name) => {
        setExpectDate((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);

        if(
            !inputs?.counsel_properties_id ||
            !inputs?.manage_admin_id ||
            !inputs?.counsel_memo ||
            (expectDate?.date || expectDate?.hour || expectDate?.minute)
        ){
            let errorMessage = '';
            if(!inputs?.counsel_properties_id){
                errorMessage = '상담상태를 선택해주세요.'
            }else if(!inputs?.manage_admin_id){
                errorMessage = '담당자를 선택해주세요.'
            }else if(!inputs?.counsel_memo){
                errorMessage = '상담내용를 작성해주세요.'
            }else if(!expectDate?.date || !expectDate?.hour || !expectDate?.minute){
                errorMessage = '재통화 예정일를 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        
        api('counsel', 'insert', inputs)
            .then(({result, error_message})=>{
                // if(error_message.includes('counsel_properties_id')){
                //     error_message = '상담상태를 선택해주세요.'
                // }else if(error_message.includes('manage_admin_id')){
                //     error_message = '담당자를 선택해주세요.'
                // }else if(error_message.includes('counsel_memo')){
                //     error_message = '상담내용를 작성해주세요.'
                // }
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': () =>{
                            // 상담이력 게시판 초기화
                            currentData()
                            // 상담 입력 초기화
                            // currentSettings()
                            setCounselValue(inputs.counsel_properties_id)
                        }
                    }))
                    logButton('고객 수정(상담 저장)')
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
            <div className='consultInputArea dropBox'>
                <b>상담 입력</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <Select type={'counsel'} current={inputs?.counsel_properties_id || ''} changeName='counsel_properties_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>담당자</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={sales || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'sales',
                                            'func': (data)=>{
                                                setInputs((input)=>({...input, 'manage_admin_id': data.admin_id}))
                                                setSales(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>등록일시</label>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onRegister(dateString, 'date')} value={registerDate?.date ? dayjs(registerDate?.date) : ''}/>
                                    <Select type='time-hour' current={registerDate?.hour} changeName='hour' setInputs={setRegisterDate}/> :
                                    <Select type='time-minute2' current={registerDate?.minute} changeName='minute' setInputs={setRegisterDate}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">재통화 예정일</label>
                                <div>
                                    <DatePicker onChange={(_, dateString)=>onExpect(dateString, 'date')} value={expectDate?.date ? dayjs(expectDate?.date) : ''} placeholder='예정일 입력'/>
                                    <Select type='time-hour' current={expectDate?.hour || ''} changeName='hour' setInputs={setExpectDate}/> :
                                    <Select type='time-minute2' current={expectDate?.minute || ''} changeName='minute' setInputs={setExpectDate}/>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="counsel_memo" className='required'>상담내용</label>
                                <div>
                                    <textarea id='counsel_memo' name='counsel_memo' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="submit" value="저장" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}

// function HistoryDelete(){
//     return (
//         <>
//             <div className='board-scroll4'>
//                 <div className="board-top">
//                     <button>결제번호</button>
//                     <button>결제구분</button>
//                     <button>
//                         신청<br/>
//                         애널리스트
//                     </button>
//                     <button>결제일</button>
//                     <button>결제금액</button>
//                     <button>환불일</button>
//                     <button>환불금액</button>
//                     <button>
//                         유료기간<br/>
//                         (결제기준)
//                     </button>
//                     <button>
//                         유료기간<br/>
//                         (서비스기간포함)
//                     </button>
//                     <button>삭제일</button>
//                     <button>삭제자</button>
//                 </div>
//                 <ol className="board-center">
//                     <li>
//                         <span>123456</span>
//                         <span>
//                             카드/현금<br/>
//                             분할결제
//                         </span>
//                         <span>
//                             [청투TV]<br/>
//                             재료주헌터
//                         </span>
//                         <time>2023/09/27</time>
//                         <span>300,000</span>
//                         <span></span>
//                         <span></span>
//                         <time>
//                             2023/10/01<br/>
//                             ~2023/11/01
//                         </time>
//                         <time>
//                             2023/10/01<br/>
//                             ~2023/11/01
//                         </time>
//                         <time>2023/09/27</time>
//                         <span>홍길동</span>
//                     </li>
//                 </ol>
//             </div>
//             <div className='board-pagination' data-styleidx='a'>
//                 <Link to={''}>첫 페이지</Link>
//                 <Link to={''}>이전 페이지</Link>
//                 <ol>
//                     <li className='active'><Link to={''}>1</Link></li>
//                 </ol>
//                 <Link to={''}>다음 페이지</Link>
//                 <Link to={''}>마지막 페이지</Link>
//             </div>
//         </>
//     )
// }


function RefundPopup({ refundPopupActive, setRefundPopupActive, historyPaymentFunc, id }){
    const [inputs, setInputs] = useState({'payment_id': refundPopupActive.id})
    const [info, setInfo] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        // console.log(refundPopupActive);
        if(refundPopupActive.is){
            setPopup({
                'type': 'confirm',
                'title': '환불',
                'description': '환불 하실 금액이 없거나 환불이 불가능합니다.',
                'confirmFunc': ()=>{
                    setRefundPopupActive()
                }
            })
        }else{
            api('payment', 'detail', {'payment_id': refundPopupActive.id})
                .then(({result, data})=>{
                    if(result){
                        // console.log(data);
                        setInfo(data)
                    }
                })
        }
    },[refundPopupActive, setRefundPopupActive])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onDateBlur = (e, name) => {
        let value = e.target.value.replace(/-/g, "");
        if(/^\d+$/.test(value) && value.length < 9){
            if((0 < value && value < 13)){
                value = `2000-${value}-01`
            }else if(value === '0'){
                value = `2000-01-01`
            }else if(value.length === 2){
                value = `20${value}-01-01`
            }else if(value.length === 3){
                value = `2${value}-01-01`
            }else if(value.length === 4){
                value = `${value}-01-01`
            }else{
                const year = value.substring(0, 4)
                let month = value.substring(4, 6)
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = value.substring(6, 8)
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : 0 + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, name)
        }
    };

    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log(inputs);
        if(
            !inputs?.refund_date ||
            !inputs?.refund_properties_id ||
            !inputs?.refund_price 
        ){
            let errorMessage = '';
            if(!inputs?.refund_date){
                errorMessage = '환불일를 선택해주세요.'
            }else if(!inputs?.refund_properties_id){
                errorMessage = '환불 구분을 선택해주세요.'
            }else if(!inputs?.refund_price){
                errorMessage = '환불금액을 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        api('payment', 'refund', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                // if(error_message.includes('refund_date')){
                //     error_message = '환불일를 선택해주세요.'
                // }else if(error_message.includes('refund_properties_id')){
                //     error_message = '환불 구분을 선택해주세요.'
                // }else if(error_message.includes('refund_price')){
                //     error_message = '환불금액을 입력해주세요.'
                // }
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            historyPaymentFunc({'limit': '10', 'page': '1', 'customer_id': id})
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
            { !refundPopupActive.is &&
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
                                        <label htmlFor="" className='required'>환불 구분</label>
                                        <div>
                                            <Select type='refund' setInputs={setInputs} changeName='refund_properties_id'/>
                                        </div>
                                    </li>
                                    <li>
                                        <label htmlFor="" className='required'>환불일</label>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'refund_date')} onBlur={(e)=>onDateBlur(e, 'refund_date')} format={'YYYY-MM-DD'} placeholder='환불일 입력'/>
                                        </div>
                                    </li>
                                    <li>
                                        <label htmlFor="refund_price" className='required'>환불금액</label>
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
                                                <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_start_date')} onBlur={(e)=>onDateBlur(e, 'standard_payment_start_date')} format={'YYYY-MM-DD'}/>
                                                <span>-</span>
                                                <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_end_date')} onBlur={(e)=>onDateBlur(e, 'standard_payment_end_date')} format={'YYYY-MM-DD'}/>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <label htmlFor="">유료 기간<span>서비스 기간 포함</span></label>
                                        <div>
                                            <div>
                                                <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_start_date')} onBlur={(e)=>onDateBlur(e, 'standard_service_start_date')} format={'YYYY-MM-DD'}/>
                                                <span>-</span>
                                                <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_end_date')} onBlur={(e)=>onDateBlur(e, 'standard_service_end_date')} format={'YYYY-MM-DD'}/>
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
            }
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}

function UpdatePopup({ updatePopupActive, setUpdatePopupActive, historyUpdateFunc }){
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
    
    const onDateBlur = (e, name) => {
        let value = e.target.value.replace(/-/g, "");
        if(/^\d+$/.test(value) && value.length < 9){
            if((0 < value && value < 13)){
                value = `2000-${value}-01`
            }else if(value === '0'){
                value = `2000-01-01`
            }else if(value.length === 2){
                value = `20${value}-01-01`
            }else if(value.length === 3){
                value = `2${value}-01-01`
            }else if(value.length === 4){
                value = `${value}-01-01`
            }else{
                const year = value.substring(0, 4)
                let month = value.substring(4, 6)
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = value.substring(6, 8)
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : 0 + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, name)
        }
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
                            historyUpdateFunc({'limit': '10', 'page': '1', 'customer_id': updatePopupActive.id})
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
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date')} onBlur={(e)=>onDateBlur(e, 'payment_date')} value={dayjs(inputs?.payment_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
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
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_start_date')} onBlur={(e)=>onDateBlur(e, 'standard_payment_start_date')} value={dayjs(inputs?.standard_payment_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                            <span>-</span>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_payment_end_date')} onBlur={(e)=>onDateBlur(e, 'standard_payment_end_date')} value={dayjs(inputs?.standard_payment_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">유료 기간<span>서비스기간 포함</span></label>
                                    <div>
                                        <div>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_start_date')} onBlur={(e)=>onDateBlur(e, 'standard_service_start_date')} value={dayjs(inputs?.standard_service_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                            <span>-</span>
                                            <DatePicker onChange={(_, dateString)=>onDate(dateString, 'standard_service_end_date')} onBlur={(e)=>onDateBlur(e, 'standard_service_end_date')} value={dayjs(inputs?.standard_service_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
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

