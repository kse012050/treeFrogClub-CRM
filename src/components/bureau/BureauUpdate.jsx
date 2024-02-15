import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import Popup from '../popup/Popup';

export default function BureauUpdate({ bureau, inputs, setInputs, dataPopup, setDataPopup }) {
    const [popup, setPopup] = useState()
    // console.log(inputs);
    const onSales = () => {
        setPopup({
            type: 'salesArray',
            list: dataPopup.list,
            func: (data) => {
                setDataPopup((dataPopup2)=>({...dataPopup2, 'list': data}))
                setInputs((input)=>({...input, 'admin_id_list': data.map((data)=>data.admin_id)}))
            }
        })
    }

    const onSalesDelete = (data) => {
        setDataPopup((dataPopup2)=>({...dataPopup2, 'list': dataPopup2.list.filter((dataPopup3)=>dataPopup3.admin_id !== data.admin_id)}))
        setInputs((input)=>({...input, 'admin_id_list': input.admin_id_list.filter((adminId)=>adminId !== data.admin_id)}))
    }

    return (
        <>
            <div className='listArea'>
                <button 
                    type='button'
                    className={!inputs?.department_id ? 'active' : ''}
                    onClick={()=>setInputs((input)=>({...input, 'department_id': ''}))}
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
                                    setDataPopup={setDataPopup}
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

function BureauList({ data, inputs, setDataPopup }){
    const [lowerList, setLowerList] = useState();
    
    useEffect(()=>{
        if(data.lower_department_count !== '0'){
            api('department', 'list', {'department_id': data.department_id})
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
                    onClick={()=>setDataPopup((update)=>({...update, 'id': data?.department_id}))}
                    className={inputs?.department_id === data?.department_id ? 'active' : ''}
                    >
                        {data.name} ({data.admin_count}) {data.order_Number}
                </button> :
                <details>
                    <summary
                        onClick={()=>setDataPopup((update)=>({...update, 'id': data?.department_id}))}
                        className={(inputs?.department_id === data?.department_id) ? 'active' : ''}
                    >
                        {data.name} ({data.depth})
                    </summary>
                    { lowerList && 
                        lowerList.map((lowerData)=> 
                            <button 
                                type='button'
                                key={lowerData.department_id} 
                                onClick={()=>setDataPopup((update)=>({...update, 'id': lowerData?.department_id}))}
                                // onClick={()=>setInputs(lowerData)}
                                className={(inputs?.department_id === lowerData.department_id) ? 'active' : ''}
                            >
                                { lowerData.name }
                            </button> )}
                </details>
            }
        </>
    );
}

