import LoginPage from './components/LoginPage';
import MainPageDoctor from './components/MainPageDoctor';
import MainPagePatient from './components/MainPagePatient';
import PatientsTable from './components/PatientsTable';
import PatientAnalyses from './components/PatientAnalyses'; // Assuming you have a component for patient analyses
import PatientOwnAnalyses from './components/PatientOwnAnalyses';
import StandartizedAnalyses from './components/StandartizedAnalyses';
import AnalysDetails from './components/AnalysDetails';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { UserProvider } from './userContext';

function App() {
  return (
    <>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mainPageDoctor/:id" element={<MainPageDoctor />} />
            <Route path="/mainPagePatient/:id" element={<MainPagePatient />} />
            <Route path="/patients/:id" element={<PatientsTable />} />
            <Route path="/patient/:doctor_id/:id/analyses" element={<PatientAnalyses />} />
            <Route path="/patient/:doctor_id/:id/standartizedanalyses" element={<StandartizedAnalyses />} />
            <Route path="/myanalyses/:id" element={<PatientOwnAnalyses />} />
            <Route path="/myanalyses/details/:id" element={<AnalysDetails />} />
          </Routes>
        </Layout>
      </UserProvider>
    </>
  );
}

export default App;
