import * as React from 'react';
import { Goal } from '../components';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Input, Button } from 'reactstrap';

export class Servant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goalName: ""
        }
    }

    handleBlur = (event) => {

    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addItemToGoal = (goalIndex) => (item, quantity) => {
        if (this.props.addItemToGoal) {
            this.props.addItemToGoal(this.props.index)(goalIndex)(item, quantity);
        }
    }

    handleCompleteGoal = (goalIndex) => {
        if (this.props.completeGoal) {
            this.props.completeGoal(this.props.index)(goalIndex);
        }
    }

    addGoal = () => {
        if (this.props.addGoalToServant) {
            this.props.addGoalToServant(this.props.index)(this.state.goalName);
        }

        this.setState({ goalName: "" });
    }

    canAddGoal = () => {
        const { servant: { goals } } = this.props;
        const { goalName } = this.state;
        return (goalName && !goals.map(x => x.name).includes(goalName));
    }

    render() {
        const { servant, inventory, items } = this.props;
        const { goalName } = this.state;
        const goals = servant.goals;
        return <Card>
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
                                completeGoal={this.handleCompleteGoal}
                            />
                        )
                    })
                }
            </CardBody>
            <CardFooter>
                <Row>
                    <Col xs={12} md={8}>
                        <Input
                            value={goalName}
                            onChange={this.onChange}
                            name="goalName"
                            id="goalName"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            onClick={this.addGoal}
                            disabled={!this.canAddGoal()}
                        >
                            New Goal
                                </Button>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    }
}

Servant.PropTypes = {
    servant: PropTypes.obj,
    inventory: PropTypes.object,
    options: PropTypes.array.isRequired,
    items: PropTypes.array,
    index: PropTypes.number,
    addItemToGoal: PropTypes.func,
    changeInventory: PropTypes.func,
    addGoal: PropTypes.func,
    completeGoal: PropTypes.func
}