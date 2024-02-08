import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api'
import { inputChange } from '../../../api/validation'
import Popup from '../../../components/popup/Popup';
import BureauBox from '../../../components/BureauBox';

export default function Bureau() {
    const [inputs, setInputs] = useState({ 'department_id': '' })
    const [bureauRegistrationPopup, setBureauRegistrationPopup] = useState();
    const [bureauUpdatePopup, setBureauUpdatePopup] = useState();
    const [popup, setPopup] = useState();

    useEffect(()=>{
        setInputs({ 'department_id': '' })
    },[bureauRegistrationPopup])

    const func = () =>{
        api('department', 'delete', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                    setInputs({ 'department_id': '' })
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
                부서 관리
                <div>
                    <input type="search" />
                    <button>검색</button>
                </div>
            </h2>
            
            <div className="horizontalTwo">
                <BureauBox type='list' inputs={inputs} setInputs={setInputs}>
                    <div className='addBtn'>
                        <button className='btn-gray-black' onClick={()=>setBureauRegistrationPopup({type: 'children'})}>부서 추가</button>
                        <button 
                            className='btn-gray-black'
                            disabled={!inputs.department_id}
                            onClick={()=>setBureauUpdatePopup({type: 'children'})}
                        >
                            부서 수정
                        </button>
                        <button 
                            className='btn-gray-black'
                            disabled={!inputs.department_id}
                            onClick={()=>setPopup({
                                type: 'finFunc',
                                title: '삭제',
                                description: `[${inputs.name}] 을 삭제하시겠습니까?\n소속된 사용자는 미지정 상태로 변경됩니다.`,
                                func: () =>{
                                    func()
                                }
                            })}
                        >
                            부서 삭제
                        </button>
                    </div>
                </BureauBox>
            </div>
            { bureauRegistrationPopup && <BureauRegistration bureauRegistrationPopup={bureauRegistrationPopup} setBureauRegistrationPopup={setBureauRegistrationPopup}/>}
            { bureauUpdatePopup && <BureauUpdate bureauUpdatePopup={bureauUpdatePopup} setBureauUpdatePopup={setBureauUpdatePopup} parentsInputs={inputs} parentsSetInputs={setInputs}/>}
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    );
}


function BureauRegistration({ bureauRegistrationPopup, setBureauRegistrationPopup }){
    const [inputs, setInputs] = useState({'department_id': ''})
    const [popup, setPopup] = useState()

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        inputs.parent_department_id = inputs.department_id
        delete inputs.department_id
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
                    setInputs({'department_id': ''})
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
            { bureauRegistrationPopup &&
                <Popup popup={bureauRegistrationPopup} setPopup={setBureauRegistrationPopup}>
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
                                    <BureauBox type='registration' inputs={inputs} setInputs={setInputs}>
                                        <div className="addBtn">
                                            <b>부서장 선택</b>
                                            <span>(최대 6명)</span>
                                            <button className='btn-gray-black' onClick={(e)=>e.preventDefault()}>찾기</button>
                                        </div>
                                    </BureauBox>
                                </li>
                            </ul>
                        </fieldset>
                        <div className='btnArea-end'>
                            <button className='btn-gray-white' type='button' onClick={()=>setBureauRegistrationPopup('')}>취소</button>
                            <input type="submit" className='btn-point' value='저장' onClick={onSubmit}/>
                        </div>
                    </form>
                </Popup>
            }
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}


function BureauUpdate({ bureauUpdatePopup, setBureauUpdatePopup, parentsInputs, parentsSetInputs }){
    const [inputs, setInputs] = useState(parentsInputs)
    const [popup, setPopup] = useState()

    useEffect(()=>{
        setInputs({...parentsInputs, 'order_number': '1'})
    },[parentsInputs])

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        api('department', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setBureauUpdatePopup('')
                        }
                    }))
                    parentsSetInputs('')
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
            { bureauUpdatePopup &&
                <Popup popup={bureauUpdatePopup} setPopup={setBureauUpdatePopup}>
                    <form className='bureau-update'>
                        <fieldset>
                            <strong>부서 수정</strong>
                            <ul>
                                <li>
                                    <label htmlFor="name">부서명</label>
                                    <div>
                                        <input type="text" id='name' name='name' value={inputs.name || ''} onChange={(e)=>inputChange(e, setInputs)}/> 
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="order_number">정렬순서</label>
                                    <div>
                                        <input type="text" id='order_number' name='order_number' value={inputs.order_number || ''} onChange={(e)=>inputChange(e, setInputs)}/>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">부서 선택</label>
                                    <BureauBox type='update' inputs={inputs} setInputs={setInputs}>
                                        <div className="addBtn">
                                            <b>부서장 선택</b>
                                            <span>(최대 6명)</span>
                                            <button className='btn-gray-black' onClick={(e)=>e.preventDefault()}>찾기</button>
                                        </div>
                                    </BureauBox>
                                </li>
                            </ul>
                        </fieldset>
                        <div className='btnArea-end'>
                            <button className='btn-gray-white' type='button' onClick={()=>setBureauUpdatePopup('')}>취소</button>
                            <input type="submit" className='btn-point' value='저장' onClick={onSubmit}/>
                        </div>
                    </form>
                </Popup>
            }
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup} /* confirmFunc={confirmFunc} *//>
            )}
        </>
    )
}
