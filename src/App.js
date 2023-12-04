import LoginPage from './components/LoginPage'
import MainPageDoctor from './components/MainPageDoctor'
import { Route, Routes } from "react-router-dom"
import Layout from './Layout';
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/mainPageDoctor' element={<MainPageDoctor />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App;
