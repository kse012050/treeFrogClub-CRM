// const userIp = process.env.REACT_APP_IP
// const serviceKey = process.env.REACT_APP_SERVICE_KEY
// const authorization = process.env.REACT_APP_AUTHORIZATION

// console.log(userIp);
// console.log(serviceKey);
// console.log(authorization);
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

function common(data){
    const headers = new Headers();
    headers.append("Service-Key", serviceKey);
    headers.append("Content-Type", "application/json");

    data = JSON.stringify({...data, 'ip': '12.133.12.145', 'user-agent': ''})

    return {
        method: 'POST',
        headers: headers,
        body: data,
    }

}

export function login(data){
    const options = common(data);
  
    return fetch("http://3.36.55.143/api/web/login", options)
            .then(response => response.json())
            .catch(error => console.log('error', error));
}