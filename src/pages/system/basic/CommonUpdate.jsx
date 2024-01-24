import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../../api/api'
import { inputChange } from '../../../api/validation'
import SubTitle from '../../../components/SubTitle';
import Popup from '../../../components/popup/Popup';
import Select from '../../../components/Select';

export default function CommonUpdate() {
    const [inputs, setInputs] = useState({'classification_id': '2', 'useable_yn': 'Y'})
    const [popup, setPopup] = useState('')
    const { id } = useParams();

    useEffect(()=>{
        api('commoncode', 'detail', {'properties_id': id})
            .then(({result, data})=>{
                if(result){
                    setInputs(data);
                }
            })
    },[id])

    const onSubmit = (e) =>{
        e.preventDefault();
        api('commoncode', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/system/basic/common'
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
            <SubTitle text='공통 코드 수정'/>
            
            <div className='dropBox'>
                <b>공통 코드</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">분류 유형명</label>
                                <div>
                                    <input type="text" disabled value={inputs?.name || ''}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="code">코드(숫자)</label>
                                <div>
                                    <input type="text" id='code' name='code' disabled value={inputs?.code || ''}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="name">코드명</label>
                                <div>
                                    <input type="text" id='name' name='name' value={inputs?.name || ''} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="order_number">정렬순서</label>
                                <div>
                                    <input type="text" id='order_number' name='order_number' value={inputs?.order_number || ''} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="useable_yn">사용여부</label>
                                <div>
                                    <Select name='yn' current={inputs.useable_yn} setInputs={setInputs} changeName='useable_yn'/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={'/system/basic/common'} className='btn-gray-white'>목록</Link>
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

