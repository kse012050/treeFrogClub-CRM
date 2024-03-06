import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/api';
import { Link } from 'react-router-dom';
import SubTitle from '../../../components/SubTitle';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import BoardChk from '../../../components/boardChk/BoardChk';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';
import SelectPage from '../../../components/SelectPage';
import PagerButton from '../../../components/PagerButton';
import { onSort, onSortReverse } from '../../../api/validation';

export default function Client() {
    const [inputs, setInputs] = useState({'limit': '10'});
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [deleteList, setDeleteList] = useState([])

    const currentData = useCallback(()=>{
        api('clientcode', 'properties_list', {...inputs, 'page': '1'})
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    },[inputs])

    useEffect(()=>{
        currentData()
    },[currentData])

    return (
        <>
            <SubTitle text="고객 구분 관리" link="registration" />

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case03'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <BoardChkDelete url='commoncode' idName='properties_id_list' deleteList={deleteList} setDeleteList={setDeleteList} currentData={currentData}/>
            
                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({properties_id})=>properties_id)} />
                    <button onClick={()=>onSort(setBoardList, 'classification_name')}>분류유형</button>
                    <button onClick={()=>onSort(setBoardList, 'grade')}>고객등급</button>
                    <button onClick={()=>onSort(setBoardList, 'code')}>코드</button>
                    <button onClick={()=>onSort(setBoardList, 'name')}>코드명</button>
                    <button onClick={()=>onSortReverse(setBoardList, 'bg_color')}>배경색상</button>
                    <button onClick={()=>onSortReverse(setBoardList, 'font_color')}>폰트색상</button>
                    <button onClick={()=>onSort(setBoardList, 'order_number')}>정렬순서</button>
                    <button onClick={()=>onSort(setBoardList, 'useable_yn')}>사용여부</button>
                    <span>수정</span>
                </div>

                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.properties_id }>
                                <BoardChk id={data.properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.classification_name }</span>
                                <span>{ data.grade }</span>
                                <span>{ data.code }</span>
                                <span>{ data.name }</span>
                                <div style={{'--color': `${data.bg_color}`}}>{ data.bg_color }</div>
                                <div style={{'--color': `${data.font_color}`}}>{ data.font_color }</div>
                                <span>{ data.order_number }</span>
                                <span>{ data.useable_yn }</span>
                                <Link to={`update/${data.properties_id}`}>수정</Link>
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

