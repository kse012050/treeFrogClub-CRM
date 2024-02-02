import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { inputChange } from '../../api/validation';
import Select from '../../components/Select';
import { DatePicker } from 'antd';
import { UserContext } from '../../context/UserContext';
import dayjs from 'dayjs';
import Popup from '../../components/popup/Popup';
import { api } from '../../api/api';


export default function Registration() {
    const [inputs, setInputs] = useState()
    const [sales, setSales] = useState()
    const [popup, setPopup] = useState()

    const { user } = useContext(UserContext)

    useEffect(()=>{
        // console.log(user);
        if(user?.role_info.role_classification === '영업'){
            setInputs((input)=>({...input, 'sales_admin_id': user?.admin_id}))
            setSales(user?.name)
        }
        
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        setInputs((input)=>({...input, 'experience_start_date': `${year}-0${month}-0${day}`}))
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        const nextYear = nextMonth.getFullYear();
        const nextMonthNumber = nextMonth.getMonth() + 1;
        const nextDay = nextMonth.getDate();
        setInputs((input)=>({...input, 'experience_end_date': `${nextYear}-0${nextMonthNumber}-0${nextDay}`}))
    },[user])

    const onDate = (dateString, name) => {
        setInputs((input)=>({...input, [name]: dateString}))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        api('customer', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        // 'link': '/payment/product'
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
            <h2>
                고객 등록
                <Link to={'bulk'} className='btn-point'>대량 고객 등록</Link>
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
                                    <input type="text" name='customer_mobile' id='customer_mobile' data-formet="numb" onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">체험 기간</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_start_date')} value={dayjs(inputs?.experience_start_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_end_date')} value={dayjs(inputs?.experience_end_date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                    </div>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="memo">메모</label>
                                <div>
                                    <textarea name="memo" id="memo" onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                </div>
                            </li>
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

