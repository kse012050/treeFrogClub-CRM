import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import Popup from '../popup/Popup';

export default function BureauRegistration({ bureau, inputs, setInputs }) {
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
            func: (data) => {
                setInputs((input)=>({...input, 'admin_id_list': data}))
            }
        })

    }

    return (
        <>
            <div className='listArea'>
                <button 
                    type='button'
                    className={!inputs?.parent_department_id ? 'active' : ''}
                    onClick={()=>setInputs((input)=>({...input, 'parent_department_id': ''}))}
                >
                    { bureau?.company_name }
                </button>

                { bureau && 
                    <ul>
                        { bureau?.list.map((data)=>
                            <li key={data?.department_id}>
                                <BureauList
                                    data={data}
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    changeName={'parent_department_id'}
                                />
                            </li>
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

            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    );
}

function BureauList({ data, inputs, setInputs }){
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

    return (
        <>
            { data.lower_department_count === '0' ?
                <button 
                    type='button' 
                    onClick={()=>setInputs((input)=>({...input, 'parent_department_id': data?.department_id}))}
                    className={inputs?.parent_department_id === data.department_id ? 'active' : ''}
                    >
                        {data.name} ({data.depth})
                </button> :
                <details>
                    <summary
                        onClick={()=>setInputs((input)=>({...input, 'parent_department_id': data.department_id}))}
                        className={inputs?.parent_department_id  === data.department_id ? 'active' : ''}
                    >
                        {data.name} ({data.depth})
                    </summary>
                    { lowerList && 
                        lowerList.map((lowerData)=> 
                            <button 
                                type='button'
                                key={lowerData.department_id} 
                            >
                                { lowerData.name }
                            </button> )}
                </details> 
            }
        </>
    );
}

