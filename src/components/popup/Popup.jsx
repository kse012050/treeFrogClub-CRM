import React from 'react';
import PopupProperty from './PopupProperty';
import PopupFunc from './PopupFunc';

function Popup({ popup, setPopup, func }) {
    console.log('팝업 1');
    const close = () =>{
        setPopup('');
    }
    
    return (
        <div className='popupBox' onClick={close}>
            <div onClick={(e)=>e.stopPropagation()}>
                { popup.type.includes('properties') && <PopupProperty close={close} popup={popup} /> }
                { popup.type.includes('finFunc') && <PopupFunc close={close} popup={popup} func={func}/> }
            </div>
        </div>
    );
}

export default React.memo(Popup)