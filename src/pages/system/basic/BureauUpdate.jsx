import React, { useEffect, useState } from 'react';
import { inputChange } from '../../../api/validation';
import { api } from '../../../api/api';
import Popup from '../../../components/popup/Popup';
import BureauBox from '../../../components/bureau/BureauBox';
// import BureauBox from '../../../components//BureauBox';

export default function BureauUpdate({ bureauUpdatePopup, setBureauUpdatePopup }) {
    const [inputs, setInputs] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('department', 'detail', {'department_id': bureauUpdatePopup.id})
            .then((result)=>{
                console.log(result);
                setInputs({})
            })
    },[bureauUpdatePopup.id])

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        // api('department', 'update', inputs)
        //     .then(({result, error_message})=>{
        //         setPopup({'type': 'confirm', 'description': error_message})
        //         if(result){
        //             setPopup((popup)=>({
        //                 ...popup,
        //                 'title': '완료',
        //                 'confirmFunc': ()=>{
        //                     setBureauUpdatePopup('')
        //                 }
        //             }))
        //         }else{
        //             setPopup((popup)=>({
        //                 ...popup,
        //                 'title': '실패',
        //             }))
        //         }
        //     })
    }


    return (
        <>
            <Popup popup={{type: 'children'}} setPopup={setBureauUpdatePopup}>
                <form className='bureau-update'>
                    <fieldset>
                        <strong>부서 수정</strong>
                        <ul>
                            <li>
                                <label htmlFor="name">부서명</label>
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
                                <label htmlFor="">부서 선택</label>
                                <BureauBox type='update' inputs={inputs} setInputs={setInputs} setBureauUpdatePopup={setBureauUpdatePopup} />
                            </li>
                        </ul>
                    </fieldset>
                    <div className='btnArea-end'>
                        <button className='btn-gray-white' type='button' onClick={()=>setBureauUpdatePopup('')}>취소</button>
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

