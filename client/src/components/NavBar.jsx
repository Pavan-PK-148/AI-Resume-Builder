import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const NavBar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear browser storage
        localStorage.removeItem('token'); 
        // Reset Redux state
        dispatch(logout()); 
        // Redirect to login and refresh to ensure a clean state
        window.location.href = '/app'; 
    };

    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
                <Link to='/'>
                    <img src="/logo.svg" alt="logo" className='h-11 w-auto'/>
                </Link>
                <div className='flex items-center gap-4 text-sm'>
                    <p className='max-sm:hidden font-medium text-slate-600'>Hi, {user?.name || 'Guest'}</p>
                    <button 
                        onClick={handleLogout} 
                        className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all text-slate-700'
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar