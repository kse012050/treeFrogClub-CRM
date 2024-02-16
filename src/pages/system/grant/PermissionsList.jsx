import React, { useEffect, useState } from 'react';
import BoardChk from '../../../components/boardChk/BoardChk';
import { inputChange } from '../../../api/validation';
import SelectBoard from '../../../components/SelectBoard';
import { api } from '../../../api/api';

export default function PermissionsList({ data, deleteList, setDeleteList }) {
    const [inputs, setInputs] = useState();
    const [prevInputs, setPrevInputs] = useState();

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
                    }
                })
        }
       
    },[inputs, prevInputs])

    return (
        <>
            <BoardChk id={data.role_with_module_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
            <span>{ data.module_category }</span>
            <span>{ data.screen_name }</span>
            <div>
                <input type="checkbox" name='insert_yn' id='insert_yn' defaultChecked={data?.insert_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor="insert_yn">등록</label>
            </div>
            <div>
                <input type="checkbox" />
                <label htmlFor="role"></label>
                <SelectBoard type='role' current={data?.modify_type} setInputs={setInputs} changeName='modify_type'/>
            </div>
            <div>
                <input type="checkbox" name='update_yn' id='update_yn' defaultChecked={data?.update_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor="update_yn"></label>
            </div>
            <div>
                <input type="checkbox" name='delete_yn' id='delete_yn' defaultChecked={data?.delete_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor="delete_yn"></label>
            </div>
            <div>
                <input type="checkbox" />
                <label htmlFor=""></label>
                <SelectBoard type='role' current={data?.select_type} setInputs={setInputs} changeName='select_type'/>
            </div>
            <div>
                <input type="checkbox" name='select_yn' id='select_yn' defaultChecked={data?.select_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor="select_yn"></label>
            </div>
            <div>
                <input type="checkbox" name='excel_yn' id='excel_yn' defaultChecked={data?.excel_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor="excel_yn"></label>
            </div>
        </>
    );
}

