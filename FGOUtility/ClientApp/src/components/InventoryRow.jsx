import * as React from 'react';
import { Table, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export class InventoryRow extends React.Component {
    constructor(props, context) {
        super(props);
    }

    handleChange = (event) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    handleBlur = (event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    render() {
        const { inventory, items } = this.props;
        return (
            <Table>
                <thead>
                    <tr>
                        <th />
                        <th>
                            Material
                                </th>
                        <th>
                            Quantity
                                </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        var quantity = inventory[item.name] || 0;

                        return (
                            <tr key={item.name}>
                                <td>
                                    <img src={require(`../assets/${item.name}.png`)} alt={item.name} />
                                </td>
                                <td>
                                    {item.displayName}
                                </td>
                                <td>
                                    <Input
                                        name={item.name}
                                        value={quantity}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        type="number"
                                        style={{ width: 100 }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

InventoryRow.PropTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    inventory: PropTypes.object,
    items: PropTypes.array
}