import React, { useCallback, useEffect, useState } from 'react';
import { inputChange } from '../../../api/validation';
import { api } from '../../../api/api';
import Popup from '../../../components/popup/Popup';
import { logButton } from '../../../api/common';
// import BureauBox from '../../../components//BureauBox';

export default function BureauUpdate({ bureau, selectBureauId, setBureauUpdatePopup, bureauFunc, setSelectBureau }) {
    const [inputs, setInputs] = useState({'department_id': selectBureauId})
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('department', 'detail', {'department_id': inputs.department_id})
            .then(({result, data})=>{
                if(result){
                    // console.log(data);
                    // setBureauUpdatePopup((dataPopup)=>({...dataPopup, list: data.head_list}))
                    setInputs((prev)=>({'department_id': prev.department_id, 'name': data.name, 'order_number': data.order_number, 'admin_id_list': data.head_list}))
                }
            })
    },[inputs.department_id, setBureauUpdatePopup])


    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        // console.log(inputs.admin_id_list.map((data)=> data.admin_id));
        api('department', 'update', {...inputs, 'admin_id_list': inputs.admin_id_list.map((data)=> data.admin_id)})
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setBureauUpdatePopup('')
                            setSelectBureau((prev)=>({...prev, 'name': inputs.name}))
                            bureauFunc('update')
                            logButton('부서 관리(부서 수정)')
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
                                <div className='bureauBox'>
                                    <div className='listArea'>
                                        <button 
                                            type='button'
                                            className={!inputs?.department_id ? 'active' : ''}
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
                                                onClick={()=> setPopup({
                                                        type: 'salesArray',
                                                        list: inputs.admin_id_list ? inputs.admin_id_list : [],
                                                        func: (data) => {
                                                            setInputs((input)=>({...input, 'admin_id_list': data}))
                                                        }
                                                    })}
                                            >
                                                찾기
                                            </button>
                                        </div>
                                    </div>

                                    { inputs?.admin_id_list?.length > 0 &&
                                        <ul className='choice-horizontal scroll-width'>
                                            { inputs.admin_id_list.map((data)=>(
                                                <li key={data.admin_id} className='icon-remove'>
                                                    { data.name }
                                                    <button 
                                                        type='button'
                                                        onClick={()=> setInputs((prev)=>({...prev, 'admin_id_list': prev.admin_id_list.filter((adminData)=> adminData.admin_id !== data.admin_id)}))}
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
                className={data.department_id === inputs.department_id ? 'active' : ''}
                onClick={()=>setInputs((prev)=>({...prev, 'department_id':data.department_id}))}
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

