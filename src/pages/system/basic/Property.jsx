import React/* , { useState } */ from 'react';
import PropertyContent from '../../../components/system/basic/PropertyContent';
// import PropertyDivision from '../../../components/system/basic/PropertyDivision';
// import PropertyMoney from '../../../components/system/basic/PropertyMoney';

export default function Property() {
    // const [active, setActive] = useState(1)
    return (
        <>
            <h2>속성값 설정</h2>

            <PropertyContent />
            {/* <div className="tabBox">
                <button className={active === 1 ? 'active' : ''} onClick={()=>setActive(1)}>구분값 설정</button>
                <button className={active === 2 ? 'active' : ''} onClick={()=>setActive(2)}>투자금액/목표량 설정</button>
            </div>
            <hr className='case03'/>
            {active === 1 && <PropertyDivision />}
            {active === 2 && <PropertyMoney />} */}
        </>
    );
}

