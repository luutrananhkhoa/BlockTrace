import Dashboard from '~/pages/Dashboard';
import Farmer from '~/pages/Farmer';
import Login from '~/pages/Login';
import Products from '~/pages/Products';
import Register from '~/pages/Register';
import Rough from '~/pages/Rough';
import Tracking from '~/pages/Tracking';
import Users from '~/pages/Users/Index';
import Warehouse from '~/pages/Warehouse';

//Public routes
const publicRoutes = [  
    { path: '/', component: Dashboard},
    { path: '/login', component: Login, layout: null},
    { path: '/register', component: Register, layout: null},
    { path: '/user', component: Users},
    { path: '/product', component: Products},
    { path: '/tracking/:productId', component: Tracking, layout: null},
    { path: '/warehouse', component: Warehouse},
    { path: '/farmer', component: Farmer},
    { path: '/rough', component: Rough},
]

//Private routes
const privateRoutes = [
    
]

export {publicRoutes, privateRoutes}