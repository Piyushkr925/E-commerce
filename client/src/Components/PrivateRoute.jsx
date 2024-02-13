import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
const PrivateRoute = () => {
 
    const auth= localStorage.getItem('userExist');

    return auth?<Outlet/>:<Navigate to="/"/>
  
}

export default PrivateRoute
