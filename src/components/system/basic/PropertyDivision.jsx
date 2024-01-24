import React, { useEffect, useState } from 'react';
import { api, apiAwait } from '../../../api/api'
import Popup from '../../popup/Popup';
import BoardChk from '../../boardChk/BoardChk';
import BoardChkAll from '../../boardChk/BoardChkAll';
import BoardChkDelete from '../../boardChk/BoardChkDelete';


export default function PropertyDivision() {
    const [classificationActive, setClassificationctive] = useState()
    const [classificationList, setClassificationList] = useState([])
    const [propertiesList, setPropertiesist] = useState()
    const [deleteList, setDeleteList] = useState([])
    const [popup, setPopup] = useState('')

    
    useEffect(()=>{
        if(!popup){
            api('properties', 'classification_list')
            .then(({result, list}) => {
                if(result){
                    setClassificationList(list);
                    setClassificationctive(list[0].classification_id)
                }
            })
        }
    },[setClassificationctive, popup])
    
    useEffect(()=>{
        if(classificationActive && !popup){
            api('properties', 'properties_list', {classification_id: classificationActive})
                .then(({result, list})=>{
                    if(result){
                        setPropertiesist(list)
                    }
                })
        }
    },[classificationActive, popup])

    // const allChecked = (e) => {
    //     const { checked } = e.target;
    //     if(checked){
    //         setDeleteList(propertiesList.map(({properties_id})=>properties_id))
    //     }else{
    //         setDeleteList([]);
    //     }
    // }

    // const lisChecked = (e) =>{
    //     const { checked, id } = e.target;
    //     setDeleteList((list)=>{
    //         checked ? 
    //             (list = [...list, id]) :
    //             (list = list.filter((listId)=> listId !== id));
    //         return list
    //     })
    // }

    const popupFunc = () =>{
        if(deleteList.length){
            apiAwait('properties', 'delete', 'properties_id', deleteList).then((result)=>{
                if(result){
                    setPopup('');
                    setDeleteList([])
                }
            })
        }
    }
  

    return (
        <div className='divisionArea horizontalTwo'>
            <div>
                {classificationList.map(({classification_id, name, properties_count})=>
                    <button key={classification_id} className={classification_id === classificationActive ? 'active' : ''} onClick={()=>setClassificationctive(classification_id)}>
                        {name} ({properties_count})
                    </button>
                )}
            </div>
        
            {propertiesList && (
                <div className='boardBox'>
                    <b>결제 구분 ({ propertiesList.length })</b>
                    <button className='btn-gray-black' onClick={()=>setPopup({'type': `properties_classification_${classificationActive}`})}>추가</button>
                    {/* <button className='btn-gray-black' 
                        onClick={()=>setPopup({
                            'type': 'finFunc',
                            'title': '선택 삭제',
                            'description': `선택 항목을 삭제하시겠습니까?`
                        })}
                        disabled={!deleteList.length}>선택 삭제</button> */}
                    <BoardChkDelete setPopup={setPopup} deleteList={deleteList}/>

                    <div className='board-top'>
                        {/* <div>
                            <input type="checkbox" id='allChecked' onChange={allChecked}/>
                            <label htmlFor="allChecked"></label>
                        </div> */}
                        <BoardChkAll deleteList={setDeleteList} list={propertiesList.map(({properties_id})=>properties_id)} />
                        <span>구분값</span>
                        <span>수정</span>
                    </div>
                    <ol className="board-center">
                        {propertiesList.map(({properties_id, name})=>(
                            <li key={properties_id}>
                                {/* <div>
                                    <input type="checkbox" id={`${properties_id}`} onChange={lisChecked} checked={deleteList.includes(properties_id)}/>
                                    <label htmlFor={`${properties_id}`}></label>
                                </div> */}
                                <BoardChk id={properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ name }</span>
                                <button className="popup" onClick={()=>setPopup({'type': `properties_properties_${properties_id}`})}>수정</button>
                            </li>
                        ))}
                    </ol>
                    {popup && (
                            <Popup popup={popup} setPopup={setPopup} func={popupFunc} />
                        )}
                </div>
            )}
        </div>
    );
}