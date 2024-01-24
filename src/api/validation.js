const formetMap = {
    id(value) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;<>,.?~\\/-]*$/;
        return {
            is: regex.test(value),
            value: value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')
        };
    },
    numb(value) {
        const regex = /^[0-9]+$/;
        return {
            is: regex.test(value),
            value: Number(value.replace(/\D/g, ''))
        };
    }
}

export function isFormet(type, value){
    return Object.keys(formetMap).includes(type) && formetMap[type](value);
}


export const inputChange = (e, setInputs) => {
    const { value, name, dataset: { formet } } = e.target;
    if(formet && !!value && !isFormet(formet, value)['is']){
        console.log('?');
        const cur = e.target.selectionStart - 1;
        e.target.value = isFormet(formet, value)['value'];
        e.target.setSelectionRange(cur, cur);
    }
    setInputs((input)=> ({...input, [name]: e.target.value}))
}