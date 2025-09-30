
const apiUrl = `${process.env.REACT_APP_API_URL}/api/web/`
const serviceKey = `${process.env.REACT_APP_SERVICE_KEY}`;
const ip = `${process.env.REACT_APP_IP}`

// console.log(process.env.REACT_APP_API_URL);

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

