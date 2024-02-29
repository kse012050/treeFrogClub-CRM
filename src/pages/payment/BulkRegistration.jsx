import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, apiFile } from '../../api/api';
import Popup from '../../components/popup/Popup';

export default function Registration() {
    const [formetCustomerUrl, setFormetCustomerUrl] = useState()
    const [formetMobileUrl, setFormetMobileUrl] = useState()
    const [fileName, setFileName] = useState()
    const [finMessage, setFinMessage] = useState()
    const [popup, setPopup] = useState()

    useEffect(()=>{
        api('payment', 'format_download_name')
            .then(({result, data})=>{
                if(result){
                    setFormetCustomerUrl(data.crm_customer_reg_format_url)
                }
            })

        api('payment', 'format_download_mobile')
            .then(({result, data})=>{
                if(result){
                    setFormetMobileUrl(data.crm_customer_reg_format_url)
                }
            })
    },[])

    const onFileChange = (e) =>{
        // console.log(e);
        // setInputs({'upload_file': e.target.files[0]})
        
        if(e.target.files[0]?.name){
            apiFile('excel', 'payment_excel_upload', {'upload_file': e.target.files[0]})
                .then(({result, error_message})=>{
                    if(result){
                        setFinMessage(error_message.match(/(\d+건 완료)\/(총 \d+건)/))
                        setFileName(e.target.files[0]?.name)
                    }else{
                        setPopup({'type': 'confirm', 'description': error_message})
                    }
                })
        }
    }

    return (
        <>
            <h2>대량 결제 등록</h2>
            <ol className='bulkBox'>
                <li>
                    <b>투입양식 작성</b>
                    <div>
                        <p>
                            양식을 다운받아서 항목에 알맞게 입력해주세요.<br/>
                            양식을 변경하시면 안되며, 데이터는 3행부터 입력해주세요.<br/>
                            괄호 선택값이 존재할 경우, 괄호에 없는 값을 입력하면 해당 값은 저장되지 않습니다.<br/>
                            중복데이터가 있는 경우 최신 등록 고객정보와 매칭됩니다.
                        </p>
                        <Link to={formetMobileUrl} className='btn-point' title='휴대폰'>양식 다운로드</Link>
                        <Link to={formetCustomerUrl} className='btn-point' title='휴대폰+고객명'>양식 다운로드</Link>
                    </div>
                </li>
                <li>
                    <b>데이터 투입</b>
                    <div>
                        <div>
                            <input type="text" placeholder='선택된 파일 없음' value={fileName || ''} readOnly/>
                            <input type="file" name='upload_file' id='upload_file' onChange={onFileChange}/>
                            <label htmlFor="upload_file" className='btn-gray-black'>파일 선택</label>
                        </div>
                        <label htmlFor="upload_file" className='btn-point'>데이터 투입</label>
                        <p>
                            휴대전화번호가 기존고객에 없는 경우에는 투입되지 않으며,<br/>
                            해당 목록은 작업 완료 후에 확인이 가능합니다.
                        </p>
                    </div>
                </li>
                { finMessage && 
                    <li>
                        <b>결과</b>
                        <div>
                            <p>등록이 완료되었습니다.</p>
                            <mark data-total={finMessage[2]}>{ finMessage[1] }</mark>
                        </div>
                    </li>
                }
            </ol>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

