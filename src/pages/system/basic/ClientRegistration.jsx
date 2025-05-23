import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../api/api'
import { inputChange, isFormet } from '../../../api/validation'
import { Button, ColorPicker } from 'antd';
import Select from '../../../components/Select';
import SubTitle from '../../../components/SubTitle';
import Popup from '../../../components/popup/Popup';
import { logButton } from '../../../api/common';
import { UserContext } from '../../../context/UserContext';

export default function ClientRegistration() {
    // order_number 없어야 하는데 api에 있어서 일단 추가
    const { pagePermission } = useContext(UserContext)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState()
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
        if(pagePermission?.insert_yn && pagePermission?.insert_yn !== 'y'){
            navigate('/main')
        }
    },[pagePermission?.insert_yn, navigate])

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
        // console.log(inputs);
        if(
            !inputs?.classification_id ||
            !inputs?.grade ||
            !inputs?.code ||
            !inputs?.name ||
            !inputs?.order_number
        ){
            let errorMessage = '';
            if(!inputs?.classification_id){
                errorMessage = '분류 유형명을 선택해주세요.'
            }else if(!inputs?.grade){
                errorMessage = '고객등록을 선택해주세요.'
            }else if(!inputs?.code){
                errorMessage = '코드(숫자)을 선택해주세요.'
            }else if(!inputs?.name){
                errorMessage = '코드명을 입력해주세요.'
            }else if(!inputs?.order_number){
                errorMessage = '정렬 순서를 입력해주세요..'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        api('clientcode', 'insert', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/system/basic/client'
                    }))
                    logButton('고객 구분 등록(저장)')
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
                                <label htmlFor="" className='required'>분류 유형명</label>
                                <div>
                                    <Select type={'clientClassification'} changeName='classification_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="grade" className='required'>고객등급</label>
                                <div>
                                    <Select type={'clientGrade'} changeName='grade'  setInputs={setInputs}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="code" className='required'>코드(숫자)</label>
                                <div>
                                    <input type="text" id='code' name='code' data-formet='numb' onChange={(e)=>inputChange(e, setInputs)} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="name" className='required'>코드명</label>
                                <div>
                                    <input type="text" id='name' name='name' onChange={(e)=>inputChange(e, setInputs)} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="" className='required'>배경색상</label>
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
                                <label htmlFor="" className='required'>폰트색상</label>
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
                                <label htmlFor="order_number" className='required'>정렬 순서</label>
                                <div>
                                    <input type="text" id='order_number' name='order_number' onChange={(e)=>inputChange(e, setInputs)} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용여부</label>
                                <div>
                                    <Select type='yn' changeName='useable_yn' setInputs={setInputs} current/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={'/system/basic/client'} className='btn-gray-white'>목록</Link>
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

