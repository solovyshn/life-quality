import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function AnalysDetails() {
    const { userID, userFullName } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [analysisProperties, setAnalysisProperties] = useState([]);

    console.log('Patient ID:', userID);

    const handleNavigation = () => {
        navigate(`/myanalyses/${userID}`);
    };
    useEffect(() => {
        const fetchAnalysisData = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Analysis/checked?AnalysisId=${id}&gender=1&region=1&ageRange=1&heightRange=1`);
                const data = response.data.analysisProperties || [];
                setAnalysisProperties(data);
            } catch (error) {
                console.error('Error fetching analysis data:', error);
                setAnalysisProperties([]);
            }
        };

        fetchAnalysisData();
    }, [id]);

    return (
        <div>
            <br />
            <h2>Деталі аналізу пацієнта: {userFullName}</h2>
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
            <button className="custom-btn" onClick={handleNavigation}>Повернутись</button>
            <button className="custom-btn">Завантажити результат</button>
        </div>
    );
}