import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';
import { ColorPicker } from 'antd';
import Select from '../../../components/Select';
import SubTitle from '../../../components/SubTitle';
import BoardChkDelete from '../../../components/boardChk/BoardChkDelete';
import BoardChk from '../../../components/boardChk/BoardChk';
import BoardChkAll from '../../../components/boardChk/BoardChkAll';

export default function Client() {
    const [pager, setPager] = useState({'limit': 10});
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [deleteList, setDeleteList] = useState([])

    useEffect(()=>{
        if(pager || !deleteList.length){
            api('clientcode', 'properties_list', pager)
                .then(({result, data, list})=>{
                    if(result){
                        console.log(list);
                        setPagerInfo(data)
                        setBoardList(list)
                    }
                })
        }
    },[pager, deleteList, setBoardList])

    return (
        <>
            <SubTitle text="고객 구분 관리" link="registration" />

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case03'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <BoardChkDelete url='commoncode' idName='properties_id_list' deleteList={deleteList} setDeleteList={setDeleteList}/>
            
                <div className="board-top">
                    <BoardChkAll deleteList={setDeleteList} list={boardList?.map(({properties_id})=>properties_id)} />
                    <button>분류유형</button>
                    <button>고객등급</button>
                    <button>코드</button>
                    <button>코드명</button>
                    <button>배경색상</button>
                    <button>폰트색상</button>
                    <button>정렬순서</button>
                    <button>사용여부</button>
                    <span>수정</span>
                </div>

                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.properties_id }>
                                <BoardChk id={data.properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.classification_name }</span>
                                <span>{ data.grade }</span>
                                <span>{ data.name }</span>
                                <span>{ data.code }</span>
                                <div style={{'--color': `${data.bg_color}`}}>{ data.bg_color }</div>
                                <div>
                                    <ColorPicker showText />
                                </div>
                                <span>{ data.order_number }</span>
                                <span>{ data.useable_yn }</span>
                                <Link to={`update/${data.properties_id}`}>수정</Link>
                            </li>
                        ))}
                    </ol>
                }

                <div className='board-pagination' data-styleidx='a'>
                    <Select name="pagerCount"/>
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
        </>
    );
}

