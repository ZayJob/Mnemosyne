import React from 'react';
import { Route } from 'react-router-dom';

import PromptList from './containers/PromptListView'
import PromptDetail from './containers/PromptDetailView'


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={PromptList} />
        <Route exact path='/detail/:promptID' component={PromptDetail} />
    </div>
);

export default BaseRouter;