import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import PagerButton from '../PagerButton';
// import Pager from '../Pager';

export default function PopupSales({ close, func }) {
    // const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [listInfo, setListInfo] = useState({'limit': '10', 'page': '1'})
    const [salesList, setSalesList] = useState()
    const [pagerInfo, setPagerInfo] = useState()

    useEffect(()=>{
        api('user', 'list', listInfo)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setSalesList(list.filter((listData)=> listData.role_name.includes('영업')))
                }
            })
    },[])

    const salesSelect = (data) => {
        func(data);
        close();
    }

    return (
        <>
            <strong>사용자 선택</strong>   
            <div className='searchArea'>
                <input type="search" />
                <button>검색</button>
            </div>
            <div className='boardBox'>
                <b className='total'>{ salesList?.length }</b>
                <div className="board-top">
                    <span>이름</span>
                    <span>아이디</span>
                    <span>부서</span>
                    <span>직위</span>
                    <span></span>
                </div>

                { salesList && 
                    <ol className="board-center">
                        { salesList.map((data)=>(
                            <li key={ data.admin_id }>
                                <span>{ data.name }</span>
                                <span>{ data.id }</span>
                                <span>{ data.department_name }</span>
                                <span>직위</span>
                                <button type='button' className='point' onClick={()=>salesSelect(data)}>선택</button>
                            </li>
                        ))}
                    </ol>
                }

                <div className='board-pagination' data-styleidx='a'>
                    {/* <Pager pagerInfo={pagerInfo} setInputs={setInputs}/> */}
                    <PagerButton pagerInfo={pagerInfo} setInputs={setListInfo}/>
                </div>
            </div>
        </>
    );
}

