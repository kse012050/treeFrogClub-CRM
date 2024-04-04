import React, { useContext, useEffect, useState } from 'react';
import DropBox from '../../../components/DropBox';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { inputChange, onSort } from '../../../api/validation';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
// import Pager from '../../../components/Pager';
import SelectPage from '../../../components/SelectPage';
import PagerButton from '../../../components/PagerButton';
import { logButton } from '../../../api/common';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Connect() {
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const initParam = {'limit': '10', 'page': '1'};
    const [inputs, setInputs] = useState(initParam)
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()

    useEffect(()=>{
        if(pagePermission?.select_yn && pagePermission?.select_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.select_yn, navigate])

    useEffect(()=>{
        api('log', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    // console.log(data);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    }, [inputs])

    const onDate = (dateString, name) => {
        setSearchInputs((input)=>({...input, [name]: dateString}))
    };

    const onDateBlur = (e, name) => {
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
                const year = parseInt(value.substring(0, 4))
                let month = parseInt(value.substring(4, 6))
                month = month ? ( month <= 12 ? ( month >= 10 ? month : '0' + month) : 12) : '01';
                const maxDay = new Date(year, month, 0).getDate();
                let day = parseInt(value.substring(6, 8))
                day = day ? ( day <= maxDay ? ( day >= 10 ? day : '0' + day) : maxDay) : '01';
                value = `${year}-${month}-${day}`
            }
            onDate(value, name)
        }
    };

    const onReset = () => {
        setInputs((input)=>({'limit': input.limit, 'page': '1'}))
        setSearchInputs()
        // setInputs((input)=>({'limit': input.limit, 'page': '1'}))
        logButton('사용자 접속 이력(검색 초기화)')
    }

    const onSearch = (e) =>{
        e.preventDefault()
        // console.log(searchInputs);
        setInputs((input)=>({...input, 'page': '1', ...searchInputs}))
        logButton('사용자 접속 이력(검색)')
    }
    return (
        <>
            <h2>사용자 접속 이력</h2>

            <DropBox title="검색 항목" arrow>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">접속일자</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'start_date')} onBlur={(e)=>onDateBlur(e, 'start_date')} value={searchInputs?.start_date ? dayjs(searchInputs?.payment_date_info?.start_date) : ''} placeholder='시작일 입력'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'end_date')} onBlur={(e)=>onDateBlur(e, 'end_date')} value={searchInputs?.end_date ? dayjs(searchInputs?.payment_date_info?.start_date) : ''} placeholder='종료일 입력'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">로그유형</label>
                                <div>
                                    <Select type={'logType'} current={searchInputs?.log_type || false} changeName='log_type' setInputs={setSearchInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="search_id">아이디</label>
                                <div>
                                    <input type="text" name='search_id' id='search_id' data-formet='id' onChange={(e)=>inputChange(e, setSearchInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="search_ip">접속 IP</label>
                                <div>
                                    <input type="text" name='search_ip' id='search_ip' data-formet='ip' onChange={(e)=>inputChange(e, setSearchInputs)}/>
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

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case01'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                
                <div className="board-top">
                    <button onClick={()=>onSort(setBoardList, 'reg_date')}>접속일자</button>
                    <button onClick={()=>onSort(setBoardList, 'admin_name')}>아이디</button>
                    <button onClick={()=>onSort(setBoardList, 'ip')}>IP</button>
                    <button onClick={()=>onSort(setBoardList, 'log_type')}>로그유형</button>
                    <button onClick={()=>onSort(setBoardList, 'log_value')}>상세이력</button>
                </div>
                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.log_id }>
                                <span>{ data.reg_date }</span>
                                <span>{ data.admin_name } ({ data.admin_id })</span>
                                <span>{ data.ip }</span>
                                <span>{ data.log_type }</span>
                                <span>{ data.log_value }</span>
                            </li>
                        ))}
                    </ol>
                }

                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        {/* <Select type="pagerCount" current={inputs.limit} setInputs={setInputs} changeName='limit'/> */}
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        {/* <Pager pagerInfo={pagerInfo} setInputs={setInputs}/> */}
                        <PagerButton pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                }
            </div>
        </>
    );
}

