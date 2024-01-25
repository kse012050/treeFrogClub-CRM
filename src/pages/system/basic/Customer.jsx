import React, { useEffect, useState } from 'react';
import { inputChange, isFormet } from '../../../api/validation'
import { api } from '../../../api/api'
import Select from '../../../components/Select';
import Popup from '../../../components/popup/Popup';

export default function Customer() {
    const [inputs, setInputs] = useState({})
    const [popup, setPopup] = useState('')

    useEffect(()=>{
        if(!popup){
            api('constant', 'combine_customer_setting_info')
                .then(({result, data})=>{
                    if(result){
                        data.combine_customer_list_number || (data.combine_customer_list_number = '20');
                        data.combine_customer_duplicate_mobile_color_mark_yn === 'n' ? 
                            data.combine_customer_duplicate_mobile_color_mark_yn = '안함' : 
                            data.combine_customer_duplicate_mobile_color_mark_yn = '허용';
                        data.combine_customer_order_by || (data.combine_customer_order_by = '최신등록일 순');
                        setInputs(data)
                    }
                })
            }
    },[popup])

    const onSubmit = (e) =>{
        e.preventDefault();
        inputs.combine_customer_duplicate_mobile_color_mark_yn === '허용' ?
            inputs.combine_customer_duplicate_mobile_color_mark_yn = 'y' :
            inputs.combine_customer_duplicate_mobile_color_mark_yn = 'n';

        api('constant', 'combine_customer_setting_info_save', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료'
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
            <h2>고객목록 설정</h2>
            <div className="dropBox">
                <b>통합 고객 목록 설정</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">목록 개수</label>
                                <div>
                                    <Select name={'customerCount'} current={inputs.combine_customer_list_number} setInputs={setInputs} changeName='combine_customer_list_number'/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">SMS거부요청</label>
                                <div>
                                    <Select name={'sns'} current={'api없음'}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">중복휴대폰번호 색상표기</label>
                                <div>
                                    <Select name={'mobileColor'} current={inputs.combine_customer_duplicate_mobile_color_mark_yn} setInputs={setInputs} changeName='combine_customer_duplicate_mobile_color_mark_yn'/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">정렬 기준</label>
                                <div>
                                    <Select name={'orderBy'} current={inputs.combine_customer_order_by} setInputs={setInputs} changeName='combine_customer_order_by'/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" id='free_year' name='combine_customer_free_experience_period' value='year' checked={inputs.combine_customer_free_experience_period === 'year'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="free_year">금년</label>
                                    <input type="radio" id='free_month' name='combine_customer_free_experience_period' value='month' checked={inputs.combine_customer_free_experience_period === 'month'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="free_month">금월</label>
                                    <input type="radio" id='free_day' name='combine_customer_free_experience_period' value='day' checked={inputs.combine_customer_free_experience_period === 'day'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="free_day">금일</label>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" id='fee_year' name='combine_customer_fee_period' value='year' checked={inputs.combine_customer_fee_period === 'year'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="fee_year">금년</label>
                                    <input type="radio" id='fee_month' name='combine_customer_fee_period' value='month' checked={inputs.combine_customer_fee_period === 'month'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="fee_month">금월</label>
                                    <input type="radio" id='fee_day' name='combine_customer_fee_period' value='day' checked={inputs.combine_customer_fee_period === 'day'} onChange={(e)=>inputChange(e, setInputs)}/>
                                    <label htmlFor="fee_day">금일</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className='autoArea'>
                        <b>무료회원 DB회수 자동 설정</b>
                        <input type="radio" id='auto_y' name='auto_collection_yn' value='y' checked={inputs.auto_collection_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                        <label htmlFor="auto_y">자동 설정 ( 회수 담당자 선택 미완 )</label>
                        <div>
                            <ul>
                                <li>
                                    <label htmlFor="">회수일자</label>
                                    <div>
                                        <input type="radio" />
                                        <label htmlFor="">무료체험 종료일</label>
                                        <input type="radio" />
                                        <label htmlFor="">DB분배일로부터 30일 후</label>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">회수 담당자 선택</label>
                                    <div>
                                        <input type="search" />
                                        <button>검색</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <input type="radio" id='auto_n' name='auto_collection_yn' value='n' checked={inputs.auto_collection_yn === 'n'} onChange={(e)=>inputChange(e, setInputs)}/>
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

