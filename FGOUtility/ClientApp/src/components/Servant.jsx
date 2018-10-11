import * as React from 'react';
import { Goal } from '../components';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Input, Button } from 'reactstrap';

export class Servant extends React.Component {

    handleBlur = (event) => {

    }

    handleChange = (event) => {

    }

    addItemToGoal = (goalIndex) => (item, quantity) => {
        this.props.addItemToGoal(this.props.index)(goalIndex)(item, quantity);
    }

    render() {
        const { servant, inventory, items } = this.props;
        const goals = servant.goals;
        return <Row>
            <Col xs="6">
                <Card>
                    <CardHeader>
                        {servant.name}
                    </CardHeader>
                    <CardBody>
                        {goals.length > 0 &&
                            goals.map((goal, index) => {
                                return (
                                    <Goal
                                        key={index}
                                        goal={goal}
                                        inventory={inventory}
                                        items={items}
                                        index={index}
                                        addItem={this.addItemToGoal}
                                        changeInventory={this.props.changeInventory}
                                    />
                                )
                            })
                        }
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col xs={12} md={8}>
                                <Input
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button
                                >
                                    New Goal
                        </Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    }
}

Servant.PropTypes = {
    servant: PropTypes.obj,
    inventory: PropTypes.object,
    options: PropTypes.array.isRequired,
    items: PropTypes.array,
    index: PropTypes.number,
    addItemToGoal: PropTypes.func,
    changeInventory: PropTypes.func
}