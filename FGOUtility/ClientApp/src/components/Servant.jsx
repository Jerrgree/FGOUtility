import * as React from 'react';
import { Goal } from '../components';
import PropTypes from 'prop-types';

export class Servant extends React.Component {

    handleBlur = (event) => {

    }

    handleChange = (event) => {

    }

    render() {

        const { servant, inventory } = this.props;
        const goals = servant.goals;
        return <div>
            <h1>
                {servant.name}
            </h1>
            <div>
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
            </div>

        </div>
    }
}

Servant.PropTypes = {
    servant: PropTypes.obj,
    inventory: PropTypes.object,
    options: PropTypes.array.isRequired,
}