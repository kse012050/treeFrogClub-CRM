import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/api';
import BureauList from './BureauList';
import BureauUpdate from './BureauUpdate';

export default function BureauBox({type, inputs, setInputs, children}) {
    // console.log(2);
    const [bureau, setBureau] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                }
            })
    },[inputs])

   /*  const list = useMemo(()=>{
        return () =>{
            api('department', 'list')
                .then(({result, list, data: { company_name }})=>{
                    if(result){
                        setBureau(()=>({'company_name': company_name, 'list': list}))
                    }
                })
        }
    },[]) */
    return (
        <>
            <div className='bureauBox'>
                <div className='listArea'>
                    { type === 'list' && <b>{ bureau?.company_name }</b>}
                    { type === 'update' && 
                         <button 
                         type='button'
                         className={inputs.parent_department_id === '' ? 'active' : ''}
                         onClick={()=>setInputs((input)=>({...input, 'parent_department_id': ''}))}
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
                        { type === 'update' && bureau?.list.map((data)=>
                            <BureauUpdate
                                key={data.department_id}
                                data={data}
                                inputs={inputs}
                                setInputs={setInputs}
                                changeName={'parent_department_id'}
                            />
                        )}
                    </ul>
                </div>
                { children && children }
            </div>
        </>
    );
}

