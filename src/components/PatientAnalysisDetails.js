import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../userContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PatientAnalysisDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const { doctor_id, id } = useParams();
    const [patient, setPatient] = useState({});
    const analysisId = params.get('analysisId');
    const [analysisProperties, setAnalysisProperties] = useState([]);
    const { userID } = useContext(UserContext);

    const handleNavigation = () => {
        navigate(`/mainPageDoctor/${userID}`);
    }

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Patient?DoctorId=${doctor_id}&SearchQuery=${id}`);
                const patientData = response.data[0]; // Assuming there is only one patient in the response
                setPatient(patientData);
            } catch (error) {
                console.error('Error fetching patient:', error);
                setPatient({});
            }
        };

        fetchPatient();
    }, [doctor_id, id]);

    useEffect(() => {
        const fetchAnalysisData = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Analysis/checked?AnalysisId=${analysisId}&gender=1&region=1&ageRange=1&heightRange=1`);
                const data = response.data.analysisProperties || [];
                setAnalysisProperties(data);
            } catch (error) {
                console.error('Error fetching analysis data:', error);
                setAnalysisProperties([]);
            }
        };

        fetchAnalysisData();
    }, [analysisId]);

    return (
        <div>
            <br />
            <h2>Деталі аналізу пацієнта: {patient.name} {patient.surname}</h2>
            <hr />
            <table className="table bg-white">
                <thead>
                    <tr>
                        <th>Показник</th>
                        <th>Значення</th>
                    </tr>
                </thead>
                <tbody>
                    {analysisProperties.map((property, index) => (
                        <tr key={index}>
                            <td>{property.name}</td>
                            <td>{property.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="row">
                <div className="col-md-4">
                    <button className="custom-btn w-100" onClick={handleNavigation}>Повернутись у мій кабінет</button>
                </div>
                <div className="col-md-4">
                    <button className="custom-btn w-100">Завантажити результат</button>
                </div>
                <div className="col-md-4">
                    <button className="custom-btn w-100">Переглянути статистику пацієнта</button>
                </div>
            </div>

        </div>
    );
}

export default PatientAnalysisDetails;
