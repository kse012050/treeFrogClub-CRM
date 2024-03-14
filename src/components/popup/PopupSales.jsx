import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import PagerButton from '../PagerButton';
import { inputChange } from '../../api/validation';
// import Pager from '../Pager';

export default function PopupSales({ close, func, department_id }) {
    // const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [listInfo, setListInfo] = useState({'limit': '10', 'page': '1'})
    const [salesList, setSalesList] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [searchInputs, setSearchInputs] = useState()

    useEffect(()=>{
        // console.log(department_id);
        api('user', 'list', {...listInfo, 'department_id': department_id})
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    // setSalesList(list.filter((listData)=> listData.role_name.includes('영업')))
                    setSalesList(list)
                }
            })
    },[listInfo, department_id])

    const onSearch = (e) =>{
        e.preventDefault()
        api('user', 'list', {...listInfo, ...searchInputs})
            .then(({result, data, list})=>{
                if(result){
                    setPagerInfo(data)
                    // setSalesList(list.filter((listData)=> listData.role_name.includes('영업')))
                    setSalesList(list)
                }
            })
    }

    const salesSelect = (data) => {
        func(data);
        close();
    }

    return (
        <>
            <strong>사용자 선택</strong>   
            <form className='searchArea'>
                <input type="search" name='name' id='name' onChange={(e)=>inputChange(e, setSearchInputs)} placeholder='사용자명 검색'/>
                <button onClick={onSearch}>검색</button>
            </form>
            <div className='boardBox'>
                <b className='total'>{ salesList?.length }</b>
                <div className="board-top">
                    <span>이름</span>
                    <span>아이디</span>
                    <span>부서</span>
                    <span></span>
                </div>

                { salesList && 
                    <ol className="board-center">
                        { salesList.map((data)=>(
                            <li key={ data.admin_id }>
                                <span>{ data.name }</span>
                                <span>{ data.id }</span>
                                <span>{ data.department_name }</span>
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

