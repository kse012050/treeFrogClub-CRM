import React, { useState } from 'react';
import * as api from '../api/api'
import { formeta } from '../api/validation'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const inputChange = (e) => {
        const { value, name, dataset: { formet } } = e.target;
        if(formet && value && !formeta(formet, value)){
            e.target.value = value.slice(0, -1)
        }

        setInputs((input)=> ({...input, [name]: value}))
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        api.login(inputs).then(({result})=>{
            if(result){
                navigate('/main')
            }
        })
    }

    return (
        <div className='signInPage'>
            <h1>
                <img src={require('../images/logo-signIn.png')} alt="개인투자자를 위한 주식정보회사 청개구리 투자클럽" />
            </h1>
            <form>
                <fieldset>
                    <h2>CRM 고객 DB 관리</h2>
                    <ul>
                        <li>
                            <input type="text" name='id' data-formet="id" placeholder='아이디 입력' onChange={inputChange}/>
                        </li>
                        <li>
                            <input type="password" name='password' placeholder='비밀번호 입력' onChange={inputChange}/>
                        </li>
                    </ul>
                    <input type="submit" value="로그인" onClick={onSubmit}/>
                </fieldset>
            </form>
            <p>© 2023 Team1985. All rights reserved.</p>
        </div>
    );
}

