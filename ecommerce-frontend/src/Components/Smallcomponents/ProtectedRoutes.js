import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { GetLoggedInUserDetails } from '../AxioApi/UserApi';
import NavigationBar from './NavigationBar';
import { jwtDecode } from 'jwt-decode';
function ProtectedRoutes({ children }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const validateUserToken = async () => {
        try {

            const response = await GetLoggedInUserDetails();
            console.log(response)
            if (response.success) {
                dispatch(SetUser(response.user));
            } else {
                localStorage.removeItem("token");
                navigate("/Login");
                console.log(response.message)
            }
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/Login");
            console.log(error.message)

        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            navigate('/Login');
        } else {
            const decoded = jwtDecode(token);
            if (decoded.role === 'user') {
                validateUserToken();
            }else{
                navigate('/')
            }
        }
        
        
    }, []);


    return (
        <div>{user && <>
            {children}
        </>


        }</div>
    )
}

export default ProtectedRoutes