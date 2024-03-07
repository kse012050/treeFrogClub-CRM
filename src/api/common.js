import { api } from '../api/api';


export const logExcel = (value) =>{
    api('log', 'insert', {'log_type': '엑셀다운로드', 'log_value': value})
        .then(({result})=>{
            if(result){
                // console.log(result);
            }
        })
}

export const logButton = (value) =>{
    api('log', 'insert', {'log_type': '버튼클릭', 'log_value': value})
        .then(({result})=>{
            if(result){
                // console.log(result);
            }
        })
}