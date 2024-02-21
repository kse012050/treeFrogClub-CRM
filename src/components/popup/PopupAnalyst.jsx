import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import PagerButton from '../PagerButton';
import { inputChange } from '../../api/validation';
// import Pager from '../Pager';

export default function PopupAnalyst({ close, func }) {
    const [searchInputs, setSearchInputs] = useState();
    const [listInfo, setListInfo] = useState({'limit': '10', 'page': '1'})
    const [analystList, setAnalystList] = useState()
    const [pagerInfo, setPagerInfo] = useState()

    useEffect(()=>{
        api('user', 'analyst_list',listInfo)
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setAnalystList(list)
                }
            })
    },[listInfo])

    const analystSelect = (data) => {
        func(data);
        close();
    }

    const onSearch = (e) =>{
        e.preventDefault();
        // console.log({'limit': '10', 'page': '1', ...searchInputs});
        api('user', 'analyst_list', {'limit': '10', 'page': '1', ...searchInputs})
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    setAnalystList(list)
                }
            })
    }

    return (
        <>
            <strong>사용자 선택</strong>   
            <form className='searchArea'>
                <input type="search" name='search' id='search' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                <button onClick={onSearch}>검색</button>
            </form>
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
                                <button onClick={()=>analystSelect(data)} className='point'>선택</button>
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

