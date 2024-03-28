import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import Popup from '../../components/popup/Popup';
import { inputChange, arrayChange, parentsChange, onSort } from '../../api/validation';
import SelectPage from '../../components/SelectPage';
import PagerButton from '../../components/PagerButton';
import { logButton } from '../../api/common';
import { UserContext } from '../../context/UserContext';


export default function List() {
    const { user, pagePermission } = useContext(UserContext)
    // console.log(pagePermission);
    // console.log(user?.admin_id);
    const [currentInputs, setCurrentInputs] = useState()
    const [inputs, setInputs] = useState()
    const [searchInputs, setSearchInputs] = useState()
    const [searchCounsel, setSearchCounsel] = useState()
    const [searchClient, setSearchClient] = useState()
    const [searchId, setSearchId] = useState()
    const [isSearch, setIsSearch] = useState(false)
    const [boardList, setBoardList] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [deleteList, setDeleteList] = useState([])
    const [popup, setPopup] = useState()
    const [sales, setSales] = useState()
    const [bureau, setBureau] = useState()
    const [customerList, setCustomerList] = useState('영업담당자')
    const [customerListInputs, setCustomerListInputs] = useState()
    const [duplicateMobile, setDuplicateMobile] = useState()

    useEffect(()=>{
        api('commoncode', 'properties_list', {'all_yn': 'y'})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setSearchCounsel(list)
                }
            })
            
        api('clientcode', 'properties_list', {"all_yn": "y"})
            .then(({result, list})=>{
                if(result){
                    // console.log(list);
                    setSearchClient(list)
                }
            })

    },[])

    useEffect(()=>{
        if(user && pagePermission?.modify_type){
            // console.log(pagePermission);
            // console.log(user);
            if(pagePermission?.modify_type === 'me'){
                setCurrentInputs({'sales_admin_id': user?.admin_id })
                setSales(user?.name)
            }else if(pagePermission?.modify_type === 'department'){
                setCurrentInputs({'department_id': user.department_info.department_id })
                setBureau(user.department_info.name)

            }else{
                setCurrentInputs({})
            }
        }
    },[user, pagePermission])

    const currentSettings = useCallback(()=>{
        if(currentInputs){
            api('constant', 'combine_customer_setting_info')
                .then(({result, data})=>{
                    if(result){
                        const obj = {}
                        // console.log(data);
                        obj.limit = data.combine_customer_list_number
                        obj.page = '1'
                        // console.log(obj);
                        setDuplicateMobile(data.combine_customer_duplicate_mobile_color_mark_yn)
                        setInputs({...currentInputs, ...obj})
                        // setInputs(obj)
                        // console.log(currentInputs);
                    }
                })
        }
    },[currentInputs])

    useEffect(()=>{
        currentSettings()
    },[currentSettings])


    const currentData = useCallback(()=>{
        // console.log(inputs);
        if(inputs && currentInputs){
            console.log(currentInputs);
            api('customer', 'list', {...inputs, ...currentInputs})
                .then(({result, data, list})=>{
                    if(result){
                        // console.log(data);
                        // console.log(list);
                        setPagerInfo(data)
                        setBoardList(list)
                    }
                })
        }
    },[inputs, currentInputs])
  
    useEffect(()=>{
        currentData()
    },[currentData])


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
    
    const onCustomerDetail = (e) =>{
        const { /* name, */ value, checked } = e.target
        if(checked){
            setSearchInputs((input)=>{
                let arr = []
                if(input.customer_properties_id_list){
                    arr = [...input.customer_properties_id_list]
                }
                arr.push(value)
                return {...input, 'customer_properties_id_list': arr}
            })
        }else{
            setSearchInputs((input)=>{
                let arr = [...input.customer_properties_id_list].filter((data)=> data !== value)
                return {...input, 'customer_properties_id_list': arr}
            })
        }
        // console.log(name);
        // console.log(value);
        // console.log(checked);
    }

    const onSearch = (e) => {
        e.preventDefault()
        // console.log(currentInputs);
        setInputs((input)=>({...input, 'page': '1', ...searchInputs, ...currentInputs}))
        setIsSearch(true)
        setDeleteList([])
        logButton('통합 고객 목록(검색)')
       /*  api('customer', 'list', searchInputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                    setSearchId(list.map((listData)=>listData.customer_id))
                    setIsSearch(true)
                }
            }) */
    }

    const onReset = ()=>{
        setSearchInputs({})
        currentData()
        setInputs((input)=>({...currentInputs, 'limit': input.limit, 'page': '1'}))
        if(pagePermission?.modify_type !== 'me'){
            setSales()
        }
        if(pagePermission?.modify_type !== 'department'){
            setBureau()
        }
        // navigate('/customer/list')
        setSearchId()
        setDeleteList([])
        logButton('통합 고객 목록(검색 초기화)')
    }
    
    useEffect(()=>{
        setCustomerListInputs()
    },[customerList])

    // const onSort = (name, is) =>{
    //     const formatPhoneNumber = (str) => {
    //         const regex = /^(\d{3})(\d{3,4})(\d{4})$/;
    //         if (str.match(regex)) {
    //             return str.replace(regex, '$1-$2-$3');
    //         }
    //         return str;
    //     };
    //     setBoardList((data)=>{
    //         let copy = [...data]
    //         const except = copy.filter((data2) =>{
    //             let bool;
    //             bool = data2[name] === null || data2[name] === undefined
    //             if(is){
    //                 bool = data2[is] === 'n'
    //             }
    //             return bool
    //         })
    //         copy = copy.filter((data2) => {
    //             let bool = data2[name] !== null && data2[name] !== undefined
    //             if(is){
    //                 bool = data2[is] === 'y'
    //             }
    //             return bool
    //         })

    //         if(copy[0][name] > copy.at(-1)[name]){
    //             copy = copy.sort((a, b) => {
    //                 const isANumberA = !isNaN(Number(a));
    //                 const isANumberB = !isNaN(Number(b));
    //                 if (isANumberA && isANumberB) {
    //                     return formatPhoneNumber(a[name]).localeCompare(formatPhoneNumber(b[name]));
    //                 } else {
    //                     return a[name].toString().localeCompare(b[name].toString());
    //                 }
    //             })
    //         }else{
    //             copy = copy.sort((a, b) => {
    //                 const isANumberA = !isNaN(Number(a));
    //                 const isANumberB = !isNaN(Number(b));
    //                 if (isANumberA && isANumberB) {
    //                     return formatPhoneNumber(b[name]).localeCompare(formatPhoneNumber(a[name]));
    //                 } else {
    //                     return b[name].toString().localeCompare(a[name].toString());
    //                 }
    //             })
    //         }

    //         return [...copy, ...except];
    //     })
    // }

    return (
        <>
            <h2>
                통합 고객 목록
                { pagePermission?.insert_yn === 'y'  && 
                    <Link to={'/customer/registration'} className='btn-point'>추가</Link>
                }
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
                                                },
                                                'department_id': currentInputs?.department_id
                                            })}
                                            disabled={pagePermission?.modify_type === 'me'}
                                        />
                                        <button>검색</button>
                                    </div>
                                    { pagePermission?.modify_type !== 'me' && 
                                        <button type='button' onClick={()=>{
                                            setSearchInputs((input)=>({...input, 'sales_admin_id': ''}))
                                            setSales('')
                                        }}>영업담당자 초기화</button>
                                    }
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
                                            disabled={pagePermission?.modify_type === 'department'}
                                        />
                                        <button>검색</button>
                                    </div>
                                    { pagePermission?.modify_type !== 'department' &&
                                        <button type='button' onClick={()=>{
                                            setSearchInputs((input)=>({...input, 'department_id': ''}))
                                            setBureau('')
                                        }}>부서 초기화</button>
                                    }
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
                                { searchClient && 
                                    <div>
                                        { searchClient.map((data)=>
                                            <span key={data.properties_id}>
                                                {/* <span> */}
                                                    <input 
                                                        type="checkbox" 
                                                        name='customer_properties_id_list'
                                                        id={`customer_properties_id_list_${data.properties_id}_y`}
                                                        // defaultChecked={data.properties_id === searchInputs?.customer_properties_id}
                                                        value={`${data.properties_id}|y`}
                                                        onChange={onCustomerDetail}
                                                    />
                                                    <label htmlFor={`customer_properties_id_list_${data.properties_id}_y`}>
                                                        { data.name }(이용중)
                                                    </label>
                                               {/*  </span>
                                                <span> */}
                                                    <input 
                                                        type="checkbox" 
                                                        name='customer_properties_id_list'
                                                        id={`customer_properties_id_list_${data.properties_id}_n`}
                                                        // checked={data.properties_id === inputs?.customer_properties_id}
                                                        // defaultChecked={data.properties_id === searchInputs?.customer_propert}
                                                        value={`${data.properties_id}|n`}
                                                        onChange={onCustomerDetail}
                                                    />
                                                    <label htmlFor={`customer_properties_id_list_${data.properties_id}_n`}>
                                                        { data.name }
                                                        (이용완료)
                                                    </label>
                                                {/* </span> */}
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
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" name='experience_search_type' id='experience_search_type_start' data-parents='experience_date_info' data-name='search_type' value='start' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="experience_search_type_start">시작일 검색</label>
                                    <input type="radio" name='experience_search_type' id='experience_search_type_end' data-parents='experience_date_info' data-name='search_type' value='end' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="experience_search_type_end">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'experience_date_info', 'start_date')} value={searchInputs?.experience_date_info?.start_date ? dayjs(searchInputs?.experience_date_info?.start_date) : ''} disabled={!searchInputs?.experience_date_info} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'experience_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'experience_date_info', 'end_date')} value={searchInputs?.experience_date_info?.end_date ? dayjs(searchInputs?.experience_date_info?.end_date) : ''} disabled={!searchInputs?.experience_date_info} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" name='payment_search_type' id='payment_search_type_start' data-parents='payment_date_info' data-name='search_type' value='start' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="payment_search_type_start">시작일 검색</label>
                                    <input type="radio" name='payment_search_type' id='payment_search_type_end' data-parents='payment_date_info' data-name='search_type' value='end' onClick={(e)=>parentsChange(e, setSearchInputs)}/>
                                    <label htmlFor="payment_search_type_end">종료일 검색</label>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'payment_date_info', 'start_date')} value={searchInputs?.payment_date_info?.start_date ? dayjs(searchInputs?.payment_date_info?.start_date) : ''} disabled={!searchInputs?.payment_date_info} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'payment_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'payment_date_info', 'end_date')} value={searchInputs?.payment_date_info?.end_date ? dayjs(searchInputs?.payment_date_info?.end_date) : ''} disabled={!searchInputs?.payment_date_info} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">최초 등록일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'start_date')} onBlur={(e)=>onDateBlur(e, 'reg_date_info', 'start_date')} value={searchInputs?.reg_date_info?.start_date ? dayjs(searchInputs?.reg_date_info?.start_date) : ''} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'end_date')} onBlur={(e)=>onDateBlur(e, 'reg_date_info', 'end_date')} value={searchInputs?.reg_date_info?.end_date ? dayjs(searchInputs?.reg_date_info?.end_date) : ''} placeholder='종료일'/>
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
                                <div>
                                    <Select type={'product'} current={searchInputs?.product_id || false} changeName='product_id' setInputs={setSearchInputs}/>
                                </div>
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
                <strong>{ isSearch ? '검색 결과' : '목록' }</strong>
                { pagePermission?.excel_yn === 'y' &&
                    <button 
                        className='btn-gray-black'
                        onClick={()=>setPopup({
                            'type': 'excelDownload',
                            'total': pagerInfo.total_count
                        })}
                    >
                        엑셀 다운로드
                    </button>
                }
                <button 
                    className='btn-gray-black'
                    onClick={()=>{setPopup({
                            'type': 'finFunc',
                            'title': '중복고객 삭제',
                            'description': '중복고객을 삭제하시겠습니까?',
                            'func': ()=>{
                                api('customer', 'duplicate_customer_delete')
                                    .then(({result, error_message})=>{
                                        if(result){
                                            setPopup({
                                                'type': 'confirm',
                                                'title': '완료',
                                                'description': error_message,
                                                'confirmFunc': () =>{
                                                    currentData()
                                                }
                                            })
                                        }
                                    })
                            }
                        });
                        logButton('통합 고객 목록(중복고객 삭제)')
                    }}
                >
                    중복고객 삭제
                </button>
                { (isSearch && !!boardList.length) && 
                    <>
                        <button 
                            className='btn-gray-black' 
                            onClick={()=>{setPopup({
                                    'type': 'finFunc',
                                    'title': '검색고객 삭제',
                                    'description': '검색된 고객을 삭제하시겠습니까?',
                                    'func': ()=>{
                                        api('customer', 'delete', {'customer_id_list': searchId})
                                            .then(({result, error_message})=>{
                                                if(result){
                                                    setPopup({
                                                        'type': 'confirm',
                                                        'title': '완료',
                                                        'description': error_message,
                                                    })
                                                    currentData()
                                                }
                                            })
                                    }
                                });
                                logButton('통합 고객 목록(검색고객 삭제)')
                            }}
                        >
                            검색고객 삭제
                        </button>
                        <button 
                            className='btn-gray-black'
                            onClick={()=>{setPopup({
                                    'type': 'finFunc',
                                    'title': '검색고객 수신거부',
                                    'description': '검색된 고객을 수신거부하시겠습니까?',
                                    'func': ()=>{
                                        api('customer', 'receive_reject', {'customer_id_list': searchId})
                                            .then(({result, error_message})=>{
                                                if(result){
                                                    setPopup({
                                                        'type': 'confirm',
                                                        'title': '완료',
                                                        'description': error_message,
                                                    })
                                                }
                                            })
                                    }
                                });
                                logButton('통합 고객 목록(검색고객 수신거부)')
                            }}
                        >
                            검색고객 수신거부
                        </button>
                        { pagePermission?.bulk_customer_modify === 'y'  && 
                            <Link to={'modify'} className='btn-gray-black'>대량고객수정</Link>
                        }
                    </>
                }
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

                { deleteList?.length !== 0 &&
                    <>
                        <Select type='customerList' current={customerList} setInputs={setCustomerList}/>
                        { customerList === '영업담당자' &&
                            <Select type='sales' setInputs={setCustomerListInputs} changeName='sales_admin_id'/>
                        }
                        { customerList === '상담상태' &&
                            <Select type='counsel' setInputs={setCustomerListInputs} changeName='counsel_properties_id'/>
                        }
                        { customerList === '고객구분' &&
                            <Select type='customer' setInputs={setCustomerListInputs} changeName='customer_properties_id'/>
                        }
                        <button 
                            className='btn-gray-black'
                            onClick={()=>{setPopup({
                                    'type': 'finFunc',
                                    'title': '선택 변경',
                                    'description': '선택 항목을 변경하시겠습니까?',
                                    'func': ()=>{
                                        // console.log({...customerListInputs, 'customer_id_list': deleteList});
                                        api('customer', 'select_properties', {...customerListInputs, 'customer_id_list': deleteList})
                                            .then(({result, error_message})=>{
                                                if(result){
                                                    setPopup({
                                                        'type': 'confirm',
                                                        'title': '완료',
                                                        'description': error_message,
                                                    })
                                                    setCustomerListInputs()
                                                    currentData()
                                                }
                                            })
                                    }
                                });
                                logButton('통합 고객 목록(선택 변경)')
                            }}
                            disabled={!customerListInputs}
                        >
                            선택 변경
                        </button>
                    </>
                }
                
                { pagePermission?.delete_yn === 'y'  && 
                    <BoardChkDelete url='customer' idName='customer_id_list' deleteList={deleteList} setDeleteList={setDeleteList} className='boundary' currentData={currentData}/>
                }
                <button 
                    className='btn-gray-black' 
                    onClick={()=>{setPopup({
                            'type': 'finFunc',
                            'title': '선택고객 수신거부',
                            'description': '선택된 고객을 수신거부하시겠습니까?',
                            'func': ()=>{
                                api('customer', 'receive_reject', {'customer_id_list': deleteList})
                                    .then(({result, error_message})=>{
                                        if(result){
                                            setPopup({
                                                'type': 'confirm',
                                                'title': '완료',
                                                'description': error_message,
                                            })
                                            setDeleteList([])
                                        }
                                    })
                            }
                        })
                        logButton('통합 고객 목록(선택 수신거부)')
                    }}
                    disabled={!deleteList?.length}
                >
                    선택 수신거부
                </button>
                <div className="board-top">
                    <BoardChkAll deleteList={deleteList} setDeleteList={setDeleteList} list={boardList?.map(({customer_id})=>customer_id)} />
                    <button onClick={()=>onSort(setBoardList, 'customer_id')}>No.</button>
                    <button onClick={()=>onSort(setBoardList, 'customer_mobile')}>휴대폰</button>
                    <button onClick={()=>onSort(setBoardList, 'customer_name')}>이름</button>
                    <button onClick={()=>onSort(setBoardList, 'sales_admin_name')}>담당자</button>
                    <button onClick={()=>onSort(setBoardList, 'customer_properties_name')}>고객구분</button>
                    <button onClick={()=>onSort(setBoardList, 'counsel_properties_name')}>상담상태</button>
                    <button onClick={()=>onSort(setBoardList, 'experience_start_date', 'experience_ing_yn')}>무료체험<br/>시작일</button>
                    <button onClick={()=>onSort(setBoardList, 'experience_end_date', 'experience_ing_yn')}>무료체험<br/>종료일</button>
                    <button onClick={()=>onSort(setBoardList, 'standard_payment_start_date')}>유료<br/>시작일</button>
                    <button onClick={()=>onSort(setBoardList, 'standard_payment_end_date')}>유료<br/>종료일</button>
                    <button onClick={()=>onSort(setBoardList, 'source')}>출처</button>
                    <span>보기</span>
                </div>
                
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=> (
                            <li key={ data.customer_id }>
                                <BoardChk id={data.customer_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ data.customer_id }</span>
                                <span 
                                    onClick={()=>console.log(inputs)}
                                    className={(duplicateMobile === 'y' && data.duplicate_count > 1) ? 'point': ''}
                                >
                                    { data.customer_mobile }
                                </span>
                                <span>{ data.customer_name }</span>
                                <div>
                                    <SalesItem data={data} setPopup={setPopup}/>
                                </div>
                                <span>{ data.customer_properties_name }</span>
                                <div>
                                    <CounselItem data={data} setPopup={setPopup}/>
                                </div>
                                <time>{ data.experience_ing_yn === 'y' ? data.experience_start_date : ''}</time>
                                <time>{ data.experience_ing_yn === 'y' ? data.experience_end_date : ''}</time>
                                <time>{ data.standard_payment_start_date }</time>
                                <time>{ data.standard_payment_end_date }</time>
                                <span>{ data.source }</span>
                                <Link to={`/customer/registration/update/${data.customer_id}`}>보기</Link>
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


// 개별 항목
function CounselItem({ data, setPopup }) {
    const [inputs, setInputs] = useState()
    const [prevInputs, setPrevInputs] = useState()

    useEffect(()=>{
        setInputs({'customer_id': data.customer_id, 'counsel_properties_id': data.counsel_properties_id})
        setPrevInputs({'customer_id': data.customer_id, 'counsel_properties_id': data.counsel_properties_id})
    },[data])

    useEffect(()=>{
        if(inputs && prevInputs && !Object.entries(inputs).every(([key, value])=> value === prevInputs[key])){
            api('customer', 'counsel_properties_change', inputs)
                .then(({result})=>{
                    if(result){
                        setPrevInputs({...inputs})
                        setPopup({
                            'type': 'confirm',
                            'title': '상담상태 변경',
                            'description': '상담상태를 변경헸습니다.'
                        })
                    }
                })
        }
       
    },[inputs, prevInputs, setPopup])

    return (
        <>
            <SelectBoard type='counsel' current={data?.counsel_properties_id} setInputs={setInputs} changeName='counsel_properties_id'/>
        </>
    )
}

// 개별 항목
function SalesItem({ data, setPopup }) {
    const [inputs, setInputs] = useState()
    const [prevInputs, setPrevInputs] = useState()

    useEffect(()=>{
        // console.log(data);
        setInputs({'customer_id': data.customer_id, 'sales_admin_id': data.sales_admin_id})
        setPrevInputs({'customer_id': data.customer_id, 'sales_admin_id': data.sales_admin_id})
    },[data])

    useEffect(()=>{
        if(inputs && prevInputs && !Object.entries(inputs).every(([key, value])=> value === prevInputs[key])){
            console.log(inputs);
            api('customer', 'sales_admin_change', inputs)
                .then(({result})=>{
                    if(result){
                        setPrevInputs({...inputs})
                        setPopup({
                            'type': 'confirm',
                            'title': '담당자 변경',
                            'description': '담당자를 변경했습니다.'
                        })
                    }
                })
        }
       
    },[inputs, prevInputs, setPopup])

    return (
        <>
            <SelectBoard type='sales' current={data?.sales_admin_id} setInputs={setInputs} changeName='sales_admin_id'/>
        </>
    )
}
