import React, { useEffect, useState } from 'react';
import { api, apiAwait } from '../../../api/api'
import Popup from '../../popup/Popup';


export default function PropertyDivision() {
    const [classificationActive, setClassificationctive] = useState()

    return (
        <div className='divisionArea horizontalTwo'>
            <ClassificationList classificationActive={classificationActive} setClassificationctive={setClassificationctive}/>
            {classificationActive && <Board classificationActive={classificationActive}/>}
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
    const [propertiesList, setPropertiesist] = useState()
    const [deleteList, setDeleteList] = useState([]);
    const [popup, setPopup] = useState('');
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

    const allChecked = (e) => {
        const { checked } = e.target;
        if(checked){
            setDeleteList(propertiesList.map(({properties_id})=>properties_id))
        }else{
            setDeleteList([]);
        }
    }

    const listClick = (e) =>{
        const { checked, id } = e.target;
        setDeleteList((list)=>{
            checked ? 
                (list = [...list, id]) :
                (list = list.filter((listId)=> listId !== id));
            return list
        })
    }

    // const popupFunc = () =>{
    const popupFunc = async () =>{
        if(deleteList.length){
            
            // deleteList.forEach((id)=>{
            //    test(id)
            // })
         /*    for (const id of deleteList) {
                await test(id).then(result=>console.log(result));
            } */
            // console.log('??');

            // new Promise.all(deleteList.map((id)=>api('properties', 'delete', {'properties_id': id})))
            apiAwait('properties', 'delete', 'properties_id', deleteList).then((result)=>{
                // console.log(result);
            })
        }
    }

    // function test(){
    //     return Promise.all(deleteList.map((id)=>api('properties', 'delete', {'properties_id': id})))
    //         .then((result)=> {
    //             console.log(result);
    //             return result;
    //         });
    // }

   /*  const test = async (id) => {
        try {
          const result = await api('properties', 'delete', {'properties_id': id});
          console.log(result);
          return true;
        } catch (error) {
          console.error(error);
        }
    }; */

    return (
        <>
            {propertiesList && 
                <>
                    <div className='boardBox'>
                        <b>결제 구분 (6)</b>
                        <button className='btn-gray-black' onClick={()=>setPopup({'type': `properties_classification_${classificationActive}`})}>추가</button>
                        <button className='btn-gray-black' 
                            onClick={()=>setPopup({
                                'type': 'finFunc',
                                'title': '선택 삭제',
                                'description': `선택 항목을 삭제하시겠습니까?`
                            })}
                            disabled={!deleteList.length}>선택 삭제</button>

                        <div className='board-top'>
                            <div>
                                <input type="checkbox" id='allChecked' onChange={allChecked}/>
                                <label htmlFor="allChecked"></label>
                            </div>
                            <span>구분값</span>
                            <span>수정</span>
                        </div>
                        <ol className="board-center">
                            {propertiesList.map(({properties_id, name})=>(
                                <li key={properties_id}>
                                    <div>
                                        <input type="checkbox" id={`${properties_id}`} onChange={listClick} checked={deleteList.includes(properties_id)}/>
                                        <label htmlFor={`${properties_id}`}></label>
                                    </div>
                                    <span>{ name } {deleteList.includes(properties_id) + ''}</span>
                                    <button className="popup" onClick={()=>setPopup({'type': `properties_properties_${properties_id}`})}>수정</button>
                                </li>
                            ))}
                        </ol>
                    </div>
                    { 
                        popup && (
                                <Popup popup={popup} setPopup={setPopup} func={popupFunc} />
                            )
                    }
                </>
            }
        </>
    )
}