import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import withAuth from './components/withAuth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/search" component={Search} />
            <Route path="/search?:title" component={Search} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;