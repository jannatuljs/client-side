import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/png/user.png';
import AuthContext from '../../context/AuthContext/AuthContext';

const Navbar = () => {
  const {user, signOutUser} = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
    .then(() => {
      console.log('successful sign out')
    })
    .catch(error => {
      console.log('failed to sign out')
    })
  }
    const links = <>
      <div className="space-x-3  ">
      <Link to='/'>Home</Link>
      <Link to='/services'>Services</Link>
      <Link to='/add service'>Add Service</Link>
      <Link to='/my reviews'>My Reviews</Link> 
      <Link to='/my services'>My Services </Link> 
      </div>
    </>
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
               {links}
            </ul>
          </div>
           
           <p className=" text-2xl font-bold text-gray-500">ye<span className='text-red-800'>lp</span></p>
           
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end space-x-3">
         <div className="">
         {
                    user && user?.email ? <div>
                        <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt=''/>
                        <p>{user.displayName}</p>
                    </div>
                     : <img src={userIcon} alt=''/>
                   }
         </div>
          {
            user ? <>
            <button onClick={handleSignOut} className="btn">Sign Out</button>
            </> :
            
            <>
             <Link to='/sign in' className="btn">Sign In</Link>
            
            </>
          }
        </div>
      </div>
    );
};

export default Navbar;