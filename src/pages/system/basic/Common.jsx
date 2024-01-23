import React, { useEffect, useState } from 'react';

export default function Common() {
    const [test1, setTest1] = useState();
    const [test2, setTest2] = useState();
    console.log('test');
    useEffect(()=>{
        setTest1('test')
        setTest2('test')
    },[])
    return (
        <div>
            공통 코드 관리
        </div>
    );
}

