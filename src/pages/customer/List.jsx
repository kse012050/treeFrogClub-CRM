import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import { api } from '../../api/api';
import SelectBoard from '../../components/SelectBoard';
import BoardChkAll from '../../components/boardChk/BoardChkAll';
import BoardChk from '../../components/boardChk/BoardChk';
import BoardChkDelete from '../../components/boardChk/BoardChkDelete';
import Pager from '../../components/Pager';
import Popup from '../../components/popup/Popup';
import { inputChange, arrayChange, parentsChange } from '../../api/validation';


export default function List() {
    const [inputs, setInputs] = useState({'limit' : '10', 'page': '1'})
    const [searchInputs, setSearchInputs] = useState({'limit' : '10', 'page': '1'})
    const [searchCounsel, setSearchCounsel] = useState()
    const [searchClient, setSearchClient] = useState()
    const [boardList, setBoardList] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [popup, setPopup] = useState()
    const [sales, setSales] = useState()
    const [bureau, setBureau] = useState();

    useEffect(()=>{
        api('customer', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
        
        api('commoncode', 'properties_list', {'all_yn': 'y'})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setSearchCounsel(list)
                }
            })

            
        api('clientcode', 'properties_list', {'limit': '500'})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setSearchClient(list)
                }
            })
    },[inputs])

    const onDate = (dateString, parents, name) => {
        // console.log(dateString);
        // console.log(parents);
        // console.log(name);
        setSearchInputs((input)=>({...input, [parents]: {...input[parents], [name]: dateString}}))
    };

    const onSearch = (e) => {
        e.preventDefault()
        // console.log(searchInputs);
        api('customer', 'list', searchInputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    }

    const onReset = ()=>{
        setSales()
        setBureau()
        setSearchInputs({'limit': '10', 'page': '1'})
    }

    return (
        <>
            <h2>
                통합 고객 목록
                <Link to={'/customer/registration'} className='btn-point'>추가</Link>
            </h2>

            <DropBox title="검색 항목" arrow>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="customer_name">고객명</label>
                                <div>
                                    <input type="text" name='customer_name' id='customer_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="customer_mobile">휴대폰</label>
                                <div>
                                    <input type="text" name='customer_mobile' id='customer_mobile' data-formet="numb" onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="site">사이트</label>
                                <div>
                                    <input type="text" name='site' id='site' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">영업담당자</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={sales || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'sales',
                                            'func': (data)=>{
                                                setSearchInputs((input)=>({...input, 'sales_admin_id': data.admin_id}))
                                                setSales(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={bureau || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'bureau',
                                            'func': (data)=>{
                                                setSearchInputs((input)=>({...input, 'department_id': data.department_id}))
                                                setBureau(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="source">출처</label>
                                <div>
                                    <input type="text" name='source' id='source' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객구분</label>
                                <div>
                                    <Select type={'customer'} current={searchInputs?.customer_properties_id || false} changeName='customer_properties_id' setInputs={setSearchInputs}/>
                                </div>
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="">고객 상세구분</label>
                                <div>
                                    <input type="checkbox" />
                                    <label htmlFor="">무료회원(체험중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">무료회원(체험완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP회원(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP회원(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP회원(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP회원(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">소액투자반(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">소액투자반(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">교육(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">교육(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">S클럽(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">S클럽(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불방어매출(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불방어매출(이용완료)</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">상담상태</label>
                                { searchCounsel && 
                                    <div>
                                        { searchCounsel.map((data)=>
                                            <span key={data.properties_id}>
                                                <input type="checkbox" name='counsel_properties_id_list' id={`counsel_properties_id_list_${data.properties_id}`} value={data.properties_id} onChange={(e)=>arrayChange(e, setSearchInputs)}/>
                                                <label htmlFor={`counsel_properties_id_list_${data.properties_id}`}>{ data.properties_id }{ data.name }</label>
                                            </span>
                                        )}
                                    </div>
                                }
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" name='experience_search_type' id='experience_search_type_start' data-parents='experience_date_info' data-name='search_type' value='start' onChange={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="experience_search_type_start">시작일 검색</label>
                                    <input type="radio" name='experience_search_type' id='experience_search_type_end' data-parents='experience_date_info' data-name='search_type' value='end' onChange={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="experience_search_type_end">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_date_info', 'start_date')} value={searchInputs?.experience_date_info?.start_date ? dayjs(searchInputs?.experience_date_info?.start_date) : ''} disabled={!searchInputs?.experience_date_info}/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_date_info', 'end_date')} value={searchInputs?.experience_date_info?.end_date ? dayjs(searchInputs?.experience_date_info?.end_date) : ''} disabled={!searchInputs?.experience_date_info}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" name='payment_search_type' id='payment_search_type_start' data-parents='payment_date_info' data-name='search_type' value='start' onChange={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="payment_search_type_start">시작일 검색</label>
                                    <input type="radio" name='payment_search_type' id='payment_search_type_end' data-parents='payment_date_info' data-name='search_type' value='end' onChange={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="payment_search_type_end">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date_info', 'start_date')} value={searchInputs?.payment_date_info?.start_date ? dayjs(searchInputs?.payment_date_info?.start_date) : ''} disabled={!searchInputs?.payment_date_info} />
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date_info', 'end_date')} value={searchInputs?.payment_date_info?.end_date ? dayjs(searchInputs?.payment_date_info?.end_date) : ''} disabled={!searchInputs?.payment_date_info} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">최초 등록일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'start_date')} value={searchInputs?.reg_date_info?.start_date ? dayjs(searchInputs?.reg_date_info?.start_date) : ''}/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'end_date')} value={searchInputs?.reg_date_info?.end_date ? dayjs(searchInputs?.reg_date_info?.end_date) : ''}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">신청 애널리스트</label>
                                <div>
                                    <Select type={'analyst'} current={searchInputs?.analyst_admin_id || false} changeName='analyst_admin_id' setInputs={setSearchInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">상품명</label>
                                <Select name={'customer'} />
                            </li>
                            <li>
                                <label htmlFor="">SMS 거부 요청</label>
                                <Select name={'customer'} />
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="reset" value="초기화" className='btn-gray-white' onClick={onReset}/>
                        <input type="submit" value="검색" className='btn-point' onClick={onSearch}/>
                    </div>
                </form>
            </DropBox>

            <div className='boardBox'>
                <strong>목록</strong>
                <button className='btn-gray-black'>엑셀 다운로드</button>
                <button className='btn-gray-black'>중복고객 삭제</button>
                <button className='btn-gray-black'>검색고객 삭제</button>
                <button className='btn-gray-black'>검색고객 수신거부</button>
                <Link to={'modify'} className='btn-gray-black'>대량고객수정</Link>
                { searchClient && 
                    <ul>
                        { searchClient.map((data)=>
                            <li key={data.properties_id} style={{'--color': data.bg_color }}>{ data.name }</li>    
                        )}
                    </ul>
                }
                {/* <ul>
                    <li>무료회원</li>
                    <li>VIP회원</li>
                    <li>VVIP회원</li>
                    <li>소액투자반</li>
                    <li>교육</li>
                    <li>S클럽</li>
                    <li>환불방어매출</li>
                </ul> */}
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b>
                <Select />
                <Select />
                <button className='btn-gray-black'>선택 변경</button>
                <BoardChkDelete url='commoncode' idName='properties_id_list' deleteList={deleteList} setDeleteList={setDeleteList} className='boundary'/>
                <button className='btn-gray-black'>선택 수신거부</button>
                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({customer_id})=>customer_id)} />
                    <button>No.</button>
                    <button>휴대폰</button>
                    <button>이름</button>
                    <button>담당자</button>
                    <button>고객구분</button>
                    <button>상담상태</button>
                    <button>무료체험<br/>시작일</button>
                    <button>무료체험<br/>종료일</button>
                    <button>유료<br/>시작일</button>
                    <button>유료<br/>종료일</button>
                    <span>보기</span>
                </div>
                
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=> (
                            <li key={ data.customer_id }>
                                <BoardChk id={data.customer_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.customer_id }</span>
                                <span>{ data.customer_mobile }</span>
                                <span>{ data.customer_name }</span>
                                <SelectBoard type='sales' current={data?.sales_admin_id} /* setInputs={setInputs} */ changeName='sales_admin_id'/>
                                <span>{ data.customer_properties_name }</span>
                                <SelectBoard type='counsel' current={data?.counsel_properties_id} /* setInputs={setInputs} */ changeName='counsel_properties_id'/>
                                <time>{ data.experience_ing_yn === 'y' ? data.experience_start_date : ''}</time>
                                <time>{ data.experience_ing_yn === 'y' ? data.experience_end_date : ''}</time>
                                <time>{ data.standard_payment_start_date }</time>
                                <time>{ data.standard_service_end_date }</time>
                                <Link to={`/customer/registration/update/${data.customer_id}`}>보기</Link>
                            </li>
                        ))}
                    </ol>
                }

                <div className='board-pagination' data-styleidx='a'>
                    <Select type="pagerCount" current={searchInputs.limit} setInputs={setInputs} changeName='limit'/>
                    <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                </div>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

