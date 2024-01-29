import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PopupConfirm({ popup, close, confirmFunc }) {
    const navigate = useNavigate();

    const confirm = () =>{
        if(popup.link){
            navigate(popup.link)
        }else if(popup.confirmFunc) {
            popup.confirmFunc();
        }
        close()
    }
    return (
        <>
            <strong>{ popup.title }</strong>
            <p>{ popup.description }</p>
            <div className='btnArea'>
                <button className='btn-point' onClick={confirm}>확인</button>
            </div>
        </>
    );
}

