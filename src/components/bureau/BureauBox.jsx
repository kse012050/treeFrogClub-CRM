import React, { useEffect, useState } from 'react';
import BureauRegistration from './BureauRegistration';
import BureauUpdate from './BureauUpdate';
import { api } from '../../api/api';

export default function BureauBox({ type, inputs, setInputs, dataPopup, setDataPopup }) {
    const [bureau, setBureau] = useState();

    useEffect(()=>{
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    // console.log(list);
                    setBureau(()=>({'company_name': company_name, 'list': list}))
                }
            })
    },[])

    return (
        <div className='bureauBox'>
            { bureau && 
                (
                    (type === 'registration' && <BureauRegistration bureau={bureau} inputs={inputs} setInputs={setInputs} dataPopup={dataPopup} setDataPopup={setDataPopup}/>) ||
                    (type === 'update' && <BureauUpdate bureau={bureau} inputs={inputs} setInputs={setInputs} dataPopup={dataPopup} setDataPopup={setDataPopup}/>)
                )
            }
        </div>
    );
}

