import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Media from './pages/Media';
import withAuth from './components/withAuth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// BrowserRouter => HashRouter

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile/:username" component={withAuth(Profile)} />
          <Route path="/search" component={Search} />
          <Route path="/search?:title" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/media" component={Media} />
          <Route path="/settings" component={withAuth(Settings)} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;