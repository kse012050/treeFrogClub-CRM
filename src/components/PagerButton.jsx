import React from 'react';

export default function PagerButton({ pagerInfo, setInputs }) {

    const pager = () =>{
        let arr = []
        const base = parseInt(pagerInfo?.current_page / 10) * 10;
        const start = base + 1;
        const end = base + 11 > pagerInfo?.total_page ? pagerInfo?.total_page : base + 10;
        for(let i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    }
    const prev = pagerInfo?.current_page > 1 ? pagerInfo?.current_page - 1 : 1;
    const next = pagerInfo?.current_page < pagerInfo?.total_page ? pagerInfo?.current_page + 1 : pagerInfo?.total_page;

    return (
        <>  
            <button onClick={()=>setInputs((input)=>({...input, 'page': '1'}))}>첫 페이지</button>
            <button onClick={()=>setInputs((input)=>({...input, 'page': prev}))}>이전 페이지</button>
            { pager() && 
                <ol>
                    { pager()?.map((numb)=> 
                        <li key={numb} className={numb === pagerInfo.current_page ? 'active' : ''}>
                            <button onClick={()=>setInputs((input)=>({...input, 'page': numb}))}>{ numb }</button>
                        </li>
                    )}
                </ol>
            }
            <button onClick={()=>setInputs((input)=>({...input, 'page': next}))}>다음 페이지</button>
            <button onClick={()=>setInputs((input)=>({...input, 'page': pagerInfo?.total_page}))}>마지막 페이지</button>
        </>
    );
}

