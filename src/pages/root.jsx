import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "../context/UserContext.js";
import Memu from '../components/Memu';
import {styleIdx} from '../js/style.js';
import { api, logout } from '../api/api.js';
import Popup from '../components/popup/Popup.jsx';

export default function Root({ children }) {
    const location = useLocation().pathname;
    const pageName = useLocation().pathname.slice(1).split('/');
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [company, setCompany] = useState()
    const [popup, setPopup] = useState()
    const { id } = useParams();

    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);

    useEffect(()=>{
        api('profile', 'detail')
            .then(({result, data})=>{
                if(result){
                    setUser(data)
                }
            })

        api('profile', 'company_info')
            .then(({result, data})=>{
                if(result){
                    setCompany(data)
                }
            })
    },[])

    useEffect(()=>{
        sessionStorage.getItem('authorization') || navigate('/');
        return(
            document.querySelectorAll('[data-styleidx]').length ? styleIdx() : undefined
        )
    },[pageName, children, navigate])
    return (
        <>
            <UserContext.Provider value={{user, company}} >
                <header>
                    <h1>
                        <Link to={'/main'}>
                            <img src={require('../images/logo-header.png')} alt="개인투자자를 위한 주식정보회사 청개구리 투자클럽" />
                        </Link>
                        고객 DB 관리 시스템
                    </h1>
                    <strong>{user?.department_info && `[${user.department_info.name}]`} {user?.name}</strong>
                    {/* <Link to="">정보변경</Link> */}
                    <button onClick={()=> setPopup({'type': 'newPassword'})}>정보변경</button>
                    <button onClick={logout}>로그아웃</button>
                </header>
                <div className={`subPage`}>
                    <Memu />
                    <div className={`${pageName[0]}Page ${(pageName.length > 1 && id !== pageName.at(-1)) ? pageName.at(-1) + 'Page' : pageName.at(-2) + 'Page'}`}>
                        <Outlet />
                    </div>
                </div>
            </UserContext.Provider>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

