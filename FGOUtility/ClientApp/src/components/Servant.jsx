import * as React from 'react';
import { Goal } from '../components';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';

export class Servant extends React.Component {

    handleBlur = (event) => {

    }

    handleChange = (event) => {

    }

    render() {

        const { servant, inventory } = this.props;
        const goals = servant.goals;
        return <Card>
                <CardHeader>
                    {servant.name}
                </CardHeader>
                <CardBody>
                    {goals.length > 0 &&
                        goals.map(goal => {
                            return (
                                <Goal
                                    key={goal.name}
                                    goal={goal}
                                    inventory={inventory}
                                />
                            )
                        })
                    }
                </CardBody>
        </Card>
    }
}

Servant.PropTypes = {
    servant: PropTypes.obj,
    inventory: PropTypes.object,
    options: PropTypes.array.isRequired,
}