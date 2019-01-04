import * as React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, FormGroup, Label, Form, Input } from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import * as PropTypes from 'prop-types';

// Start Autosuggest helpers
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, items) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return items.filter(items => regex.test(items.name) || regex.test(items.displayName));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span><img src={require(`../assets/${suggestion.name}.png`)} alt={suggestion.name} />{suggestion.displayName}</span>
    );
}

// End autosuggest helpers

export class NewMaterialModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: "",
            quantity: 0,
            suggestions: []
        };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onItemSelect = (event, { newValue, method }) => {
        this.setState({
            item: newValue
        })
    }

    save = () => {
        const { item, quantity } = this.state;
        this.props.addItem(item, quantity);
        this.setState({
            item: "",
            quantity: 0
        })
        this.props.toggleModal();
    }

    cancel = () => {
        this.setState({
            item: "",
            quantity: 0
        });

        this.props.toggleModal();
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.items)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    canSaveItem = () => {
        const { items } = this.props;
        if (items && items.length > 0) {
            return items.some(item => item.name === this.state.item);
        }
        return false;
    }

    render() {
        const { showModal } = this.props;
        const { item, quantity, suggestions } = this.state;
        const inputProps = {
            value: item,
            onChange: this.onItemSelect,
            id: "item",
            name: "item"
        };
        return (
            <Modal
                isOpen={showModal}
            >
                <Form>

                    <ModalHeader>
                        Add Material
            </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs={12} md={8}>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                        theme={{
                                            container: 'autosuggest',
                                            input: 'form-control',
                                            suggestionsContainer: 'dropdown',
                                            suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
                                            suggestion: 'dropdown-item',
                                            suggestionFocused: 'active'
                                        }}
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
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
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
                            onClick={this.save}
                            disabled={!this.canSaveItem()}
                            type="submit"
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

NewMaterialModal.PropTypes = {
    showModal: PropTypes.bool,
    items: PropTypes.array,
    toggleModal: PropTypes.func,
    addItem: PropTypes.func
}