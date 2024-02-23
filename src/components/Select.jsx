import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

function Select({type, current, setInputs, changeName, placeholder, disabled}) {
    // console.log('셀릭트 박스');
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;
    const [active, setActive] = useState(false)
    const [name, setName] = useState([])
    const [value, setValue] = useState([])
    const [select, setSelect] = useState()
    const [isPlaceholder, setIsPlaceholder] = useState(!!placeholder)
    
    useEffect(()=>{
        // 대시 보드
        if(type === 'year'){
            api('calendar', 'calculation_year_list')
                .then(({result, list})=>{
                    if(result){
                        // console.log(list);
                        setName(list.map(({year_value_title})=>year_value_title));
                        setValue(list.map(({year_value})=>year_value));
                    }
                })
        }

        if(type === 'month'){
            setName(['10', '11', '12']);
        }
        // 대시 보드 finc

        // 페이저
        if(type === 'pagerCount'){
            setName(['10', '20', '30', '50', '100', '300', '500']);
            setValue(['10', '20', '30', '50', '100', '300', '500']);
        }


        // 고객DB 관리
        if(type === 'sales'){
            api('user', 'list')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name));
                        setValue(list.map(({admin_id})=>admin_id));
                    }
                })
        }

        if(type === 'analyst'){
            api('user', 'analyst_list')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name));
                        setValue(list.map(({admin_id})=>admin_id));
                    }
                })
        }

        if(type === 'product'){
            api('product', 'list', {'all_yn': 'y'})
                .then(({result, list})=>{
                    // console.log(list);
                    if(result){
                        setName(list.map(({product_name})=>product_name));
                        setValue(list.map(({product_id})=>product_id));
                    }
                })
        }

        if(type === 'excelCount'){
            setName(['1,000', '5,000', '10,000'])
            setValue(['1000', '5000', '10000'])
        }

        if(type === 'customerList'){
            setName(['영업담당자'/* , '관리담당자' */, '상담상태', '고객구분']);
            setValue(['영업담당자'/* , '관리담당자' */, '상담상태', '고객구분'])
        }
        // 고객DB 관리 fin


        // 고객DB 관리 - 고객 등록
        if(type === 'salesProperties'){
            api('properties', 'properties_list', {'classification_id': '3'})
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name));
                        setValue(list.map(({properties_id})=>properties_id));
                    }
                })
        }

        
        if(type === 'refund'){
            api('properties', 'properties_list', {'classification_id': '5'})
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name));
                        setValue(list.map(({properties_id})=>properties_id));
                    }
                })
        }

        if(type === 'period'){
            const arr = ['1주']
            for(let a = 1; a <= 36; a++){
                arr.push(`${a}개월`)
            }
            setName(arr)
            setValue(arr)
        }
        // 고객DB 관리 - 고객 등록 fin


        // 시스템 관리 - 기본 설정 - 고객 구분 관리 
        if(type === 'clientClassification'){
            api('clientcode', 'classification_list')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map((data)=>data.name));
                        setValue(list.map((data)=>data.classification_id));
                    }
                })
        }
        // 시스템 관리 - 기본 설정 - 고객 구분 관리 fin

        // 시스템 관리 - 기본 설정 - 공통 코드
        if(type === 'commonClassification'){
            api('commoncode', 'classification_list')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name));
                        setValue(list.map(({code})=>code));
                    }
                })
        }
        // 시스템 관리 - 기본 설정 - 공통 코드 fin

        
        // 시스템 관리 - 권한 설정 - 역할 권한 권리
        if(type === 'moduleCategory'){
            api('module', 'category')
                .then(({result, list})=>{
                    if(result){
                        // console.log(list);
                        setName(['전체', ...list.map(({module_category})=>module_category)]);
                        setValue(['', ...list.map(({module_category})=>module_category)]);
                        // setValue(list.map(({module_id})=>module_id));
                    }
                })
        }
        // 시스템 관리 - 권한 설정 - 역할 권한 권리 fin

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
            for(let a = 1; a < 24; a++){
                arr.push(Number(a) < 10 ? `0${a}` : `${a}`)
            }
            setName(arr);
            setValue(arr);
        }
        
        if(type === 'time-minute'){
            const arr = []
            for(let a = 10; a < 60; a = a + 10){
                arr.push(Number(a) < 10 ? `0${a}` : `${a}`)
            }
            setName(arr);
            setValue(arr);
        }
        if(type === 'time-minute2'){
            const arr = []
            for(let a = 0; a < 60; a++){
                arr.push(Number(a) < 10 ? `0${a}` : `${a}`)
            }
            setName(arr);
            setValue(arr);
        }
        


        type === 'pageCount' && setName(['1', '2', '3']);

        if(type === 'userDivision'){
            setName(['사용자', '관리자']);
            setValue(['user','admin'])
        }

        if(type === 'divisionList'){
            api('constant', 'role_classification')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({name})=>name))
                        setValue(list.map(({id})=>id))
                    }
                })
        }

        if(type === 'management'){
            api('role', 'list')
                .then(({result, list})=>{
                    if(result){
                        setName(list.map(({role_name})=>role_name))
                        setValue(list.map(({role_id})=>role_id))
                    }
                })
        }

        if(type === 'use'){
            setName(['사용가능', '사용불가능']);
            setValue(['y','n'])
        }

        if(type === 'customer'){
            api('clientcode', 'properties_list', {'all_yn': 'y'})
                .then(({result, list})=>{
                    if(result){
                            // console.log(list);
                            setName(list.map(({name})=>name))
                            setValue(list.map(({properties_id})=>properties_id))
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

        // 회원사 관리
        // 회원사 관리 - 사용자접속이력
        if(type === 'logType'){
            setName(['전체', '로그인', '페이지로딩', '버튼클릭', '로그아웃', '엑셀다운로드'])
            setValue(['', '로그인', '페이지로딩', '버튼클릭', '로그아웃', '엑셀다운로드'])
        }

        
        document.querySelector('body').addEventListener('click',bodyClick)
        return () => {
            // console.log('select 바디 클릭 종료');
            document.querySelector('body').removeEventListener('click',bodyClick)
        }
    },[type])

    const bodyClick = () =>{
        setActive(false)
    }

    useEffect(()=>{
        if(current && name && value){
            if(typeof(current) === 'string'){
                setSelect(name[value.indexOf(current)])
                if(changeName){
                    setInputs((input)=>({...input, [changeName]: current}))
                }else{
                    setInputs(current)
                }
            }
            if(typeof(current) === 'boolean'){
                setInputs((input)=>({...input, [changeName]: value[0]}))
                setSelect(name[0])
            }
        }
        // 초기화
        // console.log(current);
        if(current !== undefined && !current && name && value){
            setInputs((input)=>({...input, [changeName]: ''}))
            setSelect('')
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
        setActive((active)=>!active)
        setIsPlaceholder(false)
        if(changeName){
            setInputs((input)=>({...input, [changeName]: value[i]}))
        }else{
            // console.log(value);
            // console.log(value[i]);
            setInputs(value[i])
        }
    }

    return (
        <div className={`selectBox${type ? `-${type}`: ''}`}>
            <button onClick={selectOpen} disabled={disabled} className={isPlaceholder ? 'gray': ''}>
                { isPlaceholder ? placeholder :  (select || '선택') }
            </button>
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