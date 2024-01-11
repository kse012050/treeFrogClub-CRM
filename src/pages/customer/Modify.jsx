import React from 'react';
import { Link } from 'react-router-dom';

export default function Modify() {
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
                    </div>
                </li>
                <li>
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
                </li>
            </ol>
        </>
    );
}

