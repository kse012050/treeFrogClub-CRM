import React, { useCallback, useEffect, useState } from 'react';
import { inputChange } from '../../../api/validation';
import { api } from '../../../api/api';
import Popup from '../../../components/popup/Popup';
import { logButton } from '../../../api/common';
// import BureauBox from '../../../components/bureau/BureauBox';
// import BureauBox from '../../../components//BureauBox';

export default function BureauRegistration({ bureau, setBureauRegistrationPopup, bureauFunc }) {
    const [inputs, setInputs] = useState()
    const [headList, setHeadList] = useState()
    const [popup, setPopup] = useState()

    const onSales = () => {
        setInputs((input)=>{
            const copy = {...input}
            if(copy.hasOwnProperty('admin_id_list')){
                delete copy.admin_id_list
            }
            return copy
        })


        setPopup({
            type: 'salesArray',
            list: headList ? headList.list : [],
            func: (data) => {
                setHeadList({'list': data})
                setInputs((input)=>({...input, 'admin_id_list': data.map((data)=>data.admin_id)}))
            }
        })
    }

    const onSalesDelete = (data) => {
        setHeadList((dataPopup2)=>({...dataPopup2, 'list': dataPopup2.list.filter((dataPopup3)=>dataPopup3.admin_id !== data.admin_id)}))
        setInputs((input)=>({...input, 'admin_id_list': input.admin_id_list.filter((adminId)=>adminId !== data.admin_id)}))
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(!inputs?.name || !inputs?.order_number){
            let errorMessage = '';
            if(!inputs?.name){
                errorMessage = '부서명을 입력해주세요.'
            }else if(!inputs?.order_number){
                errorMessage = '정렬순서를 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        api('department', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setBureauRegistrationPopup('')
                            bureauFunc()
                            logButton('부서 관리(부서 추가)')
                        }
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
            <Popup popup={{type: 'children'}} setPopup={setBureauRegistrationPopup}>
                <form className='bureau-add'>
                    <fieldset>
                        <strong onClick={()=>console.log(inputs)} >부서 추가</strong>
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
                                            className={!inputs?.parent_department_id ? 'active' : ''}
                                            onClick={()=>setInputs((input)=>({...input, 'parent_department_id': ''}))}
                                        >
                                            { bureau?.company_name }
                                        </button>
                                        { bureau && 
                                            <Ul list={bureau.list} inputs={inputs} setInputs={setInputs}/>
                                        }

                                        <div className="addBtn">
                                            <b>부서장 선택</b>
                                            <span>(최대 6명)</span>
                                            <button 
                                                type='button'
                                                className='btn-gray-black'
                                                onClick={onSales}
                                            >
                                                찾기
                                            </button>
                                        </div>
                                    </div>

                                    { headList &&
                                        <ul className='choice-horizontal scroll-width'>
                                            { headList.list.map((data)=>(
                                                <li key={data.admin_id} className='icon-remove'>
                                                    { data.name }
                                                    <button 
                                                        type='button'
                                                        onClick={()=>onSalesDelete(data)}
                                                    >
                                                        제거
                                                    </button>
                                                </li>
                                                ))
                                            }
                                        </ul>
                                    }
                                </div>
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

function Ul({ list, inputs, setInputs }){
    return (
        <ul className='scroll-width'>
            {list.map((data)=>
                <List key={data.department_id} data={data} inputs={inputs} setInputs={setInputs}/>
            )}
        </ul>
    )
}

function List({ data, inputs, setInputs }){
    const [lowerBureau, setLowerBureau] = useState()

    const lowerBureauFunc = useCallback((id)=>{
        lowerBureau ? 
            setLowerBureau(undefined) :
            api('department', 'list', {'parent_department_id': id})
                .then(({ result, list })=>{
                    if(result){
                        setLowerBureau(list)
                    }
                });
    },[lowerBureau])
    return (
        <li>
            <button
                type="button"
                className={data.department_id === inputs?.parent_department_id ? 'active' : ''}
                onClick={()=>setInputs((input)=>({...input, 'parent_department_id': data.department_id}))}
            >
                { data.name }
            </button>
            {data.lower_department_count > 0 && 
                <button type="button" onClick={()=>lowerBureauFunc(data.department_id)}>하위 목록 보기</button>
            }
            {lowerBureau && 
                <Ul list={lowerBureau} inputs={inputs} setInputs={setInputs}/>
            }
        </li>
    )
}
