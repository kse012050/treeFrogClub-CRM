import React from 'react';
import PopupConfirm from './PopupConfirm';
import PopupFunc from './PopupFunc';
import PopupProperty from './PopupProperty';

function Popup({ popup, setPopup, func }) {
    const close = () =>{
        setPopup('');
    }
    
    return (
        <div className='popupBox' onClick={close}>
            <div onClick={(e)=>e.stopPropagation()}>
                { popup.type.includes('confirm') && <PopupConfirm close={close} popup={popup} /> }
                { popup.type.includes('finFunc') && <PopupFunc close={close} popup={popup} func={func}/> }
                { popup.type.includes('properties') && <PopupProperty close={close} popup={popup} /> }
            </div>
        </div>
    );
}

export default React.memo(Popup)