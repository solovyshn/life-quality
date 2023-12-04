import React from 'react';
import './LoginPage.css'; // Import your custom CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import loginImage from '../images/login.svg';

export default function LoginPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Якість життя</h3>
                    <br />
                    <div className="login-form-container">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">Логін</label>
                                <input type="text" className="form-control" id="login" placeholder="Введіть ваш логін" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input type="password" className="form-control" id="password" placeholder="Введіть ваш пароль" />
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
