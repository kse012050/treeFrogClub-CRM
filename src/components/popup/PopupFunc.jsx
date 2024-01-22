import React from 'react';

export default function PopupFunc({ popup, close, func}) {
    return (
        <>
            <strong>{ popup.title }</strong>
            <p>{ popup.description }</p>
            <div className='btnArea'>
                <button className='btn-gray-white' onClick={close}>취소</button>
                <button className='btn-point' onClick={func}>확인</button>
            </div>
        </>
    );
}

