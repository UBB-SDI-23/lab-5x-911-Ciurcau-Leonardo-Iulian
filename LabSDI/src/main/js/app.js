import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input, InputLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";

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
        this.forceUpdate()
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
            return <TableRow key={guitar.id}>
                        <TableCell>{guitar.price}</TableCell>
                        <TableCell>{guitar.creationYear}</TableCell>
                        <TableCell>{guitar.model}</TableCell>
                        <TableCell>{guitar.type}</TableCell>
                        <TableCell>{guitar.color}</TableCell>
                    </TableRow>
        });

        const filteredGuitarList = filteredGuitars.map(guitar => {
            return <TableRow key={guitar.id}>
                <TableCell>{guitar.price}</TableCell>
                <TableCell>{guitar.creationYear}</TableCell>
                <TableCell>{guitar.model}</TableCell>
                <TableCell>{guitar.type}</TableCell>
                <TableCell>{guitar.color}</TableCell>
            </TableRow>
        });

        return (
            <Container className="mainContainer">
                <Container className="guitars tableContainer">
                    <Button className="showButton" onClick={this.showAllGuitars}>Show all guitars</Button>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>Creation year</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Color</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {guitarList}
                        </TableBody>
                    </Table>
                </Container>
                 <Container className="filteredGuitars tableContainer">
                     <FormControl className="formControlFilteredGuitars">
                         <InputLabel htmlFor="price">Show guitars with price greater than: </InputLabel>
                         <Input type="text" id="price" value={filteredGuitarsPrice}
                                onChange={this.handleFilteredGuitarsChange}/>
                         <Button onClick={this.handleFilteredGuitarsSubmit} className="submitButton">Submit</Button>
                     </FormControl>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>Creation year</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Color</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredGuitarList}
                        </TableBody>
                    </Table>
                </Container>
            </Container>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);