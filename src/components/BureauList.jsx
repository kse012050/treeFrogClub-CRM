import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function BureauList({ data, inputs, setInputs, changeName }) {
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
                        className={inputs[changeName] === data.department_id ? 'active' : ''}
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
                                    className={(inputs[changeName] === lowerData.department_id) ? 'active' : ''}
                                >
                                    { lowerData.name }
                                </button> )}
                    </details>
                }
            </li>
        </>
    );
}

