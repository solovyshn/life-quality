import LoginPage from './components/LoginPage';
import MainPageDoctor from './components/MainPageDoctor';
import PatientsTable from './components/PatientsTable';
import PatientAnalyses from './components/PatientAnalyses'; // Assuming you have a component for patient analyses
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/mainPageDoctor" element={<MainPageDoctor />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/patients" element={<PatientsTable />} />
          <Route path="/patient/:id/analyses" element={<PatientAnalyses />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
