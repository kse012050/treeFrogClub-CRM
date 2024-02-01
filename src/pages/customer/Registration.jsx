import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { inputChange } from '../../api/validation';
import Select from '../../components/Select';
import { DatePicker } from 'antd';
import { UserContext } from '../../context/UserContext';
import Popup from '../../components/popup/Popup';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

export default function Registration() {
    const [inputs, setInputs] = useState()
    const [analyst, setAnalyst] = useState()
    const [popup, setPopup] = useState()

    const { user } = useContext(UserContext)

    useEffect(()=>{
        console.log(user);
        if(user?.role_info.role_classification === '영업'){
            setInputs((input)=>({...input, 'sales_admin_id': user?.admin_id}))
            setAnalyst(user?.name)
        }
    },[user])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
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
                                <label htmlFor="">고객구분</label>
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
                                <label htmlFor="">영업담당자</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={analyst || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'sales',
                                            'func': (data)=>{
                                                setInputs((input)=>({...input, 'sales_admin_id': data.admin_id}))
                                                setAnalyst(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="customer_name">고객명</label>
                                <div>
                                    <input type="text" name='customer_name' id='customer_name' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="customer_mobile">휴대폰</label>
                                <div>
                                    <input type="text" name='customer_mobile' id='customer_mobile' onChange={(e)=>inputChange(e, setInputs)}/>
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
                                <label htmlFor="memo">메모</label>
                                <div>
                                    <textarea name="memo" id="memo" onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={''} className='btn-gray-white'>목록</Link>
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

