import SignIn from '../pages/signIn'
import Root from '../pages/Root'
import Main from '../pages/main/Main'
import CustomerList from '../pages/customer/List'
import CustomerModify from '../pages/customer/Modify';
import CustomerRegistration from '../pages/customer/Registration';
import CustomerRegistrationBulk from '../pages/customer/RegistrationBulk';
import PaymentList from '../pages/payment/List';
import PaymentProductList from '../pages/payment/ProductList';
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
                path: 'list/modify', element: <CustomerModify />
            },
            {
                path: 'registration', element: <CustomerRegistration />
            },
            {
                path: 'registration/bulk', element: <CustomerRegistrationBulk />
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
                path: 'productList', element: <PaymentProductList />
            }
        ]
    }
];

