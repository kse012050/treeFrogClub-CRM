import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Select({name, list, current, /* currentChange, */ setInputs, changeName, disabled}) {
    // console.log('셀릭트 박스');
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;
    const [active, setActive] = useState(false)
    const [testDate, setTestData] = useState([])
    useEffect(()=>{
        name === 'year' && setTestData(['2023', '2022', '2021']);
        name === 'month' && setTestData(['10', '11', '12']);
        name === 'pagerCount' && setTestData(['10', '20', '30', '50', '100', '300', '500']);
        name === 'yn' && setTestData(['Y', 'N']);
        name === 'clientRating' && setTestData(['무료', '유료']);
        name === 'customerCount' && setTestData(['10', '20', '30', '50', '100', '300', '500']);
        name === 'sns' && setTestData(['수신', '거부']);
        name === 'mobileColor' && setTestData(['허용', '안함']);
        name === 'orderBy' && setTestData(['최신등록일 순', '최종수정일 순', '최종상담일 순']);


        name === 'pageCount' && setTestData(['1', '2', '3']);
        console.log(list);
        list && setTestData(list.map((text)=>text.id))

        document.querySelector('body').addEventListener('click',bodyClick)
        return () => {
            // console.log('select 바디 클릭 종료');
            document.querySelector('body').removeEventListener('click',bodyClick)
        }
    },[name, list])
    
    const bodyClick = () =>{
        // console.log('select 바디 클릭 시작');
        setActive(false)
    }

    const selectOpen = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setActive((value)=>!value)
    }

    const listClick = (value) =>{
        // currentChange(value)
        search && navigate(pathname)
        setInputs((inputs)=>({...inputs, [changeName]: value}))
        setActive((value)=>!value)
    }
    return (
        <div className={`selectBox${name ? `-${name}`: ''}`}>
            <button onClick={selectOpen} disabled={disabled}>{ current || '선택' }</button>
            {
                active && 
                    <div>
                        {testDate.map((value, i)=> <button key={i} onClick={()=>listClick(value)}>{value}</button>)}
                    </div>
            }
        </div>
    );
}

export default memo(Select)