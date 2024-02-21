import React, { useEffect, useId, useState } from 'react';
import BoardChk from '../../../components/boardChk/BoardChk';
import { inputChange } from '../../../api/validation';
import SelectBoard from '../../../components/SelectBoard';
import { api } from '../../../api/api';

export default function PermissionsList({ data, deleteList, setDeleteList, currentData }) {
    const uuid = useId()
    const [inputs, setInputs] = useState();
    const [prevInputs, setPrevInputs] = useState();
    // console.log('?');
    useEffect(()=>{
        setInputs({...data})
        setPrevInputs({...data})
    },[data])

    useEffect(()=>{
        if(inputs && prevInputs && !Object.entries(inputs).every(([key, value])=> value === prevInputs[key])){
            api('module', 'update', inputs)
                .then(({result})=>{
                    if(result){
                        setPrevInputs({...inputs})
                        currentData()
                    }
                })
        }
       
    },[inputs, prevInputs, currentData])

    return (
        <>
            <BoardChk id={data.role_with_module_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
            <span>{ data.module_category }</span>
            <span>{ data.screen_name }</span>
            <div>
                <input type="checkbox" name='insert_yn' id={`insert_yn_${uuid}`} checked={data?.insert_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`insert_yn_${uuid}`}>등록</label>
            </div>
            <div>
                <input type="checkbox" />
                <label htmlFor="role"></label>
                <SelectBoard type='role' current={data?.modify_type} setInputs={setInputs} changeName='modify_type'/>
            </div>
            <div>
                <input type="checkbox" name='update_yn' id={`update_yn_${uuid}`} checked={data?.update_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`update_yn_${uuid}`}></label>
            </div>
            <div>
                <input type="checkbox" name='delete_yn' id={`delete_yn_${uuid}`} checked={data?.delete_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`delete_yn_${uuid}`}></label>
            </div>
            <div>
                <input type="checkbox" />
                <label htmlFor=""></label>
                <SelectBoard type='role' current={data?.select_type} setInputs={setInputs} changeName='select_type'/>
            </div>
            <div>
                <input type="checkbox" name='select_yn' id={`select_yn_${uuid}`} checked={data?.select_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`select_yn_${uuid}`}></label>
            </div>
            <div>
                <input type="checkbox" name='excel_yn' id={`excel_yn_${uuid}`} checked={data?.excel_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`excel_yn_${uuid}`}></label>
            </div>
        </>
    );
}

