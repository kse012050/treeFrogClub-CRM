import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function SelectMonth({ year, setInputs, changeName, disabled, tab }) {
    const [active, setActive] = useState(false)
    const [select, setSelect] = useState()
    const [name, setName] = useState([])
    const [value, setValue] = useState([])

    useEffect(()=>{
        api('calendar', 'calculation_month_list', {'year_value': year})
            .then(({result, list})=>{
                if(result){
                    setName(list.map((data)=>data.month_value_title.split(' ')[1]))
                    setValue(list.map((data)=>data.month_value.split('-')[1]))
                    if(list.some((data)=>data.current_month_yn === 'y')){
                        setSelect(list.filter(({current_month_yn})=>current_month_yn === 'y')[0].month_value_title.split(' ')[1])
                        setInputs((input)=>({...input, [changeName]: list.filter(({current_month_yn})=>current_month_yn === 'y')[0].month_value.split('-')[1]}))
                    }
                }
            })

        document.querySelector('body').addEventListener('click',bodyClick)
        return () => {
            // console.log('select 바디 클릭 종료');
            document.querySelector('body').removeEventListener('click',bodyClick)
        }
    },[year, changeName, setInputs, tab])

    const bodyClick = () =>{
        setActive(false)
    }

    const selectOpen = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setActive((value)=>!value)
    }

    const listClick = (name, i) =>{
        setSelect(name)
        setActive((active)=>!active)
        setInputs((input)=>({...input, [changeName]: value[i]}))
    }

    return (
        <div className={`selectBox-month`}>
            <button onClick={selectOpen} disabled={disabled}>{ select || '선택' }</button>
            {
                active && 
                    <div>
                        {name.map((name, i)=> <button key={i} onClick={()=>listClick(name, i)}>{name}</button>)}
                    </div>
            }
        </div>
    );
}

