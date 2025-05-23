import React, { useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../../api/api'
import { inputChange } from '../../../api/validation'
import Popup from '../../../components/popup/Popup';
import BureauRegistration from './BureauRegistration';
import BureauUpdate from './BureauUpdate';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';
// import BureauList from './BureauList';
import { logButton } from '../../../api/common';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import BureauLista from './BureauLista';

export default function Bureau() {
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState()
    const [searchInputs, setSearchInputs] = useState()
    const [bureau, setBureau] = useState()
    const [selectBureau, setSelectBureau] = useState()
    const [rootBureau, setRootBureau] = useState([])
    const [bureauRegistrationPopup, setBureauRegistrationPopup] = useState();
    const [bureauUpdatePopup, setBureauUpdatePopup] = useState()
    const [boardList, setBoardList] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        if(pagePermission?.select_yn && pagePermission?.select_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.select_yn, navigate])
    
    // console.log(user);
    // console.log(pagePermission);
    const bureauFunc = useCallback((type)=>{
        // console.log('?');
        api('department', 'list')
            .then(({result, list, data: { company_name }})=>{
                if(result){
                    setBureau((prev)=>({...prev, 'company_name': company_name, 'list': list}))
                    if(!type){
                        setSelectBureau((prev)=> (prev ? {...prev} : list[0]))
                    }else if(type === 'delete'){
                        setSelectBureau(list[0])
                    }
                }
            })
    },[setSelectBureau])

    const boardFunc = useCallback(()=>{
        selectBureau && 
            api('user', 'list', {'department_id': selectBureau.department_id})
                .then(({result, list})=>{
                    if(result){
                        // console.log(list);
                        // 부서장 정보가 없어서 부서 정보 가져와서 'head' 추가 했다 api 요청해야 한다
                        api('department', 'detail', {'department_id': selectBureau.department_id})
                            .then(({result, data})=>{
                                if(result){
                                    setBoardList([{'department_id': selectBureau.department_id, 'name': selectBureau.name, 'admin_count': list.length, 'user_list': list.map((listData)=>({...listData, 'head': data.head_list.some((data2)=>data2.admin_id === listData.admin_id)}))}])
                                }
                            })
                    }
                })
    },[selectBureau])


   
    useEffect(()=>{
        bureauFunc()
    },[bureauFunc])

    useEffect(()=>{
        boardFunc()
    },[boardFunc, selectBureau])


    useEffect(()=>{
        if(inputs){
            api('user', 'list', {'department_id': inputs.department_id})
                .then(({result, list})=>{
                    if(result){
                        // 아마도 부서장 판별인 듯
                        // console.log(list);
                        // list = list.filter((data)=>data.useable_yn === 'n')
                        setBoardList([{'department_id': inputs.department_id, 'name': inputs.name, 'admin_count': list.length, 'user_list': list}])
                    }
                })
        }
    },[inputs])

    const onSearch = (e) => {
        e.preventDefault()
        api('department', 'search_user', searchInputs)
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setBoardList(list)
                    setInputs()
                }
            })
    }

    const onRefresh = (id) =>{
        bureauFunc()
        // console.log(id);
        if(id){
            // boardIdFunc(id)
        }else{
            // firstBureauFunc()
        }
    }
   
    return (
        <>
            <h2>
                부서 관리
                <form>
                    <input type="search" name='name' id='name' onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='사용자명 검색'/>
                    <button onClick={onSearch}>검색</button>
                </form>
            </h2>
            
            <div className="horizontalTwo">
                <BureauLista key={bureau} bureau={bureau} selectBureau={selectBureau} setSelectBureau={setSelectBureau} rootBureau={rootBureau} setRootBureau={setRootBureau}>   
                    { (pagePermission?.insert_yn === 'y' || pagePermission?.update_yn === 'y' || pagePermission?.delete_yn === 'y') &&
                        <div className='addBtn'>
                            { pagePermission?.insert_yn === 'y'  && 
                                <button className='btn-gray-black' 
                                    onClick={()=>setBureauRegistrationPopup({type: 'children'})}
                                >
                                    부서 추가
                                </button>
                            }
                            { pagePermission?.update_yn === 'y'  && 
                                <button 
                                    className='btn-gray-black'
                                    disabled={!selectBureau?.department_id}
                                    onClick={()=>setBureauUpdatePopup({type: 'children'})}
                                >
                                    부서 수정
                                </button>
                            }
                            { pagePermission?.delete_yn === 'y'  && 
                                <button 
                                    className='btn-gray-black'
                                    disabled={!selectBureau?.department_id}
                                    onClick={()=>setPopup({
                                        type: 'finFunc',
                                        title: '삭제',
                                        description: `[${selectBureau.name}] 을 삭제하시겠습니까?\n소속된 사용자는 미지정 상태로 변경됩니다.`,
                                        func: () =>{
                                            api('department', 'delete', {'department_id': selectBureau.department_id})
                                                .then(({result, error_message})=>{
                                                    setPopup({'type': 'confirm', 'description': error_message})
                                                    if(result){
                                                        setPopup((popup)=>({
                                                            ...popup,
                                                            'title': '완료',
                                                        }))
                                                        bureauFunc('delete')
                                                        logButton('부서 관리(부서 삭제)')
                                                    }else{
                                                        setPopup((popup)=>({
                                                            ...popup,
                                                            'title': '실패',
                                                        }))
                                                    }
                                                })
                                        }
                                    })}
                                >
                                    부서 삭제
                                </button>
                            }
                        </div>
                    }
                </BureauLista>
                { boardList && 
                    <div className='boardArea'>
                        { boardList.map((data)=> 
                            <div className='boardBox' key={data.department_id}>
                                <Board data={data} onRefresh={onRefresh} pagePermission={pagePermission} />
                            </div>
                        )}
                    </div>
                }
            </div>
           
            { bureauRegistrationPopup && <BureauRegistration bureau={bureau} setBureauRegistrationPopup={setBureauRegistrationPopup} bureauFunc={bureauFunc}/>}            
            { bureauUpdatePopup && <BureauUpdate bureau={bureau} selectBureauId={selectBureau.department_id} setBureauUpdatePopup={setBureauUpdatePopup} bureauFunc={bureauFunc} setSelectBureau={setSelectBureau}/>}
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    );
}


function Board({ data, onRefresh, pagePermission }){
    const [deleteList, setDeleteList] = useState('')
    const [popup, setPopup] = useState()
    // console.log(data);

    return (
        <>
            <strong>{ data.name } ({ data.admin_count })</strong>
            { pagePermission?.insert_yn === 'y'  && 
                <button 
                    className='btn-gray-black'
                    onClick={()=>
                        setPopup({
                            type: 'salesArrayAdd',
                            limit: 'none',
                            list: data.user_list,
                            func: (selectData) => {
                                // console.log(selectData);
                                selectData = selectData.map((data2)=>data2.admin_id)
                                let userList = data.user_list.filter((data2)=> data2.head)
                                // console.log(data.user_list);
                                // console.log(selectData);
                                if(userList.length){
                                    // console.log(selectData.filter((data2)=> !data.user_list.some((data3)=> data3.admin_id === data2)));
                                    // selectData = selectData.filter((data2)=> data.user_list.some((data3)=> data3.admin_id !== data2));
                                    selectData = selectData.filter((data2)=> userList.some((data3)=> data3.admin_id !== data2));
                                }
                                // console.log(selectData);
                                api('department', 'add_user', {'department_id': data.department_id,'admin_id_list': selectData})
                                    .then(({result, error_message})=>{
                                        setPopup({'type': 'confirm', 'description': error_message})
                                        if(result){
                                            setPopup((popup)=>({
                                                ...popup,
                                                'title': '완료',
                                                'confirmFunc': ()=>{
                                                    onRefresh(data.department_id)
                                                    logButton('부서 관리(사용자 추가)')
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
                        })
                    }
                >
                    사용자 추가
                </button>
            }
            { pagePermission?.delete_yn === 'y'  && 
                <button className={`btn-gray-black`}
                    onClick={()=>setPopup({
                        'type': 'finFunc',
                        'title': '선택 삭제',
                        'description': `선택 항목을 삭제하시겠습니까?`,
                        'func': ()=>{
                            if(deleteList.length){
                                // console.log(deleteList);
                                api('department', 'delete_user', { 'department_id': data.department_id, 'admin_id_list': deleteList})
                                    .then(({result, error_message})=>{
                                        setPopup({'type': 'confirm', 'description': error_message})
                                        if(result){
                                            setPopup((popup)=>({
                                                ...popup,
                                                'title': '완료',
                                                'confirmFunc': ()=>{
                                                    onRefresh()
                                                    setDeleteList([])
                                                    logButton('부서 관리(선택 삭제)')
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
                        }
                    })}
                    disabled={!deleteList?.length}
                >
                    선택 삭제
                </button>
            }
            { pagePermission?.update_yn === 'y'  && 
                <button 
                    className='btn-gray-black'
                    onClick={()=>setPopup({
                        'type': 'bureau',
                        'func': (data)=>{
                            api('department', 'move_user', {'department_id': data.department_id, 'admin_id_list': deleteList})
                                .then(({result, error_message})=>{
                                    setPopup({'type': 'confirm', 'description': error_message})
                                    if(result){
                                        setPopup((popup)=>({
                                            ...popup,
                                            'title': '완료',
                                            'confirmFunc': ()=>{
                                                onRefresh()
                                                logButton('부서 관리(선택 이동)')
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
                    })}
                    disabled={!deleteList?.length}
                >
                    선택 이동
                </button>
            }

            <div className="board-top">
                <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={data.user_list.map(({admin_id})=>admin_id)}/>
                <span>아이디</span>
                <span>사용자명</span>
                <span>휴대폰</span>
                <span>이메일</span>
                <span>직위</span>
            </div>

            <ol className="board-center">
                { data.user_list.map((data)=>(
                    <li key={ data.admin_id }>
                        <BoardChk id={data.admin_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                        <span>{ data.id }</span>
                        <span>{ data.name }</span>
                        <span>{ data.mobile }</span>
                        <span>{ data.email }</span>
                        <span>{ data.head ? '부서장' : '팀원' }</span>
                    </li>
                ))}
            </ol>

            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    )
}
