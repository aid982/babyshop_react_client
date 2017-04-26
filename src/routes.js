/**
 * Created by osetskiy on 3/3/2017.
 */
import Base from './Containers/Base';
import ProductList from './Containers/ProductList';
import Product from './Containers/Product';
import Cart from './Containers/Cart';
import Login from './Containers/Login';

const routes = {
    // base component (wrapper for the whole application).
    component: Base,
    childRoutes: [
        {
            path: '/',
            component: ProductList
        },
        {
            path: '/product/:id',
            component:Product
        },
        {
            path: '/Login',
            component:Login
        },

        {
            path: '/Cart',
            component:Cart
        },

    ]
};

export default routes;