import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
//import Autosuggest from 'react-autosuggest';

export class Goal extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            item: props.item,
            quantity: props.quantity,
            suggestions: []
        }
    }

    render() {
        const { goal, inventory } = this.props;
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
                                        {item}
                                    </td>
                                    <td>
                                        {needed}
                                    </td>
                                    <td>
                                        {inventory[item]}
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
                    >
                        Add Material
                    </Button>
                </div>
            </div>
        )
    }
}

Goal.PropTypes = {
    goal: PropTypes.object,
    inventory: PropTypes.object
}