import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../../components/DropBox';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import Pager from '../../../components/Pager';
import { inputChange } from '../../../api/validation';

export default function Common() {
    // console.log('common 랜더링');
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [searchInputs, setSearchInputs] = useState({'limit': '10', 'page': '1'});
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [boardList, setBoardList] = useState()

    const currentData = useCallback(()=>{
        api('commoncode', 'properties_list', inputs)
                .then(({result, data, list})=>{
                    if(result){
                        setPagerInfo(data)
                        setBoardList(list)
                    }
                })
    },[inputs, setBoardList])

    useEffect(()=>{
        currentData()
    },[currentData])


    useEffect(()=>{
        setInputs((input)=>({...input, 'page': '1'}))
    },[inputs.limit])
    
    const onReset = () => {
        // console.log('reset');
        setSearchInputs({'limit': '10', 'page': '1'})
        currentData()
    }

    const onSearch = (e) => {
        e.preventDefault()
        // console.log(searchInputs);
        api('commoncode', 'properties_list', searchInputs)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    }

    return (
        <>
            <h2>
                공통 코드 관리
                <Link to="registration" className='btn-point'>추가</Link>
            </h2>

            <DropBox title="검색 항목" arrow>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">분류유형명</label>
                                <div>
                                    <Select type='commonClassification' current={searchInputs?.classification_code || false} changeName='classification_code' setInputs={setSearchInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="name">코드명</label>
                                <div>
                                    <input type="text" name='code_name' id='code_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용 여부</label>
                                <div>
                                    <Select type='yn' current={searchInputs?.useable_yn || false} changeName='useable_yn' setInputs={setSearchInputs}/>
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
                <strong onClick={()=>console.log(deleteList)}>목록</strong>
                <hr className='case01'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <BoardChkDelete url='commoncode' idName='properties_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>
                
                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({properties_id})=>properties_id)} />
                    <button>분류유형코드</button>
                    <button>분류유형명</button>
                    <button>코드</button>
                    <button>코드명</button>
                    <button>정렬순서</button>
                    <button>사용여부</button>
                    <span>수정</span>
                </div>
                
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.properties_id }>
                                <BoardChk id={data.properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.classification_code }</span>
                                <span>{ data.classification_name }</span>
                                <span>{ data.code }</span>
                                <span>{ data.name }</span>
                                <span>{ data.order_number }</span>
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
    );
}


// function Board({ boardList, setBoardList }){

//     return (
//         <>
//             <div className='boardBox'>
//                 <strong onClick={()=>console.log(deleteList)}>목록</strong>
//                 <hr className='case01'/>
//                 <b className='total'>{ pagerInfo?.total_count }</b>
//                 <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
//                 <b className='choice'>{ deleteList.length }</b>
//                 <BoardChkDelete url='commoncode' idName='properties_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>
                
//                 <div className="board-top">
//                     <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({properties_id})=>properties_id)} />
//                     <button>분류유형코드</button>
//                     <button>분류유형명</button>
//                     <button>코드</button>
//                     <button>코드명</button>
//                     <button>정렬순서</button>
//                     <button>사용여부</button>
//                     <span>수정</span>
//                 </div>
                
//                 { boardList && 
//                     <ol className="board-center">
//                         { boardList.map((data)=>(
//                             <li key={ data.properties_id }>
//                                 <BoardChk id={data.properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
//                                 <span>{ data.classification_code }</span>
//                                 <span>{ data.classification_name }</span>
//                                 <span>{ data.code }</span>
//                                 <span>{ data.name }</span>
//                                 <span>{ data.order_number }</span>
//                                 <span>{ data.useable_yn }</span>
//                                 <Link to={`update/${data.properties_id}`}>수정</Link>
//                             </li>
//                         ))}
//                     </ol>
//                 }

//                 <div className='board-pagination' data-styleidx='a'>
//                     <Select type="pagerCount" current={inputs.limit} setInputs={setInputs} changeName='limit'/>
//                     <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
//                 </div>
//             </div>
//         </>
//     )
// }
