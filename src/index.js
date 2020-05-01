import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/common/Header"
import List from "./components/list/List";
import Detail from './components/detail/Detail';
import "./index.css"



const App = () => {
    return(
        <BrowserRouter >
            <Header/>
            <Switch>
                <Route exact path='/' component={List}  />
                <Route path='/currency/:id' component={Detail} />
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)