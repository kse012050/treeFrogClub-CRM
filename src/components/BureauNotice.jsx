import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function BureauNotice({ data, inputs, setInputs }) {
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
                        onClick={()=>setInputs((input)=>{
                            let arr = input || [];
                            arr.some((arrData)=>arrData.department_id === data.department_id) ?
                                arr = arr.filter((arrData)=> arrData.department_id !== data.department_id) :
                                arr = [...arr, data];
                            return arr;
                        })}
                        className={(inputs && inputs.some((input)=>input.department_id === data.department_id)) ? 'active' : ''}
                        >
                            {data.name} ({data.depth})
                    </button> :
                    <details>
                        <summary
                            // onClick={()=>setInputs(data)}
                            // className={inputs[changeName] === data.department_id ? 'active' : ''}
                        >
                            {data.name} ({data.depth})
                        </summary>
                        { lowerList && 
                            lowerList.map((lowerData)=> 
                                <button 
                                    type='button'
                                    key={lowerData.department_id} 
                                    onClick={()=>setInputs((input)=>{
                                        let arr = input || [];
                                        arr.some((arrData)=>arrData.department_id === lowerData.department_id) ?
                                            arr = arr.filter((arrData)=> arrData.department_id !== lowerData.department_id) :
                                            arr = [...arr, lowerData];
                                        return arr;
                                    })}
                                    className={(inputs && inputs.some((input)=>input.department_id === lowerData.department_id)) ? 'active' : ''}
                                >
                                    { lowerData.name }
                                </button> )}
                    </details>
                }
            </li>
        </>
    );
}

