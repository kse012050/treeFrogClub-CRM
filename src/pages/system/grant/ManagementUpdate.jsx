import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
import { inputChange } from '../../../api/validation'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/popup/Popup';
import { logButton } from '../../../api/common';
import { UserContext } from '../../../context/UserContext';

export default function ManagementUpdate() {
    const { id } = useParams();
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({'role_id': id})
    const [connectlimitTime, setConnectlimitTime] = useState()
    const [allowIps, setAllowIps] = useState([])
    const [popup, setPopup] = useState('')
    const ipRef = useRef()

    useEffect(()=>{
        if(pagePermission?.update_yn && pagePermission?.update_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.update_yn, navigate])

    useEffect(()=>{
        api('role', 'detail', {'role_id': id})
            .then(({result, data})=>{
                if(result){
                    // console.log(data);
                    if(data.connect_limit_yn === 'y'){
                        setConnectlimitTime({
                            'connect_limit_start_time_hour': data.connect_limit_start_time.split(':')[0],
                            'connect_limit_start_time_minute': data.connect_limit_start_time.split(':')[1],
                            'connect_limit_end_time_hour': data.connect_limit_end_time.split(':')[0],
                            'connect_limit_end_time_minute': data.connect_limit_end_time.split(':')[1]
                        })
                    }
                    if(data.allow_ips){
                        setAllowIps([...data.allow_ips])
                    }
                    setInputs(data);
                }
            })
    },[id])

    const ipAdd = () =>{
        if((ipRef.current.value.match(/\./g) || []).length === 3){
            const value = ipRef.current.value;
            setAllowIps((arr)=>[...arr, value])
            ipRef.current.value = '';
        }
        ipRef.current.focus();
    }
    
    const ipRemove = (value) =>{
        setAllowIps((arr)=>arr.filter((ip)=> ip !== value))
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        if(
            !inputs?.role_classification ||
            !inputs?.role_name
        ){
            let errorMessage = '';
            if(!inputs?.role_classification){
                errorMessage = '구분을 선택해주세요.'
            }else if(!inputs?.role_name){
                errorMessage = '역할명을 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        
        if(inputs?.connect_limit_yn === 'y'){
            inputs.connect_limit_start_time = `${connectlimitTime.connect_limit_start_time_hour}:${connectlimitTime.connect_limit_start_time_minute}`;
            inputs.connect_limit_end_time = `${connectlimitTime.connect_limit_end_time_hour}:${connectlimitTime.connect_limit_end_time_minute}`
        }

        if(inputs?.ip_limit_yn === 'y'){
            inputs.allow_ips = allowIps
        }else{
            delete inputs.allow_ips
        }

        api('role', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/system/grant/management'
                    }))
                    logButton('역할 수정(수정)')
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
            <h2>역할 수정</h2>
            <div className="dropBox">
                <b>기본 정보</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="" className='required'>구분</label>
                                <div>
                                    <Select type={'divisionList'} current={inputs?.role_classification} setInputs={setInputs} changeName='role_classification'/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="role_name" className='required'>역할명</label>
                                <div>
                                    <input type="text" id='role_name' name='role_name' defaultValue={inputs.role_name} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="role_explain">설명</label>
                                <div>
                                    <textarea id='role_explain' name='role_explain' defaultValue={inputs.role_explain} onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className='limitArea'>
                        <b>접속제한 (로그인) 정보</b>
                        <input type="checkbox" id='connect_limit_yn' name='connect_limit_yn' checked={inputs.connect_limit_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                        <label htmlFor="connect_limit_yn">제한시간 설정 (설정한 시간에만 로그인 허용)</label>
                        <div className='timeArea'>
                            <Select type={'time-hour'} current={connectlimitTime?.connect_limit_start_time_hour || true} setInputs={setInputs} changeName='connect_limit_start_time_hour' disabled={inputs.connect_limit_yn === 'y' ? false: true}/>
                            <Select type={'time-minute'} current={connectlimitTime?.connect_limit_start_time_minute || true} setInputs={setInputs} changeName='connect_limit_start_time_minute' disabled={inputs.connect_limit_yn === 'y' ? false: true}/>
                            -
                            <Select type={'time-hour'} current={connectlimitTime?.connect_limit_end_time_hour || true} setInputs={setInputs} changeName='connect_limit_end_time_hour' disabled={inputs.connect_limit_yn === 'y' ? false: true}/>
                            <Select type={'time-minute'} current={connectlimitTime?.connect_limit_end_time_minute || true} setInputs={setInputs} changeName='connect_limit_end_time_minute' disabled={inputs.connect_limit_yn === 'y' ? false: true}/>
                        </div>
                        <input type="checkbox" id='ip_limit_yn' name='ip_limit_yn' checked={inputs.ip_limit_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                        <label htmlFor="ip_limit_yn">허용IP 설정 (0.0.X.X, 0.0.0.X 로 대역대 설정가능)</label>
                        <div className='ipArea'>
                            <input type="text" data-formet='ip' ref={ipRef} disabled={inputs.ip_limit_yn === 'y' ? false: true} maxLength='15'/>
                            <button className='btn-gray-black' type='button' onClick={ipAdd} disabled={inputs.ip_limit_yn === 'y' ? false: true}>
                                등록
                            </button>
                            {allowIps &&
                                <ul>
                                    { allowIps.map((data)=>
                                        <li key={data}>
                                            { data }
                                            <button type='button' onClick={()=>ipRemove(data)}>IP 삭제</button>
                                        </li>
                                    )}
                                </ul>
                            }
                        </div>
                    </fieldset>
                    <div>
                        <Link to={'/system/grant/management'} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

