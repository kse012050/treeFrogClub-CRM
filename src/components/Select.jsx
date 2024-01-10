import React, { useEffect, useState } from 'react';

export default function Select({name}) {
    const [active, setActive] = useState(false)
    const [testDate, setTestData] = useState([])
    useEffect(()=>{
        name === 'year' && setTestData(['2023', '2022', '2021']);
        name === 'month' && setTestData(['10', '11', '12']);
        name === 'pageCount' && setTestData(['1', '2', '3']);
    },[name])
    document.querySelector('body').addEventListener('click',()=>{
        setActive(false)
    })
    const selectOpen = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setActive((value)=>!value)
    }
    return (
        <div className={`selectBox${name ? `-${name}`: ''}`}>
            <button onClick={selectOpen}>{testDate[0]}</button>
            {
                active && 
                    <div>
                        {testDate.map((value, i)=> i !== 0 && <button key={i} onClick={()=>setActive((value)=>!value)}>{value}</button>)}
                    </div>
            }
        </div>
    );
}

