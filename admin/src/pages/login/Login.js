import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthenContext';
import './login.scss';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('auth/login', credentials);
            if (res.data.isAdmin) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
                navigate('/');
            } else {
                dispatch({ type: 'LOGIN_FAILURE', payload: { message: 'Bạn không được phép' } });
            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
        }
    };

    return (
        <div className="login">
            <div className="login-Container">
                <input
                    type="text"
                    placeholder="Tài khoản"
                    id="username"
                    onChange={handleChange}
                    className="login-Input"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    id="password"
                    onChange={handleChange}
                    className="login-Input"
                />
                <button disabled={loading} onClick={handleClick} className="login-Btn">
                    Login
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Login;
