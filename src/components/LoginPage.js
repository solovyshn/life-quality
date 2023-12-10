import React, { useState, useContext } from 'react';
import './LoginPage.css'; // Import your custom CSS file for styling
import axios from 'axios'; // Import Axios for making API requests
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/login.svg';
import UserContext from '../userContext'

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { userID, userType, setUser } = useContext(UserContext);

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://localhost:44375/Autorization/login?Login=${login}&Password=${password}`);
            const { id, status, name, surname } = response.data;

            const fullName = name + ' ' + surname
            // Store the user type and id in the state
            setUser(id, status, login, fullName);

            // Check the user type and navigate accordingly
            if (userType === 'doctor') {
                navigate(`/mainPageDoctor/${userID}`);
                console.log(userID)
                // Redirect to the doctor page with the doctor's ID
            } else if (userType === 'patient') {
                navigate(`/mainPagePatient/${userID}`);
                console.log(userID)
            } else {
                // Handle other user types or redirect to a different page
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Користувача не знайдено. Спробуйте ще раз!');
            setLogin('');
            setPassword('');
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
                        <form>
                            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">Логін</label>
                                <input type="text" className="form-control" id="login" placeholder="Введіть ваш логін" value={login} onChange={(e) => setLogin(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input type="password" className="form-control" id="password" placeholder="Введіть ваш пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </form>
                        <button className="custom-btn" onClick={handleSubmit}>Увійти</button>
                        <button className="custom-btn">Зареєструватись</button>
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
