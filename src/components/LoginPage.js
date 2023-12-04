import React, { useState } from 'react';
import './LoginPage.css'; // Import your custom CSS file for styling
import axios from 'axios'; // Import Axios for making API requests
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/login.svg';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(null); // null represents unknown user type

    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://localhost:44375/Autorization/login?Login=${login}&Password=${password}`);
            const { id, status } = response.data;

            // Store the user type in the state
            setUserType(status);

            // Check the user type and navigate accordingly
            if (status === 'doctor') {
                navigate(`/mainPageDoctor/${id}`);
                console.log(id)
                // Redirect to the doctor page with the doctor's ID
            } else {
                // Handle other user types or redirect to a different page
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (show a message to the user, redirect, etc.)
        }
    };

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="col-md-6">
                    <h3>Якість життя</h3>
                    <br />
                    <div className="login-form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">Логін</label>
                                <input type="text" className="form-control" id="login" placeholder="Введіть ваш логін" onChange={(e) => setLogin(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input type="password" className="form-control" id="password" placeholder="Введіть ваш пароль" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button type="submit" className="custom-btn">Увійти</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="login-image-container">
                        <img src={loginImage} style={{ width: '100%', height: '100%' }} alt="Login" />
                    </div>
                </div>
            </div>
        </div>
    );
}
