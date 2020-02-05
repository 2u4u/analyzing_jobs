import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WordsList from '../components/WordsList';
import WordPage from '../components/WordPage';
import Charts from '../components/Charts';
import Cities from '../components/Cities';
import UsaMap from '../components/Map';
import AppHeader from '../components/AppHeader';

import { Layout } from 'antd';
const { Content } = Layout;

function App() {

  return (
    <Router>
      <Layout style={{ height: "100%" }}>
        <AppHeader />
        <Content style={{ padding: '50px' }}>
          <div style={{ background: '#fff', padding: 24, height: "100%" }}>
            <Switch>
              <Route exact path="/" component={WordsList} />
              <Route exact path="/words" component={WordsList} />
              <Route exact path="/word/:handle" component={WordPage} />
              <Route exact path="/report" component={Charts} />
              <Route exact path="/map" component={UsaMap} />
              <Route exact path="/cities" component={Cities} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
