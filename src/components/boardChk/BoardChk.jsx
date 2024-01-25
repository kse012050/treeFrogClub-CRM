import React from 'react';

export default function BoardChk({ deleteList, setDeleteList, id }) {
    // console.log(deleteList);
    const lisChecked = (e) =>{
        const { checked } = e.target;
        setDeleteList((list)=>{
            !list && (list = [])
            checked ? 
                (list = [...list, id]) :
                (list = list.filter((listId)=> listId !== id));
            return list
        })
    }
    return (
        <div>
            <input type="checkbox" id={id} onChange={lisChecked} checked={deleteList?.includes(id)}/>
            <label htmlFor={id}></label>
        </div>
    );
}

