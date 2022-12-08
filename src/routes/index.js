import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';
import Products from '~/pages/Products';
import Register from '~/pages/Register';
import Tracking from '~/pages/Tracking';
import Users from '~/pages/Users/Index';

//Public routes
const publicRoutes = [  
    { path: '/', component: Dashboard},
    { path: '/login', component: Login, layout: null},
    { path: '/register', component: Register, layout: null},
    { path: '/users', component: Users},
    { path: '/products', component: Products},
    { path: '/tracking', component: Tracking},
]

//Private routes
const privateRoutes = [
    
]

export {publicRoutes, privateRoutes}