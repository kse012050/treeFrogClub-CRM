import React, { useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import SubTitle from '../../../components/SubTitle';
import DropBox from '../../../components/DropBox';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';
import SelectPage from '../../../components/SelectPage';
import { inputChange, onSort } from '../../../api/validation';
import PagerButton from '../../../components/PagerButton';
import { logButton } from '../../../api/common';
import { UserContext } from '../../../context/UserContext';

export default function Management() {
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const initParam = {'limit': '10', 'page': '1'};
    const [inputs, setInputs] = useState(initParam);
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState([])
    const [boardList, setBoardList] = useState()

    useEffect(()=>{
        if(pagePermission?.select_yn && pagePermission?.select_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.select_yn, navigate])

    const currentData = useCallback(()=>{
        // console.log(inputs);
        api('role', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setBoardList(list)
                    // console.log(list);
                }
            })
    },[inputs])

    useEffect(()=>{
        currentData()
    },[currentData])

    const onReset = () =>{
        setInputs((input)=>({'limit': input.limit, 'page': '1'}))
        setSearchInputs()
        setDeleteList([])
        logButton('역할 관리(검색 초기화)')
    }

    const onSearch = (e) =>{
        e.preventDefault();
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
        setDeleteList([])
        logButton('역할 관리(검색)')
    }

    return (
        <>
            <SubTitle text="역할 관리" link={pagePermission?.insert_yn === 'y' ? 'registration' : ''} />

            <DropBox title="검색 항목" arrow>
                <form onSubmit={onSearch}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="search">역할명</label>
                                <div>
                                    <input type="text" name='search' id='search' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="reset" value="초기화" className='btn-gray-white' onClick={onReset}/>
                        <input type="submit" value="검색" className='btn-point' onClick={onSearch}/>
                    </div>
                </form>
            </DropBox>

            {/* <Board boardList={boardList} setBoardList={setBoardList}/> */}

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case01'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                { pagePermission?.delete_yn === 'y'  && 
                    <BoardChkDelete url='role' idName='role_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData} logValue='역할 관리(선택 삭제)'/>
                }

                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({role_id})=>role_id)} />
                    <button onClick={()=>onSort(setBoardList, 'role_classification')}>구분</button>
                    <button onClick={()=>onSort(setBoardList, 'role_name')}>역할</button>
                    <button onClick={()=>onSort(setBoardList, 'ip_limit_yn')}>허용IP 설정</button>
                    <button onClick={()=>onSort(setBoardList, 'connect_limit_yn')}>사용시간 설정</button>
                    <span>설명</span>
                    <span>수정</span>
                </div>
                
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.role_id }>
                                <BoardChk id={data.role_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.role_classification }</span>
                                <span>{ data.role_name }</span>
                                { data.ip_limit_yn === 'y' ? 
                                    <Link to={`confirm/${data.role_id}`}>{ data.ip_limit_yn.toUpperCase() }</Link> :
                                    <span>{ data.ip_limit_yn.toUpperCase() }</span>
                                }
                                { data.connect_limit_yn === 'y' ? 
                                    <Link to={`confirm/${data.role_id}`}>{ data.connect_limit_yn.toUpperCase() }</Link> :
                                    <span>{ data.connect_limit_yn.toUpperCase() }</span>
                                }
                                <span>{ data.role_explain }</span>
                                
                                { pagePermission?.update_yn === 'y' ?
                                    <Link to={`update/${data.role_id}`}>수정</Link> :
                                    <span></span>
                                }
                            </li>
                        ))}
                    </ol>
                }

                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                }
            </div>
        </>
    );
}


// function Board({ boardList, setBoardList }){
//     const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
//     const [pagerInfo, setPagerInfo] = useState()
//     const [deleteList, setDeleteList] = useState('')

//     useEffect(()=>{
//         setDeleteList('');
//     },[inputs])

//     useEffect(()=>{
//         setInputs((input)=>({...input, 'page': '1'}))
//     },[inputs.limit])
    
//     useEffect(()=>{
//         if(!deleteList){
//             api('role', 'list', inputs)
//                 .then(({result, data, list})=>{
//                     if(result){
//                         setPagerInfo(data)
//                         setBoardList(list)
//                     }
//                 })
//         }
//     },[inputs, deleteList, setBoardList])

//     return (
//         <>
//             <div className='boardBox'>
//                 <strong>목록</strong>
//                 <hr className='case01'/>
//                 <b className='total'>{ pagerInfo?.total_count }</b>
//                 <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
//                 <b className='choice'>{ deleteList.length }</b>
//                 <BoardChkDelete url='role' idName='role_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>
                
//                 <div className="board-top">
//                     <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({role_id})=>role_id)} />
//                     <button>구분</button>
//                     <button>역할</button>
//                     <button>허용IP 설정</button>
//                     <button>사용시간 설정</button>
//                     <span>설명</span>
//                     <span>수정</span>
//                 </div>
                
//                 { boardList && 
//                     <ol className="board-center">
//                         { boardList.map((data)=>(
//                             <li key={ data.role_id }>
//                                 <BoardChk id={data.role_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
//                                 <span>{ data.role_classification }</span>
//                                 <span>{ data.role_name }</span>
//                                 { data.ip_limit_yn === 'y' ? 
//                                     <Link to={`confirm/${data.role_id}`}>{ data.ip_limit_yn.toUpperCase() }</Link> :
//                                     <span>{ data.ip_limit_yn.toUpperCase() }</span>
//                                 }
//                                 { data.connect_limit_yn === 'y' ? 
//                                     <Link to={`confirm/${data.role_id}`}>{ data.connect_limit_yn.toUpperCase() }</Link> :
//                                     <span>{ data.connect_limit_yn.toUpperCase() }</span>
//                                 }
//                                 <span>{ data.role_explain }</span>
//                                 <Link to={`update/${data.role_id}`}>수정</Link>
//                             </li>
//                         ))}
//                     </ol>
//                 }

//                 { !!pagerInfo?.total_count &&
//                     <div className='board-pagination' data-styleidx='a'>
//                         <SelectPage current={inputs.limit} setInputs={setInputs}/>
//                         <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
//                     </div>
//                 }
//             </div>
//         </>
//     )
// }
