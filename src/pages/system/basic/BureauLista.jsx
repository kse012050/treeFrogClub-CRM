import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/api';

export default function BureauLista({ bureau, selectBureau, setSelectBureau, rootBureau, setRootBureau, children }) {
    return (
        <div className='bureauBox'>
            <div className="listArea">
                <b>{ bureau?.company_name }</b>
                { bureau && 
                    <Ul list={bureau.list} selectBureau={selectBureau} setSelectBureau={setSelectBureau} rootBureau={rootBureau} setRootBureau={setRootBureau}/>
                }
                { children }
            </div>
        </div>
    );
}

function Ul({ list, selectBureau, setSelectBureau, rootBureau, setRootBureau }){
    return (
        <ul className='scroll-width'>
            {list.map((data)=>
                <List key={data.department_id} data={data} selectBureau={selectBureau} setSelectBureau={setSelectBureau} rootBureau={rootBureau} setRootBureau={setRootBureau}/>
            )}
        </ul>
    )
}

function List({ data, selectBureau, setSelectBureau, rootBureau, setRootBureau }){
    const [lowerBureau, setLowerBureau] = useState()

    const test = useCallback((id)=>{
        api('department', 'list', {'parent_department_id': id})
            .then(({ result, list })=>{
                if(result){
                    setLowerBureau(list)
                }
            });
    },[setLowerBureau])

    const lowerBureauFunc = useCallback((id)=>{
        if(lowerBureau){ 
            setLowerBureau(undefined)
            setRootBureau((prev)=>prev.filter((data)=> data !== id))
        }else{
            test(id)
            setRootBureau((prev)=> [...prev, id])
        }
    },[lowerBureau, setRootBureau, test])


    useEffect(()=>{
        if(rootBureau.some((data2)=> data2 === data.department_id)){
            test(data.department_id)
        }
    },[data, rootBureau, test])
    return (
        <li>
            <button
                className={data.department_id === selectBureau?.department_id ? 'active' : ''}
                onClick={()=>setSelectBureau(data)}
            >
                { data.name }
            </button>
            {data.lower_department_count > 0 && 
                <button onClick={()=>lowerBureauFunc(data.department_id)}>하위 목록 보기</button>
            }
            {lowerBureau && 
                <Ul list={lowerBureau} selectBureau={selectBureau} setSelectBureau={setSelectBureau} rootBureau={rootBureau} setRootBureau={setRootBureau}/>
            }
        </li>
    )
}