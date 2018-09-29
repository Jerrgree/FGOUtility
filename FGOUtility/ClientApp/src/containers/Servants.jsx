import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'reactstrap';
import { GetMaterials, GetClassPieces } from '../assets/references';

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

    //changeSv = (event) => {
    //    const field = event.target.name;
    //    const { servants } = this.state;
    //    servants[field] = parseInt(event.target.value);
    //    this.setState({ servants: servants });
    //}

    onBlur = (event) => {
        this.props.save(this.state);
    }

    render() {
        return (
            <div>
                Servants!
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