import * as React from 'react';
import { Input, Row, Col, Button } from 'reactstrap';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <Col xs={12}>
                    <Input
                    />
                </Col>
                <Col xs={12}>
                    <Input
                    />
                </Col>
                <Col xs={12}>
                    <Button>
                        Login
                    </Button>
                </Col>
            </div>
        );
    }
}