import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const analysisTypes = {
    1: 'Аналіз крові',
    2: 'Аналіз сечі',
    3: 'Аналіз калу',
};

function PatientAnalyses() {
    const { id } = useParams();
    const [analyses, setAnalyses] = useState([]);

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Analysis?UserId=${id}&AnalysisType=0&SortByDateDescending=true`);
                setAnalyses(response.data);
            } catch (error) {
                console.error('Error fetching analyses:', error);
            }
        };

        fetchAnalyses();
    }, [id]);

    const handleAnalysisSelect = (selectedAnalysisId) => {
        // Handle radio button selection here
        // You can use selectedAnalysisId to perform any actions based on the selected analysis
    };

    return (
        <div>
            <br />
            <h2>Аналізи</h2>
            <hr />
            {analyses.length > 0 ? (
                <table className="table bg-white">
                    <thead>
                        <tr>
                            <th>Назва лабораторії</th>
                            <th>Тип аналізу</th>
                            <th>Дата аналізу</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyses.map((analysis) => (
                            <tr key={analysis.id}>
                                <td>{analysis.laboratoryName}</td>
                                <td>{analysisTypes[analysis.analysisType]}</td>
                                <td>{analysis.analysisDate}</td>
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
                <p>No analyses found for this patient.</p>
            )}
        </div>
    );
}

export default PatientAnalyses;
