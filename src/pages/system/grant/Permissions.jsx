import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../../api/api';
import PermissionsScreen from './PermissionsScreen';
import PermissionsUser from './PermissionsUser';
import { inputChange } from '../../../api/validation';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';

export default function Permissions() {
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const [roleList, setRoleList] = useState()
    const [roleActive, setRoleActive] = useState()
    const [roleTitle, setRoleTitle] = useState()
    const [tabActive, setTabActive] = useState('screen')
    const [searchInputs, setSearchInputs] = useState()
    const [searchResult, setSearchResult] = useState()
    // const [tabActive, setTabActive] = useState(1)

    useEffect(()=>{
        if(pagePermission?.select_yn && pagePermission?.select_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.select_yn, navigate])

    useEffect(()=>{
        api('role', 'list')
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    // console.log(1);
                    setRoleList(list)
                    setRoleActive(list[0].role_id)
                    setRoleTitle({
                        'name': list[0].role_name,
                        'explain': list[0].role_explain,
                    })
                }
            })
    },[])

    
    const onRole = (data) =>{
        setRoleActive(data.role_id)
        // console.log(data);
        setRoleTitle({
            'name': data.role_name,
            'explain': data.role_explain,
        })
        setSearchInputs()
        setSearchResult()
    }

    const onTab = (value) =>{
        setTabActive(value)
    }

    const onSearch = (e) =>{
        e.preventDefault();
        // console.log(searchInputs);
        api('role', 'list', {...searchInputs})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setRoleActive()
                    setSearchResult(list)
                }
            })
    }
    
        
    return (
        <>
            <h2>
                역할 권한 관리
                <form>
                    <input type="search" name='search' id='search' value={searchInputs?.search || ''} onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='역할명 입력'/>
                    <button onClick={onSearch}>검색</button>
                </form>
            </h2>
            <div className="horizontalTwo">
                <div className='roleName'>
                    <b>역할명</b>
                    { roleList && 
                        <ul>
                            { roleList.map((data)=><li key={data.role_id}><button className={roleActive === data.role_id ? 'active' : ''} onClick={()=>onRole(data)}>{ data.role_name }</button></li>) }
                        </ul>
                    }
                </div>

                
                { searchResult ? 
                    <div className='searchResultArea'>
                        <b>검색결과</b>
                        <hr className='case03'/>
                        <ul>
                            { searchResult.map((data)=>
                                <li key={data.role_id}>
                                    <p>{data.name} {data.role_explain  && `[${data.role_explain}]`}</p>
                                    <button className='btn-gray-black' onClick={()=>onRole(data)}>권한 확인</button>
                                </li>
                            )}
                        </ul>
                    </div> :
                    <div className='boardArea'>
                        { roleTitle &&
                            <strong>{ roleTitle.name } {roleTitle.explain  && `[${roleTitle.explain}]`}</strong>
                        }
                        <button className={tabActive === 'screen' ? 'active' : ''} onClick={()=>onTab('screen')}>화면 권한</button>
                        <button className={tabActive === 'user' ? 'active' : ''} onClick={()=>onTab('user')}>사용자 권한</button>
                        <hr className='case01'/>
                        { tabActive === 'screen' && <PermissionsScreen id={roleActive} roleTitle={roleTitle}/> }
                        { tabActive === 'user' && <PermissionsUser id={roleActive} roleTitle={roleTitle}/>}
                    </div>
                }
                {/* <div className='boardArea'>
                    { roleTitle &&
                        <strong>{ roleTitle.classification } [{ roleTitle.explain }]</strong>
                    }
                    <button className={tabActive === 'screen' ? 'active' : ''} onClick={()=>onTab('screen')}>화면 권한</button>
                    <button className={tabActive === 'user' ? 'active' : ''} onClick={()=>onTab('user')}>사용자 권한</button>
                    <hr className='case01'/>
                    { tabActive === 'screen' && <PermissionsScreen id={roleActive}/> }
                    { tabActive === 'user' && <PermissionsUser id={roleActive}/> }
                </div> */}
            </div>
        </>
    );
}


