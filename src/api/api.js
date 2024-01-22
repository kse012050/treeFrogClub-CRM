// const userIp = process.env.REACT_APP_IP
// const serviceKey = process.env.REACT_APP_SERVICE_KEY
// const authorization = process.env.REACT_APP_AUTHORIZATION

// console.log(userIp);
// console.log(serviceKey);
// console.log(authorization);
const apiUrl = 'http://3.36.55.143/api/web/'
const serviceKey = "0fc708856322c7fda00a341b26bed1741acf967a7f16ecc8d8f9ebc12e745a39";

// function commonHeaders(){
//     const headers = new Headers();
//     headers.append("Service-Key", serviceKey);
//     headers.append("Content-Type", "application/json");
//     return headers;
// }

// function commonData(data){
//     return data = JSON.stringfy({...data, ['ip']: '12.133.12.145', ['user-agent']: ''});
// }

function common(type, data){
    const headers = new Headers();
    headers.append("Service-Key", serviceKey);
    headers.append("Content-Type", "application/json");
    
    sessionStorage.getItem('authorization') && headers.append("Authorization", `Bearer ${sessionStorage.getItem('authorization')}`);
    type && (data = {...data, 'func_type': type});
    
    data = {...data, 'ip': '12.133.12.145', 'user-agent': ''};
    data = JSON.stringify(data)

    return {
        method: 'POST',
        headers: headers,
        body: data,
    }

}

export function login(data){
    const options = common(data);
  
    return fetch(`${apiUrl}login`, options)
            .then(response => response.json())
            .catch(error => console.log('error', error));
}

export function api(url, type, data){
    const options = common(type, data);
  
    return fetch(`${apiUrl}${url}`, options)
            .then(response => response.json())
            .catch(error => console.log('error', error));
}