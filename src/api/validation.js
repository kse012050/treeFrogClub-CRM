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
