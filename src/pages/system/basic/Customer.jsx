import React, { useEffect, useState } from 'react';
import { inputChange } from '../../../api/validation'
import { api } from '../../../api/api'
import Select from '../../../components/Select';
import Popup from '../../../components/popup/Popup';

export default function Customer() {
    const [inputs, setInputs] = useState()
    const [sales, setSales] = useState()
    const [popup, setPopup] = useState('')

    useEffect(()=>{
        api('constant', 'combine_customer_setting_info')
            .then(({result, data})=>{
                if(result){
                    // console.log(data);
                    if(data.auto_collection_yn === 'n'){
                        delete data.auto_collection_date
                        delete data.auto_collection_admin_id
                    }
                    setInputs(data)
                    setSales(data.auto_collection_admin_id)
                }
            })
    },[])

    useEffect(()=>{
        if(inputs?.auto_collection_yn === 'n'){
            setInputs((input)=>{
                const copy = {...input};
                delete copy.auto_collection_date
                delete copy.auto_collection_admin_id
                return copy;
            })
            setSales('')
        }
    },[inputs?.auto_collection_yn])

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        api('constant', 'combine_customer_setting_info_save', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/customer/list'
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
        <>
            <h2>고객 목록 설정</h2>
            <div className="dropBox">
                <b>통합 고객 목록 설정</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                 <label htmlFor="">목록 개수</label>
                                <div>
                                    <Select type={'customerCount'} setInputs={setInputs} changeName='combine_customer_list_number' current={inputs?.combine_customer_list_number}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">SMS거부요청</label>
                                <div>
                                    api 없음
                                    {/* <Select type={'sns'} current={'api없음'}/> */}
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">중복휴대폰번호 색상표기</label>
                                <div>
                                    <Select type={'mobileColor'} setInputs={setInputs} changeName='combine_customer_duplicate_mobile_color_mark_yn' current={inputs?.combine_customer_duplicate_mobile_color_mark_yn}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">정렬 기준</label>
                                <div>
                                    <Select type={'orderBy'} setInputs={setInputs} changeName='combine_customer_order_by' current={inputs?.combine_customer_order_by}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" id='free_year' name='combine_customer_free_experience_period' value='year' checked={inputs?.combine_customer_free_experience_period === 'year'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="free_year">금년</label>
                                    <input type="radio" id='free_month' name='combine_customer_free_experience_period' value='month' checked={inputs?.combine_customer_free_experience_period === 'month'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="free_month">금월</label>
                                    <input type="radio" id='free_day' name='combine_customer_free_experience_period' value='day' checked={inputs?.combine_customer_free_experience_period === 'day'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="free_day">금일</label>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" id='fee_year' name='combine_customer_fee_period' value='year' checked={inputs?.combine_customer_fee_period === 'year'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="fee_year">금년</label>
                                    <input type="radio" id='fee_month' name='combine_customer_fee_period' value='month' checked={inputs?.combine_customer_fee_period === 'month'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="fee_month">금월</label>
                                    <input type="radio" id='fee_day' name='combine_customer_fee_period' value='day' checked={inputs?.combine_customer_fee_period === 'day'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="fee_day">금일</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className='autoArea'>
                        <b>무료회원 DB회수 자동 설정</b>
                        <input type="radio" id='auto_y' name='auto_collection_yn' value='y' checked={inputs?.auto_collection_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                        <label htmlFor="auto_y">자동 설정 ( 회수 담당자 선택 미완 )</label>
                        <div>
                            <ul>
                                <li>
                                    <label htmlFor="">회수일자</label>
                                    <div>
                                        <input type="radio" name='auto_collection_date' id='finish' value='free_experience_finish' checked={inputs?.auto_collection_date === 'free_experience_finish'} disabled={inputs?.auto_collection_yn === 'n'} onChange={(e)=>inputChange(e, setInputs)}/>
                                        <label htmlFor="finish">무료체험 종료일</label>
                                        <input type="radio" name='auto_collection_date' id='30deg' value='db_division_after_30_day' checked={inputs?.auto_collection_date === 'db_division_after_30_day'} disabled={inputs?.auto_collection_yn === 'n'} onChange={(e)=>inputChange(e, setInputs)}/>
                                        <label htmlFor="30deg">DB분배일로부터 30일 후</label>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">회수 담당자 선택</label>
                                    <div>
                                        <input 
                                            type="search" 
                                            value={sales || ''}
                                            readOnly
                                            onClick={()=>setPopup({
                                                'type': 'sales',
                                                'func': (data)=>{
                                                    setInputs((input)=>({...input, 'auto_collection_admin_id': data.admin_id}))
                                                    setSales(data.name)
                                                }
                                            })}
                                        />
                                        <button>검색</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <input type="radio" id='auto_n' name='auto_collection_yn' value='n' checked={inputs?.auto_collection_yn === 'n'} onChange={(e)=>inputChange(e, setInputs)}/>
                        <label htmlFor="auto_n">자동 설정 안 함</label>
                    </fieldset>
                    <div>
                        <input type="submit" value="저장" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

