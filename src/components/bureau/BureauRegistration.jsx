import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import Popup from '../popup/Popup';

export default function BureauRegistration({ bureau, inputs, setInputs, dataPopup, setDataPopup }) {
    const [popup, setPopup] = useState()

    useEffect(()=>{
        setInputs({'parent_department_id': ''})
    },[setInputs])

    const onSales = () => {
        setInputs((input)=>{
            const copy = {...input}
            if(copy.hasOwnProperty('admin_id_list')){
                delete copy.admin_id_list
            }
            return copy
        })

        setDataPopup((dataPopup)=> ({...dataPopup, list: []}))

        setPopup({
            type: 'salesArray',
            func: (data) => {
                setDataPopup((dataPopup)=>({...dataPopup, list: data}))
                setInputs((input)=>({...input, 'admin_id_list': data.map((data)=>data.admin_id)}))
            }
        })
    }

    const onSalesDelete = (data) => {
        // console.log(data);
        setDataPopup((dataPopup2)=>({...dataPopup2, 'list': dataPopup2.list.filter((dataPopup3)=>dataPopup3.admin_id !== data.admin_id)}))
        setInputs((input)=>({...input, 'admin_id_list': input.admin_id_list.filter((adminId)=>adminId !== data.admin_id)}))
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
            { dataPopup?.list.length !== 0 &&
                <ul className='choice-horizontal scroll-width'>
                    { dataPopup.list.map((data)=>(
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
    
    const onListClick = (data) =>{
        setInputs((input)=>({...input, 'parent_department_id': data?.department_id}))
    }

    return (
        <>
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
                        {data.name} ({data.lower_department_count})
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

