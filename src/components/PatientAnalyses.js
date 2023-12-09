import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const analysisTypes = {
    0: 'Всі аналізи',
    1: 'Аналіз крові',
    2: 'Аналіз сечі',
    3: 'Аналіз калу',
};

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

function PatientAnalyses() {
    const navigate = useNavigate();
    const { doctor_id, id } = useParams();
    const [patient, setPatient] = useState({});
    const [analyses, setAnalyses] = useState([]);
    const [selectedAnalysisType, setSelectedAnalysisType] = useState(0);
    const [sortByDateDescending, setSortByDateDescending] = useState(true); // Added state for sorting
    const [error, setError] = useState(null);
    const [selectedHeight, setSelectedHeight] = useState(1); // Assuming a default value
    const [selectedRegion, setSelectedRegion] = useState(1); // Assuming a default value
    const [selectedGender, setSelectedGender] = useState(1); // Assuming a default value
    const [selectedAgeRange, setSelectedAgeRange] = useState(1);
    const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);

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

    const handleAnalysisSelect = (selectedAnalysisId) => {
        setSelectedAnalysisId(selectedAnalysisId);
    };

    const handleSortByDate = () => {
        setSortByDateDescending((prevSort) => !prevSort);
    };

    return (
        <div>
            <br />
            <h2>Аналізи пацієнта: {patient.name} {patient.surname}  </h2>
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
            <form className="row g-3">
                {/* Dropdown for Height */}
                <div className="col-md-3">
                    <label className="form-label">Діапазон росту:</label>
                    <select
                        className="form-select"
                        value={selectedHeight}
                        onChange={(e) => setSelectedHeight(Number(e.target.value))}
                    >
                        {Object.entries(Height).map(([heightId, heightName]) => (
                            <option key={heightId} value={heightId}>
                                {heightName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dropdown for Region */}
                <div className="col-md-3">
                    <label className="form-label">Регіон:</label>
                    <select
                        className="form-select"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(Number(e.target.value))}
                    >
                        {Object.entries(Region).map(([regionId, regionName]) => (
                            <option key={regionId} value={regionId}>
                                {regionName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dropdown for Gender */}
                <div className="col-md-3">
                    <label className="form-label">Стать:</label>
                    <select
                        className="form-select"
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(Number(e.target.value))}
                    >
                        {Object.entries(Gender).map(([genderId, genderName]) => (
                            <option key={genderId} value={genderId}>
                                {genderName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dropdown for AgeRange */}
                <div className="col-md-3">
                    <label className="form-label">Віковий діапазон:</label>
                    <select
                        className="form-select"
                        value={selectedAgeRange}
                        onChange={(e) => setSelectedAgeRange(Number(e.target.value))}
                    >
                        {Object.entries(AgeRange).map(([ageRangeId, ageRangeName]) => (
                            <option key={ageRangeId} value={ageRangeId}>
                                {ageRangeName}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <hr />
            <button className="custom-btn" onClick={() => {
                // Перевірка чи вибраний аналіз перед переходом
                if (selectedAnalysisId !== null) {
                    navigate(`/patient/${doctor_id}/${id}/standartizedanalyses?analysisId=${selectedAnalysisId}&gender=${selectedGender}&region=${selectedRegion}&ageRange=${selectedAgeRange}&height=${selectedHeight}`);
                } else {
                    // Повідомлення про помилку, що аналіз не вибраний
                    alert("Будь ласка, виберіть аналіз перед зведенням до стандарту.");
                }
            }}>
                Звести до стандарту
            </button>
        </div>
    );
}

export default PatientAnalyses;
