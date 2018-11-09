import * as React from 'react';
import { Goal } from '../components';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Input, Button, TabPane, Nav, TabContent, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames';

export class Servant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goalName: "",
            activeTab: "0"
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

        if (goalIndex.toString() === this.state.activeTab) {
            this.setState({ activeTab: "0" });
        }
    }

    addGoal = () => {
        if (this.props.addGoalToServant) {
            this.props.addGoalToServant(this.props.index)(this.state.goalName);
        }

        this.setState({
            goalName: "",
            activeTab: (this.props.servant.goals.length + 1).toString()
        });
    }

    removeServant = () => {
        if (this.props.removeServant) {
            this.props.removeServant(this.props.index);
        }
    }

    canAddGoal = () => {
        const { servant: { goals } } = this.props;
        const { goalName } = this.state;
        return (goalName && !goals.map(x => x.name).includes(goalName));
    }

    toggleTab = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { servant, inventory, items } = this.props;
        const { goalName } = this.state;
        const goals = servant.goals;
        return <Card>
            <CardHeader
            >
                <Row>
                    <Col xs="8">
                        <h5>{servant.name}</h5>
                    </Col>
                    <Col xs="4">
                        <Button
                            color="danger"
                            onClick={this.removeServant}
                            className="float-right"
                        >
                            <FontAwesomeIcon icon="minus" />
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {goals.length > 0 &&
                    <div>
                        <Nav tabs>
                            {goals.map((goal, index) => {
                            return (
                                    <NavItem key={index}>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === index.toString() })}
                                            onClick={() => { this.toggleTab(index.toString()) }}
                                        >
                                            {goal.name}
                                        </NavLink>
                                    </NavItem>
                                )
                            })}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            {goals.map((goal, index) => {
                                return (
                                    <TabPane tabId={index.toString()} key={index}>
                                        <Goal
                                            goal={goal}
                                            inventory={inventory}
                                            items={items}
                                            index={index}
                                            addItem={this.addItemToGoal}
                                            changeInventory={this.props.changeInventory}
                                            completeGoal={this.handleCompleteGoal}
                                        />
                                    </TabPane>
                                )
                            })}
                        </TabContent>
                    </div>
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
    completeGoal: PropTypes.func,
    removeServant: PropTypes.func
}