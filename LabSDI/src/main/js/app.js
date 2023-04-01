import { createRoot } from 'react-dom/client';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {guitars: [], filteredGuitars: [], filteredGuitarsPrice: 0};
    }


     componentDidMount() {
        this.handleFilteredGuitarsChange = this.handleFilteredGuitarsChange.bind(this);
        this.showAllGuitars = this.showAllGuitars.bind(this)
        this.handleFilteredGuitarsSubmit = this.handleFilteredGuitarsSubmit.bind(this);
        this.forceUpdate();
    }

    handleFilteredGuitarsChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({filteredGuitarsPrice: value});
    }

    showAllGuitars(event) {
        fetch('/guitars')
            .then(response => response.json())
            .then(data => this.setState({guitars: data}));
    }

    handleFilteredGuitarsSubmit(event) {
        event.preventDefault()
        const filteredGuitarsPrice= this.state.filteredGuitarsPrice;
        fetch('/guitars/priceGreaterThan/' + filteredGuitarsPrice)
            .then(response => response.json())
            .then(data => this.setState({filteredGuitars: data}));
    }

    render() {
        const {guitars, filteredGuitars, filteredGuitarsPrice, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const guitarList = guitars.map(guitar => {
            return <tr key={guitar.id}>
                        <td>{guitar.price}</td>
                        <td>{guitar.creationYear}</td>
                        <td>{guitar.model}</td>
                        <td>{guitar.type}</td>
                        <td>{guitar.color}</td>
                    </tr>
        });

        const filteredGuitarList = filteredGuitars.map(guitar => {
            return <tr key={guitar.id}>
                <td>{guitar.price}</td>
                <td>{guitar.creationYear}</td>
                <td>{guitar.model}</td>
                <td>{guitar.type}</td>
                <td>{guitar.color}</td>
            </tr>
        });

        return (
            <div className="mainContainer">
                <div className="guitars tableContainer">
                    <button className="showButton" onClick={this.showAllGuitars}>Show all guitars</button>
                    <table>
                        <thead>
                        <tr>
                            <th>Price</th>
                            <th>Creation year</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Color</th>
                        </tr>
                        </thead>
                        <tbody>
                        {guitarList}
                        </tbody>
                    </table>
                </div>
                 <div className="filteredGuitars tableContainer">
                     <form onSubmit={this.handleFilteredGuitarsSubmit}>
                         <label htmlFor="price">Show guitars with price greater than: </label>
                         <input type="text" id="price" value={filteredGuitarsPrice}
                                onChange={this.handleFilteredGuitarsChange}/>
                         <button type="submit" className="submitButton">Submit</button>
                     </form>
                    <table>
                        <thead>
                        <tr>
                            <th>Price</th>
                            <th>Creation year</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Color</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredGuitarList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);