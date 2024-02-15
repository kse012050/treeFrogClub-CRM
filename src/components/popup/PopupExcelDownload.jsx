import React, { useEffect, useState } from 'react';
import Select from '../Select';
import { api } from '../../api/api';

export default function PopupExcelDownload({ close, popup: { total } }) {
    const [unit, setUnit] = useState('1000');
    const [list, setList] = useState()
    // console.log(total);
    // const total = 1002

    useEffect(()=>{
        setList(()=>{
            const arr = []
            for(let a = 1; a <= total; a = a + Number(unit)){
                arr.push({
                    'start': a,
                    'end': (a - 1) + Number(unit) >= total ? total : (a - 1) + Number(unit)
                });
            }
            return arr;
        })
    },[unit, total])

    const onExcelDownload = (start, end) => {
        // console.log('start', start);
        // console.log('end', end);
        // console.log({"download_yn":"y", "excel_start_num": start, "excel_end_num": end});
        api('customer', 'list', {'excel_info': {"download_yn":"y", "excel_start_num": start, "excel_end_num": end}})
            .then(({result, data: { download_url }})=>{
                if(result){
                    // console.log(download_url);
                    window.location.href = download_url
                }
            })
    }

    return (
        <>
            <strong>엑셀 다운로드</strong>
            <span>
                검색된 고객은 1만건 단위로 분할하여 다운로드 가능합니다.<br/>
                데이터가 많은 경우 전체 다운로드는 불가능 할 수 있습니다.<br/>
                (최대 48만건까지 가능)
            </span>
            <div className='excelArea'>
                <b>데이터 단위 선택</b>
                <Select type='excelCount' current={unit || false} setInputs={setUnit}/>
                { list && 
                    <ol className='scroll-width'>
                        { list.map((data)=>
                            <li key={data.start}><button onClick={()=>onExcelDownload(data.start, data.end)}>{ data.start } ~ { data.end }</button></li>
                        )}
                    </ol>
                }
            </div>
        </>
    );
}

