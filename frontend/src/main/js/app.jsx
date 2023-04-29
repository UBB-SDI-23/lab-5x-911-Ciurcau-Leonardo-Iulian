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
import TransactionsHome from './transactions/transactionsHome';
import SeeTransaction from './transactions/seeTransaction';
import AddTransaction from './transactions/addTransaction';
import UpdateTransaction from './transactions/updateTransaction';
import ShopsHome from './shops/shopsHome';
import SeeShop from './shops/seeShop';
import AddShop from './shops/addShop';
import UpdateShop from './shops/updateShop';
import AvgPriceShopList from './shops/avgPriceShopList';
import UserLogin from './user/userLogin';
import CurrentUser from './user/currentUser';
import UserRegister from './user/userRegister';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    static API_URL = '';
    constructor(props) {
        super(props);
        this.state = {currentUser: CurrentUser.getInstance()};
    }

     componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.forceUpdate();
    }

    getCurrentUserCookie() {
        let cname = "currentUser";
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return JSON.stringify(c.substring(name.length, c.length));
            }
        }
        return null;
    }

    getCurrentUser() {
        let cookie = this.getCurrentUserCookie();
        if (cookie) {
            this.state.currentUser.setUsername(cookie.username);
            this.state.currentUser.setAccessToken(cookie.accessToken);
        }
        else {
            this.state.currentUser.setUsername(null);
            this.state.currentUser.setAccessToken(null);
        }
        return this.state.currentUser;
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact={true} element={<Home parent={this}/>}/>
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
                    <Route path='/transactions' element={<TransactionsHome/>}/>
                    <Route path='/seeTransaction/:id' element={<SeeTransaction/>}/>
                    <Route path='/addTransaction' element={<AddTransaction/>}/>
                    <Route path='/updateTransaction/:id' element={<UpdateTransaction/>}/>
                    <Route path='/shops' element={<ShopsHome/>}/>
                    <Route path='seeShop/:id' element={<SeeShop/>}/>
                    <Route path='/addShop' element={<AddShop/>}/>
                    <Route path='/updateShop/:id' element={<UpdateShop/>}/>
                    <Route path='/averagePriceShops' element={<AvgPriceShopList/>}/>
                    <Route path='/login' element={<UserLogin parent={this}/>}/>
                    <Route path='/register' element={<UserRegister parent={this}/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);

export default App;