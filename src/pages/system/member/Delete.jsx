import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import DropBox from '../../../components/DropBox';

export default function Delete() {
    const [searchInputs, setSearchInputs] = useState()

    const onDate = (dateString, parents, name) => {
        // console.log(dateString);
        // console.log(parents);
        // console.log(name);
        setSearchInputs((input)=>({...input, [parents]: {...input[parents], [name]: dateString}}))
    };

    const onReset = ()=>{

    }

    const onSearch = (e) => {

    }

    return (
        <>
            <h2>고객삭제이력</h2>

            <DropBox title="검색 항목" arrow>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">이름</label>
                                <div>
                                    <div>
                                        <input type="text" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">휴대폰</label>
                                <div>
                                    <div>
                                        <input type="text" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">출처</label>
                                <div>
                                    <div>
                                        <input type="text" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">삭제자</label>
                                <div>
                                    <div>
                                        <input type="text" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">삭제일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'start_date')} value={searchInputs?.reg_date_info?.start_date ? dayjs(searchInputs?.reg_date_info?.start_date) : ''} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'end_date')} value={searchInputs?.reg_date_info?.end_date ? dayjs(searchInputs?.reg_date_info?.end_date) : ''} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">최초등록일</label>
                                <div>
                                    <div>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'start_date')} value={searchInputs?.reg_date_info?.start_date ? dayjs(searchInputs?.reg_date_info?.start_date) : ''} placeholder='시작일'/>
                                        <span>-</span>
                                        <DatePicker onChange={(_, dateString)=>onDate(dateString, 'reg_date_info', 'end_date')} value={searchInputs?.reg_date_info?.end_date ? dayjs(searchInputs?.reg_date_info?.end_date) : ''} placeholder='종료일'/>
                                    </div>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <div>
                                        <input type="text" />
                                    </div>
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
                {/* <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
                <b className='choice'>{ deleteList.length }</b> */}
                
                <div className="board-top">
                    <button>삭제일시</button>
                    <button>삭제자</button>
                    <button>이름</button>
                    <button>휴대폰</button>
                    <button>고객구분</button>
                    <button>담당자</button>
                    <button>무료체험 시작일</button>
                    <button>무료체험 종료일</button>
                    <button>등록일시</button>
                </div>
                
               {/*  { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.admin_id }>
                                <span>{ data.company_name }</span>
                                <span>{ data.id }</span>
                                <span>{ data.name }</span>
                                <span>{ data.type === 'admin' ? '관리자' : '사용자' }</span>
                                <span>{ data.role_name }</span>
                                <span>{ data.department_name }</span>
                                <span>{ data.useable_yn }</span>
                                <Link to={`update/${data.admin_id}`}>수정</Link>
                            </li>
                        ))}
                    </ol>
                } */}
          
              {/*   { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                } */}
            </div>

            
            {/* {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )} */}
        </>
    );
}

