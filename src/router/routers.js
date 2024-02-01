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
import Notice from '../pages/notice/Notice';
import NoticeRegistration from '../pages/notice/NoticeRegistration';
import NoticeUpdate from '../pages/notice/NoticeUpdate';

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
                path: 'list', element: <CustomerList />
            },
            {
                path: 'list/modify', element: <CustomerBulkModify />
            },
            {
                path: 'registration', element: <CustomerRegistration />
            },
            {
                path: 'update', element: <CustomerUpdate />
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
    }
];

