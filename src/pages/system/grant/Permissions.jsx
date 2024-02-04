import React, { useEffect, useState } from 'react';
import Select from '../../../components/Select';
// import SearchResults from '../../../components/system/grant/SearchResults';
import { api } from '../../../api/api';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import Popup from '../../../components/popup/Popup';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import PermissionsList from './PermissionsList';
import PagerButton from '../../../components/PagerButton';
import { inputChange } from '../../../api/validation';
// import { Link } from 'react-router-dom';

export default function Permissions() {
    const [roleList, setRoleList] = useState()
    const [roleActive, setRoleActive] = useState()
    const [tabActive, setTabActive] = useState(1)
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [registrationPopup, setRegistrationPopup] = useState()

    useEffect(()=>{
        api('role', 'list')
            .then(({result, list})=>{
                if(result){
                    setRoleList(list)
                    setRoleActive(list[0].role_id)
                }
            })
        
    },[])

    useEffect(()=>{
        api('module', 'role_module_list', {'role_id': roleActive})
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })

        setSearchInputs((input)=>({...input, 'role_id': roleActive}))
    },[roleActive])

    const onSearch = () =>{
        // console.log(searchInputs);
        api('module', 'role_module_list', searchInputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    }
        
    return (
        <>
            <h2>
                역할 권한 관리
                <div>
                    <input type="search" />
                    <button>검색</button>
                </div>
            </h2>
            <div className="horizontalTwo">
                <div className='roleName'>
                    <b>역할명</b>
                    { roleList && 
                        <ul>
                            { roleList.map((data)=><li key={data.role_id}><button className={roleActive === data.role_id ? 'active' : ''} onClick={()=>setRoleActive(data.role_id)}>{ data.role_name }</button></li>) }
                        </ul>
                    }
                </div>

                {/* <SearchResults /> */}
                <div className='boardArea screenArea'>
                    <strong>관리자 [시스템 관리자]</strong>
                    <button className='active'>화면 권한</button>
                    <button>사용자 권한</button>
                    <hr className='case01'/>
                    <Select type='moduleCategory' setInputs={setSearchInputs} changeName='module_category'/>
                    <div className="searchArea">
                        <input type="search" name='screen_name' id='screen_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                        <button onClick={onSearch}>검색</button>
                    </div>
                    <div className="boardBox">
                        <b className='total'>{ pagerInfo?.total_count }</b>
                        <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                        <b className='choice'>{ deleteList.length }</b>
                        <BoardChkDelete url='module' idName='role_with_module_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>
                        <button className='btn-gray-black boundary' onClick={()=>setRegistrationPopup({'type': 'children', 'role_id': roleActive})}>추가</button>
                        
                        <div className="board-top">
                            <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({role_with_module_id})=>role_with_module_id)} />
                            <button>모듈유형</button>
                            <button>화면명</button>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">등록</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">전체</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">수정</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">삭제</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">전체</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">조회</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">엑셀</label>
                            </div>
                        </div>

                        { boardList && 
                            <ol className="board-center">
                                { boardList.map((data)=> (
                                    <li key={data.role_with_module_id}>
                                        <PermissionsList data={data} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                    </li>
                                ))}
                            </ol>
                        }
                    </div>
                </div>
                
            </div>
            { registrationPopup &&
                <RegistrationPopup registrationPopup={registrationPopup} setRegistrationPopup={setRegistrationPopup} boardList={boardList}/>
            }
        </>
    );
}


function RegistrationPopup({ registrationPopup, setRegistrationPopup, boardList}){
    const [inputs, setInputs] = useState({'role_id': registrationPopup.role_id})
    const [searchInputs, setSearchInputs] = useState()
    const [listInfo, setListInfo] = useState({'limit': '10', 'page': '1'})
    const [pagerInfo, setPagerInfo] = useState()
    const [moduleList, setModuleList] = useState();
    const [choiceList, setChoiceList] = useState([]);
    const [popup, setPopup] = useState('')

    useEffect(()=>{
        api('module', 'list', listInfo)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setModuleList(list)
                    setChoiceList(()=>
                        list.filter(({screen_name})=> 
                            boardList.some((data)=>screen_name === data.screen_name)
                        )
                    )
                }
            })
    },[listInfo.page, listInfo])

    useEffect(()=>{
        setInputs((input)=>({...input, 'module_id_list': choiceList.map((data)=>data.module_id)}))
    },[choiceList])

    const onSearch = () =>{
        console.log(searchInputs);
        api('module', 'list', searchInputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setModuleList(list)
                }
            })

    }

    const onSubmit = () =>{
        api('module', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setRegistrationPopup()
                        }
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
            <Popup popup={registrationPopup} setPopup={setRegistrationPopup}>
                <strong>[관리자] 화면 권한 추가</strong>
                <div className='rolePopup'>
                    <Select type='moduleCategory' setInputs={setSearchInputs} changeName='module_category'/>
                    <div className="searchArea">
                        <input type="search" name='screen_name' id='screen_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                        <button onClick={onSearch}>검색</button>
                    </div>
                    <div className="boardBox">
                        <div className="board-top">
                            <span>모듈유형</span>
                            <span>화면명</span>
                            <span></span>
                        </div>
                        
                        { moduleList?.length && 
                            <ol className='board-center scroll-width'>
                                { moduleList.map((data)=>
                                    <li key={data.module_id}>
                                        <span>{ data.module_category }</span>
                                        <span>{ data.screen_name }</span>
                                        <button className='point' onClick={()=>{
                                            setChoiceList((choice)=>{
                                                let copy = [...choice]
                                                if(copy.every((copyData)=>copyData.module_id !== data.module_id)){
                                                    copy = [...copy, data]
                                                }
                                                return copy
                                            })
                                        }}>선택</button>
                                    </li>
                                )}                        
                            </ol>
                        }
                        <div className='board-pagination' data-styleidx='a'>
                            <PagerButton pagerInfo={pagerInfo} setInputs={setListInfo}/>
                        </div>
                    </div>


                    { !!choiceList.length && 
                        <ul className='choice-horizontal scroll-width'>
                            { choiceList.map((data)=>
                                <li key={data.module_id} className='icon-remove'>
                                    {data.module_category} &#62; {data.screen_name}
                                    <button onClick={()=>
                                        setChoiceList((choice)=>{
                                            let copy = [...choice]
                                            copy = copy.filter((copyData)=>copyData.module_id !== data.module_id)
                                            return copy
                                        })}
                                    >
                                        제거
                                    </button>
                                </li>
                            )}
                        </ul>
                    }
                </div>
                <div className='btnArea-end'>
                    <button className='btn-gray-white' type='button' onClick={()=>setRegistrationPopup()}>취소</button>
                    <button className='btn-point' onClick={onSubmit}>저장</button>
                </div>
            </Popup>

            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    )
}
