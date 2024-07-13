import React, { useContext } from 'react';
import logo from "../Images/LOGO.png";
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <div className='flex flex-col md:flex-row bg-gray-100 text-black align-middle text-center justify-around p-3 md:p-0'>
            <div className='flex justify-center md:justify-start mb-2 md:mb-0'>
                <Link to='/home'>
                    <img src={logo} alt="Logo" className='w-32 h-auto' />
                </Link>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 md:gap-10 justify-center md:justify-between items-center text-sm md:text-lg'>
                <Link to='/allProperty' className='font-semibold text-xs md:text-base'>PROPERTIES</Link>
                <Link to='/myProperty' className='font-semibold text-xs md:text-base'>MY DASHBOARD/ACTIVITY</Link>
                <Link to='/addProperty' className='font-semibold text-xs md:text-base'>LIST YOUR PROPERTY</Link>
                <h1 className='font-semibold text-xs md:text-base'>CONTACT US</h1>
                <h1 className='font-semibold text-xs md:text-base'>MORE</h1>
                <h1 className='font-semibold text-xs md:text-base'>|</h1>
                <Link to={user ? '/profile' : '/signup'} className='gap-2 text-white'>
                    {user ? (
                        <img 
                            src={`http://localhost:8080/api/v1/auth/uploadss/${user.profileImageUrl}`} 
                            className="block mx-auto rounded-full h-12 w-12 object-cover" 
                            alt="User profile" 
                        />
                    ) : (
                        <FontAwesomeIcon icon={faUser} className="text-black h-12 w-12" />
                    )}
                </Link>
            </div>
        </div>
    );
}

export default Header;
