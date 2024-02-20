
const apiUrl = 'http://3.36.55.143/api/web/'
const serviceKey = "0fc708856322c7fda00a341b26bed1741acf967a7f16ecc8d8f9ebc12e745a39";
const ip = '12.133.12.145'

function common(type, data){
    const headers = new Headers();
    headers.append("Service-Key", serviceKey);
    headers.append("Content-Type", "application/json");
    
    sessionStorage.getItem('authorization') && headers.append("Authorization", `Bearer ${sessionStorage.getItem('authorization')}`);
    type && (data = {...data, 'func_type': type});
    
    // data = {...data, 'ip': ip, 'user-agent': ''};
    data = JSON.stringify(data)

    return {
        method: 'POST',
        headers: headers,
        body: data,
    }

}

export function logout(){
    api('profile', 'logout')
        .then((result)=>{
            if(result){
                sessionStorage.removeItem('authorization')
                window.location.href = '/'
            }
        })
}

export function api(url, type, data){
    const options = common(type, data);
    // console.log(url);
    // console.log(type);
    // console.log(data);
    // console.log(options);
    return fetch(`${apiUrl}${url}`, options)
            .then(response => response.json())
            .catch(error => console.log('error', error));
}

export function apiAwait(url, type, dataName, data){
    return Promise.all(data.map((id)=>api(url, type, {[dataName] : id})))
            .then((result)=> result)
            .catch(error => console.log('error', error));
}

export function apiFile(url, type, data, name){
    const headers = new Headers();
    headers.append("Service-Key", serviceKey);
    sessionStorage.getItem('authorization') && headers.append("Authorization", `Bearer ${sessionStorage.getItem('authorization')}`);
    
    var formdata = new FormData();
    formdata.append("ip", ip);
    formdata.append("func_type", type);
    Object.entries(data).forEach(([key, value]) =>{
        formdata.append(key, value, name);
    })

    const options = {
        method: 'POST',
        headers: headers,
        body: formdata,
    }
    
    return fetch(`${apiUrl}${url}`, options)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

