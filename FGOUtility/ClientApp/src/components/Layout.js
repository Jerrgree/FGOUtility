import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import NavBar from './NavBar';

export default props => (
    <Container>
        <Row>
            <Col xs={12}>
                <NavBar />
            </Col>
        </Row>
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    </Container>
);
