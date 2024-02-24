import React, { useCallback, useEffect, useState } from 'react';
import Select from '../../../components/Select';
// import SearchResults from '../../../components/system/grant/SearchResults';
import { api } from '../../../api/api';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import Popup from '../../../components/popup/Popup';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import PermissionsList from './PermissionsList';
import PagerButton from '../../../components/PagerButton';
import { inputChange } from '../../../api/validation';
import Pager from '../../../components/Pager';
import SelectPage from '../../../components/SelectPage';
import SelectBoard from '../../../components/SelectBoard';
// import { Link } from 'react-router-dom';

export default function Permissions() {
    const initParam = {'limit': '10', 'page': '1'};
    const [roleList, setRoleList] = useState()
    const [roleActive, setRoleActive] = useState()
    const [roleTitle, setRoleTitle] = useState()
    // const [tabActive, setTabActive] = useState(1)
    const [inputs, setInputs] = useState(initParam)
    const [searchScreen, setSearchScreen] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [allCheck, setAllCheck] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [registrationPopup, setRegistrationPopup] = useState()

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

    const currentData = useCallback(()=>{
        // console.log(inputs);
        api('module', 'role_module_list', {...inputs})
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    // console.log(list);
                    // console.log(list.every((data2)=>data2.insert_yn === 'y'))
                    // console.log(2);
                    setAllCheck({
                        'insert_yn': list.length && list.every((data2)=>data2.insert_yn === 'y'),
                        'update_yn': list.length && list.every((data2)=>data2.update_yn === 'y'),
                        'select_yn': list.length && list.every((data2)=>data2.select_yn === 'y'),
                        'delete_yn': list.length && list.every((data2)=>data2.delete_yn === 'y'),
                        'excel_yn': list.length && list.every((data2)=>data2.excel_yn === 'y')
                    })
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })

        setSearchScreen((input)=>({...input, 'role_id': inputs.role_id}))
    },[inputs])
    
    useEffect(()=>{
        currentData()
    },[currentData])
    
    // useEffect(()=>{
    //     // console.log('?');
    //     setInputs((input)=>({...input, 'role_id': roleActive}))
        
    // },[roleActive])

    const onSearchScreen = (e) =>{
        e.preventDefault();
        setInputs((input)=>({...input,...searchScreen}))
        // console.log(searchScreen);
    }

    const onAllChange = (e, name) =>{
        const { checked } = e.target
        const data = boardList.map((data)=>data.role_with_module_id);
        const yn = checked ? 'y' : 'n';
        // console.log(inputs);
        Promise.all(data.map((id)=>api('module', 'update', {'role_with_module_id' : id, [name]: yn})))
            .then((result)=> {
                if(result.every((data)=>data.result)){
                    currentData()
                }
            })
            .catch(error => console.log('error', error));
    }

    const onAllChangeRole = (e, name) =>{
        const { checked } = e.target
        const data = boardList.map((data)=>data.role_with_module_id);
        if(checked){
            Promise.all(data.map((id)=>api('module', 'update', {'role_with_module_id' : id, [name]: allCheck[name]})))
                .then((result)=> {
                    if(result.every((data)=>data.result)){
                        currentData()
                    }
                })
                .catch(error => console.log('error', error));
        }
    }


    const onRole = (data) =>{
        // console.log(data);
        setRoleActive(data.role_id)
        setSearchScreen()
        setInputs((input)=>({'limit': input.limit, 'page': '1', 'role_id': data.role_id}))
        setRoleTitle({
            'classification': data.role_classification,
            'explain': data.role_explain,
        })
    }
        
    return (
        <>
            <h2 onClick={()=>console.log(searchScreen)}>
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
                <div className='boardArea screenArea'>
                    { roleTitle &&
                        <strong>{ roleTitle.classification } [{ roleTitle.explain }]</strong>
                    }
                    <button className='active'>화면 권한</button>
                    <button>사용자 권한</button>
                    <hr className='case01'/>
                    <Select type='moduleCategory' current={searchScreen?.module_category || false} changeName='module_category' setInputs={setSearchScreen}/>
                    <form className="searchArea">
                        <input type="search" name='screen_name' id='screen_name' onChange={(e)=>inputChange(e, setSearchScreen)}/>
                        <button onClick={onSearchScreen}>검색</button>
                    </form>
                    <div className="boardBox">
                        <b className='total'>{ pagerInfo?.total_count }</b>
                        <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                        <b className='choice'>{ deleteList.length }</b>
                        <BoardChkDelete url='module' idName='role_with_module_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData}/>
                        <button className='btn-gray-black boundary' onClick={()=>setRegistrationPopup({'type': 'children', 'role_id': roleActive})}>추가</button>
                        
                        <div className="board-top">
                            <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({role_with_module_id})=>role_with_module_id)} />
                            <button>모듈유형</button>
                            <button>화면명</button>
                            <div>
                                <input type="checkbox" id='allInsert' checked={allCheck?.insert_yn || false} onChange={(e)=>onAllChange(e, 'insert_yn')}/>
                                <label htmlFor="allInsert">등록</label>
                            </div>
                            <div>
                                <input type="checkbox" id='allModifyType' checked={false} onChange={(e)=>onAllChangeRole(e, 'modify_type')}/>
                                <label htmlFor="allModifyType"></label>
                                <SelectBoard type='role' current setInputs={setAllCheck} changeName='modify_type'/>
                            </div>
                            <div>
                                <input type="checkbox" id='allUpdate' checked={allCheck?.update_yn || false} onChange={(e)=>onAllChange(e, 'update_yn')}/>
                                <label htmlFor="allUpdate">수정</label>
                            </div>
                            <div>
                                <input type="checkbox" id='allDeletea' checked={allCheck?.delete_yn || false} onChange={(e)=>onAllChange(e, 'delete_yn')}/>
                                <label htmlFor="allDeletea">삭제</label>
                            </div>
                            <div>
                                <input type="checkbox" id='allSelectType' checked={false} onChange={(e)=>onAllChangeRole(e, 'select_type')}/>
                                <label htmlFor="allSelectType"></label>
                                <SelectBoard type='role' current setInputs={setAllCheck} changeName='select_type'/>
                            </div>
                            <div>
                                <input type="checkbox" id='allSelect' checked={allCheck?.select_yn || false} onChange={(e)=>onAllChange(e, 'select_yn')}/>
                                <label htmlFor="allSelect">조회</label>
                            </div>
                            <div>
                                <input type="checkbox" id='allExcel' checked={allCheck?.excel_yn || false} onChange={(e)=>onAllChange(e, 'excel_yn')}/>
                                <label htmlFor="allExcel">엑셀</label>
                            </div>
                        </div>

                        { boardList && 
                            <ol className="board-center">
                                { boardList.map((data)=> (
                                    <li key={data.role_with_module_id}>
                                        <PermissionsList data={data} deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData}/>
                                    </li>
                                ))}
                            </ol>
                        }

                        { !!pagerInfo?.total_count &&
                            <div className='board-pagination' data-styleidx='a'>
                                {/* <Select type="pagerCount" current={inputs.limit} setInputs={setInputs} changeName='limit'/> */}
                                <SelectPage current={inputs.limit} setInputs={setInputs}/>
                                <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                            </div>
                        }
                    </div>
                </div>

                
            </div>
            { registrationPopup &&
                <RegistrationPopup registrationPopup={registrationPopup} setRegistrationPopup={setRegistrationPopup} boardList={boardList} currentData={currentData}/>
            }
        </>
    );
}


function RegistrationPopup({ registrationPopup, setRegistrationPopup, boardList, currentData}){
    const [inputs, setInputs] = useState({'role_id': registrationPopup.role_id})
    const [searchInputs, setSearchInputs] = useState({'limit': '10', 'page': '1'})
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
                    setChoiceList((choice)=>{
                        const uniqueObjects = {}
                        const test = [
                            ...choice,
                            ...list.filter(({screen_name})=> 
                                boardList.some((data)=>screen_name === data.screen_name)
                        )]
                        test.forEach(obj => {
                            uniqueObjects[obj.module_id] = obj;
                        })

                        const uniqueArray = Object.values(uniqueObjects);
                        // console.log(uniqueArray);
                        return uniqueArray;
                    })
                }
            })
    },[listInfo.page, listInfo, boardList])

    useEffect(()=>{
        setInputs((input)=>({...input, 'module_id_list': choiceList.map((data)=>data.module_id)}))
    },[choiceList])

    const onSearch = (e) =>{
        e.preventDefault();
        // console.log(searchInputs);
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
                            currentData()
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
                <strong onClick={()=>console.log(choiceList)}>[관리자] 화면 권한 추가</strong>
                <div className='rolePopup'>
                    <Select type='moduleCategory' current setInputs={setSearchInputs} changeName='module_category'/>
                    <form className="searchArea">
                        <input type="search" name='screen_name' id='screen_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                        <button onClick={onSearch}>검색</button>
                    </form>
                    <div className="boardBox">
                        <div className="board-top">
                            <span>모듈유형</span>
                            <span>화면명</span>
                            <span></span>
                        </div>
                        
                        { moduleList?.length && 
                            <ol className='board-center scroll-width'>
                                { moduleList.map((data)=>
                                    <li 
                                        key={data.module_id}
                                        className={choiceList.some(({module_id})=> module_id === data.module_id) ? 'active' : ''}
                                    >
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
