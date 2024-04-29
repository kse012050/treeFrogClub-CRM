import React, { useState } from 'react';
// import BureauBox from '../BureauBox';
// import BureauBox from '../bureau/BureauBox';

export default function PopupBureau({ close, func }) {
    const [select, setSelect] = useState();

    const bureauSelect = () =>{
        func(select);
        close();
    }
    return (
        <>
            <strong>부서 선택</strong>
            {/* <BureauBox type='choice' select={select} setSelect={setSelect}>
            </BureauBox> */}
            <div className='btnArea-end'>
                <button className='btn-point' onClick={bureauSelect} disabled={!select}>선택 적용</button>
            </div>
        </>
    );
}

