import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {

  };

  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
