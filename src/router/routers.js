import SignIn from '../pages/signIn'
import Root from '../pages/Root'
import Main from '../pages/main/Main'
import CustomerList from '../pages/customer/List'
import CustomerBulkModify from '../pages/customer/BulkModify';
import CustomerRegistration from '../pages/customer/Registration';
import CustomerBulkRegistration from '../pages/customer/BulkRegistration';
import PaymentList from '../pages/payment/List';
import PaymentBulkRegistration from '../pages/payment/BulkRegistration';
import PaymentProductList from '../pages/payment/ProductList';
import PaymentProductRegistration from '../pages/payment/ProductRegistration';
import StatisticsAccount from '../pages/statistics/Account';
import StatisticsByType from '../pages/statistics/ByType';
import StatisticsCampaign from '../pages/statistics/Campaign';
import StatisticsSales from '../pages/statistics/Sales';
// import Test from '../pages/customer/Test';

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
                path: 'productList', element: <PaymentProductList />
            },
            {
                path: 'productList/registration', element: <PaymentProductRegistration />
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
    }
];

