import React from 'react';
import Translate from 'react-translate-component';
import { Container, Row, Col, Nav, input } from 'react-bootstrap';
import '../Style/Header.css';
import logo from '../Images/logo_elca.png';
import counterpart from 'counterpart';
// import en from '../lang/en';
import { useTranslation } from 'react-i18next';

// counterpart.registerTranslations('en', en);


function Header() {

    const { t, i18n } = useTranslation('common');
    return (
        <div className="content">
            <Container fluid>
                <Row>
                    <Col xl={1}>
                    </Col>
                    <Col xl={1}>
                        <img className="logo" src={logo} alt="logo" />
                    </Col>
                    <Col xl={6}>
                        <p className="name">
                            {t('header.name')}
                        </p>
                    </Col>
                    <Col xl={2}>
                        <div className="lang">
                            <button onClick={() => i18n.changeLanguage('en')}>EN</button>
                            <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
                        </div>
                    </Col>
                    <Col xl={1}>
                        <p className="help">
                            {t('header.help')}
                        </p>
                    </Col>
                    <Col xl={1}>
                        <p className="logout">
                            {t('header.logout')}
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default Header