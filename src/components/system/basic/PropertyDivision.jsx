import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api'
import Popup from '../../popup/Popup';


export default function PropertyDivision() {
    const [classificationActive, setClassificationctive] = useState()

    return (
        <div className='divisionArea horizontalTwo'>
            <ClassificationList classificationActive={classificationActive} setClassificationctive={setClassificationctive}/>
            <Board classificationActive={classificationActive}/>
        </div>
    );
}


function ClassificationList({classificationActive, setClassificationctive}){
    const [classificationList, setClassificationList] = useState([])
    useEffect(()=>{
        api('properties', 'classification_list')
            .then(({result, list}) => {
                if(result){
                    setClassificationList(list);
                    setClassificationctive(list[0].classification_id)
                }
            })
    },[setClassificationctive])
    return (
        <div>
            {classificationList.map(({classification_id, name, properties_count})=>
                <button key={classification_id} className={classification_id === classificationActive ? 'active' : ''} onClick={()=>setClassificationctive(classification_id)}>
                    {name} ({properties_count})
                </button>
            )}
        </div>
    )
}

function Board({ classificationActive }){
    const [propertiesList, setPropertiesist] = useState([])
    const [popup, setPopup] = useState();

    useEffect(()=>{
        if(classificationActive){
            api('properties', 'properties_list', {classification_id: classificationActive})
                .then(({result, list})=>{
                    if(result){
                        setPropertiesist(list)
                    }
                })
        }
    },[classificationActive])
    return (
        <>
            <div className='boardBox'>
                <b>결제 구분 (6)</b>
                <button className='btn-gray-black' onClick={()=>setPopup('property_add')}>추가</button>
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
                    {propertiesList.map(({properties_id, name})=>(
                        <li key={properties_id}>
                            <div>
                                <input type="checkbox" id={properties_id}/>
                                <label htmlFor={properties_id}></label>
                            </div>
                            <span>{ name }</span>
                            <button className="popup">수정</button>
                        </li>
                    ))}
                </ol>
            </div>
            {popup && <Popup active={setPopup}/>}
        </>
    )
}