import { createRoot } from 'react-dom/client';
import {render} from "react-dom";

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {guitars: []};
    }


    componentDidMount() {
        fetch('/guitars')
            .then(response => response.json())
            .then(data => this.setState({guitars: data}));
    }

    render() {
        //this.componentDidMount()
        const {guitars, isLoading} = this.state;
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

        return (
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
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />)