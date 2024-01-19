// const userIp = process.env.REACT_APP_IP
// const serviceKey = process.env.REACT_APP_SERVICE_KEY
// const authorization = process.env.REACT_APP_AUTHORIZATION

// console.log(userIp);
// console.log(serviceKey);
// console.log(authorization);


// function headeers(){

// }

export function login(){
  var myHeaders = new Headers();
  myHeaders.append("Service-Key", "0fc708856322c7fda00a341b26bed1741acf967a7f16ecc8d8f9ebc12e745a39");
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", "Bearer eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57ImV4cCI6MTcwNjM3MTE0MywiaWF0IjoxNzA1NTA3MTQzLCJhZG1pbl9pZCI6IjEifS40MTYyZDBhN2JmNmRjNjNjODg4ZWRiOTkyNTA5YjBjZmIyOGI2YWMzYTE1OTFiZGExNTNhZjM0YzkzNTY4NTU0");
  // myHeaders.append("Cookie", "PHPSESSID=2f72304fb554ad097b652c7e55ab78e6");
  
  var raw = JSON.stringify({
    "id": "admin",
    "password": "admin1234",
    "ip": "12.133.12.145",
    "user-agent": ""
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://3.36.55.143/api/web/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}