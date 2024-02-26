import React, { useEffect, useState } from 'react';
// import SearchResults from '../../../components/system/grant/SearchResults';
import { api } from '../../../api/api';
import PermissionsList from './PermissionsList';
import PermissionsUser from './PermissionsUser';

// import { Link } from 'react-router-dom';

export default function Permissions() {
    const initParam = {'limit': '10', 'page': '1'};
    const [inputs, setInputs] = useState(initParam)
    const [roleList, setRoleList] = useState()
    const [roleActive, setRoleActive] = useState()
    const [roleTitle, setRoleTitle] = useState()
    const [tabActive, setTabActive] = useState('screen')
    // const [tabActive, setTabActive] = useState(1)

    useEffect(()=>{
        api('role', 'list')
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    // console.log(1);
                    setRoleList(list)
                    setRoleActive(list[0].role_id)
                    setRoleTitle({
                        'classification': list[0].role_classification,
                        'explain': list[0].role_explain,
                    })
                    setInputs((input)=>({...input, 'role_id': list[0].role_id}))
                }
            })
    },[])

    
    const onRole = (data) =>{
        setRoleActive(data.role_id)
        setInputs((input)=>({'limit': input.limit, 'page': '1', 'role_id': data.role_id}))
        setRoleTitle({
            'classification': data.role_classification,
            'explain': data.role_explain,
        })
    }

    const onTab = (value) =>{
        setTabActive(value)
        setInputs((input)=>({'limit': '10', 'page': '1', 'role_id': input.role_id}))
    }
    
        
    return (
        <>
            <h2>
                역할 권한 관리
                <form>
                    <input type="search" />
                    <button>검색</button>
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

                {/* <SearchResults /> */}
                <div className='boardArea'>
                    { roleTitle &&
                        <strong>{ roleTitle.classification } [{ roleTitle.explain }]</strong>
                    }
                    <button className={tabActive === 'screen' ? 'active' : ''} onClick={()=>onTab('screen')}>화면 권한</button>
                    <button className={tabActive === 'user' ? 'active' : ''} onClick={()=>onTab('user')}>사용자 권한</button>
                    <hr className='case01'/>
                    { tabActive === 'screen' && <PermissionsList inputs={inputs} setInputs={setInputs}/> }
                    { tabActive === 'user' && <PermissionsUser inputs={inputs} setInputs={setInputs}/> }
                </div>
            </div>
        </>
    );
}


