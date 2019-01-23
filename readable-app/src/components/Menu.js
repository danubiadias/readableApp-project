import React, { Component } from 'react';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import Categories from './Categories'

class Menu extends Component {

    render() {

        const { onSortChange } = this.props;

        return (
            <ButtonGroup justified>
                <Button bsStyle="primary" href="/">Readable</Button>
                <Categories />
                <DropdownButton 
                    bsStyle="primary" 
                    title="Sorted by" 
                    id="bg-justified-dropdown"
                    onSelect={(e) => onSortChange(e)}
                >
                    <MenuItem eventKey='timestamp'>Date created</MenuItem>
                    <MenuItem eventKey='voteScore'>Highest score</MenuItem>
                </DropdownButton>
            </ButtonGroup>
        )
    }
}
export default Menu