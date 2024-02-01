import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

function Select({type, list, current, setInputs, changeName, disabled}) {
    // console.log('셀릭트 박스');
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;
    const [active, setActive] = useState(false)
    const [name, setName] = useState([])
    const [value, setValue] = useState([])
    const [select, setSelect] = useState()
    
    useEffect(()=>{
        type === 'year' && setName(['2023', '2022', '2021']);

        type === 'month' && setName(['10', '11', '12']);

        if(type === 'pagerCount'){
            setName(['10', '20', '30', '50', '100', '300', '500']);
            setValue(['10', '20', '30', '50', '100', '300', '500']);
        }

        if(type === 'clientClassification'){
            api('clientcode', 'classification_list')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map((data)=>data.name));
                        setValue(list.map((data)=>data.classification_id));
                    }
                })
        }

        if(type === 'clientGrade'){
            setName(['무료', '유료']);
            setValue(['무료', '유료']);
        }

        if(type === 'customerCount'){
            setName(['10', '20', '30', '50', '100', '300', '500']);
            setValue(['10', '20', '30', '50', '100', '300', '500']);
        }

        if(type === 'yn'){
            setName(['Y', 'N']);
            setValue(['y', 'n']);
        }

        type === 'sns' && setName(['수신', '거부']);

        if(type === 'mobileColor'){
            setName(['허용', '안함'])
            setValue(['y','n'])
        }

        if(type === 'orderBy'){
            setName(['최신등록일 순', '최종수정일 순', '최종상담일 순']);
            setValue(['최신등록일 순', '최종수정일 순', '최종상담일 순']);
        }

        if(type === 'time-hour'){
            const arr = []
            for(let a = 0; a < 24; a++){
                arr.push(Number(a) < 10 ? `0${a}` : a)
            }
            setName(arr);
            setValue(arr);
        }
        
        if(type === 'time-minute'){
            const arr = []
            for(let a = 0; a < 60; a = a + 10){
                arr.push(Number(a) < 10 ? `0${a}` : a)
            }
            setName(arr);
            setValue(arr);
        }
        


        type === 'pageCount' && setName(['1', '2', '3']);

        if(type === 'userDivision'){
            setName(['사용자', '관리자']);
            setValue(['user','admin'])
        }

        if(type === 'divisionList' && list){
            setName(list.map(({name})=>name))
            setValue(list.map(({id})=>id))
        }

        if(type === 'management' && list){
            setName(list.map(({role_classification})=>role_classification))
            setValue(list.map(({role_id})=>role_id))
        }

        if(type === 'use'){
            setName(['사용가능', '사용불가능']);
            setValue(['y','n'])
        }

        if(type === 'productProperties'){
            api('clientcode', 'properties_list', {'all_yn': 'y'})
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
    },[type, list])

    const bodyClick = () =>{
        setActive(false)
    }

    useEffect(()=>{
        if(current && name && value){
            if(typeof(current) === 'string'){
                setSelect(name[value.indexOf(current)])
                setInputs((input)=>({...input, [changeName]: current}))
            }
            if(typeof(current) === 'boolean'){
                setInputs((input)=>({...input, [changeName]: value[0]}))
                setSelect(name[0])
            }
        }
    },[current, name, value, changeName, setInputs])

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
        <div className={`selectBox${type ? `-${type}`: ''}`}>
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

export default memo(Select)