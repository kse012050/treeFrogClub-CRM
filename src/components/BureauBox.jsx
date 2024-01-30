import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import BureauList from './BureauList';
import BureauUpdate from './BureauUpdate';
import BureauRegistration from './BureauRegistration';
import BureauNotice from './BureauNotice';

export default function BureauBox({type, inputs, setInputs, children}) {
    // console.log(2);
    const [bureau, setBureau] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    // console.log(list);
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                }
            })
    },[inputs])

    return (
        <>
            <div className='bureauBox'>
                <div className='listArea'>
                    { (type === 'list' || type === 'update') && <b>{ bureau?.company_name }</b>}
                    { type === 'registration' && 
                         <button 
                         type='button'
                         className={inputs.department_id === '' ? 'active' : ''}
                         onClick={()=>setInputs((input)=>({...input, 'department_id': ''}))}
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
                    
                    <ul>
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
                                key={data.department_id}
                                data={data}
                                inputs={inputs}
                                setInputs={setInputs}
                                changeName={'department_id'}
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
                    </ul>
                </div>
                { children && children }
            </div>
        </>
    );
}

