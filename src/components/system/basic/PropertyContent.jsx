import React, { useState } from 'react';
import PropertyDivision from './PropertyDivision';
import PropertyMoney from './PropertyMoney';

export default function PropertyContent() {
    const [active, setActive] = useState(1)
    return (
        <>
            <div className="tabBox">
                <button className={active === 1 ? 'active' : ''} onClick={()=>setActive(1)}>구분값 설정</button>
                <button className={active === 2 ? 'active' : ''} onClick={()=>setActive(2)}>투자금액/목표량 설정</button>
            </div>   
            <hr className='case03'/>
            {active === 1 && <PropertyDivision />}
            {active === 2 && <PropertyMoney />}
        </>
    );
}

