import React from 'react';

export default function BoardChkAll({ deleteList, setDeleteList, list }) {
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
            <input type="checkbox" id='allChecked' onChange={allChecked} checked={list.length === deleteList.length}/>
            <label htmlFor="allChecked"></label>
        </div>
    );
}

