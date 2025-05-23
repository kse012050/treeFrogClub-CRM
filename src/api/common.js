import { api } from '../api/api';

// 로그 - 엑셀 버튼
export const logExcel = (value) =>{
    api('log', 'insert', {'log_type': '엑셀다운로드', 'log_value': value})
    .then(({result})=>{
        if(result){
            // console.log(result);
        }
    })
}

// 로그 - 버튼
export const logButton = (value) =>{
    api('log', 'insert', {'log_type': '버튼클릭', 'log_value': value})
        .then(({result})=>{
            if(result){
                // console.log(result);
            }
        })
}


export const pagePermissionFilter = (user, location) => {
    // console.log(user, location);
    let pageName;
    let subData = {}
    
    if(location === '/main'){
        pageName = '대시보드'
    }else if(location === '/customer/list' || location === '/customer/registration'){
        pageName = '통합고객목록'
        subData = {
            ...subData, 
            // 'bulk_customer_modify':  user.role_list?.filter((data)=>data.screen_name === "고객_대량고객수정")[0]?.insert_yn ?? 'n',
            'bulk_customer_modify':  user.role_list?.filter((data)=>data.screen_name === "통합고객목록")[0]?.insert_yn ?? 'n',
            'bulk_customer_insert':  user.role_list?.filter((data)=>data.screen_name === "통합고객목록")[0]?.insert_yn ?? 'n',
        }
        // console.log(user.role_list);
        // console.log(user.role_list?.filter((data)=>data.screen_name === "통합고객목록")[0]);
    }else if(location === '/payment/list' || location === '/payment/list/registration'){
        pageName = '결제목록'
    }else if(location.includes('/payment/product')){
        pageName = '상품목록'
    }else if(location.includes('/system/basic/anUser')){
        pageName = '사용자목록'
    }else if(location === '/system/basic/bureau'){
        pageName = '부서관리'
    }else if(location.includes('/system/basic/client')){
        pageName = '고객구분관리'
    }else if(location.includes('/system/basic/common')){
        pageName = '공통코드관리'
    }else if(location === '/system/basic/customer'){
        pageName = '고객목록설정'
    }else if(location.includes('/system/basic/property')){
        pageName = '속성값설정'
    }else if(location.includes('/system/grant/management')){
        pageName = '역할관리'
    }else if(location === '/system/grant/permissions'){
        pageName = '역할권한관리'
    }else if(location === '/system/member/connect'){
        pageName = '사용자접속이력'
    }else if(location === '/system/member/delete'){
        pageName = '고객삭제이력'
    }else if(location.includes('/notice')){
        pageName = '공지사항'
    }

    let resultObj;
    // console.log(user);
    // console.log(location);
    // console.log(pageName);
    const superObj = {
        'delete_yn': "y",
        'excel_yn': "y",
        'insert_yn': "y",
        'modify_type': "all",
        'select_type': "all",
        'select_yn': "y",
        'update_yn': "y",
        'bulk_customer_insert': "y",
        'bulk_customer_modify': "y"
    }
    if(location.includes('/customer/registration/update')){
        if(user.type === 'super'){
            resultObj = {
                '통합고객목록': {...superObj},
                '결제목록': {...superObj},
            }
        }else{
            resultObj = {
                '통합고객목록': {...user.role_list?.filter((data)=>data?.screen_name === '통합고객목록')[0]},
                '결제목록': {...user.role_list?.filter((data)=>data?.screen_name === '결제목록')[0]},
            }
        }
    }else if(user.type === 'super'){
        resultObj = {...superObj}
    }else if(location === '/statistics/account' || location === '/statistics/campaign' || location === '/statistics/sales'){
        resultObj = {'select_yn': "y"}
    }else if(user.role_list?.length){ 
        // console.log(user);
        // console.log(pageName);
        // console.log(user.role_list?.filter((data)=>data?.screen_name === pageName)[0]);
        resultObj = {...user.role_list?.filter((data)=>data?.screen_name === pageName)[0], ...subData}
        // console.log(resultObj);
    }
    // console.log(resultObj);
    return resultObj

    // if(user){
    //     console.log(user);
    //     console.log(user.role_list);
    //     return user.type !== 'super' ?
    //         {...user.role_list?.filter((data)=>data?.screen_name === pageName)[0], ...subData} :
    //         {
    //             'delete_yn': "y",
    //             'excel_yn': "y",
    //             'insert_yn': "y",
    //             'modify_type': "all",
    //             'select_type': "all",
    //             'select_yn': "y",
    //             'update_yn': "y",
    //             'bulk_customer_insert': "y",
    //             'bulk_customer_modify': "y"
    //         }
    //     }
}