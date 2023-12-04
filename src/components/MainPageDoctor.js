import React, {useContext} from 'react';
import UserContext from '../userContext';
import { useNavigate } from 'react-router-dom';


export default function MainPageDoctor() {
    const { userID, userType } = useContext(UserContext);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    console.log('Doctor ID:', userID);

    const handleNavigation = () => {
        navigate(`/patients/${userID}`);
    };

    return (
        <div>
            <h1>Doctor {userID}</h1>
            <p>{userType}</p>
            <button className="custom-btn" onClick={handleNavigation}>Список пацієнтів</button>
        </div>
    );
}
