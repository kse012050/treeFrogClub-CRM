import SignIn from '../pages/signIn'
import Main from '../pages/Main'
import Root from '../pages/Root'

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
];

