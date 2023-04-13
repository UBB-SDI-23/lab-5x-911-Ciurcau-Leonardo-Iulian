import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home";
import FilteredGuitarList from "./guitars/filteredGuitarList";
import AddGuitar from "./guitars/addGuitar";
import UpdateGuitar from "./guitars/updateGuitar";
import SeeGuitar from "./guitars/seeGuitar";
import GuitarsHome from './guitars/guitarsHome';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


     componentDidMount() {
        this.forceUpdate();
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact={true} element={<Home/>}/>
                    <Route path='/guitars' element={<GuitarsHome/>}/>
                    <Route path='/filteredGuitars' element={<FilteredGuitarList/>}/>
                    <Route path='/addGuitar' element={<AddGuitar/>}/>
                    <Route path='/updateGuitar/:id' element={<UpdateGuitar/>}/>
                    <Route path='/seeGuitar/:id' element={<SeeGuitar/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);

export default App;