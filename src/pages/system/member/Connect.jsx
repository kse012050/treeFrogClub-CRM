import React, { useEffect, useState } from 'react';
import DropBox from '../../../components/DropBox';
import { DatePicker } from 'antd';
import { inputChange } from '../../../api/validation';
import Select from '../../../components/Select';
import { api } from '../../../api/api';
import Pager from '../../../components/Pager';
import SelectPage from '../../../components/SelectPage';

export default function Connect() {
    const initParam = {'limit': '10', 'page': '1'};
    const [inputs, setInputs] = useState(initParam)
    const [searchInputs, setSearchInputs] = useState()
    const [pagerInfo, setPagerInfo] = useState()
    const [boardList, setBoardList] = useState()

    useEffect(()=>{
        api('log', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    }, [inputs])

    const onDate = (dateString, name) => {
        setSearchInputs((input)=>({...input, [name]: dateString}))
    };

    const onReset = () => {
        setInputs((input)=>({'limit': input.limit, 'page': '1'}))
        // setInputs((input)=>({'limit': input.limit, 'page': '1'}))
    }

    const onSearch = (e) =>{
        e.preventDefault()
        // console.log(searchInputs);
        setInputs((input)=>({...input, ...searchInputs}))
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
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'start_date')} placeholder='시작일 입력'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'end_date')} placeholder='종료일 입력'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">로그유형</label>
                                <div>
                                    <Select type={'logType'} current changeName='log_type' setInputs={setSearchInputs}/>
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
                    <button>접속일자</button>
                    <button>아이디</button>
                    <button>IP</button>
                    <button>로그유형</button>
                    <button>상세이력</button>
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
                        <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                }
            </div>
        </>
    );
}

