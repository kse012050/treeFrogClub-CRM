import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api'
import BureauList from '../../../components/BureauList';

export default function Bureau() {
    const [bureau, setBureau] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    console.log(list);
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                    // console.log(list.filter((a)=>a.lower_department_count !== '0').map((a)=> a.department_id));
                    
                }
            })
        },[])
        
   /*  useEffect(()=>{
        if(bureau){
            const arr = bureau.list.filter((a)=>a.lower_department_count !== '0').map((a)=> a.department_id);
            apiAwait('department', 'list', 'parent_department_id', arr)
                .then(({result, list})=>{
                    if(result){
                        arr.forEach((id)=>{
                            setBureau((bureau)=>({...bureau, }))
                        })
                    }
                    console.log(result);
                })
        }
    },[bureau]) */

    return (
        <>
            <h2>
                부서 관리
                <div>
                    <input type="search" />
                    <button>검색</button>
                </div>
            </h2>
            
            <div className="horizontalTwo">
                <div className='bureauBox'>
                    <div className='listArea'>
                        <b>{ bureau?.company_name }</b>
                        <ul>
                            { bureau?.list.map((data)=>
                                <BureauList data={data} key={data.department_id}/>
                                // <li key={data.department_id}>
                                //     { data.lower_department_count === '0' ? 
                                //         <button>{data.name} ({data.depth})</button> :
                                //         <details>
                                //             <summary>{data.name} ({data.depth})</summary>
                                //             <button>asd</button>
                                //         </details>
                                //     }
                                // </li>
                            )}
                        </ul>
                    </div>
                    <div className='btnArea'>
                        <button className='btn-gray-black'>부서 추가</button>
                        <button className='btn-gray-black'>부서 수정</button>
                        <button className='btn-gray-black'>부서 삭제</button>
                    </div>
                </div>
            </div>
        </>
    );
}

