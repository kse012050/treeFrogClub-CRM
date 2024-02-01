import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import { DatePicker } from 'antd';
import { UserContext } from '../../context/UserContext';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

export default function Registration() {
    const [inputs, setInputs] = useState()

    const { user } = useContext(UserContext)

    useEffect(()=>{
        console.log(user);
    },[user])

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
                                    {/* <input 
                                        type="search" 
                                        value={analyst || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'analyst',
                                            'func': (data)=>{
                                                setInputs((input)=>({...input, 'analyst_admin_id': data.admin_id}))
                                                setAnalyst(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button> */}
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
            </div>
        </>
    );
}

