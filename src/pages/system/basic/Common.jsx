import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropBox from '../../../components/DropBox';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import BoardChk from '../../../components/boardChk/BoardChk';
import Popup from '../../../components/popup/Popup';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';

export default function Common() {
    const [pager, setPager] = useState(10);
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [deleteList, setDeleteList] = useState([])
    const [popup, setPopup] = useState('')

    useEffect(()=>{
        if(pager){
            api('commoncode', 'properties_list', { 'limit': pager})
                .then(({result, data, list})=>{
                    if(result){
                        setPagerInfo(data)
                        setBoardList(list)
                    }
                })
        }
    },[pager])

    return (
        <>
            <h2>
                공통 코드 관리
                <Link to="registration" className='btn-point'>추가</Link>
            </h2>

            <DropBox title="검색 항목" arrow>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">분류유형명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">코드명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용 여부</label>
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

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case01'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <BoardChkDelete setPopup={setPopup} deleteList={deleteList}/>

                
                <div className="board-top">
                    {/* <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div> */}
                    <BoardChkAll deleteList={setDeleteList} list={boardList?.map(({properties_id})=>properties_id)} />
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
                                {/* <div>
                                    <input type="checkbox" />
                                    <label htmlFor=""></label>
                                </div> */}
                                <BoardChk id={data.properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.classification_code }</span>
                                <span>{ data.classification_name }</span>
                                <span>{ data.code }</span>
                                <span>{ data.name }</span>
                                <span>{ data.order_number }</span>
                                <span>{ data.useable_yn }</span>
                                <button className="popup">수정</button>
                            </li>
                        ))}
                    </ol>
                }

                <div className='board-pagination' data-styleidx='a'>
                    <Select name="pagerCount" current={pager} currentChange={setPager}/>
                    <Link to={''}>첫 페이지</Link>
                    <Link to={''}>이전 페이지</Link>
                    <ol>
                        <li className='active'><Link to={''}>1</Link></li>
                        <li><Link to={''}>2</Link></li>
                        <li><Link to={''}>3</Link></li>
                        <li><Link to={''}>4</Link></li>
                        <li><Link to={''}>5</Link></li>
                        <li><Link to={''}>6</Link></li>
                        <li><Link to={''}>7</Link></li>
                        <li><Link to={''}>8</Link></li>
                        <li><Link to={''}>9</Link></li>
                        <li><Link to={''}>10</Link></li>
                    </ol>
                    <Link to={''}>다음 페이지</Link>
                    <Link to={''}>마지막 페이지</Link>
                </div>
            </div>

            {popup && (
                <Popup popup={popup} setPopup={setPopup} /* func={popupFunc} */ />
            )}
        </>
    );
}

