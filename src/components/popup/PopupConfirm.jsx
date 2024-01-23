import React from 'react';

export default function PopupConfirm({ popup, close }) {
    return (
        <>
            <strong>{ popup.title }</strong>
            <p>{ popup.description }</p>
            <div className='btnArea'>
                <button className='btn-point' onClick={close}>확인</button>
            </div>
        </>
    );
}

