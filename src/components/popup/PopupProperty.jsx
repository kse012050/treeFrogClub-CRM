import React, { useState } from 'react';
import { inputChange } from '../../api/validation';
import { api } from '../../api/api'

function PopupProperty({ popup, close }) {
    const type = popup.type.split('_').at(-1);
    const [inputs, setInputs] =useState({
        [`${type === 'registration' ? 'classification' : 'properties'}_id`]: popup.id,
        'name': popup.value
    });

    // const inputChange = (e) => {
    //     e.preventDefault();
    //     const { value, name/* , dataset: { formet } */ } = e.target;
    // /*     if(formet && value && !formeta(formet, value)){
    //         e.target.value = value.slice(0, -1)
    //     } */
    //     setInputs((input)=> ({...input, [name]: value}))
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        if('name' in inputs && inputs['name']){
            let test;
            type === 'registration' && (test = 'insert');
            type === 'update' && (test = 'update');
            api('properties', test, {...inputs})
                .then((result) =>{
                    if(result){
                        close();
                        popup.func()
                    }
                })
        }
    }

    return (
        <>
            <strong>결제 구분 
                {type === 'registration' && ' 추가'}
                {type === 'update'&& ' 수정'}
            </strong>
            <b>구분값</b>
            <form>
                <fieldset>
                    <input type="text" name='name' defaultValue={type === 'update' ? popup.value : ''} onChange={(e)=>inputChange(e, setInputs)}/>
                    <div className='btnArea-end'>
                        { type === 'update' && <button className='btn-gray-white' type="button" onClick={close}>취소</button> }
                        <input type="submit" className='btn-point' onClick={onSubmit} value={
                            (type === 'registration' ? '저장' : '수정')
                        }/>
                    </div>
                </fieldset>
            </form>
        </>
    );
}


export default PopupProperty