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
import ClientsHome from './clients/clientsHome';
import SeeClient from './clients/seeClient';
import UpdateClient from './clients/updateClient';
import AddClient from './clients/addClient';
import CourierHome from './couriers/couriersHome';
import AddCourier from './couriers/addCourier';
import SeeCourier from './couriers/seeCourier';
import UpdateCourier from './couriers/updateCourier';

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
                    <Route path='/clients' element={<ClientsHome/>}/>
                    <Route path='/seeClient/:id' element={<SeeClient/>} />
                    <Route path='/updateClient/:id' element={<UpdateClient/>}/>
                    <Route path='/addClient' element={<AddClient/>}/>
                    <Route path='/couriers' element={<CourierHome/>}/>
                    <Route path='/addCourier' element={<AddCourier/>}/>
                    <Route path='/seeCourier/:id' element={<SeeCourier/>}/>
                    <Route path='/updateCourier/:id' element={<UpdateCourier/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);

export default App;