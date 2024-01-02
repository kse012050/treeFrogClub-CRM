import React from 'react';

export default function signIn() {
    return (
        <div className='signInPage'>
            <h1>
                <img src={require('../images/logo-signIn.png')} alt="" />
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

