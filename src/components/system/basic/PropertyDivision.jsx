import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api'


export default function PropertyDivision() {
    const [list, setList] = useState([])
    const [listActive, setListActive] = useState()
    useEffect(()=>{
        api('properties', 'classification_list')
            .then(({result, list}) => {
                if(result){
                    setList(list);
                    setListActive(list[0].classification_id)
                }
            })
    },[])

    return (
        <div className='divisionArea horizontalTwo'>
            <div>
                {list.map(({classification_id, name, properties_count})=>
                    <button key={classification_id} className={classification_id === listActive ? 'active' : ''} onClick={()=>setListActive(classification_id)}>
                        {name} ({properties_count})
                    </button>
                )}
            </div>
            <div className='boardBox'>
                <b>결제 구분 (6)</b>
                <button className='btn-gray-black'>추가</button>
                <button className='btn-gray-black'>선택 삭제</button>

                <div className='board-top'>
                    <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div>
                    <span>구분값</span>
                    <span>수정</span>
                </div>
                <ol className="board-center">
                    <li>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor=""></label>
                        </div>
                        <span>카드/현금 분할결제</span>
                        <button className="popup">수정</button>
                    </li>
                </ol>
            </div>
        </div>
    );
}

