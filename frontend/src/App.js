import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRoute from './routes';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <CustomLayout>
            <BaseRoute />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

export default App;
