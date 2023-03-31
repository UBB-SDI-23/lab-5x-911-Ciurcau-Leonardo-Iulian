import { createRoot } from 'react-dom/client';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {guitars: [], filteredGuitars: []};
    }


    componentDidMount() {
        fetch('/guitars')
            .then(response => response.json())
            .then(data => this.setState({guitars: data}));

        fetch('/guitars/priceGreaterThan/3000')
            .then(response => response.json())
            .then(data => this.setState({filteredGuitars: data}));

        this.forceUpdate()
    }

    render() {
        const {guitars, filteredGuitars, isLoading} = this.state;
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
            <div>
            <div className="guitars">
                <h1>Guitars</h1>
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
             <div className="filteredGuitars">
                <h1>Filtered guitars</h1>
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
root.render(<App />)