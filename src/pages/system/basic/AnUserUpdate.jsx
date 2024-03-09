import React, { useContext, useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from '../../../components/Select';
import { Link, useParams } from 'react-router-dom';
import { inputChange, isFormet } from '../../../api/validation';
import { api } from '../../../api/api';
import Popup from '../../../components/popup/Popup';
import { UserContext } from '../../../context/UserContext';
import { logButton } from '../../../api/common';

export default function AnUserUpdate() {
    const { company } = useContext(UserContext)
    const [inputs, setInputs] = useState()
    const [popup, setPopup] = useState()
    const [userId, setUserId] = useState();
    const [roleList, setroleList] = useState();
    const [bureau, setBureau] = useState();
    const { id } = useParams();

    useEffect(()=>{
        api('user', 'detail', {'admin_id': id})
            .then(({result, data})=>{
                if(result){
                    // console.log(data);
                    setInputs(data)
                    setUserId(data.id)
                    setBureau(data.department_name)
                }
            })
            
        api('role', 'list')
            .then(({result, list})=>{
                if(result){
                    setroleList(list)
                }
            })
    },[id])

    const idCheck = () => {
        api('user', 'duplicate', {id: userId})
            .then(({result, data: { exist_yn }})=>{
                if(result){
                    setPopup({'type': 'confirm', 'title': '중복확인'})
                    if(exist_yn === 'n'){
                        setPopup((popup)=>({...popup, 'description': '등록 가능한 아이디 입니다.'}))
                        setInputs((input)=>({...input, 'id': userId}))
                    }else{
                        setPopup((popup)=>({...popup, 'description': '이미 존재하는 아이디입니다.\n다른아이디를 입력해주세요.'}))
                    }
                }
            })
    }

    // useEffect(()=>{
    //     setInputs((input)=>({...input, 'id': ''}))
    // },[userId])

    const onDate = (date, dateString) => {
        console.log(date, dateString);
        setInputs((input)=>({...input, 'employment_date': dateString}))
    };

    const onChange = (e, setChange) => {
        const { value, dataset: { formet } } = e.target;
        
        if(formet && !!value && !isFormet(formet, value)['is']){
            const cur = e.target.selectionStart - 1;
            e.target.value = isFormet(formet, value)['value'];
            e.target.setSelectionRange(cur, cur);
        }
    
        setChange(e.target.value)
        setInputs((input)=>({...input, 'id': ''}))
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        if(
            !userId ||
            !inputs?.id ||
            !inputs?.name ||
            inputs?.mobile?.length !== 11 ||
            !inputs?.role_id ||
            !inputs?.email
        ){
            let errorMessage = '';
            if(!userId){
                errorMessage = '아이디를 입력해주세요.'
            }else if(!inputs?.id){
                errorMessage = '아이디 중복 확인을 해주세요.'
            }else if(!inputs?.name){
                errorMessage = '사용자명을 입력해주세요.'
            }else if(inputs?.mobile?.length !== 11){
                errorMessage = '휴대폰 번호를 입력해주세요.'
            }else if(!inputs?.role_id){
                errorMessage = '역할그룹을 선택해주세요.'
            }else if(!inputs?.email){
                errorMessage = '이메일을 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        api('user', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/system/basic/anUser'
                    }))
                    logButton('사용자 수정(수정)')
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
            <h2>사용자 수정</h2>

            <div className='dropBox'>
                <b>기본 정보</b>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="id" className='required'>로그인 아이디</label>
                                <div>
                                    <input type="text" name='id' id='id' data-formet="id" defaultValue={inputs?.id} onChange={(e)=>onChange(e, setUserId)}/>
                                    <button className='btn-gray-black' type="button" disabled={!userId || userId === inputs?.id} onClick={idCheck}>중복 확인</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="name" className='required'>사용자명</label>
                                <div>
                                    <input type="text" name='name' id='name' defaultValue={inputs?.name} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="mobile" className='required'>휴대폰</label>
                                <div>
                                    <input type="text" name='mobile' id='mobile' defaultValue={inputs?.mobile} data-formet="numb" onChange={(e)=>inputChange(e, setInputs)} maxLength={11}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>회원사</label>
                                <div>
                                    <input type="text" name='' id='' value={company?.company_name || ''} disabled/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>사용자 구분</label>
                                <div>
                                    <Select type={'userDivision'} changeName='type' setInputs={setInputs} current={inputs?.type}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>역할그룹</label>
                                <div>
                                    <Select type={'management'} list={roleList} changeName='role_id' setInputs={setInputs} current={inputs?.role_id}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="email" className='required'>이메일</label>
                                <div>
                                    <input type="email" name='email' id='email' defaultValue={inputs?.email} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용여부</label>
                                <div>
                                    <Select type={'use'} changeName='useable_yn' setInputs={setInputs} current={inputs?.useable_yn}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={bureau || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'bureau',
                                            'func': (data)=>{
                                                setInputs((input)=>({...input, 'department_id': data.department_id}))
                                                setBureau(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">입사일</label>
                                <div>
                                    <DatePicker onChange={onDate} value={inputs?.employment_date ? dayjs(inputs?.employment_date, 'YYYY-MM-DD') : ''} format={'YYYY-MM-DD'} placeholder='입사일 선택'/>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="memo">비고</label>
                                <div>
                                    <textarea name="memo" id="memo" defaultValue={inputs?.memo}></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <button type='button'className='btn-point'>임시 비밀번호 발급</button>
                        {/* <Link to={''} className='btn-point'>임시 비밀번호 발급</Link> */}
                        <Link to={'/system/basic/anUser'} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

