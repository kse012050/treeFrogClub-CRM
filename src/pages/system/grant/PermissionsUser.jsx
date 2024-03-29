import React, { useCallback, useContext, useEffect, useState } from 'react';
import Select from '../../../components/Select';
import { inputChange } from '../../../api/validation';
import { api } from '../../../api/api';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';
import SelectPage from '../../../components/SelectPage';
// import Pager from '../../../components/Pager';
import Popup from '../../../components/popup/Popup';
import PagerButton from '../../../components/PagerButton';
import { logButton } from '../../../api/common';
import { UserContext } from '../../../context/UserContext';

export default function PermissionsUser({id, roleTitle}) {
    const { pagePermission } = useContext(UserContext)
    const [inputs, setInputs] = useState()
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [registrationPopup, setRegistrationPopup] = useState()

    const currentData = useCallback(()=>{
        // console.log(inputs);
        api('user', 'list', {...inputs})
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })

    },[inputs])

    const currentSettings = useCallback(()=>{
        setSearchInputs()
        setInputs({'role_id': id, 'limit': '10', 'page': '1'})
    },[id])

    useEffect(()=>{
        currentSettings()
    },[currentSettings])
    
    useEffect(()=>{
        if(inputs){
            currentData()
        }
    },[currentData, inputs])

    const onSearch = (e) =>{
        e.preventDefault()
        // console.log(searchInputs);
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
    }

    useEffect(()=>{
        // if(searchInputs && Object.keys(searchInputs).includes('type')){
            setInputs((input)=>({...input, 'type': searchInputs?.type}))
        // }
    },[searchInputs?.type])

    return (
        <div className='userArea'>
            <Select type='permissionsUserType' current={searchInputs?.type || true} changeName='type' setInputs={setSearchInputs}/>
            <form className="searchArea">
                <input type="search" name='name' id='name' value={searchInputs?.name || ''} onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='사용자명 입력'/>
                <button onClick={onSearch}>검색</button>
            </form>

            <div className="boardBox">
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                { pagePermission?.delete_yn === 'y'  && 
                    <BoardChkDelete url='user' funcName='role_delete' idName='admin_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentSettings} logValue='역할 권한 관리(사용자 권한 - 선택 삭제)'/>
                }
                { pagePermission?.insert_yn === 'y'  && 
                    <button className='btn-gray-black boundary' onClick={()=>setRegistrationPopup({'type': 'children', 'role_id': inputs.role_id, 'roleTitle': roleTitle})}>추가</button>
                }

                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({admin_id})=>admin_id)} />
                    <span>사용자구분</span>
                    <span>사용자명</span>
                    <span>아이디</span>
                </div>

                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>
                            <li key={data.admin_id}>
                                <BoardChk id={data.admin_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.type === 'user' ? '사용자' : '관리자' }</span>
                                <span>{ data.name }</span>
                                <span>{ data.id }</span>
                            </li>
                        )}
                    </ol>
                }

                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        {/* <Select type="pagerCount" current={inputs.limit} setInputs={setInputs} changeName='limit'/> */}
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                        {/* <Pager pagerInfo={pagerInfo} setInputs={setInputs}/> */}
                    </div>
                }
            </div>
            { registrationPopup &&
                <RegistrationPopup registrationPopup={registrationPopup} setRegistrationPopup={setRegistrationPopup} currentSettings={currentSettings}/>
            }
        </div>
    );
}

function RegistrationPopup({ registrationPopup, setRegistrationPopup, currentSettings }){
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'})
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [moduleList, setModuleList] = useState()
    const [choiceList, setChoiceList] = useState([]);
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('user', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    // console.log(list);
                    // console.log(boardList);
                    setPagerInfo(data)
                    setModuleList(list)
                    const firstList = [...list]
                    // console.log('1',list);
                    api('user', 'list', {'role_id': registrationPopup.role_id, 'all_yn': 'y'})
                    .then(({result, list})=>{
                            if(result){
                                // console.log('2',list);
                                setChoiceList((choice)=>{
                                    const uniqueObjects = {}
                                    const test = [
                                        ...choice,
                                        ...firstList.filter(({admin_id})=> 
                                            list.some((data)=>admin_id === data.admin_id)
                                    )]
                                    test.forEach(obj => {
                                        uniqueObjects[obj.admin_id] = obj;
                                    })
            
                                    const uniqueArray = Object.values(uniqueObjects);
                                    // console.log(uniqueArray);
                                    return uniqueArray;
                                })
                            }
                        })
                }
            })
    },[inputs, registrationPopup.role_id])

    const onSearch = (e) =>{
        e.preventDefault()
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
    }

    
    useEffect(()=>{
        // if(searchInputs && Object.keys(searchInputs).includes('type')){
            setInputs((input)=>({...input, 'type': searchInputs?.type}))
        // }
    },[searchInputs?.type])

    const onSubmit = () =>{
        // console.log(registrationPopup.role_id);
        // console.log(choiceList);
        if(!choiceList.length){
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': '사용자를 선택해주세요.'
            })
            return
        }
        api('user', 'role_update', {'role_id': registrationPopup.role_id, 'admin_id_list': choiceList.map((data)=>data.admin_id)})
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setRegistrationPopup()
                            currentSettings()
                            logButton('역할 권한 관리(사용자 권한 - 추가)')
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
                <strong>[{registrationPopup.roleTitle.name}] 화면 권한 추가</strong>

                <div className='rolePopup'>
                    <Select type='permissionsUserType' current changeName='type' setInputs={setSearchInputs}/>
                    <form className="searchArea">
                        <input type="search" name='name' id='name' onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='사용자명 입력'/>
                        <button onClick={onSearch}>검색</button>
                    </form>

                    <div className="boardBox">
                        <div className="board-top">
                            <span>사용자구분</span>
                            <span>사용자명</span>
                            <span>아이디</span>
                            <span></span>
                        </div>
                        { moduleList && 
                            <ol className='board-center scroll-width'>
                                { moduleList.map((data)=>
                                    <li 
                                        key={data.admin_id}
                                        className={choiceList.some(({admin_id})=> admin_id === data.admin_id) ? 'active' : ''}
                                    >
                                        <span>{ data.type === 'user' ? '사용자' : '관리자' }</span>
                                        <span>{ data.name }</span>
                                        <span>{ data.id }</span>
                                        <button className='point' onClick={()=>{
                                            setChoiceList((choice)=>{
                                                let copy = [...choice]
                                                if(copy.every((copyData)=>copyData.admin_id !== data.admin_id)){
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
                            <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                        </div>
                    </div>

                    { !!choiceList.length && 
                        <ul className='choice-horizontal scroll-width'>
                            { choiceList.map((data)=>
                                <li key={data.admin_id} className='icon-remove'>
                                    {data.name} ({data.id})
                                    <button onClick={()=>
                                        setChoiceList((choice)=>{
                                            let copy = [...choice]
                                            copy = copy.filter((copyData)=>copyData.admin_id !== data.admin_id)
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

