
import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const resultAction = await dispatch(logoutUser());
        if (logoutUser.fulfilled.match(resultAction)) {
            navigate('/');
        }
    };
    return (
        <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >
            Logout
        </button>
    )
}

export default LogoutButton