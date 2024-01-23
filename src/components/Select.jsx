import React, { useEffect, useState } from 'react';

export default function Select({name, current, currentChange}) {
    const [active, setActive] = useState(false)
    const [testDate, setTestData] = useState([])
    useEffect(()=>{
        name === 'year' && setTestData(['2023', '2022', '2021']);
        name === 'month' && setTestData(['10', '11', '12']);
        name === 'pagerCount' && setTestData(['10', '20', '30', '50', '100', '300', '500']);
        name === 'pageCount' && setTestData(['1', '2', '3']);
    },[])
    document.querySelector('body').addEventListener('click',()=>{
        setActive(false)
    })

    const selectOpen = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setActive((value)=>!value)
    }

    const listClick = (value) =>{
        currentChange(value)
        setActive((value)=>!value)
    }
    return (
        <div className={`selectBox${name ? `-${name}`: ''}`}>
            <button onClick={selectOpen}>{ current }</button>
            {
                active && 
                    <div>
                        {testDate.map((value, i)=> i !== 0 && <button key={i} onClick={()=>listClick(value)}>{value}</button>)}
                    </div>
            }
        </div>
    );
}

