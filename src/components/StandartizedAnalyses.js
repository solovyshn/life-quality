import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext';

const Height = {
    1: '0-50 см',
    2: '50-160 см',
    3: '161+ см',
};

const Region = {
    1: 'Рівнинна місцевість',
    2: 'Гірська місцевість',
};

const Gender = {
    0: 'Жіноча',
    1: 'Чоловіча',
};

const AgeRange = {
    1: '0-15 років',
    2: '16-60 років',
    3: '61+ років',
};

const Result = {
    0: 'Критично',
    1: 'Задовільно',
    2: 'В межах норми',
};

const ResultBadgeClasses = {
    0: 'badge rounded-pill bg-danger',  // Red for 0
    1: 'badge rounded-pill bg-warning text-dark', // Orange for 1
    2: 'badge rounded-pill bg-success ', // Green for 2
};


function StandartizedAnalyses() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { doctor_id, id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({});
    const analysisId = params.get('analysisId');
    const gender = params.get('gender');
    const region = params.get('region');
    const ageRange = params.get('ageRange');
    const height = params.get('height');
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
                const response = await axios.get(`https://localhost:44375/Analysis/checked?AnalysisId=${analysisId}&gender=${gender}&region=${region}&ageRange=${ageRange}&heightRange=${height}`);
                const data = response.data.analysisProperties || [];
                setAnalysisProperties(data);
            } catch (error) {
                console.error('Error fetching analysis data:', error);
                setAnalysisProperties([]);
            }
        };

        fetchAnalysisData();
    }, [analysisId, gender, region, ageRange, height]);

    return (
        <div>
            <br />
            <h2>Стандартизовані аналізи для пацієнта: {patient.name} {patient.surname}</h2>
            <hr />
            <table className="table bg-white">
                <thead>
                    <tr>
                        <th>Стать</th>
                        <th>Регіон</th>
                        <th>Діапазон віку</th>
                        <th>Діапазон росту</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Displaying patient information in a single row */}
                    <tr>
                        <td>{Gender[gender]}</td>
                        <td>{Region[region]}</td>
                        <td>{AgeRange[ageRange]}</td>
                        <td>{Height[height]}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table className="table bg-white">
                <thead>
                    <tr>
                        <th>Показник</th>
                        <th>Значення</th>
                        <th>Значення по стандарту</th>
                        <th>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {analysisProperties.map((property, index) => (
                        <tr key={index}>
                            <td>{property.name}</td>
                            <td>{property.value}</td>
                            <td>{property.normalValuesRange.join(' - ')}</td>
                            <td>
                                <span className={ResultBadgeClasses[property.checkResult]}>
                                    {Result[property.checkResult]}
                                </span>
                            </td>
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

export default StandartizedAnalyses;
