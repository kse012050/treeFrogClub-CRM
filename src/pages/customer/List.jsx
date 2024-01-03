import React from 'react';
import Select from '../../components/Select';

export default function List() {
    return (
        <>
            <h2>통합 고객 목록</h2>

            <div className='searchBox'>
                <button>검색 항목</button>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">휴대폰</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사이트</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">영업담당자</label>
                                <div>
                                    <input type="search" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">부서</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">출처</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">고객구분</label>
                                <Select name={'customer'} />
                            </li>
                            <li>
                                <label htmlFor="">고객 상세구분</label>
                                <div>
                                    <input type="checkbox" />
                                    <label htmlFor="">무료회원(체험중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">무료회원(체험완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP회원(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP회원(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP회원(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP회원(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">소액투자반(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">소액투자반(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">교육(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">교육(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">S클럽(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">S클럽(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈(이용완료)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불방어매출(이용중)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불방어매출(이용완료)</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">상담상태</label>
                                <div>
                                    <input type="checkbox" />
                                    <label htmlFor="">분배(신규)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">분배(재신청)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">유효DB</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">부재 1차</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">부재 2차</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">재통화</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">체험(카톡접속)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">체험</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">가망고객</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">예상가입자</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">거절</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">환불신청</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">해지완료</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">불량(본인아님)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">불량(전화번호)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">불량(신청한적없음)</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VIP</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">VVIP</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈소액</label>
                                    <input type="checkbox" />
                                    <label htmlFor="">렌탈VIP</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">유료 기간</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor=""></label>
                                    <input type="radio" />
                                    <label htmlFor=""></label>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">무료체험 기간</label>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor=""></label>
                                    <input type="radio" />
                                    <label htmlFor=""></label>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">최초 등록일</label>
                                <div>

                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">신청 애널리스트</label>
                                <Select name={'customer'} />
                            </li>
                            <li>
                                <label htmlFor="">상품명</label>
                                <Select name={''} />
                            </li>
                            <li>
                                <label htmlFor="">SMS 거부 요청</label>
                                <Select name={''} />
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        </>
    );
}

