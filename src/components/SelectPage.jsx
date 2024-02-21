import React, { useEffect, useState } from 'react';

export default function SelectPage({ current, setInputs }) {
    const name = ['10', '20', '30', '50', '100', '300', '500']
    const [select, setSelect] = useState(current)
    const [active, setActive] = useState(false)

    useEffect(()=>{
        document.querySelector('body').addEventListener('click',bodyClick)
        return () => {
            // console.log('select 바디 클릭 종료');
            document.querySelector('body').removeEventListener('click',bodyClick)
        }
    },[])

    const bodyClick = () =>{
        setActive(false)
    }

    const selectOpen = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setActive((value)=>!value)
    }

    const listClick = (name) =>{
        setSelect(name)
        setActive((active)=>!active)
        setInputs((input)=>({...input, 'limit': name, 'page': 1}))
    }

    return (
        <div className={`selectBox-pagerCount`}>
            <button onClick={selectOpen}>{ select || '선택' }</button>
            {
                active && 
                    <div>
                        {name.map((name, i)=> <button key={i} onClick={()=>listClick(name)}>{name}</button>)}
                    </div>
            }
        </div>
    );
}

