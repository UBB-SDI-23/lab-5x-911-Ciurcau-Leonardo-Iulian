import React, {Component} from "react";
import App from "./app";
import {
    Button,
    Container,
    FormControl,
    Input,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import AppNavbar from "./appNavBar";

class FilteredGuitarList extends Component {
    constructor(props) {
        super(props);
        this.state = {filteredGuitars: [], filteredGuitarsPrice: 0};
    }

    componentDidMount() {
        this.handleFilteredGuitarsChange = this.handleFilteredGuitarsChange.bind(this);
        this.handleFilteredGuitarsSubmit = this.handleFilteredGuitarsSubmit.bind(this);
        this.forceUpdate();
    }

    handleFilteredGuitarsChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({filteredGuitarsPrice: value});
    }

    handleFilteredGuitarsSubmit(event) {
        event.preventDefault()
        const filteredGuitarsPrice= this.state.filteredGuitarsPrice;
        fetch(`${App.apiString}/api/guitars/priceGreaterThan/` + filteredGuitarsPrice)
            .then(response => response.json())
            .then(data => this.setState({filteredGuitars: data}));
    }

    render() {
        const {filteredGuitars, filteredGuitarsPrice, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

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
            <Container maxWidth={false}>
                <AppNavbar />
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

export default FilteredGuitarList;