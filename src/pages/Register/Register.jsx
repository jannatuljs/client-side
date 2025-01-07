import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import LottieData from '../../assets/lottie/register.json'
import AuthContext from '../../context/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const Register = () => {

  const {createUser, setUser,updateUserProfile} = useContext(AuthContext);
const [error, setError] = useState({});
const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
     const email = form.email.value;
    const password = form.password.value;

    console.log(name,photo,email, password);

    // password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError({ password: 'Password must contain at least one uppercase, one lowercase, and be at least 6 characters long.' });
      return;
    }
    setError({});

     createUser(email, password)
     .then(result => {
     const user = result.user;
     setUser(user);
     updateUserProfile({displayName:name,photoURL:photo})
     .then(() => {
      navigate('/');
     })
     .catch(error => {

     })
     toast.success('Register Successfully!');
     })

     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
     toast.error(error.message || "Register failed. Please try again.");
    });

  };
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-96">
      <Lottie animationData={LottieData}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-5xl ml-8 mt-4 font-bold">Register now!</h1>
      <form onSubmit={handleRegister} className="card-body">
       
      <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" name="name"
       placeholder="name"
        className="input input-bordered"
         required />
    </div>

    <div className="form-control">
      <label className="label">
        <span className="label-text">Photo URL</span>
      </label>
      <input type="text" name='photo' placeholder="photo-url" className="input input-bordered" required />
    </div>
       
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        {/* Show the password error message if it exists */}
        {error.password && (
              <label className="text-xs text-red-500">{error.password}</label>
            )}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <p> Already have an account? <Link className='underline' to="/sign in">Sign In</Link></p>
      </form>
      <ToastContainer/>
    </div>
  </div>
</div>
    );
};

export default Register;