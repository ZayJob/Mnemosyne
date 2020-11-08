import React from 'react';
import { Route } from 'react-router-dom';

import PromptList from './containers/PromptListView'
import PromptDetail from './containers/PromptDetailView'
import NormalLoginForm from './containers/Login'
import RegistrationForm from './containers/Signup'
import ProfileDetail from './containers/ProfileDetailView'


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={PromptList} />
        <Route exact path='/detail/:promptID' component={PromptDetail} />
        <Route exact path='/login' component={NormalLoginForm} />
        <Route exact path='/signup' component={RegistrationForm} />
        <Route exact path='/profile' component={ProfileDetail} />
    </div>
);

export default BaseRouter;