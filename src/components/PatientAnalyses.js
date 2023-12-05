import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const analysisTypes = {
    0: 'Всі аналізи',
    1: 'Аналіз крові',
    2: 'Аналіз сечі',
    3: 'Аналіз калу',
};

function PatientAnalyses() {
    const { id } = useParams();
    const [analyses, setAnalyses] = useState([]);
    const [selectedAnalysisType, setSelectedAnalysisType] = useState(0);
    const [sortByDateDescending, setSortByDateDescending] = useState(true); // Added state for sorting
    const [error, setError] = useState(null);

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

    const handleAnalysisSelect = (selectedAnalysisId) => {
        // Handle radio button selection here
        // You can use selectedAnalysisId to perform any actions based on the selected analysis
    };

    const handleSortByDate = () => {
        setSortByDateDescending((prevSort) => !prevSort);
    };

    return (
        <div>
            <br />
            <h2>Аналізи</h2>
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
                            <tr key={analysis.id}>
                                <td>{analysis.laboratoryName}</td>
                                <td>{analysisTypes[analysis.analysisType]}</td>
                                <td>{formatDate(analysis.analysisDate)}</td>
                                <td>
                                    <input
                                        type="radio"
                                        name="selectedAnalysis"
                                        value={analysis.id}
                                        onChange={() => handleAnalysisSelect(analysis.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>У пацієнта немає аналізів.</p>
            )}
            <hr />
        </div>
    );
}

export default PatientAnalyses;
