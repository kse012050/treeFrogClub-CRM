import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/api';
import { inputChange } from '../../api/validation';

export default function PopupBureau({ close, func }) {
    const [inputs, setInputs] = useState()
    const [bureau, setBureau] = useState()
    const [searchInputs, setSearchInputs] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    setBureau((prev)=>({...prev, 'company_name': company_name, 'list': list}))
                }
            })
    },[])

    const bureauSelect = () =>{
        func(inputs);
        close();
    }

    const onSearch = (e) =>{
        e.preventDefault()
        // console.log(searchInputs);
        
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    // console.log(list);
                    // console.log(list.filter((listData)=>listData.name.includes(searchInputs.name)))
                    setBureau(()=>({
                        'company_name': company_name,
                        'list': list.filter((listData)=>listData.name.includes(searchInputs.name))
                    }))
                }
            })
    }

    return (
        <>
            <strong>부서 선택</strong>
            <form className='searchArea'>
                <input type="search" placeholder='검색' name='name' id='name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                <button onClick={onSearch}>검색</button>
            </form>
            <div className='bureauBox'>
                <div className='listArea'>
                    <b>
                        { bureau?.company_name }
                    </b>
                    { bureau && 
                        <Ul list={bureau.list} inputs={inputs} setInputs={setInputs}/>
                    }
                </div>
            </div>
            <div className='btnArea-end'>
                <button className='btn-point' onClick={bureauSelect} disabled={!inputs}>선택 적용</button>
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
                className={data.department_id === inputs?.department_id ? 'active' : ''}
                onClick={()=>setInputs((input)=>({...input, 'department_id': data.department_id, 'name': data.name}))}
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

