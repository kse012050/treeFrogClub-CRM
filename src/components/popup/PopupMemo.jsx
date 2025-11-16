import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';

export default function PopupMemo({ close, popup}) {
    const [boardList, setBoardList] = useState()

    useEffect(()=>{
        api("customer", "select_memo", { customer_id: popup.id })
            .then(({result, list})=>{
                if(result){
                    // setBoardList(()=>{
                    //     return list.map((listData, i )=>{
                    //         return {...listData, 'no': list.length - i}
                    //     })
                    // })
                    setBoardList(list)
                    // console.log(list);
                }
            })
    },[popup.id])

    return (
        <>
            <strong>메모 리스트</strong>
            <div className='boardBox'>
                <div>
                    <div className="board-top">
                        <span>메모내용</span>
                        <span>등록날짜</span>
                        <span>등록 담당자 이름</span>
                    </div>


                    { boardList && 
                        <ol className="board-center">
                            { boardList.map((data)=>(
                                <li key={data.memo_id}>
                                    <span>{ data.memo }</span>
                                    <span>{ data.reg_date }</span>
                                    <span>{ data.reg_admin_name }</span>
                                </li>
                            ))}
                        </ol>
                    }
                </div>
                <button className='btn-gray-white' onClick={close}>닫기</button>
            </div>
        </>
    );
}

