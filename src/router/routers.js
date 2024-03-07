import SignIn from '../pages/SignIn'
import Root from '../pages/Root'
import Main from '../pages/main/Main'
import CustomerList from '../pages/customer/List'
import CustomerBulkModify from '../pages/customer/BulkModify';
import CustomerRegistration from '../pages/customer/Registration';
import CustomerUpdate from '../pages/customer/Update';
import CustomerBulkRegistration from '../pages/customer/BulkRegistration';
import PaymentList from '../pages/payment/List';
import PaymentBulkRegistration from '../pages/payment/BulkRegistration';
import PaymentProduct from '../pages/payment/Product';
import PaymentProductRegistration from '../pages/payment/ProductRegistration';
import PaymentProductUpdate from '../pages/payment/ProductUpdate';
import StatisticsAccount from '../pages/statistics/Account';
import StatisticsByType from '../pages/statistics/ByType';
import StatisticsCampaign from '../pages/statistics/Campaign';
import StatisticsSales from '../pages/statistics/Sales';
import SystemBasicAnUser from '../pages/system/basic/AnUser';
import SystemBasicAnUserRegistration from '../pages/system/basic/AnUserRegistration';
import SystemBasicAnUserUpdate from '../pages/system/basic/AnUserUpdate';
import SystemBasicBureau from '../pages/system/basic/Bureau';
import SystemBasicClient from '../pages/system/basic/Client';
import SystemBasicClientRegistration from '../pages/system/basic/ClientRegistration';
import SystemBasicClientUpdate from '../pages/system/basic/ClientUpdate';
import SystemBasicCommon from '../pages/system/basic/Common';
import SystemBasicCommonRegistration from '../pages/system/basic/CommonRegistration';
import SystemBasicCommonCommonUpdate from '../pages/system/basic/CommonUpdate';
import SystemBasicCustomer from '../pages/system/basic/Customer';
import SystemBasicProperty from '../pages/system/basic/Property';
import SystemGrantManagement from '../pages/system/grant/Management';
import SystemGrantManagementRegistration from '../pages/system/grant/ManagementRegistration';
import SystemGrantManagementConfirm from '../pages/system/grant/ManagementConfirm';
import SystemGrantManagementUpdate from '../pages/system/grant/ManagementUpdate';
import SystemGrantPermissions from '../pages/system/grant/Permissions';
import SystemMemberConnect from '../pages/system/member/Connect';
import SystemMemberDelete from '../pages/system/member/Delete';
import Notice from '../pages/notice/Notice';
import NoticeRegistration from '../pages/notice/NoticeRegistration';
import NoticeUpdate from '../pages/notice/NoticeUpdate';
import Test from '../pages/Test';
import { api } from '../api/api';

export const routers = [
    {
        path: "/",
        element: <SignIn />,
    },
    {
        path: "/main",
        element: <Root />,
        children: [
            { index: true, element: <Main />}
        ]
    },
    {
        path: "/customer",
        element: <Root />,
        children: [
            { 
                path: 'list', label: 'test', element: <CustomerList />
            },
            {
                path: 'list/modify', element: <CustomerBulkModify />
            },
            {
                path: 'registration', element: <CustomerRegistration />
            },
            {
                path: 'registration/update/:id', element: <CustomerUpdate />
            },
            {
                path: 'registration/bulk', element: <CustomerBulkRegistration />
            },
            
        ]
    },
    {
        path: "/payment",
        element: <Root />,
        children: [
            {
                path: 'list', element: <PaymentList />
            },
            {
                path: 'list/registration', element: <PaymentBulkRegistration />
            },
            {
                path: 'product', element: <PaymentProduct />
            },
            {
                path: 'product/registration', element: <PaymentProductRegistration />
            },
            {
                path: 'product/update/:id', element: <PaymentProductUpdate />
            }
        ]
    },
    {
        path: "/statistics",
        element: <Root />,
        children: [
            {
                path: 'account', element: <StatisticsAccount />
            },
            {
                path: 'account/by', element: <StatisticsByType />
            },
            {
                path: 'campaign', element: <StatisticsCampaign />
            },
            {
                path: 'campaign/by', element: <StatisticsByType />
            },
            {
                path: 'sales', element: <StatisticsSales />
            }
        ]
    },
    {
        path: "/system",
        element: <Root />,
        children: [
            {
                path: 'basic/anUser', element: <SystemBasicAnUser />
            },
            {
                path: 'basic/anUser/registration', element: <SystemBasicAnUserRegistration />
            },
            {
                path: 'basic/anUser/update/:id', element: <SystemBasicAnUserUpdate />
            },
            {
                path: 'basic/bureau', element: <SystemBasicBureau />
            },
            {
                path: 'basic/client', element: <SystemBasicClient />
            },
            {
                path: 'basic/client/registration', element: <SystemBasicClientRegistration />
            },
            {
                path: 'basic/client/update', element: <SystemBasicClientUpdate />
            },
            {
                path: 'basic/client/update/:id', element: <SystemBasicClientUpdate />
            },
            {
                path: 'basic/common', element: <SystemBasicCommon />
            },
            {
                path: 'basic/common/registration', element: <SystemBasicCommonRegistration />
            },
            {
                path: 'basic/common/update', element: <SystemBasicCommonCommonUpdate />
            },
            {
                path: 'basic/common/update/:id', element: <SystemBasicCommonCommonUpdate />
            },
            {
                path: 'basic/customer', element: <SystemBasicCustomer />
            },
            {
                path: 'basic/property', element: <SystemBasicProperty />
            },
            {
                path: 'grant/management', element: <SystemGrantManagement />
            },
            // {
            //     path: 'grant/management/confirm/:id', element: <SystemGrantManagementConfirm />
            // },
            {
                path: 'grant/management/update/:id', element: <SystemGrantManagementUpdate />
            },
            {
                path: 'grant/management/confirm/:id', element: <SystemGrantManagementConfirm />
            },
           /*  {
                path: 'grant/management/confirm', element: <SystemGrantManagementConfirm />
            }, */
         /*    {
                path: 'grant/management/update', element: <SystemGrantManagementUpdate />
            }, */
            // {
            //     path: 'grant/management/update/:id', element: <SystemGrantManagementUpdate />
            // },
            {
                path: 'grant/management/registration', element: <SystemGrantManagementRegistration />
            },
            {
                path: 'grant/permissions', element: <SystemGrantPermissions />
            },
            {
                path: 'member/connect', element: <SystemMemberConnect />
            },
            {
                path: 'member/delete', element: <SystemMemberDelete />
            }
        ]
    },
    {
        path: "/notice",
        element: <Root />,
        children: [
            {
                path: '', element: <Notice />
            },
            {
                path: 'registration', element: <NoticeRegistration />
            },
            {
                path: 'update', element: <NoticeUpdate />
            },
            {
                path: 'update/:id', element: <NoticeUpdate />
            },
        ]
    },
    {
        path: '/test',
        element: <Test />,
    }
];


export function pageHistory(location){
    let pageName;

    
    if(location === '/main'){
        pageName = '대시보드'
    }else if(location === '/customer/list'){
        pageName = '고객 DB 관리 - 통합 고객 목록'
    }else if(location === '/customer/registration'){
        pageName = '고객 DB 관리 - 고객 등록'
    }else if(location === '/customer/registration/bulk'){
        pageName = '고객 DB 관리 - 대량 고객 등록'
    }else if(location.includes('/customer/registration/update')){
        pageName = '고객 DB 관리 - 고객 수정'
    }else if(location === '/payment/list'){
        pageName = '결제 관리 - 결제 목록'
    }else if(location === ''){
        pageName = ''
    }else if(location === ''){
        pageName = ''
    }else if(location === '/payment/list/registration'){
        pageName = '결제 관리 - 대량 결제 등록'
    }else if(location === '/payment/product'){
        pageName = '결제 관리 - 상품 목록'
    }else if(location === '/payment/product/registration'){
        pageName = '결제 관리 - 상품 등록'
    }else if(location.includes('/payment/product/update')){
        pageName = '결제 관리 - 상품 수정'
    }else if(location === '/statistics/account'){
        pageName = '통계 - 그룹/계정별 유효율'
    }else if(location === '/statistics/campaign'){
        pageName = '통계 - 캠페인별 유효율'
    }else if(location === '/statistics/campaign/by'){
        pageName = '통계 - 계정별 유효율'
    }else if(location === '/statistics/sales'){
        pageName = '통계 - 매출현황'
    }else if(location === '/system/basic/anUser'){
        pageName = '시스템 관리 - 기본 설정 - 사용자 목록'
    }else if(location === '/system/basic/anUser/registration'){
        pageName = '시스템 관리 - 기본 설정 - 사용자 등록'
    }else if(location.includes('/system/basic/anUser/update')){
        pageName = '시스템 관리 - 기본 설정 - 사용자 수정'
    }else if(location === '/system/basic/bureau'){
        pageName = '시스템 관리 - 기본 설정 - 부서 관리'
    }else if(location === '/system/basic/client'){
        pageName = '시스템 관리 - 기본 설정 - 고객 구분 관리'
    }else if(location === '/system/basic/client/registration'){
        pageName = '시스템 관리 - 기본 설정 - 고객 구분 등록'
    }else if(location.includes('/system/basic/client/update')){
        pageName = '시스템 관리 - 기본 설정 - 고객 구분 수정'
    }else if(location === '/system/basic/common'){
        pageName = '시스템 관리 - 기본 설정 - 공통 코드 관리'
    }else if(location === '/system/basic/common/registration'){
        pageName = '시스템 관리 - 기본 설정 - 공통 코드 등록'
    }else if(location.includes('/system/basic/common/update')){
        pageName = '시스템 관리 - 기본 설정 - 공통 코드 수정'
    }else if(location === '/system/basic/customer'){
        pageName = '시스템 관리 - 기본 설정 - 고객목록 설정'
    }else if(location === '/system/basic/property'){
        pageName = '시스템 관리 - 기본 설정 - 속성값 설정'
    }else if(location === '/system/grant/management'){
        pageName = '시스템 관리 - 권한 설정 - 역할 관리'
    }else if(location === '/system/grant/management/registration'){
        pageName = '시스템 관리 - 권한 설정 - 역할 등록'
    }else if(location.includes('/system/grant/management/update')){
        pageName = '시스템 관리 - 권한 설정 - 역할 수정'
    }else if(location === '/system/grant/permissions'){
        pageName = '시스템 관리 - 권한 설정 - 역할 권한 관리'
    }else if(location === '/system/member/connect'){
        pageName = '회원사 관리 - 사용자접속이력'
    }else if(location === '/system/member/delete'){
        pageName = '회원사 관리 - 고객삭제이력'
    }else if(location === '/notice'){
        pageName = '게시판 관리 - 공지사항'
    }else if(location === '/notice/registration'){
        pageName = '게시판 관리 - 공지사항 등록'
    }else if(location.includes('/notice/update')){
        pageName = '게시판 관리 - 공지사항 보기/수정'
    }

    if(pageName){
        api('log', 'insert', {'log_type': '페이지로딩', 'log_value': pageName})
            .then(({result})=>{
                if(result){
                    // console.log(result);
                }
            })
    }
}
