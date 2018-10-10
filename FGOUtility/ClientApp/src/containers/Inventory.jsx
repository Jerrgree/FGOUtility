import * as React from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { GetMaterials, GetClassPieces } from '../assets/references';
import { InventoryRow } from '../components';

class Inventory extends React.Component {
    constructor(props, context) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        if (this.props.load) {
            this.props.load();
        }
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
                            <InventoryRow
                                inventory={inventory}
                                items={materials}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                            />
                        </Col>
                        <Col xs="12" md="6">
                            <InventoryRow
                                inventory={inventory}
                                items={classPieces}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                            />
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