import React, { useEffect, useState } from 'react';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
import { Link, useParams } from 'react-router-dom';
import Popup from '../../../components/popup/Popup';

export default function ManagementConfirm() {
    const { id } = useParams();
    const [inputs, setInputs] = useState({'role_id': id});
    const [popup, setPopup] = useState('')

    useEffect(()=>{
        api('role', 'detail', {'role_id': id})
            .then(({result, data})=>{
                if(result){
                    if(data.connect_limit_yn === 'y'){
                        data.connect_limit_start_time_hour = data.connect_limit_start_time ? data.connect_limit_start_time.split(':')[0] : '00';
                        data.connect_limit_start_time_minute = data.connect_limit_start_time ? data.connect_limit_start_time.split(':')[1] : '00';
                        data.connect_limit_end_time_hour = data.connect_limit_end_time ? data.connect_limit_end_time.split(':')[0] : '00';
                        data.connect_limit_end_time_minute = data.connect_limit_end_time ? data.connect_limit_end_time.split(':')[1] : '00';
                    }
                    setInputs(data);
                }
            })
    },[id])

    return (
        <>
            <h2>역할 등록</h2>
            <div className="dropBox">
                <b>기본 정보</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">구분</label>
                                <div>
                                    <Select current={inputs?.role_classification} disabled />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="role_name">역할명</label>
                                <div>
                                    <input type="text" id='role_name' name='role_name' defaultValue={inputs.role_name} disabled/>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="role_explain">설명</label>
                                <div>
                                    <textarea id='role_explain' name='role_explain' defaultValue={inputs.role_explain} disabled></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className='limitArea'>
                        <b>접속제한 (로그인) 정보</b>
                        <input type="checkbox" id='connect_limit_yn' name='connect_limit_yn' checked={inputs.connect_limit_yn === 'y'} disabled/>
                        <label htmlFor="connect_limit_yn">제한시간 설정 (설정한 시간에만 로그인 허용)</label>
                        <div className='timeArea'>
                            <Select name={'time-hour'} current={inputs.connect_limit_start_time_hour || ''} disabled/>
                            <Select name={'time-minute'} current={inputs.connect_limit_start_time_minute || ''} disabled/>
                            -
                            <Select name={'time-hour'} current={inputs.connect_limit_end_time_hour || ''} disabled/>
                            <Select name={'time-minute'} current={inputs.connect_limit_end_time_minute || ''} disabled/>
                        </div>
                        <input type="checkbox" id='ip_limit_yn' name='ip_limit_yn' checked={inputs.ip_limit_yn === 'y'} disabled/>
                        <label htmlFor="ip_limit_yn">허용IP 설정 (0.0.X.X, 0.0.0.X 로 대역대 설정가능)</label>
                        <div className='ipArea'>
                            <input type="text" data-formet='ip' disabled maxLength='15'/>
                            <button className='btn-gray-black' type='button' disabled>
                                등록
                            </button>
                            { (Object.keys(inputs).includes('allow_ips') && inputs.allow_ips) && 
                                <ul>
                                    { inputs?.allow_ips.map((data)=>
                                        <li key={data}>
                                            { data }
                                            <button type='button'>IP 삭제</button>
                                        </li>
                                    )}
                                </ul>
                            }
                        </div>
                    </fieldset>
                    <div>
                        <Link to={'/system/grant/management'} className='btn-gray-white'>목록</Link>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

