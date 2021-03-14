import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
                {/* I'm show weathers in different cities on one page */}
            </Route>
        </Switch>
    );
}

export default App;
