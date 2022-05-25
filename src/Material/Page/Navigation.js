import React from "react";
import Translate from "react-translate-component";
import { Row, Col, Nav, Navbar, NavLink } from "react-bootstrap";
import "../Style/Navigation.css";
import counterpart from "counterpart";
import en from "../lang/en";
import { Link, Outlet } from "react-router-dom";
import Project from "./Project";
import {  useTranslation } from 'react-i18next';

// counterpart.registerTranslations("en", en);

function Navigation() {
  const { t, i18n } = useTranslation('common');
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="navigation">
          <Row>
            <Col xl={12}>
              <Nav.Link to="/projects" as={Link}>
                <p className="text-semi-bold first-element">
                  {t('navigation.title')}
                  {/* <Translate content="navigation.title" /> */}
                </p>
              </Nav.Link>
              <Nav.Link>
                <p className="text-semi-bold">
                  {t('navigation.new')}
                  {/* <Translate content="navigation.new" /> */}
                </p>
              </Nav.Link>
              <Nav className="flex-column">
                <Nav.Link  to="/projects/new" as={Link}  eventKey="link-1">
                  {t('navigation.project')}
                  {/* <Translate content="navigation.project" /> */}
                </Nav.Link>
                <br></br>
                <Nav.Link to="/customer" as={Link}  eventKey="link-2">
                  {t('navigation.customer')}
                  {/* <Translate content="navigation.customer" /> */}
                </Nav.Link>
                <br></br>
                <NavLink to="supplier" as={Link}  eventKey="link-3">
                  {t('navigation.supplier')}
                  {/* <Translate content="navigation.supplier" /> */}
                </NavLink>
              </Nav>
              <Outlet />
            </Col>
          </Row>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Navigation;
