import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import TableView from './components/TableView';
import HistoryView from './components/HistoryView';
import Header from './components/Header';

import './style/style.scss';

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={TableView}/>
                <Route path='/history' component={HistoryView}/>
            </BrowserRouter>
        </div>
    ); 
};

ReactDOM.render(<App/>,document.getElementById('root'));