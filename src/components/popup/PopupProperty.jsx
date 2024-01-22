import React, { useState } from 'react';
import { api } from '../../api/api'

function PopupProperty({ popup, close }) {
    const type = popup.type.split('_')[1];
    const [inputs, setInputs] =useState({[`${type}_id`]: popup.type.split('_')[2]});

    const inputChange = (e) => {
        e.preventDefault();
        const { value, name/* , dataset: { formet } */ } = e.target;
    /*     if(formet && value && !formeta(formet, value)){
            e.target.value = value.slice(0, -1)
        } */
        setInputs((input)=> ({...input, [name]: value}))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if('name' in inputs && inputs['name']){
            let test;
            type === 'classification' && (test = 'insert');
            type === 'properties' && (test = 'update');
            api('properties', test, {...inputs})
                .then((result) =>{
                    console.log(result);
                    if(result){
                        close();
                    }
                })
        }
    }

    return (
        <>
            <strong>결제 구분 
                {type === 'classification' && ' 추가'}
                {type === 'properties'&& ' 등록'}
            </strong>
            <b>구분값</b>
            <form>
                <fieldset>
                    <input type="text" name='name' onChange={inputChange}/>
                    <div className='btnArea'>
                        <button className='btn-gray-white' type="button" onClick={close}>취소</button>
                        <input type="submit" className='btn-point' onClick={onSubmit} value={
                            (type === 'classification' ? '저장' : '수정')
                        }/>
                    </div>
                </fieldset>
            </form>
        </>
    );
}


export default PopupProperty