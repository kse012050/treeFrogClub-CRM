import React from 'react';

export default function GrantUser() {
    return (
        <div className='userArea'>
            <b className='total'>123</b>
            <span className='page'>1/10</span>
            <b className='choice'>1</b>
            <button className='btn-gray-black boundary'>선택 삭제</button>
            <button className='btn-gray-black'>추가</button>
            
            <div className="board-top">
                <div>
                    <input type="checkbox" />
                    <label htmlFor=""></label>
                </div>
                <span>사용자구분</span>
                <span>사용자명</span>
                <span>아이디</span>
            </div>
            <ol className="board-center">
                <li>
                    <div>
                        <input type="checkbox" />
                        <label htmlFor=""></label>
                    </div>
                    <span>유료회원(관리자)</span>
                    <span>홍길동</span>
                    <span>asdfasdf</span>
                </li>
            </ol>

            <div className='board-pagination' data-styleidx='a'>
                <Select name="pageCount"/>
                <Link to={''}>첫 페이지</Link>
                <Link to={''}>이전 페이지</Link>
                <ol>
                    <li className='active'><Link to={''}>1</Link></li>
                    <li><Link to={''}>2</Link></li>
                    <li><Link to={''}>3</Link></li>
                    <li><Link to={''}>4</Link></li>
                    <li><Link to={''}>5</Link></li>
                    <li><Link to={''}>6</Link></li>
                    <li><Link to={''}>7</Link></li>
                    <li><Link to={''}>8</Link></li>
                    <li><Link to={''}>9</Link></li>
                    <li><Link to={''}>10</Link></li>
                </ol>
                <Link to={''}>다음 페이지</Link>
                <Link to={''}>마지막 페이지</Link>
            </div>
        </div>
    );
}

