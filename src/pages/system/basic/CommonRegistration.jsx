import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api'
import { inputChange } from '../../../api/validation'
import Select from '../../../components/Select';
import Popup from '../../../components/popup/Popup';
import SubTitle from '../../../components/SubTitle';
import { logButton } from '../../../api/common';

export default function CommonRegistration() {
    const [inputs, setInputs] = useState()
    const [popup, setPopup] = useState('')

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        
        if(
            !inputs?.classification_id ||
            !inputs?.code ||
            !inputs?.name ||
            !inputs?.order_number
        ){
            let errorMessage = '';
            if(!inputs?.classification_id){
                errorMessage = '분류 유형명을 입력해주세요.'
            }else if(!inputs?.code){
                errorMessage = '코드(숫자)를 입력해주세요.'
            }else if(!inputs?.name){
                errorMessage = '코드명을 입력해주세요.'
            }else if(!inputs?.order_number){
                errorMessage = '정렬 순서를 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        api('commoncode', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/system/basic/common'
                    }))
                    logButton('공통 코드 등록(저장)')
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
            <SubTitle text='공통 코드 등록'/>

            <div className='dropBox'>
                <b>공통 코드</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="" className='required'>분류 유형명</label>
                                <div>
                                    <Select type='commonClassification' changeName='classification_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="code" className='required'>코드(숫자)</label>
                                <div>
                                    <input type="text" id='code' name='code' data-formet="numb" onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="name" className='required'>코드명</label>
                                <div>
                                    <input type="text" id='name' name='name' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="order_number" className='required'>정렬순서</label>
                                <div>
                                    <input type="text" id='order_number' data-formet="numb" name='order_number' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="useable_yn">사용여부</label>
                                <div>
                                    <Select type='yn' current changeName='useable_yn' setInputs={setInputs}/>
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

