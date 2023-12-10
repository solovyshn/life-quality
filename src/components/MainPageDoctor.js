import React, {useContext} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Avatar from "../images/doctor_white_male_people_avatar_icon_141431.svg"
import UserContext from '../userContext';
import { useNavigate } from 'react-router-dom';

export default function MainPageDoctor () {
    const { userID, userEmail, userFullName } = useContext(UserContext);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    console.log('Doctor ID:', userID);

    const handleNavigationToStandard = () => {
        navigate(`/patientsToStandard/${userID}`);
    }
    const handleNavigationToListOfPatients = () => {
        navigate(`/patients/${userID}`);
    }

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
                <p className="text-muted mb-1">Лікар загальної практики</p>
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
                    <button className="custom-btn w-100" onClick={handleNavigationToListOfPatients}>Список пацієнтів</button>
                    <button className="custom-btn w-100" onClick={handleNavigationToStandard}>Звести аналізи пацієнта до стандарту</button>
                </Col>
                <Col>
                    <button className="custom-btn w-100">Редагувати мої дані</button>
                    <button className="custom-btn w-100">Запланувати консультацію</button>
                </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}