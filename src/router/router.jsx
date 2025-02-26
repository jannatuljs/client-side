import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
 
import SignIn from "../pages/SignIn";
import AddService from "../pages/AddService";
import AllServices from "../pages/AllServices";
import MyReviews from "../pages/MyReviews";
 
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import ReviewForm from "../pages/ReviewFrom";
import MyServices from "../pages/MyServices";
import EditService from "../pages/EditService";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Update from "../pages/Update";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage />,
      children: [
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    
    {
      path:'/service/:id',
      element:<ServiceDetailsPage/> 
    },
    {
      path:'/add service',
      element: <PrivateRoute>
        <AddService/>
      </PrivateRoute>
    },
    {
      path:"/sign in",
      element:<SignIn/>
    },
    {
      path:"/my reviews",
      element: <PrivateRoute>
        <MyReviews/>
      </PrivateRoute>
    },
    {
     path:"/services",
     element:<AllServices/>
    },
    {
      path:"/add review",
      element:<ReviewForm/>
    },
    {
     path:"/update",
     element:<Update/>
    },
    {
      path:"/my services",
      element: <PrivateRoute>
        <MyServices/>
      </PrivateRoute>
    },
    {
      path:"/edit service/:id",
      element:<EditService/>
    }
      ]
    },
  ]);

  export default router;