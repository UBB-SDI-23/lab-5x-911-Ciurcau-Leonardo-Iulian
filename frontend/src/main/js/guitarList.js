import React, {Component} from "react";
import App from "./app";
import {Button, Container, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

class GuitarList extends Component {
    constructor(props) {
        super(props);
        this.state = {guitars: [], showPriceSVG: false};
    }

    componentDidMount() {
        this.showAllGuitars = this.showAllGuitars.bind(this);
        this.sortGuitarsByPrice = this.sortGuitarsByPrice.bind(this);
        if (!this.props.parent)
            this.showAllGuitars();
        this.forceUpdate();
    }

    showAllGuitars(event) {
        fetch(`${App.apiString}/api/guitars`)
            .then(response => response.json())
            .then(data => this.setState({guitars: data}));
    }

    sortGuitarsByPrice(event) {
        if (!this.props.parent) {
            let {guitars} = this.state;
            let sortedGuitars = [...guitars].sort((a, b) => a.price - b.price);
            this.setState({guitars: sortedGuitars});
            this.setState({showPriceSVG: true});
        }
        else {
            let {guitars} = this.props.parent.state;
            let sortedGuitars = [...guitars].sort((a, b) => a.price - b.price);
            this.props.parent.setState({guitars: sortedGuitars});
            this.props.parent.setState({showPriceSVG: true});
        }
    }

    render() {
        const {guitars, showPriceSVG, isLoading} = this.props.parent ? this.props.parent.state : this.state;
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

        return (
            <Container className="guitars tableContainer">
                <Table id="guitarTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Button onClick={this.sortGuitarsByPrice}>
                                    Price
                                    {showPriceSVG && <SvgIcon component={KeyboardArrowDownIcon}></SvgIcon>}
                                </Button>
                            </TableCell>
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
        );
    }
}

export default GuitarList;