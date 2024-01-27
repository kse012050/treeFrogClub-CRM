import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function BureauList({ data }) {
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
                    <button>{data.name} ({data.depth})</button> :
                    <details>
                        <summary>{data.name} ({data.depth})</summary>
                        {lowerList && lowerList.map((lowerData)=> <button key={lowerData.department_id}>{ lowerData.name }</button> )}
                    </details>
                }
            </li>
        </>
    );
}

