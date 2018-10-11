import * as React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, FormGroup, Label, Form, Input } from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import * as PropTypes from 'prop-types';

export class NewMaterialModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: "",
            quantity: 0
        };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    save = () => {
        this.props.toggleModal();
    }

    cancel = () => {
        this.setState({
            item: "",
            quantity: 0
        });

        this.props.toggleModal();
    }

    render() {
        const { showModal } = this.props;
        const { item, quantity } = this.state;
        return (
            <Modal
                isOpen={showModal}
            >
                <ModalHeader>
                    Add Material
            </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col xs={12} md={8}>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input
                                        value={item}
                                        onChange={this.onChange}
                                        id="item"
                                        name="item"
                                    />
                                </FormGroup>
                            </Col>

                            <Col xs={12} md={4}>
                                <FormGroup>
                                    <Label for="quantity">Quantity</Label>
                                    <Input
                                        value={quantity}
                                        onChange={this.onChange}
                                        id="quantity"
                                        name="quantity"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={this.cancel}
                    >
                        Cancel
                </Button>
                    <Button
                        color="success"
                    >
                        Save
                </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

NewMaterialModal.PropTypes = {
    showModal: PropTypes.bool,
    items: PropTypes.array,
    toggleModal: PropTypes.func
}