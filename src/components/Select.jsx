import React, { useEffect, useState } from 'react';

export default function Select({name}) {
    const [active, setActive] = useState(false)
    const [testDate, setTestData] = useState([])
    useEffect(()=>{
        name === 'year' && setTestData(['2023', '2022', '2021']);
        name === 'month' && setTestData(['10', '11', '12']);
    },[])
    return (
        <div className={`selectBox${name ? `-${name}`: ''}`}>
            <button onClick={()=>setActive((value)=>!value)}>{testDate[0]}</button>
            {
                active && <div>
                {testDate.map((value, i)=>{
                    if(i === 0){return}
                    return (
                        <button key={i} onClick={()=>setActive((value)=>!value)}>{value}</button>
                    )
                    })
                }
                </div>
            }
        </div>
    );
}

