import React, { useState } from 'react';
import { api, apiAwait } from '../../api/api'
import Popup from '../popup/Popup';
import { logButton } from '../../api/common';

export default function BoardChkDelete({ url, funcName, idName, deleteList, setDeleteList, isAwait, className, currentData, logValue }) {
    const [popup, setPopup] = useState('')
    const popupFunc = () =>{
        if(deleteList.length){
            // console.log(deleteList);
            const confirmPopupMessage = {
                'type': 'confirm',
                'title': '완료',
                'description': `항목이 삭제되었습니다.`,
            }
            const funcType = funcName ? funcName : 'delete'
            if(!isAwait){
                api(url, funcType, {[idName]: deleteList})
                    .then(({result})=>{
                        if(result){
                            setPopup(confirmPopupMessage)
                            setDeleteList([])
                            currentData()
                            logButton(logValue)
                        }
                    })
            }else{
                apiAwait(url, funcType, idName, deleteList)
                    .then((result)=>{
                        if({result}){
                            setPopup(confirmPopupMessage)
                            setDeleteList([])
                            currentData()
                            logButton(logValue)
                        }
                    })
            }
        }
    }

    return (
        <>
            <button className={`btn-gray-black ${className ? className : ''}`}
                onClick={()=>setPopup({
                    'type': 'finFunc',
                    'title': '선택 삭제',
                    'description': `선택 항목을 삭제하시겠습니까?`,
                    'func': popupFunc
                })}
                disabled={!deleteList?.length}>선택 삭제</button>
            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    );
}

