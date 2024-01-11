import SignIn from '../pages/signIn'
import Root from '../pages/Root'
import Main from '../pages/main/Main'
import CustomerList from '../pages/customer/List'
import Modify from '../pages/customer/Modify';
import Registration from '../pages/customer/Registration';
import RegistrationBulk from '../pages/customer/RegistrationBulk';
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
                path: 'list', element: <CustomerList />,
            },
            {
                path: 'list/modify', element: <Modify />
            },
            {
                path: 'registration', element: <Registration />
            },
            {
                path: 'registration/bulk', element: <RegistrationBulk />
            },
            
        ]
    }
];

