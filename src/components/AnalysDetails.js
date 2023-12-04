import React, {useContext} from 'react';
import UserContext from '../userContext'
import { useNavigate } from 'react-router-dom';

export default function AnalysDetails() {
    const { userID, userType } = useContext(UserContext);
    const navigate = useNavigate();

    console.log('Patient ID:', userID);

    const handleNavigation = () => {
        navigate(`/myanalyses/${userID}`);
    };

    return (
        <div>
            <h1>Patient {userID}</h1>
            <p>{userType}</p>
            <button className="custom-btn" onClick={handleNavigation}>Повернутись</button>
        </div>
    );
}