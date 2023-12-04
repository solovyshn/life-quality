import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../userContext';
import { useContext } from 'react';
import {Link} from "react-router-dom";


const analysisTypes = {
    1: 'Аналіз крові',
    2: 'Аналіз сечі',
    3: 'Аналіз калу',
};

function PatientOwnAnalyses() {
    const { userID } = useContext(UserContext);

    const [analyses, setAnalyses] = useState([]);

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
                                <td>{formatDate(analysis.analysisDate)}</td>
                                <td><Link to={`/myanalyses/details/${analysis.id}`}>Деталі</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>У Вас немає аналізів.</p>
            )}
        </div>
    );
}

export default PatientOwnAnalyses;
