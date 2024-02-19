import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function SelectYear({ setInputs, changeName, disabled, tab }) {
    const [active, setActive] = useState(false)
    const [select, setSelect] = useState()
    const [name, setName] = useState([])
    const [value, setValue] = useState([])

    useEffect(()=>{
        api('calendar', 'calculation_year_list')
            .then(({result, list})=>{
                if(result){
                    setName(list.map(({year_value_title})=>year_value_title));
                    setValue(list.map(({year_value})=>year_value));
                    setSelect(list.filter(({current_year_yn})=> current_year_yn === 'y')[0].year_value_title)
                    setInputs((input)=> ({...input, [changeName]: list.filter(({current_year_yn})=> current_year_yn === 'y')[0].year_value}))
                }
            })

        document.querySelector('body').addEventListener('click',bodyClick)
        return () => {
            // console.log('select 바디 클릭 종료');
            document.querySelector('body').removeEventListener('click',bodyClick)
        }
    },[changeName, setInputs, tab])

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
        <div className={`selectBox-year`}>
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

