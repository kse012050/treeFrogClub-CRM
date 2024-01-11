import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationBulk() {
    return (
        <>
            <h2>대량 고객 등록</h2>
            <ol className='bulkBox'>
                <li>
                    <b>투입양식 작성</b>
                    <div>
                        <p>
                            양식을 다운받아서 항목에 알맞게 입력해주세요.<br/>
                            양식을 변경하시면 안되며, 데이터는 3행부터 입력해주세요.<br/>
                            필수값이 입력되지 않으면 데이터는 수집되지 않습니다.
                        </p>
                        <Link to={''} className='btn-point'>양식 다운로드</Link>
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
                        <ol title='휴대전화번호 중복등록이 허용된 경우,'>
                            <li>1) 기존에 존재하는 고객도 신규로 업로드가 가능하며 휴대폰 번호가 중복으로 표시됩니다.</li>
                            <li>2) 기존에 존재하는 고객의 상담정보가 있으면 신규 등록되는 고객에게 상담내역이 자동으로 복제됩니다.</li>
                        </ol>
                        <p title='휴대전화번호 중복등록이 불가한 경우, '>중복된 휴대폰 고객은 등록되지 않으며 작업 완료 후 확인이 가능합니다.</p>
                        <p>유료회원 중 서비스이용기간이 끝나지 않은 고객은 상담정보 이관되지 않습니다</p>
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

