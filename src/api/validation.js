const formetMap = {
    id(value) {
        // const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        const regex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"]*$/;
        return {
            is: regex.test(value),
            value: /^\d/.test(value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')) ? value.slice(1) : value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')
        };
    },
    numb(value) {
        const regex = /^[0-9]+$/;
        return {
            is: regex.test(value),
            // value: Number(value.replace(/\D/g, ''))
            value: value.replace(/\D/g, '')
        };
    },
    color(value){
        const regex = /^#[0-9a-f]+$/i;
        return {
            is: regex.test(value),
            value: value.replace(/^[^#]|[^0-9a-f]/gi, '')
        }
    },
    ip(value){
        const regex = /^[0-9.]+$/;
        return {
            is: regex.test(value),
            value: value.replace(/[^0-9.]/g, '')
        }
    }
}

export function isFormet(type, value){
    return Object.keys(formetMap).includes(type) && formetMap[type](value);
}

export const onChange = (e, setChange) => {
    const { value, dataset: { formet } } = e.target;
    
    if(formet && !!value && !isFormet(formet, value)['is']){
        const cur = e.target.selectionStart - 1;
        e.target.value = isFormet(formet, value)['value'];
        e.target.setSelectionRange(cur, cur);
    }

    setChange(e.target.value)
}


export const inputChange = (e, setInputs) => {
    const { value, name, checked, type, dataset: { formet } } = e.target;
    // console.log(isFormet(formet, value)['is']);
    // console.log(isFormet(formet, value)['value']);
    if(formet && !!value && !isFormet(formet, value)['is']){
        const cur = e.target.selectionStart - 1;
        e.target.value = isFormet(formet, value)['value'];
        e.target.setSelectionRange(cur, cur);
    }
    
    if(type === 'checkbox'){
        setInputs((input)=> ({...input, [name]: checked ? 'y': 'n'}))
    }else{
        setInputs((input)=> ({...input, [name]: e.target.value}))
        // if(value){
        //     setInputs((input)=> ({...input, [name]: e.target.value}))
        // }else{
        //     setInputs((input)=>{
        //         const copy = {...input}
        //         delete copy[name]
        //         return copy
        //     })
        // }
    }
}

export const arrayChange = (e, setInputs) => {
    const { value, name } = e.target;
    setInputs((input)=>{
        let copy;
        input[name] ? (copy = [...input[name]]) : (copy = []);
        copy.includes(value) ? (copy = copy.filter((arr)=> arr !== value)) : copy.push(value);
        return {...input, [name]: copy};
    })
}

export const parentsChange = (e, setInputs) => {
    const { value, dataset: { parents, name } } = e.target;
    setInputs((input)=>({...input, [parents]: {...input[parents], [name]: value}}))
}

export const numberWithCommas = (number) => {
    number = number + ''
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const onSort = (setBoardList, name, is) =>{
    setBoardList((data)=>{
        let copy = [...data]
        const except = copy.filter((data2) =>{
            let bool;
            bool = data2[name] === null || data2[name] === undefined
            if(is){
                bool = data2[is] === 'n'
            }
            return bool
        })
        copy = copy.filter((data2) => {
            let bool = data2[name] !== null && data2[name] !== undefined
            if(is){
                bool = data2[is] === 'y'
            }
            return bool
        })
        if(copy.length){  
            if(copy[0][name].split('').map(char => char.charCodeAt(0)).join('') > copy.at(-1)[name].split('').map(char => char.charCodeAt(0)).join('')){
                copy = copy.sort((a, b) => {
                    const isANumberA = !isNaN(Number(a[name]));
                    const isANumberB = !isNaN(Number(b[name]));
                    if (isANumberA && isANumberB) {
                        // return formatPhoneNumber(a[name]).localeCompare(formatPhoneNumber(b[name]));
                        return a[name] - b[name];
                    } else {
                        // console.log(2);
                        return a[name].toString().localeCompare(b[name].toString());
                        // return a[name].localeCompare(b[name]);
                    }
                })
            }else{
                copy = copy.sort((a, b) => {
                    const isANumberA = !isNaN(Number(a[name]));
                    const isANumberB = !isNaN(Number(b[name]));
                    if (isANumberA && isANumberB) {
                        // return formatPhoneNumber(b[name]).localeCompare(formatPhoneNumber(a[name]));
                        return b[name] - a[name];
                    } else {
                        return b[name].toString().localeCompare(a[name].toString());
                    }
                })
            }
        }

        return [...copy, ...except];
    })
}

export const onSortReverse = (setBoardList, name, is) =>{
    setBoardList((data)=>{
        let copy = [...data]
        const except = copy.filter((data2) =>{
            let bool;
            bool = data2[name] === null || data2[name] === undefined
            if(is){
                bool = data2[is] === 'n'
            }
            return bool
        })
        copy = copy.filter((data2) => {
            let bool = data2[name] !== null && data2[name] !== undefined
            if(is){
                bool = data2[is] === 'y'
            }
            return bool
        })
        if(copy.length){  
            if(copy[0][name].split('').map(char => char.charCodeAt(0)).join('') < copy.at(-1)[name].split('').map(char => char.charCodeAt(0)).join('')){
                copy = copy.sort((a, b) => {
                    const isANumberA = !isNaN(Number(a[name]));
                    const isANumberB = !isNaN(Number(b[name]));
                    if (isANumberA && isANumberB) {
                        return a[name] - b[name];
                    } else {
                        return a[name].toString().localeCompare(b[name].toString());
                    }
                })
            }else{
                copy = copy.sort((a, b) => {
                    const isANumberA = !isNaN(Number(a[name]));
                    const isANumberB = !isNaN(Number(b[name]));
                    if (isANumberA && isANumberB) {
                        return b[name] - a[name];
                    } else {
                        return b[name].toString().localeCompare(a[name].toString());
                    }
                })
            }
        }

        return [...copy, ...except];
    })
}