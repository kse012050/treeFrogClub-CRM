import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function BureauChoice({ data, select, setSelect }) {
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
                        onClick={()=>setSelect(data)}
                        className={select?.department_id === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.depth})
                    </button> :
                    <details>
                        <summary>
                            {data.name} ({data.depth})
                        </summary>
                        { lowerList && 
                            lowerList.map((lowerData)=> 
                                <button 
                                    type='button'
                                    key={lowerData.department_id} 
                                    onClick={()=>setSelect(lowerData)}
                                    className={(select?.department_id === lowerData.department_id) ? 'active' : ''}
                                >
                                    { lowerData.name }
                                </button> )}
                    </details>
                }
            </li>
        </>
    );
}

