import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import avatar from '../images/boy.png';
import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import UserContext from '../userContext'
import ArrowRight from '../images/1904671-arrow-arrow-right-change-direction-next-page-right_122521.svg'


function PatientsTable() {
    const [patients, setPatients] = useState([]);
    const { userID } = useContext(UserContext);

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
                        <tr key={patient.id}>
                            {/* Wrap the row content with a Link to the patient's analyses page */}
                            <td> <img src={avatar} alt="avatar" /></td>
                            <td>{patient.name}</td>
                            <td>{patient.surname}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phoneNumber}</td>
                            <td>
                                <Link to={`/patient/${userID}/${patient.id}/analyses`}>
                                    <img className="arrow-right" src={ArrowRight} alt='arrow' />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientsTable;
