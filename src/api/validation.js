const formetMap = {
    id(value) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;<>,.?~\\/-]*$/;
        return regex.test(value);
    }
}

export function formeta(type, value){
    return Object.keys(formetMap).includes(type) && formetMap[type](value);
}
