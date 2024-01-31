import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../../components/DropBox';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import Pager from '../../../components/Pager';

export default function AnUser() {
    const [boardList, setBoardList] = useState()

    return (
        <>
            <h2>
                사용자 목록
                <Link to="registration" className='btn-point'>추가</Link>
            </h2>

            <DropBox title="검색 항목" arrow>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">사용자명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">아이디</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">회원사</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용여부</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용자 구분</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="reset" value="초기화" className='btn-gray-white'/>
                        <input type="submit" value="검색" className='btn-point'/>
                    </div>
                </form>
            </DropBox>

            <Board boardList={boardList} setBoardList={setBoardList}/>
        </>
    );
}

function Board({ boardList, setBoardList }){
    const [inputs, setInputs] = useState({'limit': 10, 'page': '1'});
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState('')

    useEffect(()=>{
        setDeleteList('');
    },[inputs])

    useEffect(()=>{
        setInputs((input)=>({...input, 'page': '1'}))
    },[inputs.limit])
    
    useEffect(()=>{
        if(!deleteList){
            api('user', 'list', inputs)
                .then(({result, data, list})=>{
                    if(result){
                        setPagerInfo(data)
                        setBoardList(list)
                    }
                })
        }
    },[inputs, deleteList, setBoardList])

    return (
        <>
            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case01'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <BoardChkDelete url='user' idName='admin_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>
                
                <div className="board-top">
                    <BoardChkAll deleteList={setDeleteList} list={boardList?.map(({properties_id})=>properties_id)} />
                    <button>회원사명</button>
                    <button>아이디</button>
                    <button>사용자명</button>
                    <button>사용자 구분</button>
                    <button>역할구분</button>
                    <button>부서</button>
                    <button>사용여부</button>
                    <span>수정</span>
                </div>
                
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.admin_id }>
                                <BoardChk id={data.admin_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.company_name }</span>
                                <span>{ data.id }</span>
                                <span>{ data.name }</span>
                                <span>{ data.type === 'admin' ? '관리자' : '사용자' }</span>
                                <span>{ data.role_name }</span>
                                <span>{ data.department_name }</span>
                                <span>{ data.useable_yn }</span>
                                <Link to={`update/${data.properties_id}`}>수정</Link>
                            </li>
                        ))}
                    </ol>
                }

                <div className='board-pagination' data-styleidx='a'>
                    <Select type="pagerCount" current={inputs.limit} setInputs={setInputs} changeName='limit'/>
                    <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                </div>
            </div>
        </>
    )
}

