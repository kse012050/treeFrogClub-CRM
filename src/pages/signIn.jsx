import React from 'react';
import * as api from '../api/api'

export default function signIn() {
    api.login();
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
                            <input type="text" placeholder='아이디 입력'/>
                        </li>
                        <li>
                            <input type="password" placeholder='비밀번호 입력'/>
                        </li>
                    </ul>
                    <input type="submit" value="로그인" />
                </fieldset>
            </form>
            <p>© 2023 Team1985. All rights reserved.</p>
        </div>
    );
}

