import React from 'react';
import { Route } from 'react-router-dom';

import PromptList from './containers/PromptListView'
import PromptDetail from './containers/PromptDetailView'
import NormalLoginForm from './containers/Login'
import RegistrationForm from './containers/Signup'
import Activate from './containers/Activate'
import ProfileDetail from './containers/ProfileDetailView'


const BaseRouter = () => (
    <div>
        <Route exact path='/prompts' component={PromptList} />
        <Route exact path='/detail/:promptID' component={PromptDetail} />
        <Route exact path='/' component={NormalLoginForm} />
        <Route exact path='/signup' component={RegistrationForm} />
        <Route exact path='/profile' component={ProfileDetail} />
        <Route exact path='/activate/:uid/:token' component={Activate} />
    </div>
);

export default BaseRouter;