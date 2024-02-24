import React, { useEffect, useState } from 'react';
import Select from '../../components/Select';
import { inputChange, isFormet } from '../../api/validation';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import Popup from '../../components/popup/Popup';

export default function ProductUpdate() {
    const [inputs, setInputs] = useState()
    const [popup, setPopup] = useState()
    const [productCode, setProductCode] = useState()
    const [analyst, setAnalyst] = useState()
    const { id } = useParams();

    useEffect(()=>{
        api('product', 'detail', {'product_id': id})
            .then(({result, data})=>{
                if(result){
                    setInputs(data)
                    setProductCode(data.product_code)
                    setAnalyst(data.analyst_admin_name)
                }
            })
    },[id])

    const onChange = (e, setChange) => {
        const { value, dataset: { formet } } = e.target;
        
        if(formet && !!value && !isFormet(formet, value)['is']){
            const cur = e.target.selectionStart - 1;
            e.target.value = isFormet(formet, value)['value'];
            e.target.setSelectionRange(cur, cur);
        }
    
        setChange(e.target.value)
        setInputs((input)=>({...input, 'product_code': ''}))
    }

    const codeCheck = () => {
        api('product', 'duplicate', {'product_code': productCode})
            .then(({result, data: { exist_yn }})=>{
                if(result){
                    setPopup({'type': 'confirm', 'title': '중복확인'})
                    if(exist_yn === 'n'){
                        setPopup((popup)=>({...popup, 'description': '등록 가능한 상품코드입니다.'}))
                        setInputs((input)=>({...input, 'product_code': productCode}))
                    }else{
                        setPopup((popup)=>({...popup, 'description': '이미 존재하는 상품코드입니다.\n다른 코드를 입력하세요.'}))
                    }
                }
            })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        // console.log(inputs);
        if(
            !productCode ||
            !inputs?.product_code ||
            !inputs?.product_name ||
            !inputs?.analyst_admin_id
        ){
            let errorMessage = '';
            if(!productCode){
                errorMessage = '상품코드를 입력해주세요.'
            }else if(!inputs?.product_code){
                errorMessage = '상품코드 중복 확인을 해주세요.'
            }else if(!inputs?.product_name){
                errorMessage = '상품명을 입력해주세요.'
            }else if(!inputs?.analyst_admin_id){
                errorMessage = '애널리스트를 선택해주세요.'
            }
            setPopup({
                'type': 'confirm',
                'title': '실패',
                'description': errorMessage
            })
            return
        }
        api('product', 'update', inputs)
            .then(({result, error_message})=>{
                setPopup({'type': 'confirm', 'description': error_message})
                if(result){
                    setPopup((popup)=>({
                        ...popup,
                        'title': '완료',
                        'link': '/payment/product'
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
            <h2>상품 수정</h2>

            <div className='dropBox'>
                <b>기본 정보</b>
                <form onClick={(e)=>e.preventDefault()}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="product_code" className='required'>상품코드</label>
                                <div>
                                    <input type="text" name='product_code' id='product_code' data-formet="numb" defaultValue={inputs?.product_code} onChange={(e)=>onChange(e, setProductCode)}/>
                                    <button className='btn-gray-black' disabled={!productCode || productCode === inputs?.product_code} onClick={codeCheck}>중복 확인</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="product_name" className='required'>상품명</label>
                                <div>
                                    <input type="text" name='product_name' id='product_name' defaultValue={inputs?.product_name} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="analyst_admin_id" className='required'>애널리스트</label>
                                <div>
                                    <input 
                                        type="search" 
                                        value={analyst || ''}
                                        readOnly
                                        onClick={()=>setPopup({
                                            'type': 'analyst',
                                            'func': (data)=>{
                                                setInputs((input)=>({...input, 'analyst_admin_id': data.admin_id}))
                                                setAnalyst(data.name)
                                            }
                                        })}
                                    />
                                    <button>검색</button>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">결제시 고객구분</label>
                                <div>
                                    <Select type={'customer'} current={inputs?.customer_properties_id} changeName='customer_properties_id' setInputs={setInputs}/>
                                </div>
                            </li>
                            <li className='fill-two'>
                                <label htmlFor="memo">비고</label>
                                <div>
                                    <input type="text" name='memo' id='memo' defaultValue={inputs?.memo} onChange={(e)=>inputChange(e, setInputs)}/>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={'/payment/product'} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="수정" className='btn-point' onClick={onSubmit}/>
                    </div>
                </form>
            </div>
            {popup && (
                <Popup popup={popup} setPopup={setPopup} />
            )}
        </>
    );
}

