import React, { useState } from 'react';

export default function Test() {
    // const [arr, setArr] = useState(['김성은','2023-02-01', '3', '5', '하하하'])
    // const [arr, setArr] = useState(['1','10', '11', '9', '50'])
    const [arr, setArr] = useState(['김성은','2023-02-01', '2023-03-01', '3', '5', '하하하', '1','10', '11', '9', '50'] )

    const clickTest = () =>{
        setArr((data)=>{
            const copy = [...data].sort((a, b) => {
                return a.toString().localeCompare(b.toString());
            })
            return copy;
        })
    }

    const clickTest2 = () =>{
        setArr((data)=>{
            const copy = [...data].sort((a, b) => {
                return b.toString().localeCompare(a.toString());
            })
            return copy;
        })
    }

    const clickTest3 = () =>{
        if(arr[0] > arr.at(-1)){
            setArr((data)=>{
                const copy = [...data].sort((a, b) => {
                    const isANumber = !isNaN(Number(a)) && !isNaN(Number(b));

                    if (isANumber) {
                        return Number(a) - Number(b);
                    } else {
                        return a.toString().localeCompare(b.toString());
                    }
                })
                return copy;
            })
        }else{
            setArr((data)=>{
                const copy = [...data].sort((a, b) => {
                    const isANumber = !isNaN(Number(a)) && !isNaN(Number(b));

                    if (isANumber) {
                        return Number(b) - Number(a);
                    } else {
                        return b.toString().localeCompare(a.toString());
                    }
                })
                return copy;
            })
        }
        // setArr((data)=>{
        //     const copy = [...data].sort((a, b) => {
        //         return b.toString().localeCompare(a.toString());
        //     })
        //     return copy;
        // })
    }

    return (
        <div>
            <button onClick={clickTest}>버튼</button>
            <button onClick={clickTest2}>버튼</button>
            <button onClick={clickTest3}>버튼</button>

            { arr &&
                <ul>
                    { arr.map((data, i)=>
                        <li key={i}>
                            { data } { i }
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}

