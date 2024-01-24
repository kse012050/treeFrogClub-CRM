import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PopupConfirm({ popup, close }) {
    const navigate = useNavigate();
    return (
        <>
            <strong>{ popup.title }</strong>
            <p>{ popup.description }</p>
            <div className='btnArea'>
                <button className='btn-point' onClick={()=> popup.link ? navigate(popup.link) : close()}>확인</button>
            </div>
        </>
    );
}

