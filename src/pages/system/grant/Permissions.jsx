import React from 'react';
import Select from '../../../components/Select';
// import GrantUser from '../../../components/system/grant/GrantUser';
import SearchResults from '../../../components/system/grant/SearchResults';
import { Link } from 'react-router-dom';

export default function Permissions() {
    return (
        <>
            <h2>
                역할 권한 관리
                <div>
                    <input type="search" />
                    <button>검색</button>
                </div>
            </h2>
            <div className="horizontalTwo">
                <div className='roleName'>
                    <b>역할명</b>
                    <ul>
                        <li><button className='active'>관리자</button></li>
                        <li><button>관리팀</button></li>
                        <li><button>관리팀 팀장</button></li>
                        <li><button>계열사 임원</button></li>
                        <li><button>마케팅 팀장</button></li>
                        <li><button>본부장</button></li>
                        <li><button>본점 영업</button></li>
                        <li><button>사무직</button></li>
                        <li><button>사업팀 팀장</button></li>
                        <li><button>애널리스트 팀장</button></li>
                        <li><button>영업</button></li>
                        <li><button>임원</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                        <li><button>제휴사</button></li>
                    </ul>
                </div>

                <SearchResults />
                {/* <div className='boardArea'>
                    <strong>관리자 [시스템 관리자]</strong>
                    <button className='active'>화면 권한</button>
                    <button>사용자 권한</button>
                    <hr className='case01'/>
                    <Select name={'type'} />
                    <div className='searchArea'>
                        <input type="search" />
                        <button>검색</button>
                    </div>
                    <div className="boardBox">
                        <GrantUser />
                    </div>
                </div> */}
                
            </div>
        </>
    );
}

