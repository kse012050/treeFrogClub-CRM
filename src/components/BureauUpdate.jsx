import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function BureauUpdate({ data, inputs, setInputs, changeName }) {
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
                        onClick={()=>setInputs((input)=>({...input, [changeName]: data.department_id}))}
                        className={inputs[changeName] === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.depth})
                    </button> :
                    <details>
                        <summary
                            onClick={()=>setInputs((input)=>({...input, [changeName]: data.department_id}))}
                            className={(inputs[changeName] === data.department_id) ? 'active' : ''}
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
            </li>
        </>
    );
}

