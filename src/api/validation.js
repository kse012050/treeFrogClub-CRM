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
        if(value){
            setInputs((input)=> ({...input, [name]: e.target.value}))
        }else{
            setInputs((input)=>{
                const copy = {...input}
                delete copy[name]
                return copy
            })
        }
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