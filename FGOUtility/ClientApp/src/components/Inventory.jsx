import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Input, Table, Button, Row, Col } from 'reactstrap';
import { GetMaterials, GetClassPieces } from '../assets/references';

class Inventory extends React.Component {
    constructor(props, context) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.load();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                inventory: this.props.inventory,
                servants: this.props.servants
            })
        }
    }

    onChange = (event) => {
        const field = event.target.name;
        const { inventory } = this.state;
        inventory[field] = parseInt(event.target.value);
        this.setState({ inventory: inventory });
    }

    onBlur = (event) => {
        this.props.save(this.state);
    }

    render() {
        const { inventory } = this.state;
        const materials = GetMaterials();
        const classPieces = GetClassPieces();
        return (
            <div>
                {inventory &&
                    <Row>
                        <Col xs="12" md="6">
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
                                    {materials.map(item => {
                                        var quantity = inventory[item.name] || 0;

                                    return (
                                        <tr key={item.name}>
                                            <td>
                                                <img src={require(`../assets/${item.name}.png`)} />
                                            </td>
                                            <td>
                                                {item.displayName}
                                            </td>
                                            <td>
                                                <Input
                                                    name={item.name}
                                                    value={quantity}
                                                    onChange={this.onChange}
                                                    onBlur={this.onBlur}
                                                    type="number"
                                                    style={{ width: 100 }}
                                                />
                                            </td>
                                        </tr>
                                    )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col xs="12" md="6">
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
                                    {classPieces.map(item => {
                                        var quantity = inventory[item.name] || 0;

                                        return (
                                            <tr key={item.name}>
                                                <td>
                                                    <img src={require(`../assets/${item.name}.png`)} />
                                                </td>
                                                <td>
                                                    {item.displayName}
                                                </td>
                                                <td>
                                                    <Input
                                                        name={item.name}
                                                        value={quantity}
                                                        onChange={this.onChange}
                                                        onBlur={this.onBlur}
                                                        type="number"
                                                        style={{width: 100}}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => {
            dispatch(actionCreators.load())
        },
        save: (data) => {
            dispatch(actionCreators.save(data))
        }
    };
}


const mapStateToProps = (state) => {
    return {
        inventory: state.data.inventory,
        servants: state.data.servants
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);