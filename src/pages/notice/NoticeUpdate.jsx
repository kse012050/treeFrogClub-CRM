import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { inputChange } from '../../api/validation';
import BureauBox from '../../components/BureauBox';
import Popup from '../../components/popup/Popup';
import { api } from '../../api/api';

export default function NoticeUpdate() {
    const [inputs, setInputs] = useState({ 'department_id_list': '' })
    const [bureauNoticePopup, setBureauNoticePopup] = useState()
    const [choiceList, setChoiceList] = useState();
    const [popup, setPopup] = useState('')
    const { id } = useParams();
    // console.log(id);
    useEffect(()=>{
        api('board', 'detail', {'board_id': id})
            .then(({result, data})=>{
                if(result){
                    setInputs(data)
                    setChoiceList(data.department_list)
                }
            })
    },[id])

    useEffect(()=>{
        setInputs((input)=>({...input, 'department_id_list': choiceList ? choiceList.map((data)=>data.department_id) : ''}))
    },[choiceList])

    const onDelete = () =>{
        api('board', 'delete', {'board_id': id})
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/notice'
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(
            !inputs?.title ||
            !inputs?.comment
        ){
            let errorMessage = '';
            if(!inputs?.title){
                errorMessage = '제목을 입력해주세요.'
            }else if(!inputs?.comment){
                errorMessage = '내용를 입력해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        
        api('board', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/notice'
                    }))
                }else{
                    setPopup((popup)=>({
                        ...popup,
                        'title': '실패',
                    }))
                }
            })
    }

    return (
        <>
            <h2>공지사항 보기/수정</h2>
            <div className="dropBox">
                <b>공지사항</b>
                <form>
                    <fieldset>
                        <ul>
                            <li className='fill-three'>
                                <label htmlFor="" className='required'>열람범위</label>
                                <div>
                                    <input type="radio" id='department_id_list_all' name='department_id_list' checked={!inputs.department_id_list || !inputs.department_id_list.length} value={''} onChange={()=>setChoiceList('')}/>
                                    <label htmlFor="department_id_list_all">전체</label>
                                    <input type="radio" id='' name='' checked={!!inputs.department_id_list && inputs.department_id_list.length} readOnly/>
                                    <label htmlFor=""></label>
                                    <label htmlFor="" className='btn-gray-black' onClick={()=>setBureauNoticePopup({type: 'children'})}>부서 선택</label>
                                    { !!choiceList?.length && 
                                        <ul className='bureauList'>
                                            { choiceList.map((data)=>
                                                <li key={data.department_id} className='icon-remove'>
                                                    { data.name }
                                                    <button 
                                                        type='button' 
                                                        onClick={()=>setChoiceList((list)=>list.filter((listData)=>listData.department_id !== data.department_id))}
                                                    >
                                                        제거
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    }
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="title" className='required'>제목</label>
                                <div>
                                    <input type="text" name="title" id="title" defaultValue={inputs.title} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="write_name">작성자</label>
                                <div>
                                    <input type="text" name='write_name' id='write_name' defaultValue={inputs.write_name} disabled/>
                                </div>
                            </li>
                            <li className='fill-three'>
                                <label htmlFor="comment" className='required'>내용</label>
                                <div>
                                    <textarea name="comment" id="comment" defaultValue={inputs.comment} onChange={(e)=>inputChange(e, setInputs)}></textarea>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <button type='button' className='btn-point' 
                            onClick={()=>
                                setPopup({
                                    'type': 'finFunc',
                                    'title': '삭제',
                                    'description': `공지사항을 삭제하시겠습니까?`,
                                    'func': onDelete
                                })}
                        >
                            삭제
                        </button>
                        <Link to={'/notice'} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            { bureauNoticePopup && <BureauNotice bureauNoticePopup={bureauNoticePopup} setBureauNoticePopup={setBureauNoticePopup} inputs={choiceList} setInputs={setChoiceList}/>}
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

function BureauNotice({ bureauNoticePopup, setBureauNoticePopup, inputs, setInputs }) {
    const [choiceList, setChoiceList] = useState();

    useEffect(()=>{
        setChoiceList(inputs)
    },[inputs])

    const onSubmit = () =>{
        setInputs(choiceList)
        setBureauNoticePopup('')
    }

    return (
        <>
            <Popup popup={bureauNoticePopup} setPopup={setBureauNoticePopup}>
                <strong>부서 선택</strong>
                <BureauBox type='notice' inputs={choiceList} setInputs={setChoiceList} />
                <b>부서 선택</b>
                { choiceList && 
                    <ul className='choice-horizontal scroll-width'>
                        { choiceList.map((data)=>(
                            <li key={data.department_id} className='icon-remove'>
                            { data.name }
                            <button onClick={()=>setChoiceList((input)=>input.filter((inputData)=>inputData.department_id !== data.department_id))}>제거</button>
                        </li>
                        ))}                        
                    </ul>
                }
                <div className='btnArea-end'>
                    <button className='btn-gray-white' type='button' onClick={()=>setBureauNoticePopup('')}>취소</button>
                    <button className='btn-point' onClick={onSubmit}>저장</button>
                </div>
            </Popup>
        </>
    )
}