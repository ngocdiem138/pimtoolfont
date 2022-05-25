import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Navigation from "./Navigation";
import ProjectList from "./ProjectList";
import ErrorScreen from "./ErrorScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./Project";
import Customer from "./Customer";
import Supplier from "./Supplier";

const MainPage = (props) => {

  // function CurrPage(){
  //     return (
  //         <>
  //         </>
  //     )
  // }
  const [page, setPage] = useState("/");
  useEffect(() => {
    window.addEventListener("hashchange", () => {
      console.log("URL change")
      setPage(window.location.pathname);
    }, false);
  })
  return (
    <div className="main">
      <Container fluid>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <BrowserRouter>
          <Row>
            <Col xl={1} />
            <Col xl={2}>
              <Routes>

                <Route path="/" element={<Navigation />}>
                  <Route path="projects" />
                  <Route path="/projects/:id" ></Route>
                  <Route path="customer"></Route>
                  <Route path="supplier" ></Route>
                </Route>
              </Routes>
            </Col>
            <Col xl={9}>
              <Routes>
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:id" element={<Project />}></Route>
                <Route path="customer" element={<Customer />}></Route>
                <Route path="supplier" element={<Supplier />}></Route>
              </Routes>
            </Col>
            <Col>
              <Routes>
                <Route path="/error" component={ErrorScreen} />
              </Routes>
            </Col>
          </Row>
        </BrowserRouter>
      </Container>
    </div>
  );
};
export default MainPage;
