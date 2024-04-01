import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import DropBox from '../../../components/DropBox';
import { api } from '../../../api/api';
import SelectPage from '../../../components/SelectPage';
import PagerButton from '../../../components/PagerButton';
import { arrayChange, inputChange, onSort } from '../../../api/validation';
import { logButton } from '../../../api/common';
import Popup from '../../../components/popup/Popup';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Delete() {
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1', 'delete_select_yn': 'y'})
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [searchInputs, setSearchInputs] = useState({})
    const [searchCounsel, setSearchCounsel] = useState()
    const [sales, setSales] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        if(pagePermission?.select_yn && pagePermission?.select_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.select_yn, navigate])

    useEffect(()=>{
        api('commoncode', 'properties_list', {'all_yn': 'y'})
                .then(({result, list})=>{
                    if(result){
                        // console.log(list);
                        setSearchCounsel(list)
                    }
                })
    },[])

    useEffect(()=>{
        api('customer', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    },[inputs])

    const onDate = (dateString, parents, name) => {
        // console.log(dateString);
        // console.log(parents);
        // console.log(name);
        setSearchInputs((input)=>({...input, [parents]: {...input[parents], [name]: dateString}}))
    };

    const onDateBlur = (e, parents, name) => {
        let value = e.target.value.replace(/-/g, "");
        if(/^\d+$/.test(value) && value.length < 9){
            if((0 < value && value < 13)){
                value = `2000-${value}-01`
            }else if(value === '0'){
                value = `2000-01-01`
            }else if(value.length === 2){
                value = `20${value}-01-01`
            }else if(value.length === 3){
                value = `2${value}-01-01`
            }else if(value.length === 4){
                value = `${value}-01-01`
            }else{
                const year = value.substring(0, 4)
                let month = value.substring(4, 6)
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = value.substring(6, 8)
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : 0 + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, parents, name)
        }
    };

    const onReset = ()=>{
        setInputs((input)=>({'limit': input.limit, 'page': '1', 'delete_select_yn': 'y'}))
        setSearchInputs({})
        setSales()
        logButton('고객삭제이력(검색 초기화)')
    }

    const onSearch = (e) => {
        e.preventDefault()
        // console.log(searchInputs);
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
        logButton('고객삭제이력(검색)')
    }

    return (
        <>
            <h2>고객삭제이력</h2>

            <DropBox title="검색 항목" arrow>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="customer_name">이름</label>
                                <div>
                                    <div>
                                    <input type="text" name='customer_name' id='customer_name' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="customer_mobile">휴대폰</label>
                                <div>
                                    <div>
                                    <input type="text" name='customer_mobile' id='customer_mobile' data-formet="numb" onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="source">출처</label>
                                <div>
                                    <div>
                                        <input type="text" name='source' id='source' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="delete_admin_id">삭제자</label>
                                <div className='resetArea'>
                                    <div>
                                        <input 
                                            type="search" 
                                            value={sales || ''}
                                            readOnly
                                            onClick={()=>setPopup({
                                                'type': 'sales',
                                                'func': (data)=>{
                                                    setSearchInputs((input)=>({...input, 'delete_admin_id': data.admin_id}))
                                                    setSales(data.name)
                                                }
                                            })}
                                        />
                                        <button>검색</button>
                                    </div>
                                    <button type='button' onClick={()=>{
                                        setSearchInputs((input)=>({...input, 'delete_admin_id': ''}))
                                        setSales('')
                                    }}>삭제자 초기화</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">삭제일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'delete_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'delete_date_info', 'start_date')} value={searchInputs?.delete_date_info?.start_date ? dayjs(searchInputs?.delete_date_info?.start_date) : ''} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'delete_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'delete_date_info', 'end_date')} value={searchInputs?.delete_date_info?.end_date ? dayjs(searchInputs?.delete_date_info?.end_date) : ''} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">최초등록일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'reg_date_info', 'start_date')} value={searchInputs?.reg_date_info?.start_date ? dayjs(searchInputs?.reg_date_info?.start_date) : ''} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'reg_date_info', 'end_date')} value={searchInputs?.reg_date_info?.end_date ? dayjs(searchInputs?.reg_date_info?.end_date) : ''} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">상담상태</label>
                                { searchCounsel && 
                                    <div>
                                        { searchCounsel.map((data)=>
                                            <span key={data.properties_id}>
                                                <input type="checkbox" name='counsel_properties_id_list' id={`counsel_properties_id_list_${data.properties_id}`} value={data.properties_id} onChange={(e)=>arrayChange(e, setSearchInputs)}/>
                                                <label htmlFor={`counsel_properties_id_list_${data.properties_id}`}>{ data.name }</label>
                                            </span>
                                        )}
                                    </div>
                                }
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
                <hr className='case01'/>
                {/* <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b> */}
                
                <div className="board-top">
                    <button onClick={()=>onSort(setBoardList, 'del_date')}>삭제일시</button>
                    <button>삭제자</button>
                    <button onClick={()=>onSort(setBoardList, 'customer_name')}>이름</button>
                    <button onClick={()=>onSort(setBoardList, 'customer_mobile')}>휴대폰</button>
                    <button onClick={()=>onSort(setBoardList, 'customer_properties_name')}>고객구분</button>
                    <button onClick={()=>onSort(setBoardList, 'sales_admin_name')}>담당자</button>
                    <button onClick={()=>onSort(setBoardList, 'experience_start_date')}>무료체험 시작일</button>
                    <button onClick={()=>onSort(setBoardList, 'experience_end_date')}>무료체험 종료일</button>
                    <button onClick={()=>onSort(setBoardList, 'reg_date')}>등록일시</button>
                </div>
                
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.customer_id }>
                                <span>{ data.del_date.split(' ')[0].replaceAll('-','/') }</span>
                                <span>{ data.del_admin_name }</span>
                                <span>{ data.customer_name }</span>
                                <span>{ data.customer_mobile }</span>
                                <span>{ data.customer_properties_name }</span>
                                <span>{ data.sales_admin_name }</span>
                                <span>{ data.experience_start_date }</span>
                                <span>{ data.experience_end_date }</span>
                                <span>{ data.reg_date.split(' ')[0].replaceAll('-','/') }</span>
                            </li>
                        ))}
                    </ol>
                }
          
                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                }
            </div>

            
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

