import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/api';
import SubTitle from '../../components/SubTitle';
import Pager from '../../components/Pager';
import SelectPage from '../../components/SelectPage';

export default function Notice() {
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [boardList, setBoardList] = useState()
    const [pagerInfo, setPagerInfo] = useState()

    useEffect(()=>{
        api('board', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    },[inputs])

    useEffect(()=>{
        setInputs((input)=>({...input, 'page': '1'}))
    },[inputs.limit])

    return (
        <>
            <SubTitle text="공지사항" link="registration" />

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case03'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
            
                <div className="board-top">
                    <span>등록일자</span>
                    <span>제목</span>
                    <span>열람범위</span>
                    <span>작성자</span>
                    <span>보기</span>
                </div>

                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.board_id }>
                                <span>{ data.reg_date }</span>
                                <span>{ data.title }</span>
                                <span>{ data.scope_of_access }</span>
                                <span>{ data.write_name }</span>
                                <Link to={`update/${data.board_id}`}>보기</Link>
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
        </>
    );
}