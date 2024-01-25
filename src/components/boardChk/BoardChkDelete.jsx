import React, { useState } from 'react';
import { api, apiAwait } from '../../api/api'
import Popup from '../popup/Popup';

export default function BoardChkDelete({ url, idName, deleteList, setDeleteList, isAwait }) {
    const [popup, setPopup] = useState('')
    // console.log(typeof deleteList);
    const popupFunc = () =>{
        if(/* Array.isArray(deleteList) &&  */deleteList.length){
            if(!isAwait){
                api(url, 'delete', {[idName]: deleteList})
                    .then((result)=>{
                        console.log(result);
                        if(result){
                            setPopup('');
                            setDeleteList('')
                        }
                    })
            }else{
                apiAwait(url, 'delete', idName, deleteList).then((result)=>{
                    if(result){
                        setPopup('');
                        setDeleteList('')
                    }
                })
            }
        }
    }

    return (
        <>
            <button className='btn-gray-black' 
                onClick={()=>setPopup({
                    'type': 'finFunc',
                    'title': '선택 삭제',
                    'description': `선택 항목을 삭제하시겠습니까?`
                })}
                disabled={!deleteList?.length}>선택 삭제</button>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} func={popupFunc}/>
            )}
        </>
    );
}

