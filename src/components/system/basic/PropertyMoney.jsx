import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api'
import { isFormet } from '../../../api/validation'
import Popup from '../../popup/Popup';

export default function PropertyMoney() {
    const [year, setYear] = useState()
    const [yearList, setYearList] = useState()
    const [month, setMonth] = useState()
    const [monthList, setMonthList] = useState()
    const [inputs, setInputs] = useState({})
    const [popup, setPopup] = useState('')
    
    // console.log('테스트');
    useEffect(()=>{
        api('calendar', 'calculation_year_list')
            .then(({result, list})=>{
                if(result){
                    setYearList(list);
                    const current_year = list.filter((arr)=>arr.current_year_yn === 'y')[0].year_value;
                    setYear(Number(current_year));
                }
            })
    },[])

    useEffect(()=>{
        if(year){
            api('calendar', 'calculation_month_list', {'year_value': year + ''})
            .then(({result, list})=>{
                if(result){
                    setMonthList(list)
                    if(list.some((arr)=>arr.current_month_yn === 'y')){
                        setMonth(list.filter((arr)=>arr.current_month_yn === 'y')[0].month_value)
                    }
                }
            })
        }
    },[year])

    useEffect(()=>{
        if(month){
            api('calculation', 'calculation_setting_info', {'month_value': month})
            .then(({result, data})=>{
                if(result){
                    if(data){
                        delete data.calculation_id;
                        data.month_value = data.date;
                        delete data.date;
                        setInputs(data)
                    }else{
                        setInputs((input)=> ({...input, 'calculation_way': 'month', 'month_value': month, 'investment_amount': '', 'roas_percent': ''}))
                    }
                }
            })
        }
    },[month])

    const yearBtn = (numb) => {
        if(yearList.some((arr)=>Number(arr.year_value) === (year + numb))){
            setYear(Number(yearList.filter((arr)=>Number(arr.year_value) === (year + numb))[0].year_value))
        }
    }

    const monthClick = (monthData) => {
        setMonth(monthData);
    }

    const inputChange = (e) => {
        const { value, name, dataset: { formet } } = e.target;
        if(formet && !!value){
            const cur = e.target.selectionStart - 1;
            e.target.value = isFormet(formet, value)['value'];
            if(!isFormet(formet, value)['is']){
                e.target.setSelectionRange(cur, cur);
            }
        }
        setInputs((input)=> ({...input, [name]: e.target.value}))
        if(name === 'calculation_way'){
            setInputs((input)=> ({...input, 'investment_amount': ''}))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        api('calculation', 'calculation_setting', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }
    
    return (
        <div className='moneyArea'>
            <b>투자금액 산정방식 및 목표량 설정</b>
            <div className='horizontalTwo'>
                <div className='calendar'>
                    <div className='yearArea'>
                        <button onClick={()=> yearBtn(-1)}>이전 년도</button>
                        <span>{ year }년</span>
                        <button onClick={()=> yearBtn(1)}>다음 년도</button>
                    </div>
                    { monthList && (
                        <ol className='monthArea'>
                            {
                                monthList.map((data, idx)=>(
                                    <li 
                                        className={data.month_value === month ? 'active' : ''}
                                        onClick={()=>monthClick(data.month_value)}
                                        key={data.month_value}>
                                        {idx + 1}월
                                    </li>
                                ))
                            }
                        </ol>
                    )}
                </div>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">산정방식 선택</label>
                                <div>
                                    <input type="radio" name='calculation_way' value='month' id='month' checked={inputs?.calculation_way === 'month' ? true : false} onChange={inputChange} />
                                    <label htmlFor="month">월별 투자금액 기준</label>
                                    <p>월 투자 금액</p>
                                    <div data-unit="원">
                                        <input type="text" name="investment_amount" id="" data-formet="numb" value={inputs?.calculation_way === 'month' ? (inputs?.investment_amount ? inputs?.investment_amount : '') : ''} disabled={inputs?.calculation_way === 'month' ? false : true} onChange={inputChange}/>
                                    </div>
                                </div>
                                <div>
                                    <input type="radio" name='calculation_way' value='day' id='day' checked={inputs?.calculation_way === 'day' ? true : false} onChange={inputChange}/>
                                    <label htmlFor="day">일별 투자금액 기준</label>
                                    <p>일 투자 금액</p>
                                    <div data-unit="원">
                                        <input type="text" name="investment_amount" id="" data-formet="numb" value={inputs?.calculation_way === 'day' ? (inputs?.investment_amount ? inputs?.investment_amount : '') : ''} disabled={inputs?.calculation_way === 'day' ? false : true} onChange={inputChange}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">목표량 설정 (월별 선택시)</label>
                                <div>
                                    <p>투자금 대비 ROAS</p>
                                    <div data-unit="%">
                                        <input type="text" name='roas_percent' data-formet="numb" value={inputs?.roas_percent || ''} onChange={inputChange}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <input type="submit" value="저장" className='btn-point' onClick={onSubmit} />
                    </fieldset>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </div>
    );
}

