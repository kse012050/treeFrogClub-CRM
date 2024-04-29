import React, { useCallback, useState } from 'react';
import { api } from '../../../api/api';

export default function BureauLista({ bureau, selectBureau, setSelectBureau, children }) {
    return (
        <div className='bureauBox'>
            <div className="listArea">
                <b>{ bureau?.company_name }</b>
                { bureau && 
                    <Ul list={bureau.list} selectBureau={selectBureau} setSelectBureau={setSelectBureau}/>
                }
                { children }
            </div>
        </div>
    );
}

function Ul({ list, selectBureau, setSelectBureau }){
    return (
        <ul className='scroll-width'>
            {list.map((data)=>
                <List key={data.department_id} data={data} selectBureau={selectBureau} setSelectBureau={setSelectBureau}/>
            )}
        </ul>
    )
}

function List({ data, selectBureau, setSelectBureau }){
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
                className={data.department_id === selectBureau.department_id ? 'active' : ''}
                onClick={()=>setSelectBureau(data)}
            >
                { data.name }
            </button>
            {data.lower_department_count > 0 && 
                <button onClick={()=>lowerBureauFunc(data.department_id)}>하위 목록 보기</button>
            }
            {lowerBureau && 
                <Ul list={lowerBureau} selectBureau={selectBureau} setSelectBureau={setSelectBureau}/>
            }
        </li>
    )
}