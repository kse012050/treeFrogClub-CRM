import React from 'react';
import PopupProperty from './PopupProperty';

export default function Popup({ active }) {
    return (
        <div className='popupBox' onClick={()=>active('')}>
            <div onClick={(e)=>e.stopPropagation()}>
                <PopupProperty />
            </div>
        </div>
    );
}

