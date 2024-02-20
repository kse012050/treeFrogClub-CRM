import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import BureauRegistration from './BureauRegistration';
import BureauUpdate from './BureauUpdate';
import Popup from '../../../components/popup/Popup';

export default function BureauList({ bureau, inputs, setInputs, bureauFunc }) {
    // const [bureau, setBureau] = useState()
    const [bureauRegistrationPopup, setBureauRegistrationPopup] = useState();
    const [bureauUpdatePopup, setBureauUpdatePopup] = useState();
    const [popup, setPopup] = useState()
    // useEffect(()=>{
    //     api('department', 'list')
    //         .then(({result, list, data: { company_name }})=>{
    //             if(result){
    //                 setBureau(()=>({'company_name': company_name, 'list': list}))
    //             }
    //         })
    // },[])

    return (
        <>
            <div className='bureauBox'>
                <div className='listArea'>
                    <b>{ bureau?.company_name }</b>
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
                </div>
                <div className='addBtn'>
                    <button className='btn-gray-black' 
                        onClick={()=>setBureauRegistrationPopup({type: 'children', list: []})}
                    >
                        부서 추가
                    </button>
                    <button 
                        className='btn-gray-black'
                        disabled={!inputs?.department_id}
                        onClick={()=>setBureauUpdatePopup({type: 'children', id: inputs.department_id, list: []})}
                    >
                        부서 수정
                    </button>
                    <button 
                        className='btn-gray-black'
                        disabled={!inputs?.department_id}
                        onClick={()=>setPopup({
                            type: 'finFunc',
                            title: '삭제',
                            description: `[${inputs.name}] 을 삭제하시겠습니까?\n소속된 사용자는 미지정 상태로 변경됩니다.`,
                            func: () =>{
                                api('department', 'delete', inputs)
                                    .then(({result, error_message})=>{
                                        setPopup({'type': 'confirm', 'description': error_message})
                                        if(result){
                                            setPopup((popup)=>({
                                                ...popup,
                                                'title': '완료',
                                            }))
                                            bureauFunc()
                                        }else{
                                            setPopup((popup)=>({
                                                ...popup,
                                                'title': '실패',
                                            }))
                                        }
                                    })
                            }
                        })}
                    >
                        부서 삭제
                    </button>
                </div>
            </div>

            { bureauRegistrationPopup && <BureauRegistration bureauRegistrationPopup={bureauRegistrationPopup} setBureauRegistrationPopup={setBureauRegistrationPopup}/>}
            { bureauUpdatePopup && <BureauUpdate bureauUpdatePopup={bureauUpdatePopup} setBureauUpdatePopup={setBureauUpdatePopup}/>}
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    );
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
    return (
        <>
            <li>
                { data.lower_department_count === '0' ?
                    <button 
                        type='button' 
                        onClick={()=>setInputs(data)}
                        className={inputs?.department_id === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.admin_count})
                    </button> :
                    <details>
                        <summary>
                            {data.name} ({data.lower_department_count})
                        </summary>
                        { lowerList && 
                            lowerList.map((lowerData)=> 
                                <button 
                                    type='button'
                                    key={lowerData.department_id} 
                                    onClick={()=>setInputs(lowerData)}
                                    className={(inputs?.department_id === lowerData.department_id) ? 'active' : ''}
                                >
                                    { lowerData.name }
                                </button> )}
                    </details>
                }
            </li>
        </>
    );
}

