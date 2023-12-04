import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import avatar from '../images/boy.png';

function PatientsTable() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44375/Patient?DoctorId=1&SearchQuery=%40');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Пацієнти</h2>
            <hr />
            <table className="table bg-white">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Електронна пошта</th>
                        <th>Номер телефону</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            {/* Wrap the row content with a Link to the patient's analyses page */}

                            <td> <img src={avatar} alt="avatar" /></td>
                            <td>{patient.name}</td>
                            <td>{patient.surname}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phoneNumber}</td>
                            <Link to={`/patient/${patient.id}/analyses`}>
                                <td>стрілка</td>
                            </Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientsTable;
