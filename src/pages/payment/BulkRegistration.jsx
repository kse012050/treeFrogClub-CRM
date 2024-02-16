import React from 'react';
import { Link } from 'react-router-dom';

export default function Registration() {
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
                        <Link to={''} className='btn-point' title='휴대폰'>양식 다운로드</Link>
                        <Link to={''} className='btn-point' title='휴대폰+고객명'>양식 다운로드</Link>
                    </div>
                </li>
                <li>
                    <b>데이터 투입</b>
                    <div>
                        <div>
                            <input type="text" />
                            <input type="file" />
                            <label htmlFor="" className='btn-gray-black'>파일 선택</label>
                        </div>
                        <button className='btn-point'>데이터 투입</button>
                        <p>
                            휴대전화번호가 기존고객에 없는 경우에는 투입되지 않으며,<br/>
                            해당 목록은 작업 완료 후에 확인이 가능합니다.
                        </p>
                    </div>
                </li>
                <li>
                    <b>결과</b>
                    <div>
                        <p>등록이 완료되었습니다.</p>
                        <mark data-total="50">50건 완료</mark>
                    </div>
                </li>
            </ol>
        </>
    );
}

