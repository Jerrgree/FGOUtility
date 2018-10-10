import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Input, Row, Col, Table } from 'reactstrap';
import { GetMaterials, GetClassPieces } from '../assets/references';
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

    changeInv = (event) => {
        const field = event.target.name;
        const { inventory } = this.state;
        inventory[field] = parseInt(event.target.value);
        this.setState({ inventory: inventory });
    }

    addSv = (servant) => {
        const { servants } = this.state;
        servants.push(servant);
        this.setState({ servants: servants });
    }
    removeSv = (index) => {
        const { servants } = this.state;
        servants.splice(index, 1);
        this.setState({ servants: servants });
    }
    changeSv = (index) => (servant) => {
        const { servants } = this.state;
        servants[index] = servant;
        this.setState({ servants: servants });
    }


    onBlur = (event) => {
        this.props.save(this.state);
    }

    render() {
        const materials = GetMaterials();
        const classPieces = GetClassPieces();
        const items = materials.map(x => x.name).concat(classPieces.map(x => x.name));
        const options = materials.concat(classPieces);

        const { servants, inventory } = this.props;
        return (
            <div>
                {servants.length > 0 &&
                    servants.map(servant => {
                        return <Servant
                            key={servant.name}
                            servant={servant}
                            inventory={inventory}
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