import Dashboard from '~/pages/Dashboard';
import Dry from '~/pages/Dry';
import Farmer from '~/pages/Farmer';
import ListProducts from '~/pages/ListProducts';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Package from '~/pages/Package';
import Products from '~/pages/Products';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import Rough from '~/pages/Rough';
import Squash from '~/pages/Squash';
import Tracking from '~/pages/Tracking';
import TrackingMobile from '~/pages/TrackingMobile';
import Users from '~/pages/Users/Index';
import Warehouse from '~/pages/Warehouse';

//Public routes
const publicRoutes = [  
    { path: '/', component: Dashboard},
    { path: '/login', component: Login, layout: null},
    { path: '/register', component: Register, layout: null},
    { path: '/404', component: NotFound, layout: null},
    { path: '/scan/:productId', component: TrackingMobile, layout: null},
]

//Private routes
const privateRoutes = [
 
    { path: '/user', component: Users},
    { path: '/ingress', component: Products},
    { path: '/product', component: ListProducts},
    { path: '/tracking/:productId', component: Tracking, layout: null},
    { path: '/warehouse', component: Warehouse},
    { path: '/farmer', component: Farmer},
    { path: '/rough', component: Rough},
    { path: '/squash', component: Squash},
    { path: '/dry', component: Dry},
    { path: '/package', component: Package},
    { path: '/profile', component: Profile},
]

export {publicRoutes, privateRoutes}