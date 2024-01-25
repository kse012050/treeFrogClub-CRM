import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from '../../../components/Select';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api'
import { inputChange, isFormet } from '../../../api/validation'
import { Button, ColorPicker } from 'antd';
import SubTitle from '../../../components/SubTitle';
import Popup from '../../../components/popup/Popup';

export default function ClientRegistration() {
    // order_number 없어야 하는데 api에 있어서 일단 추가
    const [inputs, setInputs] = useState({'classification_id': '1', 'useable_yn': 'Y', 'order_number': '1'})
    const [popup, setPopup] = useState('')
    const [bgColor, setBgColor] = useState('#000000')
    const [fontColor, setFontColor] = useState('#000000')
    const bgColorRef = useRef();
    const fontColorRef = useRef();
    const bgColorChange = useMemo(
        () => (typeof bgColor === 'string' ? bgColor : bgColor.toHexString()),
        [bgColor],
    )
    const fontColorChange = useMemo(
        () => (typeof fontColor === 'string' ? fontColor : fontColor.toHexString()),
        [fontColor],
    )

    useEffect(()=>{
        setInputs((input)=> ({...input, 'bg_color': bgColorChange}))
        bgColorRef.current.value = bgColorChange;
    },[bgColorChange])

    useEffect(()=>{
        setInputs((input)=> ({...input, 'font_color': fontColorChange}))
        fontColorRef.current.value = fontColorChange;
    },[fontColorChange])

    const colorChange = (e) => {
        const { value, name, dataset: { formet } } = e.target;
        
        if(!isFormet(formet, value)['is']){
            const cur = e.target.selectionStart;
            e.target.value = '#' + isFormet(formet, value)['value'];
            e.target.setSelectionRange(cur, cur);
        }
        
        if(value.length <= 0){
            e.target.value = '#'
            e.target.setSelectionRange(1, 1);
        }
        if(value.length === 7){
            name === 'bg_color' && setBgColor(`#${isFormet(formet, value)['value']}`)
            name === 'font_color' && setFontColor(`#${isFormet(formet, value)['value']}`)
        }
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(inputs);
        api('clientcode', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/system/basic/client'
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
            <SubTitle text='고객 구분 등록' />
            
            <div className="dropBox">
                <b>고객 구분</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="">분류 유형명</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="grade">고객등급</label>
                                <div>
                                    <Select name={'clientRating'} current={inputs.grade}  setInputs={setInputs} changeName='grade'/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="code">코드(숫자)</label>
                                <div>
                                    <input type="text" id='code' name='code' onChange={(e)=>inputChange(e, setInputs)} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="name">코드명</label>
                                <div>
                                    <input type="text" id='name' name='name' onChange={(e)=>inputChange(e, setInputs)} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">배경색상</label>
                                <div>
                                    <ColorPicker value={bgColor} name='bg_color' onChange={setBgColor}/>
                                    <input type="text" id='bg_color' name='bg_color' defaultValue={bgColor} data-formet="color" onChange={colorChange} ref={bgColorRef} maxLength='7'/>
                                    <ColorPicker value={bgColor} onChange={setBgColor}>
                                        <Button className='btn-gray-black'>
                                            색상 선택
                                        </Button>
                                    </ColorPicker>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">폰트색상</label>
                                <div>
                                    <ColorPicker value={fontColor} onChange={setFontColor}/>
                                    <input type="text" id='font_color' name='font_color' defaultValue={fontColor} data-formet="color" onChange={colorChange} ref={fontColorRef} maxLength='7'/>
                                    <ColorPicker value={fontColor} onChange={setFontColor}>
                                        <Button className='btn-gray-black'>
                                            색상 선택
                                        </Button>
                                    </ColorPicker>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용여부</label>
                                <div>
                                    <Select name='yn' current={inputs.useable_yn} setInputs={setInputs} changeName='useable_yn'/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={''} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="저장" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

