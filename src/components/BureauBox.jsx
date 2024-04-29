import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import BureauList from './BureauList';
import BureauUpdate from './BureauUpdate';
import BureauRegistration from './BureauRegistration';
import BureauNotice from './BureauNotice';
import BureauChoice from './BureauChoice';
import { inputChange } from '../api/validation';

export default function BureauBox({type, inputs, setInputs, children, select, setSelect, setFirstBureau}) {
    // console.log(2);
    const [bureau, setBureau] = useState();
    const [searchInputs, setSearchInputs] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                    if(type === 'list'){
                        setFirstBureau(list[0])
                        // console.log(list[0]);
                    }
                }
            })
    },[type, inputs, setFirstBureau])

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
            {type === 'choice' &&
                <form className='searchArea'>
                    <input type="search" placeholder='검색' name='name' id='name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                    <button onClick={onSearch}>검색</button>
                </form>
            }
            <div className='bureauBox'>
                <div className='listArea'>
                    { (type === 'list' || type === 'update') && <b>{ bureau?.company_name }</b>}
                    { type === 'registration' && 
                         <button 
                         type='button'
                         className={!inputs?.parent_department_id ? 'active' : ''}
                         onClick={()=>setInputs((input)=>({...input, 'parent_department_id': ''}))}
                        >
                            { bureau?.company_name }
                        </button>
                    }
                    { type === 'notice' && 
                         <button 
                         type='button'
                         className={inputs === '' ? 'active' : ''}
                         onClick={()=>setInputs('')}
                        >
                            { bureau?.company_name }
                        </button>
                    }
                    {type === 'choice' &&
                        <b>{ bureau?.company_name }</b>
                    }
                    
                    <ul className='scroll-width'>
                        { type === 'list' && bureau?.list.map((data)=>
                            <BureauList 
                                key={data.department_id}
                                data={data}
                                inputs={inputs}
                                setInputs={setInputs}
                                changeName={'department_id'}
                            />
                        )}
                        { type === 'registration' && bureau?.list.map((data)=>
                            <BureauRegistration
                                key={data?.parent_department_id}
                                data={data}
                                inputs={inputs}
                                setInputs={setInputs}
                                changeName={'parent_department_id'}
                            />
                        )}
                        { type === 'update' && bureau?.list.map((data)=>
                            <BureauUpdate
                                key={data.department_id}
                                data={data}
                                inputs={inputs}
                                setInputs={setInputs}
                                changeName={'department_id'}
                            />
                        )}
                        { type === 'notice' && bureau?.list.map((data)=>
                            <BureauNotice
                                key={data.department_id}
                                data={data}
                                inputs={inputs}
                                setInputs={setInputs}
                                changeName={'department_id'}
                            />
                        )}
                        { type === 'choice' && bureau?.list.map((data)=>
                            <BureauChoice
                                key={data.department_id}
                                data={data}
                                select={select}
                                setSelect={setSelect}
                            />
                        )}
                    </ul>
                </div>
                { (type === 'registration' || type === 'update') && 
                    <div className="addBtn">
                        <b>부서장 선택</b>
                        <span>(최대 6명)</span>
                        <button className='btn-gray-black' onClick={(e)=>e.preventDefault()}>찾기</button>
                    </div>
                }
                { children && children }
            </div>
        </>
    );
}

