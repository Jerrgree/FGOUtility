import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Inventory from './containers/Inventory';
import Servants from './containers/Servants';

export default () => (
    <Layout>
        <Route exact path='/' component={Inventory} />
        <Route path='/Servants' component={Servants} />
    </Layout>
);
