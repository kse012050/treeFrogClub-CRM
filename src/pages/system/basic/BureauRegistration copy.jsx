import React, { useState } from 'react';
import { inputChange } from '../../../api/validation';
import { api } from '../../../api/api';
import Popup from '../../../components/popup/Popup';
import BureauBox from '../../../components/bureau/BureauBox';
// import BureauBox from '../../../components//BureauBox';

export default function BureauRegistration({ bureauRegistrationPopup, setBureauRegistrationPopup, firstBureau }) {
    const [inputs, setInputs] = useState()
    const [popup, setPopup] = useState()

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        api('department', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setBureauRegistrationPopup('')
                        }
                    }))
                    setInputs({'department_id': firstBureau.department_id})
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
            <Popup popup={{type: 'children'}} setPopup={setBureauRegistrationPopup}>
                <form className='bureau-add'>
                    <fieldset>
                        <strong>부서 추가</strong>
                        <ul>
                            <li>
                                <label htmlFor="name">부서명</label>
                                <div>
                                    <input type="text" id='name' name='name' onChange={(e)=>inputChange(e, setInputs)}/> 
                                </div>
                            </li>
                            <li>
                                <label htmlFor="order_number">정렬순서</label>
                                <div>
                                    <input type="text" id='order_number' name='order_number' onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상위부서 선택</label>
                                <BureauBox type='registration' inputs={inputs} setInputs={setInputs} dataPopup={bureauRegistrationPopup} setDataPopup={setBureauRegistrationPopup}/>
                            </li>
                        </ul>
                    </fieldset>
                    <div className='btnArea-end'>
                        <button className='btn-gray-white' type='button' onClick={()=>setBureauRegistrationPopup('')}>취소</button>
                        <input type="submit" className='btn-point' value='저장' onClick={onSubmit}/>
                    </div>
                </form>
            </Popup>
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}

