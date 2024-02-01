import React from 'react';
import Select from '../../components/Select';

export default function MainBasic() {
    return (
        <div className='basicPage'>
             <div>
                <ul>
                    <li><button className='active'>부서별 매출</button></li>
                    <li><button>사용자별 매출</button></li>
                </ul>
                <div className='selectArea'>
                    <Select type="year"/>
                    <Select type="month"/>
                </div>
                <div className='infoArea'>
                    <div className='graphArea'>
                        <div></div>
                        <ul>
                            <li>사업지원팀</li>
                            <li>본부관리팀</li>
                            <li>외부영업</li>
                            <li>강남주식팀</li>
                            <li>대구코인팀</li>
                            <li>대구주식팀</li>
                            <li>문래지점</li>
                            <li>청개구리주식스쿨</li>
                            <li>청투TV</li>
                        </ul>
                    </div>
                    <div className='boardBox'>
                        <div className="board-top">
                            <b>순위</b>
                            <b>부서명</b>
                            <b>전월 총 매출금액</b>
                            <b>금월 총 매출금액</b>
                            <b>전월대비</b>
                        </div>
                        <ol className="board-center">
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                        </ol>
                        <div className="board-bottom">
                            <b></b>
                            <b>합계</b>
                            <b>874,198,132</b>
                            <b>874,198,132</b>
                            <b>109.02%</b>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li><button className='active'>상품별 매출</button></li>
                    <li><button>애널리스트별 매출</button></li>
                </ul>
                <div className='selectArea'>
                    <Select name="year"/>
                    <Select name="month"/>
                </div>
                <div className='infoArea'>
                    <div className='graphArea'>
                        <div></div>
                    </div>
                    <div className='boardBox'>
                        <div className="board-top">
                            <b>순위</b>
                            <b>부서명</b>
                            <b>전월 총 매출금액</b>
                            <b>금월 총 매출금액</b>
                            <b>전월대비</b>
                        </div>
                        <ol className="board-center">
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>청개구리주식스쿨</span>
                                <span>181,786,500</span>
                                <span>181,786,500</span>
                                <span>109.02%</span>
                            </li>
                        </ol>
                        <div className="board-bottom">
                            <b></b>
                            <b>합계</b>
                            <b>874,198,132</b>
                            <b>874,198,132</b>
                            <b>109.02%</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

