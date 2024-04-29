import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../api/api';

export default function BureauNotice({ inputs, setInputs }) {
    const [bureau, setBureau] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                }
            })
    },[])

    return (
        <>
            <div className='bureauBox'>
                <div className='listArea'>
                    <button 
                        type='button'
                        className={inputs === '' ? 'active' : ''}
                        onClick={()=>setInputs(undefined)}
                    >
                        { bureau?.company_name }
                    </button>
                    
                    { bureau && 
                        <Ul list={bureau.list} inputs={inputs} setInputs={setInputs}/>
                    }
                </div>
            </div>
        </>
    );
}


function Ul({ list, inputs, setInputs }){
    return (
        <ul className='scroll-width'>
            {list.map((data)=>
                <List key={data.department_id} data={data} inputs={inputs} setInputs={setInputs}/>
            )}
        </ul>
    )
}

function List({ data, inputs, setInputs }){
    const [lowerBureau, setLowerBureau] = useState()
    const lowerBureauFunc = useCallback((id)=>{
        lowerBureau ? 
            setLowerBureau(undefined) :
            api('department', 'list', {'parent_department_id': id})
                .then(({ result, list })=>{
                    if(result){
                        setLowerBureau(list)
                    }
                });
    },[lowerBureau])
    return (
        <li>
            <button
                type="button"
                className={inputs?.some((data2)=>data2.department_id === data.department_id) ? 'active' : ''}
                onClick={()=>setInputs((input)=>{
                    let arr = input || [];
                    arr.some((arrData)=>arrData.department_id === data.department_id) ?
                        arr = arr.filter((arrData)=> arrData.department_id !== data.department_id) :
                        arr = [...arr, data];
                    return arr;
                })}
            >
                { data.name }
            </button>
            {data.lower_department_count > 0 && 
                <button type="button" onClick={()=>lowerBureauFunc(data.department_id)}>하위 목록 보기</button>
            }
            {lowerBureau && 
                <Ul list={lowerBureau} inputs={inputs} setInputs={setInputs}/>
            }
        </li>
    )
}

