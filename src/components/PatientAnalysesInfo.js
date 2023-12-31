import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../userContext'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const analysisTypes = {
    0: 'Всі аналізи',
    1: 'Аналіз крові',
    2: 'Аналіз сечі',
    3: 'Аналіз калу',
};

function PatientAnalysesInfo() {
    const navigate = useNavigate();
    const { userID } = useContext(UserContext);
    const { doctor_id, id } = useParams();
    const [patient, setPatient] = useState({});
    const [analyses, setAnalyses] = useState([]);
    const [selectedAnalysisType, setSelectedAnalysisType] = useState(0);
    const [sortByDateDescending, setSortByDateDescending] = useState(true); // Added state for sorting
    const [error, setError] = useState(null);

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
        const fetchAnalyses = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Analysis?UserId=${id}&AnalysisType=${selectedAnalysisType}&SortByDateDescending=${sortByDateDescending}`);
                setAnalyses(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching analyses:', error);
                setAnalyses([]);
                setError('Аналізи відсутні.');
            }
        };
        fetchAnalyses();
    }, [id, selectedAnalysisType, sortByDateDescending]);

    const formatDate = (analysisDate) => {
        const dateObject = new Date(analysisDate);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(dateObject);

        return formattedDate;
    }

    const handleNavigationToDetails = async (e, analysisId) => {
        e.preventDefault();
        navigate(`/patient/${doctor_id}/${id}/analysisDetails?analysisId=${analysisId}`);
    }


    const handleSortByDate = () => {
        setSortByDateDescending((prevSort) => !prevSort);
    };

    return (
        <div>
            <br />
            <h2>Аналізи пацієнта: {patient.name} {patient.surname}  </h2>
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
            <br />
            {error ? (
                <p>{error}</p>
            ) : analyses.length > 0 ? (
                <table className="table bg-white">
                    <thead>
                        <tr>
                            <th>Назва лабораторії</th>
                            <th>Тип аналізу</th>
                            <th>
                                Дата аналізу{' '}
                                <button onClick={handleSortByDate}>
                                    {sortByDateDescending ? '▲' : '▼'}
                                </button>
                            </th>
                            <th></th>
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
                <p>У пацієнта немає аналізів.</p>
            )}
            <hr />
            <button className="custom-btn" onClick={handleNavigation}>Повернутись</button>
        </div>
    );
}

export default PatientAnalysesInfo;
