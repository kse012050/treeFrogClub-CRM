import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import DropBox from '../../components/DropBox';
import Select from '../../components/Select';
import { api } from '../../api/api';
import { arrayChange, inputChange, numberWithCommas, onSort, parentsChange } from '../../api/validation';
import Popup from '../../components/popup/Popup';
import SelectPage from '../../components/SelectPage';
import PagerButton from '../../components/PagerButton';
import { logButton, logExcel } from '../../api/common';
import UpdatePopup from './UpdatePopup';

export default function List() {
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()
    const [searchInputs, setSearchInputs] = useState()
    const [sales, setSales] = useState()
    const [bureau, setBureau] = useState()
    const [summary, setSummary] = useState()
    const [analyst, setAnalyst] = useState()
    const [salesList, setSalesList] = useState()
    const [refundList, setRefundList] = useState()
    const [excelDownloadLink, setExcelDownloadLink] = useState()
    const [popup, setPopup] = useState()
    const [updatePopupActive, setUpdatePopupActive] = useState()

    const currentSettings = useCallback(() =>{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        setSearchInputs({'payment_date_info': {'start_date': `${year}-${month}-${1}`, 'end_date': `${year}-${month}-${day}`}})
    },[])

    const currentData = useCallback(()=>{
        // console.log(inputs);
        api('payment', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(data);
                    setPagerInfo(data)
                    setSummary(data)
                    // setBoardList(list)
                    setBoardList(()=>{
                        return list.map((listData, i )=>{
                            return {...listData, 'no': inputs.limit * (data.current_page - 1) + i + 1}
                        })
                    })
                    // console.log(list);
                }
            })
    },[inputs])

    useEffect(()=>{
        if(inputs){
            currentData()
        }
    },[currentData, inputs])

    useEffect(()=>{
        currentSettings()
    },[currentSettings])



    useEffect(()=>{
        api('payment', 'list', {'excel_info': {'download_yn': 'y'}})
            .then(({result, data: {download_url}})=>{
                if(result){
                    setExcelDownloadLink(download_url)
                }
            })

        
        api('properties', 'properties_list', {'classification_id': '3'})
                .then(({result, list})=>{
                    if(result){
                        // console.log('매출', list);
                        setSalesList(list)
                    }
                })
                
                
        api('properties', 'properties_list', {'classification_id': '5'})
            .then(({result, list})=>{
                if(result){
                    // console.log('환불', list);
                    setRefundList(list)
                }
            })
        
    },[])

    

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

    const onReset = () => {
        setAnalyst()
        setSales()
        setBureau()
        currentSettings()
        setInputs((input)=>({'limit': input.limit, 'page': '1'}))
        setSearchInputs({})
        logButton('결제 목록(검색)')
    }

    const onSearch = (e) => {
        e.preventDefault();
        console.log(searchInputs);
        // setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
        // logButton('결제 목록(검색 초기화)')
    }

  


    return (
        <>
            <h2>
                결제 목록
                <Link to="registration" className='btn-point'>대량결제 등록</Link>
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
                                    <input type="text" name='customer_mobile' id='customer_mobile' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="source">출처</label>
                                <div>
                                    <input type="text" name='source' id='source' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="analyst_admin_id">애널리스트</label>
                                <div className='resetArea'>
                                    <div>
                                        <input 
                                            type="search" 
                                            value={analyst || ''}
                                            readOnly
                                            onClick={()=>setPopup({
                                                'type': 'analyst',
                                                'func': (data)=>{
                                                    setSearchInputs((input)=>({...input, 'analyst_admin_id': data.admin_id}))
                                                    setAnalyst(data.name)
                                                }
                                            })}
                                        />
                                        <button>검색</button>
                                    </div>
                                    <button type='button' onClick={()=>{
                                        setSearchInputs((input)=>({...input, 'analyst_admin_id': ''}))
                                        setAnalyst('')
                                    }}>애널리스트 초기화</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">영업담당자</label>
                                <div className='resetArea'>
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
                                    <button type='button' onClick={()=>{
                                        setSearchInputs((input)=>({...input, 'sales_admin_id': ''}))
                                        setSales('')
                                    }}>영업담당자 초기화</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div className='resetArea'>
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
                                    <button type='button' onClick={()=>{
                                        setSearchInputs((input)=>({...input, 'department_id': ''}))
                                        setBureau('')
                                    }}>부서 초기화</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제상품</label>
                                <div>
                                    <Select type='product' current={searchInputs?.product_id || false} changeName='product_id' setInputs={setSearchInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제방식</label>
                                <div>
                                    <Select type={'paymentProperties'} current={searchInputs?.payment_properties_id || false} changeName='payment_properties_id' setInputs={setSearchInputs}/>
                                </div>
                            </li>
                        </ul>  
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">결제일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'payment_date_info', 'start_date')} value={searchInputs?.payment_date_info?.start_date ? dayjs(searchInputs?.payment_date_info?.start_date) : ''} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'payment_date_info', 'end_date')} value={searchInputs?.payment_date_info?.end_date ? dayjs(searchInputs?.payment_date_info?.end_date) : ''} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제 기준 검색</label>
                                <div>
                                    <input type="radio" name='service_date_info_by_payment' id='service_date_info_by_payment_start' data-parents='service_date_info_by_payment' data-name='search_type' value='start' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="service_date_info_by_payment_start">시작일 검색</label>
                                    <input type="radio" name='service_date_info_by_payment' id='service_date_info_by_payment_end' data-parents='service_date_info_by_payment' data-name='search_type' value='end' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="service_date_info_by_payment_end">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'service_date_info_by_payment', 'start_date')} onBlur={(e)=>onDateBlur(e, 'service_date_info_by_payment', 'start_date')} value={searchInputs?.service_date_info_by_payment?.start_date ? dayjs(searchInputs?.service_date_info_by_payment?.start_date) : ''} disabled={!searchInputs?.service_date_info_by_payment} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'service_date_info_by_payment', 'end_date')} onBlur={(e)=>onDateBlur(e, 'service_date_info_by_payment', 'end_date')} value={searchInputs?.service_date_info_by_payment?.end_date ? dayjs(searchInputs?.service_date_info_by_payment?.end_date) : ''} disabled={!searchInputs?.service_date_info_by_payment} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">서비스기간 포함 검색</label>
                                <div>
                                    <input type="radio" name='service_date_info' id='service_date_info_start' data-parents='service_date_info' data-name='search_type' value='start' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="service_date_info_start">시작일 검색</label>
                                    <input type="radio" name='service_date_info' id='service_date_info_end' data-parents='service_date_info' data-name='search_type' value='end' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="service_date_info_end">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'service_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'service_date_info', 'start_date')} value={searchInputs?.service_date_info?.start_date ? dayjs(searchInputs?.service_date_info?.start_date) : ''} disabled={!searchInputs?.service_date_info} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'service_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'service_date_info', 'end_date')} value={searchInputs?.service_date_info?.end_date ? dayjs(searchInputs?.service_date_info?.end_date) : ''} disabled={!searchInputs?.service_date_info} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">매출구분 <span>복수 선택 가능</span></label>
                                { salesList && 
                                    <div>
                                        { salesList.map((data)=>
                                            <span key={data.properties_id}>
                                                <input type="checkbox" name='sales_properties_id_list' id={`sales_properties_id_list_${data.properties_id}`} value={data.properties_id} onChange={(e)=>arrayChange(e, setSearchInputs)}/>
                                                <label htmlFor={`sales_properties_id_list_${data.properties_id}`}>{ data.name }</label>
                                            </span>
                                        )}
                                    </div>
                                }
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">환불구분 <span>복수 선택 가능</span></label>
                                { refundList && 
                                    <div>
                                        { refundList.map((data)=>
                                            <span key={data.properties_id}>
                                                <input type="checkbox" name='refund_properties_id_list' id={`refund_properties_id_list_${data.properties_id}`} value={data.properties_id} onChange={(e)=>arrayChange(e, setSearchInputs)}/>
                                                <label htmlFor={`refund_properties_id_list_${data.properties_id}`}>{ data.name }</label>
                                            </span>
                                        )}
                                    </div>
                                }
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="">매출구분</label>
                                <div>
                                    <input type="radio" name='refund_collect_type' id='refund_collect_type_refund' value='refund' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                    <label htmlFor="refund_collect_type_refund">환불일 기준</label>
                                    <input type="radio" name='refund_collect_type' id='refund_collect_type_payment' value='payment' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                    <label htmlFor="refund_collect_type_payment">초기결제일 기준</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <input type="reset" value="초기화" className='btn-gray-white' onClick={onReset}/>
                        <input type="submit" value="검색" className='btn-point' onClick={onSearch}/>
                    </div>
                </form>
            </DropBox>

            {/* <Board boardList={boardList} setBoardList={setBoardList}/> */}

            <div className='boardBox'>
                <strong>목록</strong>
                <Link 
                    to={excelDownloadLink} 
                    className='btn-gray-black'
                    onClick={()=>logExcel(`결제 목록 - 엑셀 다운로드`)}
                >
                    엑셀 다운로드
                </Link>
                <hr className='case01'/>

                <table className='board-table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>결제건수</th>
                            <th>결제합계금액</th>
                            <th>취소건수</th>
                            <th>취소금액</th>
                            <th>총매출금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>2023년 10월</b></td>
                            <td>{ summary?.total_payment_count }</td>
                            <td>{ numberWithCommas(summary?.total_payment_price) }원</td>
                            <td>{ summary?.total_refund_count }</td>
                            <td>{ numberWithCommas(summary?.total_refund_price) }원</td>
                            <td><mark>{ numberWithCommas(summary?.total_sales_price) }원</mark></td>
                        </tr>
                    </tbody>
                </table>

                
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>

                <div className="board-scroll">
                    <div className="board-top">
                        <button onClick={()=>onSort(setBoardList, 'no')}>No.</button>
                        <button onClick={()=>onSort(setBoardList, 'payment_id')}>결제번호</button>
                        <button onClick={()=>onSort(setBoardList, 'customer_mobile')}>휴대폰</button>
                        <button onClick={()=>onSort(setBoardList, 'customer_name')}>이름</button>
                        <button onClick={()=>onSort(setBoardList, 'source')}>출처</button>
                        <button onClick={()=>onSort(setBoardList, 'payment_person_in_charge_name')}>담당자</button>
                        <button onClick={()=>onSort(setBoardList, 'department_name')}>부서</button>
                        <button onClick={()=>onSort(setBoardList, 'payment_date')}>결제일</button>
                        <button onClick={()=>onSort(setBoardList, 'product_name')}>결제상품</button>
                        <button onClick={()=>onSort(setBoardList, 'payment_properties_name')}>결제방식</button>
                        <button onClick={()=>onSort(setBoardList, 'payment_price')}>결제금액</button>
                        <button onClick={()=>onSort(setBoardList, 'refund_date')}>환불일</button>
                        <button onClick={()=>onSort(setBoardList, 'refund_price')}>환불금액</button>
                        <span>결제기록</span>
                        <div title='결제기준'>
                            <button>시작일</button>
                            <button>종료일</button>
                        </div>
                        <div title='서비스 기간 포함'>
                            <button>시작일</button>
                            <button>종료일</button>
                        </div>
                    </div>
                    { boardList && 
                        <ol className="board-center">
                            { boardList.map((data, i)=>(
                                <li key={i}>
                                    <span>{ data.no }</span>
                                    <button className='popup' onClick={()=>setUpdatePopupActive({'type': 'children', 'id': data.payment_id})}>{ data.payment_id }</button>
                                    <span>{ data.customer_mobile }</span>
                                    <span>{ data.customer_name }</span>
                                    <span>{ data.source }</span>
                                    <span>{ data.payment_person_in_charge_name }</span>
                                    <span>{ data.department_name }</span>
                                    <time>{ data.payment_date }</time>
                                    <span>{ data.product_name }</span>
                                    <span>{ data.payment_properties_name}</span>
                                    <span>{ data.payment_price ? numberWithCommas(data.payment_price) : '0' }</span>
                                    <time>{ data.refund_date }</time>
                                    <span>{ data.refund_price ? numberWithCommas(data.refund_price) : '0' }</span>
                                    <button 
                                        className='popup'
                                        onClick={()=>setPopup({
                                            'type': 'payHistory',
                                            'id': data.customer_id
                                        })}
                                    >
                                        { data.payment_chasu }
                                            회차 결제
                                    </button>
                                    <div>
                                        <span>{ data.standard_payment_start_date }</span>
                                        <span>{ data.standard_payment_end_date }</span>
                                    </div>
                                    <div>
                                        <span>{ data.standard_service_start_date }</span>
                                        <span>{ data.standard_service_end_date }</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    }
                </div>

                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                }
            </div>

            
            { updatePopupActive &&
                <UpdatePopup updatePopupActive={updatePopupActive} setUpdatePopupActive={setUpdatePopupActive} currentData={currentData}/>
            }
            
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}
