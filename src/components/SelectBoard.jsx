import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

function SelectBoard({type, current, setInputs, changeName, disabled}) {
    // console.log('셀릭트 박스');
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;
    const [active, setActive] = useState(false)
    const [name, setName] = useState([])
    const [value, setValue] = useState([])
    const [select, setSelect] = useState()
    
    useEffect(()=>{
        if(type === 'role'){
            setName(['전체', '부서', '본인'])
            setValue(['all', 'department', 'me'])
        }
        
        if(type === 'sales'){
            api('user', 'list', {'all_yn': 'y'})
                .then(({result, list})=>{
                    if(result){
                        setValue(list.filter(({useable_yn})=> useable_yn === 'y').map(({admin_id})=>admin_id));
                        setName(list.filter(({useable_yn})=> useable_yn === 'y').map(({name})=> name));
                        setSelect(list.filter(({admin_id})=> admin_id === current)[0]?.name)
                    }
                })
        }

        if(type === 'counsel'){
            api('commoncode', 'properties_list', {'all_yn': 'y'})
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name))
                        setValue(list.map(({properties_id})=>properties_id))
                    }
                })
        }
        document.querySelector('body').addEventListener('click',bodyClick)
        return () => {
            // console.log('select 바디 클릭 종료');
            document.querySelector('body').removeEventListener('click',bodyClick)
        }
    },[type, current])

    const bodyClick = () =>{
        setActive(false)
    }

    useEffect(()=>{
        if(current && name && value && type !== 'sales'){
            if(typeof(current) === 'string'){
                setSelect(name[value.indexOf(current)])
                setInputs && setInputs((input)=>({...input, [changeName]: current}))
            }
            if(typeof(current) === 'boolean'){
                setSelect(name[0])
                setInputs && setInputs((input)=>({...input, [changeName]: value[0]}))
            }
        }
    },[current, name, value, changeName, setInputs, type])

    const selectOpen = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setActive((value)=>!value)
    }

    const listClick = (name, i) =>{
        search && navigate(pathname)
        setSelect(name)
        setInputs((input)=>({...input, [changeName]: value[i]}))
        setActive((active)=>!active)
    }
    return (
        <div className={`selectBoard${type ? `-${type}`: ''}`}>
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

export default memo(SelectBoard)