import React from 'react';
import Translate from 'react-translate-component';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../Style/Header.css';
import logo from '../Images/logo_elca.png';
import counterpart from 'counterpart';
import en from '../lang/en';

counterpart.registerTranslations('en', en);

class Customer extends React.Component {
    render() {
        return (
            <div className="content">
                <Container fluid>
                    <Row>
                        <Col xl={1}>
                        </Col>
                        <Col xl={6}>
                            <p className="name">
                                <h1>Customer</h1>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Customer