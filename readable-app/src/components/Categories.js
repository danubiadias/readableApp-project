import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllCategories } from '../actions/shared'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'

class Categories extends Component {

    componentDidMount() {
        this.props.getAllCategories();
    }

    render() {

        const { categories } = this.props

        return (
            <DropdownButton bsStyle="primary" title="Categories" id="bg-justified-dropdown">
                <MenuItem key='all' href="/">All</MenuItem>
                {categories.length > 0 &&
                    categories.map((category, key) => (
                        <MenuItem key={key} href={`/${category.name}`}>
                            {capitalize(category.name)}
                        </MenuItem>)
                    )
                }
            </DropdownButton>
        );
    }

}

const mapStateToProps = ({ categories }) => ({
    categories
})

const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Categories)