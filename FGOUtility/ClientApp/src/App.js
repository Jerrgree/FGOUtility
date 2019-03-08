import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Inventory from './containers/Inventory';
import Servants from './containers/Servants';
import Login from './components/Login';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faMinus)

export default () => (
    <Layout>
        <Route exact path='/' component={Inventory} />
        <Route path='/Servants' component={Servants} />
        <Route path='/Login' component={Login} />
    </Layout>
);
