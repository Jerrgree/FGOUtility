import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, Form } from 'reactstrap';
import { GetMaterials, GetClassPieces } from '../data/references';
import { Servant } from '../components';

class Servants extends React.Component {
    constructor(props, context) {
        super(props);

        this.state = {
            servantName: ""
        };
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

    addItemToGoal = (servantIndex) => (goalIndex) => (item, quantity) => {
        //const { servants } = this.state;
        let servants = Array.from(this.state.servants);

        if (quantity > 0) {
            servants[servantIndex].goals[goalIndex].materials[item] = quantity;
        }
        // If the item already exists, remove it
        else if (servants[servantIndex].goals[goalIndex].materials[item] !== undefined) {
            delete servants[servantIndex].goals[goalIndex].materials[item]
        }

        this.setState({
            servants: servants
        });

        this.props.save({
            inventory: this.state.inventory,
            servants: servants
        });
    }

    addGoalToServant = (servantIndex) => (goalName) => {
        //const { servants } = this.state;
        let servants = Array.from(this.state.servants);
        servants[servantIndex].goals.push({
            name: goalName,
            materials: {}
        });

        this.setState({
            servants: servants
        });

        this.props.save({
            inventory: this.state.inventory,
            servants: servants
        });
    }

    addServant = () => {
        //const { servants, servantName } = this.state;
        const { servantName } = this.state;
        let servants = Array.from(this.state.servants);

        servants.push({
            name: servantName,
            goals: [{
                name: 'Ascension 1',
                materials: {}
            }, {
                name: 'Ascension 2',
                materials: {}
            }, {
                name: 'Ascension 3',
                materials: {}
            }, {
                name: 'Ascension 4',
                materials: {}
            }]
        });

        this.setState({
            servants: servants,
            servantName: ""
        });

        this.props.save({
            inventory: this.state.inventory,
            servants: servants
        });
    }

    removeServant = (servantIndex) => {
        //const { servants } = this.state;
        let servants = Array.from(this.state.servants);

        servants.splice(servantIndex, 1);

        this.setState({
            servants: servants
        });

        this.props.save({
            inventory: this.state.inventory,
            servants: servants
        });
    }

    completeGoal = (servantIndex) => (goalIndex) => {
        let servants = Array.from(this.state.servants);
        let inventory = Object.assign({}, this.state.inventory);
        const goal = servants[servantIndex].goals[goalIndex];
        const materials = Object.entries(goal.materials);

        servants[servantIndex].goals.splice(goalIndex, 1);

        //console.log(servants);

        materials.forEach(material => {
            inventory[material[0]] -= material[1];
        });

        this.setState({
            servants: servants,
            inventory: inventory
        });
        this.props.save({
            inventory: inventory,
            servants: servants
        });
    }

    changeInventory = (item, quantity) => {
        let inventory = Object.assign({}, this.state.inventory);
        inventory[item] = quantity;
        this.setState({
            inventory: inventory
        });

        this.props.save({
            inventory: inventory,
            servants: this.state.servants
        });
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    canAddServant = () => {
        const { servants, servantName } = this.state;

        return servantName && !servants.map(x => x.name).includes(servantName);
    }

    render() {
        const materials = GetMaterials();
        const classPieces = GetClassPieces();
        //const items = materials.map(x => x.name).concat(classPieces.map(x => x.name));
        const options = materials.concat(classPieces);

        const { servants, inventory, servantName } = this.state;
        return (
            <div style={{ padding: 15 }}>
                <Row>
                    {servants && servants.length > 0 &&
                        servants.map((servant, index) => {
                            return <Col xs={12} md={6} key={index} style={{ paddingTop: 10, paddingBottom: 10 }}>
                                <Servant
                                    servant={servant}
                                    inventory={inventory}
                                    items={options}
                                    index={index}
                                    addItemToGoal={this.addItemToGoal}
                                    changeInventory={this.changeInventory}
                                    addGoalToServant={this.addGoalToServant}
                                    completeGoal={this.completeGoal}
                                    removeServant={this.removeServant}
                                />
                            </Col>
                        })
                    }
                </Row>
                <Row>
                    <Form>
                        <Col xs={12} md={6}>
                            <Row>
                                <Col xs={12} md={8}>
                                    <Input
                                        name="servantName"
                                        id="servantName"
                                        value={servantName}
                                        onChange={this.onChange}
                                    />
                                </Col>
                                <Col xs={12} md={4}>
                                    <Button
                                        color="secondary"
                                        disabled={!this.canAddServant()}
                                        onClick={this.addServant}
                                        type="submit"
                                    >
                                        New Servant
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Servants);