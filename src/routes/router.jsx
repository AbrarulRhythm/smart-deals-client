import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Register from "../Pages/Register/Register";
import MyProducts from "../Pages/MyProducts/MyProducts";
import MyBids from "../Pages/MyBids/MyBids";
import PrivateRoute from "../context/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'allProducts',
                Component: AllProducts
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'myProducts',
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: 'myBids',
                element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
            }
        ]
    }
])