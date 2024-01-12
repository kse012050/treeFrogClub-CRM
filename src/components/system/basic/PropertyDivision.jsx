import React from 'react';

export default function PropertyDivision() {
    return (
        <div className='divisionArea horizontalTwo'>
            <div>
                <button className='active'>결제 구분 (6)</button>
                <button>매출 구분 (0)</button>
                <button>환불 구분 (0)</button>
            </div>
            <div className='boardBox'>
                <b>결제 구분 (6)</b>
                <button className='btn-gray-black'>추가</button>
                <button className='btn-gray-black'>선택 삭제</button>

                <div className='board-top'>
                    <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div>
                    <span>구분값</span>
                    <span>수정</span>
                </div>
                <ol className="board-center">
                    <li>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor=""></label>
                        </div>
                        <span>카드/현금 분할결제</span>
                        <button className="popup">수정</button>
                    </li>
                </ol>
            </div>
        </div>
    );
}

