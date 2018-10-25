import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Row, Col, Input, Button } from 'reactstrap';
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
        const { servants } = this.state;
        servants[servantIndex].goals[goalIndex].materials[item] = quantity;

        this.setState({
            servants: servants
        });

        this.props.save(this.state);
    }

    addGoalToServant = (servantIndex) => (goalName) => {
        const { servants } = this.state;
        servants[servantIndex].goals.push({
            name: goalName,
            materials: {}
        });

        this.setState({
            servants: servants
        });

        this.props.save(this.state);
    }

    addServant = () => {
        const { servants, servantName } = this.state;

        servants.push({
            name: servantName,
            goals: []
        });

        this.setState({
            servants: servants,
            servantName: ""
        });

        this.props.save(this.state);
    }

    removeServant = (servantIndex) => {
        const { servants } = this.state;

        servants.splice(servantIndex, 1);

        this.setState({
            servants: servants
        });

        this.props.save(this.state);
    }

    completeGoal = (servantIndex) => (goalIndex) => {
        const { servants, inventory } = this.state;
        const goal = servants[servantIndex].goals[goalIndex];
        const materials = Object.entries(goal.materials);

        servants[servantIndex].goals.splice(goalIndex, 1);

        materials.forEach(material => {
            inventory[material[0]] -= material[1];
        });

        this.setState({
            servants: servants,
            inventory: inventory
        });
        this.props.save(this.state);
    }

    changeInventory = (item, quantity) => {
        const { inventory } = this.state;
        inventory[item] = quantity;
        this.setState({
            inventory: inventory
        });

        this.props.save(this.state);
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
            <div>
                <Row>
                    <Col xs={12} md={6}>
                        {servants && servants.length > 0 &&
                            servants.map((servant, index) => {
                            return <Row
                                style={{ padding: 10 }}
                                key={index}
                            >
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
                                </Row>
                            })
                        }
                    </Col>
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
                                >
                                    New Servant
                                </Button>
                            </Col>
                        </Row>
                    </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(Servants);;