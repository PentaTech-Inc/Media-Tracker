import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/search" component={Search} />
          <Route path="/search?:title" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;