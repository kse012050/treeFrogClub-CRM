import React, { useId } from 'react';

export default function BoardChkAll({ deleteList, setDeleteList, list }) {
    const uuid = useId()
    const allChecked = (e) => {
        const { checked } = e.target;
        // console.log(list);
        if(checked){
            setDeleteList(list)
        }else{
            setDeleteList([]);
        }
    }
    return (
        <div>
            <input type="checkbox" id={uuid} onChange={allChecked} checked={list?.length === deleteList?.length && list.length}/>
            <label htmlFor={uuid}></label>
        </div>
    );
}

