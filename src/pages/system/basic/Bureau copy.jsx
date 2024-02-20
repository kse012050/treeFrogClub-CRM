import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/api'
import { inputChange } from '../../../api/validation'
import Popup from '../../../components/popup/Popup';
import BureauBox from '../../../components/BureauBox';
import BureauRegistration from './BureauRegistration';
import BureauUpdate from './BureauUpdate';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';

export default function Bureau() {
    const [inputs, setInputs] = useState({ 'department_id': '' })
    const [searchInputs, setSearchInputs] = useState()
    const [boardList, setBoardList] = useState()
    const [firstBureau, setFirstBureau] = useState()
    const [bureauRegistrationPopup, setBureauRegistrationPopup] = useState();
    const [bureauUpdatePopup, setBureauUpdatePopup] = useState();
    const [popup, setPopup] = useState();

    useEffect(()=>{
        setInputs({ 'department_id': '' })
    },[bureauRegistrationPopup, bureauUpdatePopup])

    const boardListFunc = () => {
        // console.log(inputs.department_id);
        api('user', 'list', {'department_id': inputs.department_id})
            // .then((result)=>{
            //     console.log(result);
            // })
            .then(({result, list})=>{
                if(result){
                    // 아마도 부서장 판별인 듯
                    console.log(list);
                    // list = list.filter((data)=>data.useable_yn === 'n')
                    setBoardList([{'department_id': inputs.department_id, 'name': inputs.name, 'admin_count': list.length, 'user_list': list}])
                }
            })
    }

    useEffect(()=>{
        // console.log(firstBureau);
        test()
    },[firstBureau])
    
    const test = useCallback(()=>{
        if(firstBureau){
            api('user', 'list', {'department_id': firstBureau.department_id})
                .then(({result, list})=>{
                    if(result){
                        // 아마도 부서장 판별인 듯
                        console.log(list);
                        // list = list.filter((data)=>data.useable_yn === 'n')
                        setBoardList([{'department_id': firstBureau.department_id, 'name': firstBureau.name, 'admin_count': list.length, 'user_list': list}])
                    }
                })
        }

    },[firstBureau])

    const onSearch = () => {
        api('department', 'search_user', searchInputs)
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setBoardList(list)
                }
            })
    }


    const func = () =>{
        api('department', 'delete', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                    }))
                    setInputs({ 'department_id': '' })
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
            <h2>
                부서 관리
                <div>
                    <input type="search" name='name' id='name' onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='사용자명 검색'/>
                    <button onClick={onSearch}>검색</button>
                </div>
            </h2>
            
            <div className="horizontalTwo">
                <BureauBox type='list' inputs={inputs} setInputs={setInputs} setFirstBureau={setFirstBureau}>
                    <div className='addBtn'>
                        <button className='btn-gray-black' 
                            onClick={()=>setBureauRegistrationPopup({type: 'children', list: []})}
                        >
                            부서 추가
                        </button>
                        <button 
                            className='btn-gray-black'
                            disabled={!inputs.department_id}
                            onClick={()=>setBureauUpdatePopup({type: 'children', id: inputs.department_id, list: []})}
                        >
                            부서 수정
                        </button>
                        <button 
                            className='btn-gray-black'
                            disabled={!inputs.department_id}
                            onClick={()=>setPopup({
                                type: 'finFunc',
                                title: '삭제',
                                description: `[${inputs.name}] 을 삭제하시겠습니까?\n소속된 사용자는 미지정 상태로 변경됩니다.`,
                                func: () =>{
                                    func()
                                }
                            })}
                        >
                            부서 삭제
                        </button>
                    </div>
                </BureauBox>
                { boardList && 
                    <div className='boardArea'>
                        { boardList.map((data)=> 
                            <div className='boardBox' key={data.department_id}>
                                <Board data={data} onSearch={onSearch} boardListFunc={boardListFunc}/>
                            </div>
                        )}
                    </div>
                }
            </div>
            { bureauRegistrationPopup && <BureauRegistration bureauRegistrationPopup={bureauRegistrationPopup} setBureauRegistrationPopup={setBureauRegistrationPopup} firstBureau={firstBureau}/>}
            { bureauUpdatePopup && <BureauUpdate bureauUpdatePopup={bureauUpdatePopup} setBureauUpdatePopup={setBureauUpdatePopup}/>}
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    );
}


function Board({ data, onSearch, boardListFunc }){
    const [deleteList, setDeleteList] = useState('')
    const [popup, setPopup] = useState()

    return (
        <>
            <strong>{ data.name } ({ data.admin_count })</strong>
            <button 
                className='btn-gray-black'
                onClick={()=>
                    setPopup({
                        type: 'salesArray',
                        list: data.user_list,
                        func: (selectData) => {
                            console.log(selectData);
                            // setInputs((input)=>({...input, 'admin_id_list': data}))
                            api('department', 'add_user', {'department_id': data.department_id,'admin_id_list': selectData})
                                .then((result)=>{
                                    if(result){
                                        onSearch()
                                    }
                                })
                        }
                    })
                }
            >
                사용자 추가
            </button>
            <button className={`btn-gray-black`}
                onClick={()=>setPopup({
                    'type': 'finFunc',
                    'title': '선택 삭제',
                    'description': `선택 항목을 삭제하시겠습니까?`,
                    'func': ()=>{
                        if(deleteList.length){
                            // console.log(deleteList);
                            api('department', 'delete_user', { 'department_id': data.department_id, 'admin_id_list': deleteList})
                                .then(({result})=>{
                                    if(result){
                                        setPopup()
                                        setDeleteList('')
                                        onSearch()
                                    }
                                })
                        }
                    }
                })}
                disabled={!deleteList?.length}
            >
                선택 삭제
            </button>
            <button 
                className='btn-gray-black'
                onClick={()=>setPopup({
                    'type': 'bureau',
                    'func': (data)=>{
                        api('department', 'move_user', {'department_id': data.department_id, 'admin_id_list': deleteList})
                            .then((result)=>{
                                console.log(result);
                                boardListFunc()
                            })
                    }
                })}
                disabled={!deleteList?.length}
            >
                선택 이동
            </button>

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
                        <span>{ data.role_name }</span>
                    </li>
                ))}
            </ol>

            {popup && (
                <Popup popup={popup} setPopup={setPopup}/>
            )}
        </>
    )
}

// function BureauUpdate({ bureauUpdatePopup, setBureauUpdatePopup, parentsInputs, parentsSetInputs }){
//     const [inputs, setInputs] = useState(/* parentsInputs */)
//     const [popup, setPopup] = useState()

//     useEffect(()=>{
//         // setInputs({...parentsInputs, 'order_number': '1'})
//         // console.log(bureauUpdatePopup);
//         // console.log(parentsInputs);
//     },[/* parentsInputs */])

//     const onSubmit = (e) =>{
//         e.preventDefault();
//         // console.log(inputs);
//         api('department', 'update', inputs)
//             .then(({result, error_message})=>{
//                 setPopup({'type': 'confirm', 'description': error_message})
//                 if(result){
//                     setPopup((popup)=>({
//                         ...popup,
//                         'title': '완료',
//                         'confirmFunc': ()=>{
//                             setBureauUpdatePopup('')
//                         }
//                     }))
//                     parentsSetInputs('')
//                 }else{
//                     setPopup((popup)=>({
//                         ...popup,
//                         'title': '실패',
//                     }))
//                 }
//             })
//     }

//     return (
//         <>
//             { bureauUpdatePopup &&
//                 <Popup popup={bureauUpdatePopup} setPopup={setBureauUpdatePopup}>
//                     <form className='bureau-update'>
//                         <fieldset>
//                             <strong>부서 수정</strong>
//                             <ul>
//                                 <li>
//                                     <label htmlFor="name">부서명</label>
//                                     <div>
//                                         <input type="text" id='name' name='name' value={inputs?.name || ''} onChange={(e)=>inputChange(e, setInputs)}/> 
//                                     </div>
//                                 </li>
//                                 <li>
//                                     <label htmlFor="order_number">정렬순서</label>
//                                     <div>
//                                         <input type="text" id='order_number' name='order_number' value={inputs?.order_number || ''} onChange={(e)=>inputChange(e, setInputs)}/>
//                                     </div>
//                                 </li>
//                                 <li>
//                                     <label htmlFor="">부서 선택</label>
//                                     <BureauBox type='update' inputs={inputs} setInputs={setInputs} />
//                                 </li>
//                             </ul>
//                         </fieldset>
//                         <div className='btnArea-end'>
//                             <button className='btn-gray-white' type='button' onClick={()=>setBureauUpdatePopup('')}>취소</button>
//                             <input type="submit" className='btn-point' value='저장' onClick={onSubmit}/>
//                         </div>
//                     </form>
//                 </Popup>
//             }
            
//             {popup && (
//                 <Popup popup={popup} setPopup={setPopup} /* confirmFunc={confirmFunc} *//>
//             )}
//         </>
//     )
// }
