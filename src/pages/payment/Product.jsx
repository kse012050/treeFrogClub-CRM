import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import Pager from '../../components/Pager';
import { api } from '../../api/api';
import BoardChk from '../../components/boardChk/BoardChk';
import BoardChkAll from '../../components/boardChk/BoardChkAll';
import BoardChkDelete from '../../components/boardChk/BoardChkDelete';

export default function Product() {
    const [boardList, setBoardList] = useState()

    return (
        <>
            <h2>
                상품 목록
                <Link to="registration" className='btn-point'>추가</Link>
            </h2>

            
            <DropBox title="검색 항목" arrow>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">상품코드</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상품명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">애널리스트</label>
                                <div>
                                    <input type="search" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제시 고객구분</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="">비고</label>
                                <div>
                                    <input type="text" />
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
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState([])

    useEffect(()=>{
        setDeleteList('');
    },[inputs])

    useEffect(()=>{
        setInputs((input)=>({...input, 'page': '1'}))
    },[inputs.limit])

    useEffect(()=>{
        if(deleteList){
            api('product', 'list', inputs)
                .then(({result, data, list})=>{
                    if(result){
                        setPagerInfo(data)
                        setBoardList(list)
                    }
                })
        }
    },[inputs, deleteList, setBoardList])

    return (
        <div className='boardBox'>
            <strong>목록</strong>
            <button className='btn-gray-black'>엑셀 다운로드</button>
            <hr className='case01'/>
            <b className='total'>{ pagerInfo?.total_count }</b>
            <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
            <b className='choice'>{ deleteList.length }</b>
            <BoardChkDelete url='user' idName='admin_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>

            
            <div className="board-top">
                <BoardChkAll deleteList={setDeleteList} list={boardList?.map(({product_id})=>product_id)} />
                <button>상품코드</button>
                <button>상품명</button>
                <button>애널리스트</button>
                <button>결제시 고객구분</button>
                <button>비고</button>
                <span>수정</span>
            </div>

            { boardList && 
                <ol className="board-center">
                    { boardList.map((data)=>(
                        <li key={ data.product_id }>
                            <BoardChk id={data.product_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                            <button>{ data.product_code }</button>
                            <button>{ data.product_name }</button>
                            <button>{ data.analyst_admin_id }</button>
                            <button>{ data.customer_properties_id }</button>
                            <button>{ data.memo }</button>
                            <Link to={`update/${data.product_id}`}>수정</Link>
                        </li>
                    ))}
                </ol>
            }
            

            <div className='board-pagination' data-styleidx='a'>
                <Select type="pagerCount" current={inputs?.limit} setInputs={setInputs} changeName='limit'/>
                <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
            </div>
        </div>
    )
}