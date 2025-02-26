import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import axios from 'axios';

const SignIn = () => {

  const {signIn, signInWithGoogle} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = e => {
     e.preventDefault()
     const form = e.target;
     const email = form.email.value;
     const password = form.password.value;

     console.log(email, password);

     signIn(email, password)
  .then(res => {
    console.log('sign in', res.user.email);

     
    const user = { email: email };

    
    axios.post('http://localhost:3000/jwt', user, { withCredentials: true })
      .then(res => {
        console.log(res.data);  
      })
      .catch(err => {
        console.error('Error posting JWT:', err);  
      });


      toast.success('Sign-In Successful!');
      // navigate('/')
     })
     .catch(error => {
      console.log(error);
      toast.error(error.message || 'Sign-In Failed! Please try again.');  
       
     });
 };
const handleGoogleSignIn = () => {
  signInWithGoogle()
  .then(result => {
    console.log(result.user)
    toast.success('Google Sign-In Successful!');
    navigate('/');
  })
  .catch(error => {
    console.log(error.message)
    toast.error('Google login failed. Please try again.');
  })
}
   
    return (
        <div className='ml-72 mt-4 mb-4 '>
             <div className="card border-2  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-5xl ml-8 mt-4 font-bold">Sign In now!</h1>
      <form onSubmit={handleSignIn} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign In</button>
          <div className="form-control mt-6">
          
          <button onClick={handleGoogleSignIn}   className="btn  btn-outline"><FaGoogle/>Login with Google</button>
           </div>
       
        </div>
        <ToastContainer/>
        <p> Don't have an account? <Link className='underline' to="/register">Register</Link></p>
      </form>
    </div>
    
        </div>
    );
};

export default SignIn;