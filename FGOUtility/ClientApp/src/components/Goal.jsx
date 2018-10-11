import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table, Button, Input } from 'reactstrap';
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

    render() {
        const { goal, inventory, items } = this.props;
        const { quantity, showModal } = this.state;
        const materials = Object.entries(goal.materials);
        return (
            <div>
                <Table bordered striped hover>
                    <thead>
                        <tr>
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
                            return (
                                <tr key={mat[0]}>
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
                                            value={inventory[item]}
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
                    <Button
                        color="success"
                    >
                        Complete Goal
                        </Button>
                    <Button
                        color="primary"
                        onClick={this.toggleModal}
                    >
                        Add Material
                    </Button>
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
    changeInventory: PropTypes.func
}