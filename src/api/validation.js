const formetMap = {
    id(value) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;<>,.?~\\/-]*$/;
        return regex.test(value);
    },
    numb(value) {
        const regex = /^[0-9]+$/;
        // console.log(regex.test(value));
        // return regex.test(value);
        // console.log(regex.test(value));
        return {
            is: regex.test(value),
            value: Number(value.replace(/\D/g, ''))
        };
    }
}

export function isFormet(type, value){
    return Object.keys(formetMap).includes(type) && formetMap[type](value);
}
