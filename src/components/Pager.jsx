import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Pager({ pagerInfo, setInputs }) {
    const queryParams = new URLSearchParams(useLocation().search);
    const page = queryParams.get('page') || 1;

    useEffect(()=>{
        // console.log(pagerInfo);
        console.log(page);
        if(page !== pagerInfo.current_page && page <= pagerInfo.total_page) {
            setInputs((input)=> ({...input, page}));
        }
    },[page, pagerInfo.current_page, pagerInfo.total_page, setInputs])


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
            <Link to={'?page=1'}>첫 페이지</Link>
            <Link to={`?page=${prev}`}>이전 페이지</Link>
            { pager() && 
                <ol>
                    { pager()?.map((numb)=> 
                        <li key={numb} className={numb === pagerInfo.current_page ? 'active' : ''}>
                            <Link to={`?page=${numb}`}>{ numb }</Link>
                        </li>
                    )}
                </ol>
            }
            <Link to={`?page=${next}`}>다음 페이지</Link>
            <Link to={`?page=${pagerInfo?.total_page}`}>마지막 페이지</Link>
        </>
    );
}

