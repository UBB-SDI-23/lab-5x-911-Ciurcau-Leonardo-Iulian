import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home";
import FilteredGuitarList from "./filteredGuitarList";

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    static apiString = "";

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
                    <Route path='/filteredGuitars' element={<FilteredGuitarList/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);

export default App;