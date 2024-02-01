import React, { useState } from 'react';
import { inputChange } from '../../api/validation';
import { api, logout } from '../../api/api';
import Popup from './Popup.jsx';

export default function PopupNewPassword({ close }) {
    const [inputs, setInputs] = useState()
    const [newPassword, setNewPassword] = useState()
    const [popup, setPopup] = useState()

    const onSubmit = (e) =>{
        e.preventDefault()
        if(newPassword && newPassword === inputs?.password){
            api('profile', 'password', inputs)
                .then((result)=>{
                    if(result){
                        setPopup({
                            'type': 'confirm',
                            'title': '완료',
                            'description': '비밀번호가 변경되었습니다.\n새 비밀번호로 로그인해주세요.',
                            'confirmFunc': ()=>{
                                logout()
                            }
                        })
                    }
                })
        }
    }

    return (
        <>
            <form>
                <fieldset>
                    <strong>정보변경</strong>
                    <b>비밀번호 설정</b>
                    <ul>
                        <li>
                            <label htmlFor="newPassword">새 비밀번호</label>
                            <div>
                                <input type="password" name='newPassword' id='newPassword' onChange={(e)=>setNewPassword(e.target.value)}/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="password">새 비밀번호 재입력</label>
                            <div>
                                <input type="password" name='password' id='password' onChange={(e)=>inputChange(e, setInputs)}/>
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <div className='btnArea-end'>
                    <button className='btn-gray-white' type='button' onClick={close}>취소</button>
                    <input type="submit" className='btn-point' value='변경' onClick={onSubmit}/>
                </div>
            </form>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

