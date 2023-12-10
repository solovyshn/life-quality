import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const analysisTypes = {
    0: 'Всі аналізи',
    1: 'Аналіз крові',
    2: 'Аналіз сечі',
    3: 'Аналіз калу',
};

function PatientOwnAnalyses() {
    const { userID } = useContext(UserContext);
    const [analyses, setAnalyses] = useState([]);
    const navigate = useNavigate()
    const [selectedAnalysisType, setSelectedAnalysisType] = useState(0);
    const [sortByDateDescending, setSortByDateDescending] = useState(true); // Added state for sorting
    const [error, setError] = useState(null);

    const handleNavigation = () => {
        navigate(`/mainPagePatient/${userID}`);
    }

    const handleNavigationToDetails = async (e, analysisId) => {
        e.preventDefault();
        navigate(`/myanalyses/details/${analysisId}`);
    }

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Analysis?UserId=${userID}&AnalysisType=0&SortByDateDescending=true`);
                setAnalyses(response.data);
            } catch (error) {
                console.error('Error fetching analyses:', error);
            }
        };

        fetchAnalyses();
    }, [userID]);

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Analysis?UserId=${userID}&AnalysisType=${selectedAnalysisType}&SortByDateDescending=${sortByDateDescending}`);
                setAnalyses(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching analyses:', error);
                setAnalyses([]);
                setError('Аналізи відсутні.');
            }
        };
        fetchAnalyses();
    }, [userID, selectedAnalysisType, sortByDateDescending]);

    const formatDate = (analysisDate) =>{
        const dateObject = new Date(analysisDate);

        // Format the Date object
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(dateObject);
         
        return formattedDate;
    }

    return (
        <div>
            <br />
            <h2>Ваші аналізи</h2>
            <p>Для перегляду деталей, натисніть на відповідний аналіз.</p>
            <hr />
            <select
                className="form-select"
                value={selectedAnalysisType}
                onChange={(e) => setSelectedAnalysisType(Number(e.target.value))}
            >
                {Object.entries(analysisTypes).map(([typeId, typeName]) => (
                    <option key={typeId} value={typeId}>
                        {typeName}
                    </option>
                ))}
            </select>
            <hr />
            {analyses.length > 0 ? (
                <table className="table bg-white">
                    <thead>
                        <tr>
                            <th>Назва лабораторії</th>
                            <th>Тип аналізу</th>
                            <th>Дата аналізу</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyses.map((analysis) => (
                            <tr key={analysis.id} className="clickable-row"  onClick={(e) => handleNavigationToDetails(e, analysis.id)}>
                                <td>{analysis.laboratoryName}</td>
                                <td>{analysisTypes[analysis.analysisType]}</td>
                                <td>{formatDate(analysis.analysisDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>У Вас немає аналізів.</p>
            )}
            <button className="custom-btn" onClick={handleNavigation}>Повернутись до кабінету</button>
            <button className="custom-btn">Додати аналіз</button>
        </div>
    );
}

export default PatientOwnAnalyses;
