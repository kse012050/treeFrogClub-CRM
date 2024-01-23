import React from 'react';

export default function BoardChkAll({ deleteList, list }) {
    const allChecked = (e) => {
        const { checked } = e.target;
        console.log(list);
        if(checked){
            deleteList(list)
        }else{
            deleteList([]);
        }
    }
    return (
        <div>
            <input type="checkbox" id='allChecked' onChange={allChecked}/>
            <label htmlFor="allChecked"></label>
        </div>
    );
}

