import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, apiFile } from '../../api/api';
import { logExcel } from '../../api/common';
import Popup from '../../components/popup/Popup';

export default function BulkModify() {
    const [formetUrl, setFormetUrl] = useState()
    const [fileName, setFileName] = useState()
    const [finMessage, setFinMessage] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('customer', 'update_format_download')
            .then(({ result, data: {crm_customer_modify_format_url}})=>{
                if(result){
                    setFormetUrl(crm_customer_modify_format_url)
                }
            })
    },[])

    const onFileChange = (e) =>{
        // console.log(e.target.files[0]);
        // console.log(e);
        // setInputs({'upload_file': e.target.files[0]})
        if(e.target.files[0]?.name){
            apiFile('excel', 'customer_excel_modify', {'upload_file': e.target.files[0]})
                // .then((data)=>{
                //     console.log(data);
                    // console.log(error_message);
                .then(({result, error_message})=>{
                    if(result){
                        setFileName(e.target.files[0]?.name)
                        setFinMessage(error_message.match(/(\d+건 완료)\/(총 \d+건)/))
                    }else{
                        setPopup({'type': 'confirm', 'description': error_message})
                    }
                })
        }
    }

    return (
        <>
            <h2>대량 고객 수정</h2>
            <ol className='bulkBox'>
                <li>
                    <b>투입양식 작성</b>
                    <div>
                        <p>
                            양식을 다운받아서 변경이 필요한 내용을 수정해주세요.<br/>
                            검색 순서대로 최대 5만건까지 수정이 가능합니다.<br/>
                            양식과 고객아이디는 변경하시면 안됩니다.<br/>
                            휴대폰번호는 변경되지 않습니다.<br/>
                            신규등록은 불가능하며 기존에 등록된 정보만 변경 가능합니다.<br/>
                            괄호 선택값이 존재할 경우, 괄호에 없는 값을 입력하면 해당 값은 수정되지 않습니다.
                        </p>
                        <Link 
                            to={formetUrl}
                            className='btn-point'
                            onClick={()=>logExcel(`대량 고객 수정 - 양식 다운로드`)}
                        >
                            양식 다운로드
                        </Link>
                    </div>
                </li>
                <li>
                    <b>데이터 투입</b>
                    <div>
                        <div>
                            <input type="text" placeholder='선택된 파일 없음' value={fileName || ''} readOnly className={fileName ? 'active' : ''}/>
                            <input type="file" name='upload_file' id='upload_file' onChange={onFileChange}/>
                            <label htmlFor="upload_file" className='btn-gray-black'>파일 선택</label>
                        </div>
                        <label htmlFor="upload_file" className='btn-point'>데이터 투입</label>
                        {/* <button className='btn-point'>데이터 투입</button> */}
                        {/* <ol title='휴대전화번호 중복등록이 허용된 경우,'>
                            <li>1) 기존에 존재하는 고객도 신규로 업로드가 가능하며 휴대폰 번호가 중복으로 표시됩니다.</li>
                            <li>2) 기존에 존재하는 고객의 상담정보가 있으면 신규 등록되는 고객에게 상담내역이 자동으로 복제됩니다.</li>
                        </ol>
                        <p title='휴대전화번호 중복등록이 불가한 경우, '>중복된 휴대폰 고객은 등록되지 않으며 작업 완료 후 확인이 가능합니다.</p>
                        <p>유료회원 중 서비스이용기간이 끝나지 않은 고객은 상담정보 이관되지 않습니다</p> */}
                    </div>
                    {/* <div>
                        <div>
                            <input type="text" />
                            <input type="file" />
                            <label htmlFor="" className='btn-gray-black'>파일 선택</label>
                        </div>
                        <button className='btn-point'>데이터 투입</button>
                    </div> */}
                </li>
                { !finMessage ?
                    <li>
                        <div>
                            <p>데이터를 투입하시면 결과가 표시됩니다.</p>
                        </div>
                    </li> :
                    <li>
                        <b>결과</b>
                        <div>
                            <p>수정이 완료되었습니다.</p>
                            <mark data-total={finMessage[2]}>{ finMessage[1] }</mark>
                        </div>
                    </li>
                }
                {/* <li>
                    <b>결과</b>
                    <div>
                        <p>수정이 완료되었습니다.</p>
                        <mark data-total="50">50건 완료</mark>
                    </div>
                    <div>
                        <p>수정에 실패하였습니다.</p>
                        <dl>
                            <dt>사유</dt>
                            <dd>양식이 일부 변경되었습니다.</dd>
                        </dl>
                    </div>
                    <div>
                        <p>수정이 부분 완료되었으며, 미처리 <mark>2건</mark>이 있습니다.</p>
                        <mark data-total="50">48건 완료</mark>
                        <dl>
                            <dt>사유</dt>
                            <dd>신규 데이터 등록 불가</dd>
                        </dl>
                        <ul>
                            <li>010-0000-0000</li>
                            <li>010-0000-0000</li>
                        </ul>
                    </div>
                </li> */}
            </ol>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

