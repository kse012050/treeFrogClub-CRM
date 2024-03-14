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


export const pagePermissionFilter = (user, location) => {
    // console.log(user, location);
    let pageName;
    
    if(location === '/main'){
        pageName = '대시보드'
    }else if(location === '/customer/list'){
        pageName = '통합 고객 목록'
    }else if(location === '/customer/registration'){
        pageName = '고객 등록'
    }else if(location === '/customer/registration/bulk'){
        pageName = '대량 고객 등록'
    }else if(location.includes('/customer/registration/update')){
        pageName = '고객 수정'
    }else if(location === '/payment/list'){
        pageName = '결제 목록'
    }else if(location === ''){
        pageName = ''
    }else if(location === ''){
        pageName = ''
    }else if(location === '/payment/list/registration'){
        pageName = '대량 결제 등록'
    }else if(location === '/payment/product'){
        pageName = '상품목록'
    }else if(location === '/payment/product/registration'){
        pageName = '상품 등록'
    }else if(location.includes('/payment/product/update')){
        pageName = '상품 수정'
    }else if(location === '/statistics/account'){
        pageName = '그룹/계정별 유효율'
    }else if(location === '/statistics/campaign'){
        pageName = '캠페인별 유효율'
    }else if(location === '/statistics/campaign/by'){
        pageName = '계정별 유효율'
    }else if(location === '/statistics/sales'){
        pageName = '매출현황'
    }else if(location === '/system/basic/anUser'){
        pageName = '사용자 목록'
    }else if(location === '/system/basic/anUser/registration'){
        pageName = '사용자 등록'
    }else if(location.includes('/system/basic/anUser/update')){
        pageName = '사용자 수정'
    }else if(location === '/system/basic/bureau'){
        pageName = '부서 관리'
    }else if(location === '/system/basic/client'){
        pageName = '고객 구분 관리'
    }else if(location === '/system/basic/client/registration'){
        pageName = '고객 구분 등록'
    }else if(location.includes('/system/basic/client/update')){
        pageName = '고객 구분 수정'
    }else if(location === '/system/basic/common'){
        pageName = '공통 코드 관리'
    }else if(location === '/system/basic/common/registration'){
        pageName = '공통 코드 등록'
    }else if(location.includes('/system/basic/common/update')){
        pageName = '공통 코드 수정'
    }else if(location === '/system/basic/customer'){
        pageName = '고객목록 설정'
    }else if(location === '/system/basic/property'){
        pageName = '속성값 설정'
    }else if(location === '/system/grant/management'){
        pageName = '역할 관리'
    }else if(location === '/system/grant/management/registration'){
        pageName = '역할 등록'
    }else if(location.includes('/system/grant/management/update')){
        pageName = '역할 수정'
    }else if(location === '/system/grant/permissions'){
        pageName = '역할 권한 관리'
    }else if(location === '/system/member/connect'){
        pageName = '사용자접속이력'
    }else if(location === '/system/member/delete'){
        pageName = '고객삭제이력'
    }else if(location === '/notice'){
        pageName = '공지사항'
    }else if(location === '/notice/registration'){
        pageName = '공지사항 등록'
    }else if(location.includes('/notice/update')){
        pageName = '공지사항 보기/수정'
    }

    return user.role_list.filter((data)=>data.screen_name === pageName)[0]
}