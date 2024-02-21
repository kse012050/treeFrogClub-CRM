import React, { useEffect, useState } from 'react';
import { inputChange } from '../../../api/validation';
import { api } from '../../../api/api';
import Popup from '../../../components/popup/Popup';
// import BureauBox from '../../../components/bureau/BureauBox';
// import BureauBox from '../../../components//BureauBox';

export default function BureauRegistration({ bureau, setBureauRegistrationPopup, onRefresh }) {
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

        // setBureauRegistrationPopup((dataPopup)=> ({...dataPopup, list: []}))

        setPopup({
            type: 'salesArray',
            list: headList ? headList.list : [],
            func: (data) => {
                // console.log(data);
                // setBureauRegistrationPopup((dataPopup)=>({...dataPopup, list: data}))
                setHeadList({'list': data})
                setInputs((input)=>({...input, 'admin_id_list': data.map((data)=>data.admin_id)}))
            }
        })
    }

    const onSalesDelete = (data) => {
        // console.log(data);
        setHeadList((dataPopup2)=>({...dataPopup2, 'list': dataPopup2.list.filter((dataPopup3)=>dataPopup3.admin_id !== data.admin_id)}))
        setInputs((input)=>({...input, 'admin_id_list': input.admin_id_list.filter((adminId)=>adminId !== data.admin_id)}))
    }

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
                    onRefresh(inputs.parent_department_id || '')
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
                                            <ul className='scroll-width'>
                                                {bureau?.list.map((data)=>
                                                    <List 
                                                        key={data.department_id}
                                                        data={data}
                                                        inputs={inputs}
                                                        setInputs={setInputs}
                                                    />
                                                )}
                                            </ul>
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

function List({ data, inputs, setInputs }){
    const [lowerList, setLowerList] = useState();

    useEffect(()=>{
        if(data.lower_department_count !== '0'){
            api('department', 'list', {'parent_department_id': data.department_id})
                .then(({result, list})=>{
                    if(result){
                        setLowerList(list)
                    }
                })
        }
    },[data.lower_department_count, data.department_id])


    const onListClick = (data) =>{
        setInputs((input)=>({...input, 'parent_department_id': data?.department_id}))
    }

    return (
        <>
            <li>
                { data.lower_department_count === '0' ?
                    <button 
                        type='button' 
                        onClick={()=>onListClick(data)}
                        className={inputs?.parent_department_id === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.admin_count})
                    </button> :
                    <details>
                        <summary
                            onClick={()=>setInputs((input)=>({...input, 'parent_department_id': data.department_id}))}
                            className={inputs?.parent_department_id  === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.admin_count})
                        </summary>
                        { lowerList && 
                            lowerList.map((lowerData)=> 
                                <button 
                                    type='button'
                                    key={lowerData.department_id} 
                                >
                                    { lowerData.name } ({lowerData.admin_count})
                                </button> )}
                    </details> 
                }
            </li>
        </>
    );
}

