import React, {useState, useContext, useEffect} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Avatar from "../images/iconfinder-8-avatar-2754583_120515.svg"
import UserContext from '../userContext';
import { useNavigate } from 'react-router-dom';

export default function MainPageDoctor () {
    const { userID, userEmail, userFullName } = useContext(UserContext);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    const [isDoctorInfoVisible, setDoctorInfoVisibility] = useState(false);
    const [error, setError] = useState(null);
    const [doctor, setDoctor] = useState({});
  
    console.log('Patient ID:', userID);

    const handleNavigation = () => {
        navigate(`/myanalyses/${userID}`);
    };
    const handleShowInfoClick = () => {
        setDoctorInfoVisibility(!isDoctorInfoVisible);
      };
    const fullName = doctor.name + ' ' + doctor.surname
    const nextMeeting = 'П\'ятниця, 15:00'

    const buttonStyle = {
        backgroundColor: isDoctorInfoVisible ? '#057799' : '#079BBB'
    }

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const response = await axios.get(`https://localhost:44375/Patient/doctor?PatientId=${userID}`);
                const doctorData = response.data;
                setDoctor(doctorData);
                setError(null);
            } catch (error) {
                console.error('Error fetching doctor:', error);
                setDoctor({});
            }
        };
        fetchAnalyses();
    }, [userID, error]);

  return (
    <section>
      <Container className="py-5">
        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src={Avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '200px' }}
                  fluid
                />
                <p className="text-muted mb-4">Львів, Україна</p>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text className="mb-2"><span className="text-primary font-italic me-1">нагадування</span> Заплановані прийоми</Card.Text>
                <div className="mb-2">
                  <strong>Steve Look</strong>
                  <p className="text-muted">Понеділок, 10:00</p>
                  <p className="text-muted">Обговорення плану лікування</p>
                </div>
                <div className="mb-2">
                  <strong>Mike Stevenson</strong>
                  <p className="text-muted">Середа, 14:30</p>
                  <p className="text-muted">Консультація стосовно аналізів</p>
                </div>
                {/* Add more patient information as needed */}
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>Ім'я</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{userFullName}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Електронна пошта</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{userEmail}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Номер телефону</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">(097) 234-5678</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Адреса</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">Львів, Україна</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
                <Col>
                    <button className="custom-btn w-100" onClick={handleNavigation}>Список моїх аналізів</button>
                </Col>
                <Col>
                    <button className="custom-btn w-100" style={buttonStyle} onClick={handleShowInfoClick}>{isDoctorInfoVisible ? "Сховати інформацію про лікаря" : "Переглянути інформацію про лікаря"}</button>
                </Col>
            </Row>
            <Row>
                {isDoctorInfoVisible && ( <Card>
                    <Card.Body>
                        <Card.Title>{fullName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Лікар загальної практики</Card.Subtitle>

                        <Card.Text>
                        <strong>Електронна пошта:</strong> {doctor.email}
                        </Card.Text>

                        <Card.Text>
                        <strong>Наступна зустріч:</strong> {nextMeeting}
                        </Card.Text>
                    </Card.Body>
                </Card> )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
