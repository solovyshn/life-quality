import './styles.css'
import NavBar from './NavBar';
import LoginPage from './components/LoginPage'
import MainPageDoctor from './components/MainPageDoctor'
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/mainPageDoctor' element={<MainPageDoctor />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
