import React, { useEffect, useMemo, useState } from 'react';
import { api, apiAwait } from '../../../api/api'
import Popup from '../../popup/Popup';
import BoardChk from '../../boardChk/BoardChk';
import BoardChkAll from '../../boardChk/BoardChkAll';
import BoardChkDelete from '../../boardChk/BoardChkDelete';


export default function PropertyDivision() {
    const [classificationActive, setClassificationctive] = useState()
    const [classificationList, setClassificationList] = useState([])
    const [propertiesList, setPropertiesist] = useState()
    const [deleteList, setDeleteList] = useState('')
    const [popup, setPopup] = useState('')
    
    useEffect(()=>{
        if(!deleteList || !popup){
            api('properties', 'classification_list')
            .then(({result, list}) => {
                if(result){
                    setClassificationList(list);
                    setClassificationctive((value)=> value || list[0].classification_id)
                }
            })
        }
    },[setClassificationctive, popup, deleteList])

    useEffect(()=>{
        if(classificationActive || !deleteList || !popup){
            api('properties', 'properties_list', {classification_id: classificationActive})
                .then(({result, list})=>{
                    if(result){
                        setPropertiesist(list)
                    }
                })
        }
    },[classificationActive, deleteList, popup])

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
                    <BoardChkDelete url='properties' idName='properties_id' deleteList={deleteList} setDeleteList={setDeleteList} isAwait/>

                    <div className='board-top'>
                        <BoardChkAll deleteList={setDeleteList} list={propertiesList.map(({properties_id})=>properties_id)} />
                        <span>구분값</span>
                        <span>수정</span>
                    </div>
                    <ol className="board-center">
                        {propertiesList.map(({properties_id, name})=>(
                            <li key={properties_id}>
                                <BoardChk id={properties_id} deleteList={deleteList} setDeleteList={setDeleteList}/>
                                <span>{ name }</span>
                                <button className="popup" onClick={()=>setPopup({'type': `properties_properties_${properties_id}`})}>수정</button>
                            </li>
                        ))}
                    </ol>
                    {popup && (
                        <Popup popup={popup} setPopup={setPopup} />
                    )}
                </div>
            )}
        </div>
    );
}