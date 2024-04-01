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
    }else if(location === '/customer/list' || location === '/customer/list' || location.includes('/customer/registration')){
        pageName = '통합고객목록'
        subData = {
            ...subData, 
            'bulk_customer_modify':  user.role_list?.filter((data)=>data.screen_name === "고객_대량고객수정")[0]?.insert_yn ?? 'n',
        }
    }else if(location === '/payment/list' || location === '/payment/list/registration'){
        pageName = '결제목록'
    }else if(location === '/payment/product' || location === '/payment/product/registration' || location.includes('/payment/product/update')){
        pageName = '상품목록'
    }else if(location === '/system/basic/anUser' || location === '/system/basic/anUser/registration' || location.includes('/system/basic/anUser/update')){
        pageName = '사용자목록'
    }else if(location === '/system/basic/bureau'){
        pageName = '사용자_부서관리'
    }else if(location === '/system/basic/client'){
        pageName = '고객구분관리'
    }else if(location === '/system/basic/common'){
        pageName = '코드관리'
    }else if(location === '/system/basic/customer'){
        pageName = '고객목록관리'
    }else if(location === '/system/grant/management'){
        pageName = '역할목록'
    }else if(location === '/system/grant/permissions'){
        pageName = '역할권한관리'
    }else if(location === '/system/member/connect'){
        pageName = '사용자_사용자접속이력'
    }else if(location === '/system/member/delete'){
        pageName = '고객삭제이력'
    }else if(location === '/notice'){
        pageName = '공지사항관리 목록'
    }else if(location.includes('notice/update/')){
        pageName = '공지사항관리 목록'
    }

    let resultObj;
    if(user.type === 'super'){
        resultObj = {
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
    }else if(location === '/system/basic/property' || location === '/statistics/account' || location === '/statistics/campaign' || location === '/statistics/sales'){
        resultObj = {'select_yn': "y"}
    }else if(user.role_list.length){ 
        // console.log(user);
        // console.log(pageName);
        resultObj = {...user.role_list?.filter((data)=>data?.screen_name === pageName)[0], ...subData}
        // console.log(resultObj);
    }
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