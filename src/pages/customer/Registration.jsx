import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputChange } from '../../api/validation';
import Select from '../../components/Select';
import { DatePicker } from 'antd';
import { UserContext } from '../../context/UserContext';
import dayjs from 'dayjs';
import Popup from '../../components/popup/Popup';
import { api } from '../../api/api';
import { logButton } from '../../api/common';


export default function Registration() {
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    // console.log(pagePermission);
    const [inputs, setInputs] = useState()
    const [sales, setSales] = useState()
    const [popup, setPopup] = useState()

    const { user } = useContext(UserContext)

    useEffect(()=>{
        // console.log(pagePermission);
        if(pagePermission?.insert_yn && pagePermission?.insert_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.insert_yn, navigate])

    useEffect(()=>{
        if(user && user?.role_info?.role_classification === '영업'){
            setInputs((input)=>({...input, 'sales_admin_id': user?.admin_id}))
            setSales(user?.name)
        }
        
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
        setInputs((input)=>({...input, 'experience_start_date': `${year}-0${month}-${day}`}))
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        const nextYear = nextMonth.getFullYear();
        const nextMonthNumber = nextMonth.getMonth() + 1;
        const nextDay = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
        setInputs((input)=>({...input, 'experience_end_date': `${nextYear}-0${nextMonthNumber}-${nextDay}`}))
    },[user])

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
                const year = parseInt(value.substring(0, 4))
                let month = parseInt(value.substring(4, 6))
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = parseInt(value.substring(6, 8))
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : '0' + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, name)
        }
    };

    const onSubmit = (e) => {
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
                errorMessage = '휴대폰 번호를 입력해주세요.'
            }
            setPopup((popup)=>({
                ...popup,
                'description': errorMessage
            }))
            return
        }
        api('customer', 'insert', inputs)
            .then(({result, error_message, data})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': `update/${data.customer_id}`
                    }))
                    logButton('고객 등록(저장)')
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
            <h2>
                고객 등록
                { pagePermission?.bulk_customer_insert === 'y' &&
                    <Link to={'bulk'} className='btn-point'>대량 고객 등록</Link>
                }
            </h2>

            <div className='dropBox'>
                <b>고객 구분</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="" className='required'>고객구분</label>
                                <div>
                                    <Select type={'customer'} changeName='customer_properties_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <Select type={'counsel'} changeName='counsel_properties_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>영업담당자</label>
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
                                <label htmlFor="customer_name" className='required'>고객명</label>
                                <div>
                                    <input type="text" name='customer_name' id='customer_name' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="customer_mobile" className='required'>휴대폰</label>
                                <div>
                                    <input type="text" name='customer_mobile' id='customer_mobile' data-formet="numb" onChange={(e)=>inputChange(e, setInputs)} maxLength='11'/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">체험 기간</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_start_date')} onBlur={(e)=>onDateBlur(e, 'experience_start_date')} value={dayjs(inputs?.experience_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_end_date')} onBlur={(e)=>onDateBlur(e, 'experience_end_date')} value={dayjs(inputs?.experience_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="source">출처</label>
                                <div>
                                    <input type="text" name='source' id='source' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            {/* <li className='fill-three'>
                                <label htmlFor="memo">메모</label>
                                <div>
                                    <textarea name="memo" id="memo" onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                </div>
                            </li> */}
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={'/customer/list'} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="저장" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

