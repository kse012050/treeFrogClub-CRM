import React, { useContext, useEffect, useState } from 'react';
import { Link/* , useNavigate */ } from 'react-router-dom';
import { api } from '../../api/api';
import SubTitle from '../../components/SubTitle';
import Pager from '../../components/Pager';
import SelectPage from '../../components/SelectPage';
import { UserContext } from '../../context/UserContext';

export default function Notice() {
    const { pagePermission } = useContext(UserContext)
    console.log(pagePermission);
    // const navigate = useNavigate();
    const [inputs, setInputs] = useState({'limit': '10', 'page': '1'});
    const [boardList, setBoardList] = useState()
    const [pagerInfo, setPagerInfo] = useState()

    // useEffect(()=>{
    //     if(pagePermission?.select_yn && pagePermission?.select_yn !== 'y'){
    //         navigate('/main')
    //     }
    // },[pagePermission?.select_yn, navigate])

    useEffect(()=>{
        api('board', 'list', inputs)
            .then(({result, data, list})=>{
                if(result){
                    // console.log(list);
                    setPagerInfo(data)
                    setBoardList(list)
                }
            })
    },[inputs])

    useEffect(()=>{
        setInputs((input)=>({...input, 'page': '1'}))
    },[inputs.limit])

    return (
        <>
            <SubTitle text="공지사항" link={pagePermission?.insert_yn === 'y' ? 'registration' : ''} />

            <div className='boardBox'>
                <strong>목록</strong>
                <hr className='case03'/>
                <b className='total'>{ pagerInfo?.total_count }</b>
                <span className='page'>{ pagerInfo?.current_page }/{ pagerInfo?.total_page }</span>
            
                <div className="board-top">
                    <span>등록일자</span>
                    <span>제목</span>
                    { pagePermission?.update_yn === 'y' && 
                        <span>열람범위</span>
                    }
                    <span>작성자</span>
                    <span>보기</span>
                </div>

                { boardList && 
                    <ol className="board-center">
                        { boardList.map((data)=>(
                            <li key={ data.board_id }>
                                <span>{ data.reg_date }</span>
                                <span>{ data.title }</span>
                                { pagePermission?.update_yn === 'y' && 
                                    <span>{ data.scope_of_access }</span>
                                }
                                <span>{ data.write_name }</span>
                                <Link to={`update/${data.board_id}`}>보기</Link>
                            </li>
                        ))}
                    </ol>
                }

                { !!pagerInfo?.total_count &&
                    <div className='board-pagination' data-styleidx='a'>
                        <SelectPage current={inputs.limit} setInputs={setInputs}/>
                        <Pager pagerInfo={pagerInfo} setInputs={setInputs}/>
                    </div>
                }
            </div>
        </>
    );
}