import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import Pager from '../../components/Pager';
import { api } from '../../api/api';
import BoardChk from '../../components/boardChk/BoardChk';
import BoardChkAll from '../../components/boardChk/BoardChkAll';
import BoardChkDelete from '../../components/boardChk/BoardChkDelete';
import { inputChange, onSort } from '../../api/validation';
import Popup from '../../components/popup/Popup';
import SelectPage from '../../components/SelectPage';
import { logButton, logExcel } from '../../api/common';
import { UserContext } from '../../context/UserContext';

export default function Product() {
    // const [inputs, setInputs] = useState()
    const { pagePermission } = useContext(UserContext)
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState([])
    const [boardList, setBoardList] = useState()
    const [searchInputs, setSearchInputs] = useState();
    const [analyst, setAnalyst] = useState()
    const [popup, setPopup] = useState()
    const [excelDownloadLink, setExcelDownloadLink] = useState()

    const currentData = useCallback(()=>{
        api('product', 'list', inputs)
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
        api('product', 'list', {"excel_info": {"download_yn": "y"}})
            .then(({result, data: {download_url}})=>{
                if(result){
                    // console.log(download_url);
                    setExcelDownloadLink(download_url)
                }
            })
        
    },[])

    const onReset = () => {
        setAnalyst()
        setInputs((input)=>({'limit': input.limit, 'page': '1'}))
        setSearchInputs()
        setDeleteList([])
        logButton('상품 목록(검색)')
    }
    
    const onSearch = (e) =>{
        e.preventDefault();
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
        setDeleteList([])
        logButton('상품 목록(검색 초기화)')
    }

    return (
        <>
            <h2>
                상품 목록
                { pagePermission?.insert_yn === 'y'  && 
                    <Link to="registration" className='btn-point'>추가</Link>
                }
            </h2>

            
            <DropBox title="검색 항목" arrow>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="product_code">상품코드</label>
                                <div>
                                    <input type="text" name='product_code' id='product_code' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="product_name">상품명</label>
                                <div>
                                    <input type="text" name='product_name' id='product_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="analyst_admin_id">애널리스트</label>
                                <div className='resetArea'>
                                    <div>
                                        <input 
                                            type="search" 
                                            value={analyst || ''}
                                            readOnly
                                            onClick={()=>setPopup({
                                                'type': 'analyst',
                                                'func': (data)=>{
                                                    setSearchInputs((input)=>({...input, 'analyst_admin_id': data.admin_id}))
                                                    setAnalyst(data.name)
                                                }
                                            })}
                                        />
                                        <button>검색</button>
                                    </div>
                                    <button type='button' onClick={()=>{
                                        setSearchInputs((input)=>({...input, 'analyst_admin_id': ''}))
                                        setAnalyst('')
                                    }}>애널리스트 초기화</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제시 고객구분</label>
                                <div>
                                    <Select type={'customer'} changeName='customer_properties_id' current={searchInputs?.customer_properties_id || false} setInputs={setSearchInputs}/>
                                </div>
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="memo">비고</label>
                                <div>
                                    <input type="text" name='memo' id='memo' onChange={(e)=>inputChange(e, setSearchInputs)}/>
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
            { pagePermission?.excel_yn === 'y'  && 
                <Link 
                    to={excelDownloadLink} 
                    className='btn-gray-black'
                    onClick={()=>logExcel(`상품 목록`)}
                >
                    엑셀 다운로드
                </Link>
            }
            <hr className='case01'/>
            <b className='total'>{ pagerInfo?.total_count }</b>
            <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
            <b className='choice'>{ deleteList.length }</b>
            
            { pagePermission?.delete_yn === 'y'  && 
                <BoardChkDelete url='product' idName='product_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData} logValue='상품 목록(선택 삭제)'/>
            }

            
            <div className="board-top">
                <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({product_id})=>product_id)} />
                <button onClick={()=>onSort(setBoardList, 'product_code')}>상품코드</button>
                <button onClick={()=>onSort(setBoardList, 'product_name')}>상품명</button>
                <button onClick={()=>onSort(setBoardList, 'analyst_admin_name')}>애널리스트</button>
                <button onClick={()=>onSort(setBoardList, 'customer_properties_name')}>결제시 고객구분</button>
                <button onClick={()=>onSort(setBoardList, 'memo')}>비고</button>
                <span className='update'>수정</span>
            </div>

            { boardList && 
                <ol className="board-center">
                    { boardList.map((data)=>(
                        <li key={ data.product_id }>
                            <BoardChk id={data.product_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                            <span>{ data.product_code }</span>
                            <span>{ data.product_name }</span>
                            <span>{ data.analyst_admin_name }</span>
                            <span>{ data.customer_properties_name }</span>
                            <span>{ data.memo }</span>
                            { pagePermission?.update_yn === 'y' ?
                                <Link to={`update/${data.product_id}`} className='update'>
                                    { pagePermission?.update_yn === 'y'  && 
                                        '수정'
                                    }
                                </Link> :
                                <span></span>
                            }
                        </li>
                    ))}
                </ol>
            }

            { !!pagerInfo?.total_count &&
                <div className='board-pagination' data-styleidx='a'>
                    <SelectPage current={inputs.limit} setInputs={setInputs}/>
                    <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                </div>
            }
        </div>

            
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}


// function Board({ boardList, setBoardList }){
//     const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
//     const [pagerInfo, setPagerInfo] = useState()
//     const [deleteList, setDeleteList] = useState([])

//     useEffect(()=>{
//         setDeleteList('');
//     },[inputs])

//     useEffect(()=>{
//         setInputs((input)=>({...input, 'page': '1'}))
//     },[inputs.limit])

//     const currentData = useCallback(()=>{
//         api('product', 'list', inputs)
//                 .then(({result, data, list})=>{
//                     if(result){
//                         setPagerInfo(data)
//                         setBoardList(list)
//                     }
//                 })
//     },[inputs, setBoardList])

//     useEffect(()=>{
//         currentData()
//     },[currentData])

//     return (
//         <div className='boardBox'>
//             <strong>목록</strong>
//             <button className='btn-gray-black'>엑셀 다운로드</button>
//             <hr className='case01'/>
//             <b className='total'>{ pagerInfo?.total_count }</b>
//             <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
//             <b className='choice'>{ deleteList.length }</b>
//             <BoardChkDelete url='product' idName='product_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>

            
//             <div className="board-top">
//                 <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({product_id})=>product_id)} />
//                 <button>상품코드</button>
//                 <button>상품명</button>
//                 <button>애널리스트</button>
//                 <button>결제시 고객구분</button>
//                 <button>비고</button>
//                 <span>수정</span>
//             </div>

//             { boardList && 
//                 <ol className="board-center">
//                     { boardList.map((data)=>(
//                         <li key={ data.product_id }>
//                             <BoardChk id={data.product_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
//                             <span>{ data.product_code }</span>
//                             <span>{ data.product_name }</span>
//                             <span>{ data.analyst_admin_name }</span>
//                             <span>{ data.customer_properties_name }</span>
//                             <span>{ data.memo }</span>
//                             <Link to={`update/${data.product_id}`}>수정</Link>
//                         </li>
//                     ))}
//                 </ol>
//             }
            

//             <div className='board-pagination' data-styleidx='a'>
//                 <Select type="pagerCount" current={inputs?.limit} setInputs={setInputs} changeName='limit'/>
//                 <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
//             </div>
//         </div>
//     )
// }