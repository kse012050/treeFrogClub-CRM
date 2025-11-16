import React from 'react';
import PopupConfirm from './PopupConfirm';
import PopupFunc from './PopupFunc';
import PopupProperty from './PopupProperty';
import PopupBureau from './PopupBureau';
import PopupAnalyst from './PopupAnalyst';
import PopupNewPassword from './PopupNewPassword';
import PopupSales from './PopupSales';
import { useNavigate } from 'react-router-dom';
import PopupSalesArray from './PopupSalesArray';
import PopupExcelDownload from './PopupExcelDownload';
import PopupPayHistory from './PopupPayHistory';
import PopupSalesArrayAdd from './PopupSalesArrayAdd';
import PopupMemo from './PopupMemo';

function Popup({ popup, setPopup, confirmFunc, func, children }) {
    const navigate = useNavigate();

    const close = () =>{
        setPopup('');
        if(popup.type.includes('confirm') && popup.confirmFunc){
            popup.confirmFunc();
        }
        if(popup.type.includes('confirm') && popup.link){
            navigate(popup.link)
        }
    }
    
    return (
        <div className='popupBox' onClick={close}>
            <div onClick={(e)=>e.stopPropagation()} className={popup.type ? `${popup.type}Area` : ''}>
                { popup.type.includes('newPassword') && <PopupNewPassword close={close}/> }
                { popup.type.includes('confirm') && <PopupConfirm close={close} popup={popup} confirmFunc={confirmFunc}/> }
                { popup.type.includes('finFunc') && <PopupFunc close={close} popup={popup} func={func}/> }
                { popup.type.includes('properties') && <PopupProperty close={close} popup={popup}/> }
                { popup.type.includes('bureau') && <PopupBureau close={close} func={popup['func']}/>}
                { popup.type === 'sales' && <PopupSales close={close} func={popup['func']} department_id={popup?.department_id}/>}
                { popup.type === 'salesArray' && <PopupSalesArray close={close} popup={popup}/>}
                { popup.type === 'salesArrayAdd' && <PopupSalesArrayAdd close={close} popup={popup}/>}
                { popup.type.includes('analyst') && <PopupAnalyst close={close} func={popup['func']}/>}
                { popup.type.includes('excelDownload') && <PopupExcelDownload close={close} popup={popup}/>}
                { popup.type.includes('payHistory') && <PopupPayHistory close={close} popup={popup}/>}
                { popup.type.includes('memo') && <PopupMemo close={close} popup={popup}/>}
                { popup.type.includes('children') && children}

                { (popup.type.includes('confirm') || popup.type.includes('finFunc')) || <button onClick={close}>팝업 닫기</button> }
            </div>
        </div>
    );
}

export default React.memo(Popup)