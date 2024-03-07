import React, { useCallback, useEffect, useId, useState } from 'react';
import BoardChk from '../../../components/boardChk/BoardChk';
import { inputChange, onSort } from '../../../api/validation';
import SelectBoard from '../../../components/SelectBoard';
import { api } from '../../../api/api';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import Popup from '../../../components/popup/Popup';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import PagerButton from '../../../components/PagerButton';
// import Pager from '../../../components/Pager';
import SelectPage from '../../../components/SelectPage';
import Select from '../../../components/Select';
import { logButton } from '../../../api/common';

export default function PermissionsScreen({id, roleTitle}) {
    const [inputs, setInputs] = useState()
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [allCheck, setAllCheck] = useState()
    const [registrationPopup, setRegistrationPopup] = useState()

    const currentData = useCallback(()=>{
        // console.log(inputs);
        api('module', 'role_module_list', {...inputs})
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    // console.log('초기값', list);
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
        e.preventDefault();
        // console.log(searchInputs);
        setInputs((input)=>({...input,'page': '1', ...searchInputs}))
    }
    
    useEffect(()=>{
        // if(searchInputs && Object.keys(searchInputs).includes('module_category')){
            // console.log(1);
            setInputs((input)=>({...input, 'module_category': searchInputs?.module_category}))
        // }
    },[searchInputs?.module_category])

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


    return (
        <div className='screenArea'>
            <Select type='moduleCategory' current={searchInputs?.module_category || true} changeName='module_category' setInputs={setSearchInputs}/>
            <form className="searchArea">
                <input type="search" name='screen_name' id='screen_name' current={searchInputs?.screen_name || ''} onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='화면명 입력'/>
                <button onClick={onSearch}>검색</button>
            </form>
            <div className="boardBox">
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <BoardChkDelete url='module' idName='role_with_module_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentSettings} logValue='역할 권한 관리(화면 권한 - 선택 삭제)'/>
                <button className='btn-gray-black boundary' onClick={()=>setRegistrationPopup({'type': 'children', 'role_id': inputs.role_id, 'roleTitle': roleTitle})}>추가</button>
                
                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({role_with_module_id})=>role_with_module_id)} />
                    <button onClick={()=>onSort(setBoardList, 'module_category')}>모듈유형</button>
                    <button onClick={()=>onSort(setBoardList, 'screen_name')}>화면명</button>
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
                                <List data={data} deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData}/>
                            </li>
                        ))}
                    </ol>
                }

                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                        {/* <Pager pagerInfo={pagerInfo} setInputs={setInputs}/> */}
                    </div>
                }
            </div>
            { registrationPopup &&
                <RegistrationPopup registrationPopup={registrationPopup} setRegistrationPopup={setRegistrationPopup} boardList={boardList} currentSettings={currentSettings}/>
            }
        </div>
    )
}


function List({ data, deleteList, setDeleteList, currentData }){
    const uuid = useId()
    const [inputs, setInputs] = useState();
    const [prevInputs, setPrevInputs] = useState();
    // console.log('?');
    useEffect(()=>{
        setInputs({...data})
        setPrevInputs({...data})
    },[data])

    useEffect(()=>{
        if(inputs && prevInputs && !Object.entries(inputs).every(([key, value])=> value === prevInputs[key])){
            api('module', 'update', inputs)
                .then(({result})=>{
                    if(result){
                        setPrevInputs({...inputs})
                        currentData()
                    }
                })
        }
       
    },[inputs, prevInputs, currentData])

    return (
        <>
            <BoardChk id={data.role_with_module_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
            <span>{ data.module_category }</span>
            <span>{ data.screen_name }</span>
            <div>
                <input type="checkbox" name='insert_yn' id={`insert_yn_${uuid}`} checked={data?.insert_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`insert_yn_${uuid}`}>등록</label>
            </div>
            <div>
                <SelectBoard type='role' current={data?.modify_type} setInputs={setInputs} changeName='modify_type'/>
            </div>
            <div>
                <input type="checkbox" name='update_yn' id={`update_yn_${uuid}`} checked={data?.update_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`update_yn_${uuid}`}></label>
            </div>
            <div>
                <input type="checkbox" name='delete_yn' id={`delete_yn_${uuid}`} checked={data?.delete_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`delete_yn_${uuid}`}></label>
            </div>
            <div>
                <SelectBoard type='role' current={data?.select_type} setInputs={setInputs} changeName='select_type'/>
            </div>
            <div>
                <input type="checkbox" name='select_yn' id={`select_yn_${uuid}`} checked={data?.select_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`select_yn_${uuid}`}></label>
            </div>
            <div>
                <input type="checkbox" name='excel_yn' id={`excel_yn_${uuid}`} checked={data?.excel_yn === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                <label htmlFor={`excel_yn_${uuid}`}></label>
            </div>
        </>
    );
}

function RegistrationPopup({ registrationPopup, setRegistrationPopup, currentSettings}){
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'})
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [moduleList, setModuleList] = useState();
    const [choiceList, setChoiceList] = useState([]);
    const [popup, setPopup] = useState('')

    useEffect(()=>{
        api('module', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setModuleList(list)
                    const firstList = [...list]
                    api('module', 'role_module_list', {'role_id': registrationPopup.role_id, 'all_yn': 'y'})
                        .then(({result, list})=>{
                            if(result){
                                // console.log('두번쨰', list);
                                setChoiceList((choice)=>{
                                    const uniqueObjects = {}
                                    const test = [
                                        ...choice,
                                        ...firstList.filter(({screen_name})=> 
                                            list.some((data)=>screen_name === data.screen_name)
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
                }
            })
    },[inputs, registrationPopup.role_id])


    const onSearch = (e) =>{
        e.preventDefault();
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
    }
    
    useEffect(()=>{
        // if(searchInputs && Object.keys(searchInputs).includes('module_category')){
            // console.log(1);
            setInputs((input)=>({...input, 'module_category': searchInputs?.module_category}))
        // }
    },[searchInputs?.module_category])

    const onSubmit = () =>{
        // console.log(choiceList);
        api('module', 'insert', {'role_id': registrationPopup.role_id, 'module_id_list': choiceList.map((data)=>data.module_id)})
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'confirmFunc': ()=>{
                            setRegistrationPopup()
                            currentSettings()
                            logButton('역할 권한 관리(화면 권한 - 추가)')
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
                            <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
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

