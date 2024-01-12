import React from 'react';

export default function PropertyMoney() {
    return (
        <div className='moneyArea'>
            <b>투자금액 산정방식 및 목표량 설정</b>
            <div className='horizontalTwo'>
                <div>달력</div>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">산정방식 선택</label>
                                <div>
                                    <input type="radio" defaultChecked/>
                                    <label htmlFor="">월별 투자금액 기준</label>
                                    <p>월 투자 금액</p>
                                    <div data-unit="원">
                                        <input type="text" name="" id="" />
                                    </div>
                                </div>
                                <div>
                                    <input type="radio" />
                                    <label htmlFor="">일별 투자금액 기준</label>
                                    <p>일 투자 금액</p>
                                    <div data-unit="원">
                                        <input type="text" name="" id="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">목표량 설정 (월별 선택시)</label>
                                <div>
                                    <p>투자금 대비 ROAS</p>
                                    <div data-unit="%">
                                        <input type="text" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <input type="submit" value="저장" className='btn-point' />
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

