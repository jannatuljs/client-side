import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => {
      
        return response;
      },
      async (error) => {
        console.log('Error caught from our very own axios interceptor---', error.response);

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Log out the user
          signOutUser();
          // Navigate to the login page
          navigate('/sign in');
        }
        
        return Promise.reject(error);
      }
    );

 
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
