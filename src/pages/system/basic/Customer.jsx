import React from 'react';
import Select from '../../../components/Select';

export default function Customer() {
    return (
        <>
            <h2>고객목록 설정</h2>
            <div className="dropBox">
                <b>통합 고객 목록 설정</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">목록 개수</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">SMS거부요청</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">중복휴대폰번호 색상표기</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">정렬 기준</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">금년</label>
                                    <input type="radio" />
                                    <label htmlFor="">금월</label>
                                    <input type="radio" />
                                    <label htmlFor="">금일</label>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">금년</label>
                                    <input type="radio" />
                                    <label htmlFor="">금월</label>
                                    <input type="radio" />
                                    <label htmlFor="">금일</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className='autoArea'>
                        <b>무료회원 DB회수 자동 설정</b>
                        <input type="radio" />
                        <label htmlFor="">자동 설정</label>
                        <div>
                            <ul>
                                <li>
                                    <label htmlFor="">회수일자</label>
                                    <div>
                                        <input type="radio" />
                                        <label htmlFor="">무료체험 종료일</label>
                                        <input type="radio" />
                                        <label htmlFor="">DB분배일로부터 30일 후</label>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="">회수 담당자 선택</label>
                                    <div>
                                        <input type="search" />
                                        <button>검색</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <input type="radio" />
                        <label htmlFor="">자동 설정 안 함</label>
                    </fieldset>
                    <div>
                        <input type="submit" value="저장" className='btn-point'/>
                    </div>
                </form>
            </div>
        </>
    );
}

