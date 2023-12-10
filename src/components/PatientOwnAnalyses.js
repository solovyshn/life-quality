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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [labName, setLabName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalSelectedAnalysisType, setModalSelectedAnalysisType] = useState(1);
    const [fileContent, setFileContent] = useState('');


    const [isDateValid, setIsDateValid] = useState(true);
    const [isLabNameValid, setIsLabNameValid] = useState(true);
    const [isFileSelected, setIsFileSelected] = useState(true);


    const handleNavigation = () => {
        navigate(`/mainPagePatient/${userID}`);
    }

    const handleNavigationToDetails = async (e, analysisId) => {
        e.preventDefault();
        navigate(`/myanalyses/details/${analysisId}`);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setLabName('');
        setSelectedDate('');
        setSelectedFile(null);
        setIsModalOpen(false);
        setModalSelectedAnalysisType(1);

        // Reset the file input value
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const addAnalysisRequest = async () => {
        const url = 'https://localhost:44375/Analysis/add';
        const params = {
            PatientId: userID,
            LaboratoryName: labName,
            AnalysisType: modalSelectedAnalysisType,
            AnalysisDate: selectedDate,
            Data: fileContent,
        };

        try {
            const response = await axios.get(url, { params, headers: { accept: '*/*' } });

            console.log('Server Response Code:', response.status);
            console.log('Response Body:', response.data);
            console.log('Response Headers:', response.headers);
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    // Call the function to make the request

    const handleAddAnalysis = async () => {
        // Validate before adding analysis
        if (!selectedDate || !labName || !selectedFile) {
            // Update validation states
            setIsDateValid(!!selectedDate);
            setIsLabNameValid(!!labName);
            setIsFileSelected(!!selectedFile);

            // Do not proceed with analysis addition if validation fails
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const content = event.target.result;
            setFileContent(content);

            // Continue with your existing logic
            await addAnalysisRequest();
            await fetchAnalyses();
            handleCloseModal();
        };

        reader.readAsText(selectedFile);
    };

    const fetchAnalyses = async () => {
        try {
            const response = await axios.get(`https://localhost:44375/Analysis?UserId=${userID}&AnalysisType=0&SortByDateDescending=true`);
            setAnalyses(response.data);
        } catch (error) {
            console.error('Error fetching analyses:', error);
        }
    };

    useEffect(() => {


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

    const formatDate = (analysisDate) => {
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
                            <tr key={analysis.id} className="clickable-row" onClick={(e) => handleNavigationToDetails(e, analysis.id)}>
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
            <button className="custom-btn" onClick={handleOpenModal}>
                Додати аналіз
            </button>

            {/* Bootstrap Modal */}
            <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Додати аналіз</h5>
                        </div>
                        <div className="modal-body">
                            {/* Input fields for laboratory name, analysis type, date, and file */}
                            <div className={`mb-3 ${!isLabNameValid ? 'was-validated' : ''}`}>
                                <label htmlFor="labName" className="form-label">Назва лабораторії:</label>
                                <input type="text" className={`form-control ${!isLabNameValid ? 'is-invalid' : ''}`} id="labName" value={labName} onChange={(e) => setLabName(e.target.value)} required />
                                <div className="invalid-feedback">
                                    Назва лабораторії обов'язкова.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="analysisType" className="form-label">Тип аналізу:</label>
                                <select className="form-select" id="analysisType" value={modalSelectedAnalysisType} onChange={(e) => setModalSelectedAnalysisType(Number(e.target.value))}>
                                    {Object.entries(analysisTypes).map(([typeId, typeName]) => (
                                        typeId !== '0' && // Exclude "Всі аналізи"
                                        <option key={typeId} value={typeId}>
                                            {typeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={`mb-3 ${!isDateValid ? 'was-validated' : ''}`}>
                                <label htmlFor="analysisDate" className="form-label">Дата аналізу:</label>
                                <input type="date" className={`form-control ${!isDateValid ? 'is-invalid' : ''}`} id="analysisDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                                <div className="invalid-feedback">
                                    Дата аналізу обов'язкова.
                                </div>
                            </div>
                            <div className={`mb-3 ${!isFileSelected ? 'was-validated' : ''}`}>
                                <label htmlFor="fileInput" className="form-label">Виберіть файл:</label>
                                <input type="file" className={`form-control ${!isFileSelected ? 'is-invalid' : ''}`} id="fileInput" onChange={(e) => {
                                    setIsFileSelected(!!e.target.files[0]);
                                    setSelectedFile(e.target.files[0]);
                                }} required />
                                <div className="invalid-feedback">
                                    Файл обов'язковий для вибору.
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="custom-btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>
                                Скасувати
                            </button>
                            <button type="button" className="custom-btn" onClick={handleAddAnalysis}>
                                Додати
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientOwnAnalyses;
