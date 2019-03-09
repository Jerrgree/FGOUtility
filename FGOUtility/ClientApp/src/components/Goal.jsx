import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table, Button, Input, Row, Col } from 'reactstrap';
import { NewMaterialModal } from '../components';

export class Goal extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            quantity: props.quantity,
            showModal: false
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    addItem = (item, quantity) => {
        this.props.addItem(this.props.index)(item, quantity);
    }

    handleInventoryChange = (event) => {
        if (this.props.changeInventory) {
            this.props.changeInventory(event.target.name, event.target.value);
        }
    }

    handleCompleteGoal = () => {
        if (this.props.completeGoal) {
            this.props.completeGoal(this.props.index);
        }
    }

    canCompleteGoal = () => {
        const { inventory, goal } = this.props;
        const materials = Object.entries(goal.materials);
        if (materials) {
            return !materials.some(material => material[1] > inventory[material[0]]);
        }
        return false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { goal, inventory } = this.props;
        const materials = Object.entries(goal.materials);

        if (nextState.showModal !== this.state.showModal) {
            return true;
        }

        return materials.reduce((acc, mat) => {
            const item = mat[0];
            return acc || (inventory[item] != nextProps.inventory[item]);
        }, false);

        return false;
    }

    render() {
        const { goal, inventory, items } = this.props;
        const { quantity, showModal } = this.state;
        const materials = Object.entries(goal.materials);
        console.log("HI");
        const isAchieved = !materials.some(material => material[1] > inventory[material[0]]);
        const backgroundColor = isAchieved ? "green" : "red";
        return (
            <div>
                <Table bordered hover>
                    <thead>
                        <tr
                            style={{ backgroundColor: backgroundColor }}
                        >
                            <th>{goal.name}</th>
                            <th>Material</th>
                            <th>Needed</th>
                            <th>Owned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.length > 0 && materials.map(mat => {
                            const item = mat[0];
                            const needed = mat[1];

                            const isAchieved = needed <= inventory[item];
                            const backgroundColor = isAchieved ? "lightgreen" : "indianred";
                            return (
                                <tr key={mat[0]}
                                    style={{ backgroundColor: backgroundColor }}
                                >
                                    <td>
                                        <img src={require(`../assets/${item}.png`)} alt={item} />
                                    </td>
                                    <td>
                                        {items.filter(x => x.name === item)[0].displayName}
                                    </td>
                                    <td>
                                        {needed}
                                    </td>
                                    <td>
                                        <Input
                                            value={inventory[item] || 0}
                                            name={item}
                                            type="number"
                                            onChange={this.handleInventoryChange}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <Row>
                        <Col>
                            <Button
                                color="primary"
                                onClick={this.toggleModal}
                            >
                                Add Material
                            </Button>
                        </Col>
                        <Col xs="6">
                            <Button
                                color="success"
                                onClick={this.handleCompleteGoal}
                                className="float-right"
                                disabled={!this.canCompleteGoal()}
                            >
                                Complete Goal
                        </Button>
                        </Col>
                    </Row>
                </div>
                <NewMaterialModal
                    items={items}
                    showModal={showModal}
                    toggleModal={this.toggleModal}
                    addItem={this.addItem}
                />
            </div>
        )
    }
}

Goal.PropTypes = {
    goal: PropTypes.object,
    inventory: PropTypes.object,
    items: PropTypes.array,
    index: PropTypes.number,
    addItem: PropTypes.func,
    changeInventory: PropTypes.func,
    completeGoal: PropTypes.func
}