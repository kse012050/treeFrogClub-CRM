import React from 'react';
import PopupConfirm from './PopupConfirm';
import PopupFunc from './PopupFunc';
import PopupProperty from './PopupProperty';
import PopupBureau from './PopupBureau';
import PopupAnalyst from './PopupAnalyst';

function Popup({ popup, setPopup, confirmFunc, func, children }) {
    const close = () =>{
        setPopup('');
    }
    
    return (
        <div className='popupBox' onClick={close}>
            <div onClick={(e)=>e.stopPropagation()} className={popup.type ? `${popup.type}Area` : ''}>
                { popup.type.includes('confirm') && <PopupConfirm close={close} popup={popup} confirmFunc={confirmFunc}/> }
                { popup.type.includes('finFunc') && <PopupFunc close={close} popup={popup} func={func}/> }
                { popup.type.includes('properties') && <PopupProperty close={close} popup={popup}/> }
                { popup.type.includes('bureau') && <PopupBureau close={close} func={popup['func']}/>}
                { popup.type.includes('analyst') && <PopupAnalyst close={close} func={popup['func']}/>}
                { popup.type.includes('children') && children}
            </div>
        </div>
    );
}

export default React.memo(Popup)