import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
// import Pager from '../Pager';

export default function PopupAnalyst({ close, func }) {
    // const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [analystList, setAnalystList] = useState()
    // const [pagerInfo, setPagerInfo] = useState()

    useEffect(()=>{
        api('user', 'analyst_list')
            .then(({result,/*  data, */ list})=>{
                if(result){
                    // setPagerInfo(data)
                    setAnalystList(list)
                }
            })
    },[])

    const analystSelect = (data) => {
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
                <b className='total'>{ analystList?.length }</b>
                <div className="board-top">
                    <span>이름</span>
                    <span>아이디</span>
                    <span>부서</span>
                    <span>직위</span>
                    <span></span>
                </div>

                { analystList && 
                    <ol className="board-center">
                        { analystList.map((data)=>(
                            <li key={ data.admin_id }>
                                <span>{ data.name }</span>
                                <span>{ data.id }</span>
                                <span>{ data.department_name }</span>
                                <span>직위</span>
                                <button onClick={()=>analystSelect(data)}>선택</button>
                            </li>
                        ))}
                    </ol>
                }

                {/* <div className='board-pagination' data-styleidx='a'>
                    <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                </div> */}
            </div>
        </>
    );
}

