import React, { useCallback, useState } from 'react';
import { api } from '../../../api/api';

export default function BureauLista({ bureau, bureauId, setBureauId, children }) {
    console.log(children);
    return (
        <div className='bureauBox'>
            <div className="listArea">
                <b>{ bureau?.company_name }</b>
                { bureau && 
                    <Ul list={bureau.list} bureauId={bureauId} setBureauId={setBureauId}/>
                }
                { children }
            </div>
        </div>
    );
}

function Ul({ list, bureauId, setBureauId }){
    return (
        <ul className='scroll-width'>
            {list.map((data)=>
                <List key={data.department_id} data={data} bureauId={bureauId} setBureauId={setBureauId}/>
            )}
        </ul>
    )
}

function List({ data, bureauId, setBureauId }){
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
                className={data.department_id === bureauId ? 'active' : ''}
                onClick={()=>setBureauId(data.department_id)}
            >
                { data.name } { data.lower_department_count }
            </button>
            {data.lower_department_count > 0 && 
                <button onClick={()=>lowerBureauFunc(data.department_id)}>하위 목록 보기</button>
            }
            {lowerBureau && 
                <Ul list={lowerBureau} bureauId={bureauId} setBureauId={setBureauId}/>
            }
        </li>
    )
}