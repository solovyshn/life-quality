import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatar from '../images/boy.png';
import { useContext } from 'react'
import UserContext from '../userContext'
import { useNavigate } from 'react-router-dom';


function PatientsToStandardTable() {
    const [patients, setPatients] = useState([]);
    const { userID } = useContext(UserContext);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleNavigation = () => {
        navigate(`/mainPageDoctor/${userID}`);
    }
    const handleNavigationToAnalyses = async (e, patientId) => {
        e.preventDefault();
        navigate(`/patient/${userID}/${patientId}/analyses`);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Patient?DoctorId=${userID}&SearchQuery=%40`);
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userID]); // Include id in the dependency array to fetch data when id changes

    return (
        <div className="container mt-4">
            <h2>Пацієнти</h2>
            <p>Для вибору аналізу для зведення, натисніть на потрібного пацієнта.</p>
            <hr />
            <table className="table bg-white">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Електронна пошта</th>
                        <th>Номер телефону</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className="clickable-row" onClick={(e) => handleNavigationToAnalyses(e, patient.id)}>
                            {/* Wrap the row content with a Link to the patient's analyses page */}
                            <td> <img src={avatar} alt="avatar" /></td>
                            <td>{patient.name}</td>
                            <td>{patient.surname}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="custom-btn" onClick={handleNavigation}>Повернутись до свого кабінету</button>
        </div>
    );
}

export default PatientsToStandardTable;
