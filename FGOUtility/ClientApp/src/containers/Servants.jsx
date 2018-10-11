import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { GetMaterials, GetClassPieces } from '../data/references';
import { Servant } from '../components';

class Servants extends React.Component {
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

    addItemToGoal = (servantIndex) => (goalIndex) => (item, quantity) => {
        const { servants } = this.state;
        servants[servantIndex].goals[goalIndex].materials[item] = quantity;

        this.setState({
            servants: servants
        });
    }

    changeInventory = (item, quantity) => {
        const { inventory } = this.state;
        inventory[item] = quantity;
        this.setState({
            inventory: inventory
        });
    }


    render() {
        const materials = GetMaterials();
        const classPieces = GetClassPieces();
        //const items = materials.map(x => x.name).concat(classPieces.map(x => x.name));
        const options = materials.concat(classPieces);

        const { servants, inventory } = this.state;
        console.log(inventory);
        return (
            <div>
                {servants && servants.length > 0 &&
                    servants.map((servant, index) => {
                        return <Servant
                            key={index}
                            servant={servant}
                            inventory={inventory}
                            items={options}
                            index={index}
                            addItemToGoal={this.addItemToGoal}
                            changeInventory={this.changeInventory}
                        />
                    })
                }
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