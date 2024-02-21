import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api';

export default function BureauList({ bureau, inputs, setInputs, children }) {
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
                                    bureau={bureau}
                                />
                            )}
                        </ul>
                    }
                    { children }
                </div>
               
            </div>
        </>
    );
}


function List({ data, inputs, setInputs, bureau }){
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
    },[data.lower_department_count, data.department_id, bureau])
    
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
                        <summary 
                            onClick={()=>setInputs(data)}
                            className={inputs?.department_id === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.admin_count})
                        </summary>
                        { lowerList && 
                            lowerList.map((lowerData)=> 
                                <button 
                                    type='button'
                                    key={lowerData.department_id} 
                                    onClick={()=>setInputs(lowerData)}
                                    className={(inputs?.department_id === lowerData.department_id) ? 'active' : ''}
                                >
                                    { lowerData.name } ({lowerData.admin_count})
                                </button> )}
                    </details>
                }
            </li>
        </>
    );
}

