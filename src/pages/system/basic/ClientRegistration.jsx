import React, { useMemo, useState } from 'react';
import Select from '../../../components/Select';
import { Link } from 'react-router-dom';
import { Button, ColorPicker } from 'antd';

export default function ClientRegistration() {
    const [color01, setColor01] = useState('#000000')
    const [color02, setColor02] = useState('#000000')
    const bgColor01 = useMemo(
        () => (typeof color01 === 'string' ? color01 : color01.toHexString()),
        [color01],
    )
    const bgColor02 = useMemo(
        () => (typeof color02 === 'string' ? color02 : color02.toHexString()),
        [color02],
    )
    return (
        <>
            <h2>고객 구분 등록</h2>
            
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
                                <label htmlFor="">고객등급</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">코드(숫자)</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">코드명</label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">배경색상</label>
                                <div>
                                    <ColorPicker value={bgColor01} onChange={setColor01}/>
                                    <input type="text" value={bgColor01} disabled/>
                                    <ColorPicker value={color01} onChange={setColor01}>
                                        <Button className='btn-gray-black'>
                                            색상 선택
                                        </Button>
                                    </ColorPicker>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">폰트색상</label>
                                <div>
                                    <ColorPicker value={bgColor02} onChange={setColor02}/>
                                    <input type="text" value={bgColor02} disabled/>
                                    <ColorPicker value={color02} onChange={setColor02}>
                                        <Button className='btn-gray-black'>
                                            색상 선택
                                        </Button>
                                    </ColorPicker>
                                </div>
                            </li>
                            <li>
                                <label htmlFor="">사용여부</label>
                                <div>
                                    <Select name={''} />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <div>
                        <Link to={''} className='btn-gray-white'>목록</Link>
                        <input type="submit" value="저장" className='btn-point'/>
                    </div>
                </form>
            </div>
        </>
    );
}

