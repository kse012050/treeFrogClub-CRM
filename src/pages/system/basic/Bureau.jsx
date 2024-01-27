import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api'
import { inputChange } from '../../../api/validation'
import BureauList from '../../../components/BureauList';
import Popup from '../../../components/popup/Popup';

export default function Bureau() {
    const [bureau, setBureau] = useState();
    const [inputs, setInputs] = useState({ 'department_id': '' })
    const [popup, setPopup] = useState();
    const [popup2, setPopup2] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                }
            })
    },[])
    
    const bureauRemove = () =>{
        console.log(inputs);
        api('department', 'delete', inputs)
            .then(({result, error_message})=>{
                setPopup2({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup2((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                }else{
                    setPopup2((popup)=>({
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
                <div className='bureauBox'>
                    <div className='listArea'>
                        <b>{ bureau?.company_name }</b>
                        <ul>
                            { bureau?.list.map((data)=>
                                <BureauList data={data} key={data.department_id} inputs={inputs} setInputs={setInputs} changeName='department_id'/>
                            )}
                        </ul>
                    </div>
                    <div className='btnArea'>
                        <button className='btn-gray-black' onClick={()=>setPopup({type: 'children'})}>부서 추가</button>
                        <button className='btn-gray-black' disabled={!inputs.department_id}>부서 수정</button>
                        <button className='btn-gray-black' disabled={!inputs.department_id} onClick={bureauRemove}>부서 삭제</button>
                    </div>
                </div>
            </div>
            <BureauAdd popup={popup} setPopup={setPopup} bureau={bureau}/>
            {popup2 && (
                <Popup popup={popup2} setPopup={setPopup2} />
            )}
        </>
    );
}


function BureauAdd({ popup, setPopup, bureau}){
    const [inputs, setInputs] = useState({ 'parent_department_id': '' })
    const [popup2, setPopup2] = useState()

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        api('department', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup2({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup2((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                }else{
                    setPopup2((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }

    return (
        <>
            { popup &&
                <Popup popup={popup} setPopup={setPopup}>
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
                                    <div className='bureauBox'>
                                        <div className='listArea'>
                                            <button 
                                                type='button'
                                                className={inputs.parent_department_id === '' ? 'active' : ''}
                                                onClick={()=>setInputs((input)=>({...input, 'parent_department_id': ''}))}
                                            >
                                                { bureau?.company_name }
                                            </button>
                                            <ul>
                                                { bureau?.list.map((data)=>
                                                    <BureauList data={data} key={data.department_id} inputs={inputs} setInputs={setInputs} changeName='parent_department_id' add/>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="btnArea">
                                            <b>부서장 선택</b>
                                            <span>(최대 6명)</span>
                                            <button className='btn-gray-black'>찾기</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                        <div>
                            <button className='btn-gray-white' type='button' onClick={()=>setPopup('')}>취소</button>
                            <input type="submit" className='btn-point' value='저장' onClick={onSubmit}/>
                        </div>
                    </form>
                </Popup>
            }
            
            {popup2 && (
                <Popup popup={popup2} setPopup={setPopup2} />
            )}
        </>
    )
}

