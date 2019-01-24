import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import ButtonCustom from './ButtonCustom'
import { getAllCategories, createPost, editPost, getPost } from '../actions/shared'
import { capitalize } from '../utils/helpers'
import { connect } from 'react-redux'
import uuid from 'uuid';
import SweetAlert from 'react-bootstrap-sweetalert'

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class PostForm extends Component {

    state = {
        panelTitle: '',
        title: '',
        author: '',
        category: 'react',
        body: '',
        isNewPost: window.location.pathname === '/newpost',
        error: false
    }


    componentDidMount() {
        this.props.getAllCategories();

        if (this.state.isNewPost)
            this.setState({ 'panelTitle': 'New Post' })
        else {
            const id = this.props.match.params.id;
            this.props.getPost(id);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (!this.state.isNewPost) {
            this.setState({
                'panelTitle': 'Edit Post',
                'id': nextProps.post.id,
                'title': nextProps.post.title,
                'author': nextProps.post.author,
                'category': nextProps.post.category,
                'body': nextProps.post.body
            })
        }

    }

    validadeForm() {
        if (this.state.title !== '' && this.state.title !== undefined
            && this.state.author !== '' && this.state.author !== undefined
            && this.state.body !== '' && this.state.body !== undefined)
            return true
        else return false

    }

    handleCreatePost = (e) => {
        e.preventDefault()

        if (this.validadeForm()) {
            let post = {
                id: uuid.v4(),
                title: this.state.title,
                author: this.state.author,
                category: this.state.category,
                body: this.state.body
            }

            this.props.createPost(post)

            window.location = '/'

        } else {
            this.setState({ 'error': true })
        }

    }

    handleEditPost = (e) => {
        e.preventDefault()

        if (this.validadeForm()) {
            let post = {
                id: this.props.match.params.id,
                title: this.state.title,
                author: this.state.author,
                category: this.state.category,
                body: this.state.body
            }
            this.props.editPost(post)

            window.location = '/'
        } else {
            this.setState({ 'error': true })
            console.log("Não pode campos vazios")
        }
    }

    onConfirm = () => { this.setState({ error: false }) }


    render() {

        const { categories } = this.props

        return (
            <div>
                <ButtonCustom icon={"arrow-left"} path={"/"} btnStyle={"btn btn-primary btn-circle btn-lg btn-left "} />
                <br /><br />
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3" align="center">{this.state.panelTitle}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <form>
                            <FieldGroup
                                id="title"
                                type="text"
                                label="Title"
                                placeholder="Enter text"
                                value={this.state.title}
                                onChange={(e) => this.setState({ 'title': e.target.value })}
                            />
                            <FieldGroup
                                id="author"
                                type="text"
                                label="Author"
                                placeholder="Enter text"
                                value={this.state.author}
                                onChange={(e) => this.setState({ 'author': e.target.value })}
                            />
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Category</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    value={this.state.category}
                                    onChange={(e) => this.setState({ 'category': e.target.value })}
                                >
                                    {categories.length > 0 &&
                                        categories.map((category, key) => <option key={key} value={category.name}>{capitalize(category.name)}</option>)
                                    }
                                </FormControl>
                            </FormGroup>
                            <FieldGroup
                                id="body"
                                componentClass="textarea"
                                label="Post"
                                placeholder="Body of the message"
                                rows={6}
                                value={this.state.body}
                                onChange={(e) => this.setState({ 'body': e.target.value })}
                            />
                            <div align="center">
                                <Button className="btn-margin" bsStyle="primary" onClick={(this.state.isNewPost) ? this.handleCreatePost : this.handleEditPost}>Save</Button>
                                <Button className="btn-margin" bsStyle="danger" href={"/"}>Cancel</Button>
                            </div>
                        </form>
                    </Panel.Body>
                </Panel>
                {this.state.error && <SweetAlert danger title="Alert!" onConfirm={this.onConfirm}>
                    Please, complete all fields!
                </SweetAlert>}
            </div>

        )
    }
}
const mapStateToProps = ({ categories, posts }) => ({
    categories,
    post: posts
})

const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories()),
    getPost: (id) => dispatch(getPost(id)),
    createPost: (post) => dispatch(createPost(post)),
    editPost: (post) => dispatch(editPost(post))
})


export default connect(mapStateToProps, mapDispatchToProps)(PostForm)