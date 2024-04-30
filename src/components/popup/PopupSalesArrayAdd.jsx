import React, { useEffect, useState } from 'react';
import { api } from '../../api/api';
import PagerButton from '../PagerButton';
import { inputChange } from '../../api/validation';
// import Pager from '../Pager';

export default function PopupSalesArrayAdd({ close, popup }) {
    // const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [listInfo, setListInfo] = useState({'limit': '5', 'page': '1', 'useable_yn': 'y'})
    const [salesList, setSalesList] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [searchInputs, setSearchInputs] = useState()
    const [selectList, setSelectList] = useState(popup.list)
    
    useEffect(()=>{
        api('user', 'list', listInfo)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    setPagerInfo(data)
                    // setSalesList(list.filter((listData)=> listData.role_name.includes('영업')))
                    setSalesList(list)
                }
            })
    },[listInfo])

    const salesSelect = (data) => {
        if(selectList.length < 6 || popup.limit === 'none'){
            setSelectList((select)=> {
                let copy = [...select];
                if(!copy.some((copyData) => copyData.admin_id === data.admin_id)){
                    copy = [...copy, data];
                }else{
                    copy = copy.filter((copyData) => copyData.admin_id !== data.admin_id)
                }
                return copy
            })
        }
    }

    const onSearch = (e) =>{
        e.preventDefault()
        setListInfo((data)=>({...data, 'page': '1', ...searchInputs}))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        popup.func(selectList);
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
                <b className='total'>{ pagerInfo?.total_count }</b>
                <div className="board-top">
                    <span>이름</span>
                    <span>아이디</span>
                    <span>부서</span>
                    {/* <span>직위</span> */}
                    <span></span>
                </div>

                { salesList && 
                    <ol className="board-center">
                        { salesList.map((data)=>(
                            <li key={ data.admin_id } className={selectList?.some((select) => select.admin_id === data.admin_id) ? 'active' : ''}>
                                <span>{ data.name }</span>
                                <span>{ data.id }</span>
                                <span>{ data.department_name }</span>
                                {/* <span>직위</span> */}
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
            { selectList?.length !== 0 &&
                <ul className='choice-horizontal scroll-width'>
                    { selectList.map((data)=>(
                        <li key={data.admin_id} className='icon-remove'>
                            { data.name }
                            { !popup.list.some((data2)=> data2.admin_id === data.admin_id) &&
                                <button 
                                    onClick={()=>setSelectList((select)=> select.filter((selectData)=>selectData.admin_id !== data.admin_id))}
                                >
                                    제거
                                </button>
                            }
                        </li>
                        ))
                    }
                </ul>
            }
            
            <div className='btnArea-end'>
                <button className='btn-gray-white' type='button' onClick={close}>취소</button>
                <input type="submit" className='btn-point' value='저장' onClick={onSubmit}/>
            </div>
        </>
    );
}

