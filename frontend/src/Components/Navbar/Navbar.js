import React, { useContext } from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthenContext';

const Navbar = () => {
    const { user, loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            dispatch({ type: 'LOGOUT' });
            navigate('/');
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
        }
    };
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <span className="nav-logo">Booking.com</span>
                </Link>
                {user ? (
                    <div className="user-box">
                        <div style={{ color: '#ff' }}>{user.username}</div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                ) : (
                    <div className="nav-item">
                        <button className="navbutton">Đăng Kí</button>
                        <button className="navbutton" onClick={handleLogin}>
                            Đăng Nhập
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
