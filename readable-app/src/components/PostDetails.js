import React, { Component } from 'react';
import { 
        Jumbotron, 
        Button, 
        Panel, 
        FormGroup, 
        ControlLabel, 
        FormControl, 
        ListGroup, 
        ListGroupItem,
        Badge,
        Glyphicon
} from 'react-bootstrap'

import { connect } from 'react-redux'
import Moment from 'react-moment'
import { getPost, deletePost, getComments, addComment } from '../actions/shared'
import ButtonCustom from './ButtonCustom'
import Comment from './Comment'
import Vote from './Vote'
import sortBy from 'sort-by'
import uuid from 'uuid';


class PostDetails extends Component {

    state = {
        author: '',
        body: '',
        showVoteModal: false
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.getPost(id);
        this.props.getComments(id);
    }

    handleCreateComment = (e) => {
        e.preventDefault()

        let comment = {
            id: uuid.v4(),
            parentId: this.props.post.id,
            author: this.state.author,
            body: this.state.body
        }
        
        this.props.addComment(comment)
        this.setState({
            'author': '',
            'body': ''
        })
    }

    handleDeletePost = (e) => {
        e.preventDefault()

        this.props.deletePost(this.props.post)

        window.location = '/'
    }
    

    render() {

        const { post, comments } = this.props;

        const orderedComments = comments.length > 0 ? comments.sort(sortBy(`-voteScore`)) : comments

        return (
            <div style={{ paddingTop: "30px" }}>
                <ButtonCustom icon={"arrow-left"} path={"/"} btnStyle={"btn btn-primary btn-circle btn-lg btn-left "} />
                <br /><br />
                <Jumbotron>
                    <h3 align="center">{post.title}</h3>
                    <br />
                    <p><strong>Author: </strong> {post.author} </p>
                    <p>
                        <strong>Date created: </strong>
                        <Moment format="dddd, MMM Do YYYY, h:mm:ss A">{post.timestamp}</Moment>
                    </p>
                    <p> <strong>Category: </strong> {post.category} </p>
                    <p>
                        <strong>Vote Score: </strong>
                        <Badge>{post.voteScore}</Badge>&nbsp;
                        {post.voteScore > 0
                            ? <Glyphicon className="icon-thumbs-up" glyph="thumbs-up" />
                            : (post.voteScore !== 0 ? <Glyphicon className="icon-thumbs-down" glyph="thumbs-down" /> : null)
                        }
                    </p>
                    <p>
                        <strong>Post Content: </strong> {post.body}
                    </p>

                    <div align="center" style={{ paddingTop: "50px" }}>
                        <Button className="btn-margin" bsStyle="success" bsSize="xsmall" onClick={() => this.setState({'showVoteModal': true })}>
                            Vote
                        </Button>
                        <Button className="btn-margin" bsStyle="warning" bsSize="xsmall" href={`/edit/${post.id}`}>
                            Edit
                        </Button>
                        <Button className="btn-margin" bsStyle="danger" bsSize="xsmall" onClick={this.handleDeletePost}>
                            Delete
                        </Button>
                    </div>
                </Jumbotron>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3" align="center"> Post Comments </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <ListGroup>
                            {orderedComments.length > 0
                                && orderedComments.map((comment, key) =>
                                    <ListGroupItem key={key}>
                                        <Comment comment={comment} />
                                    </ListGroupItem>)
                            }
                        </ListGroup>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">New Comment</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                                <FormGroup controlId="author">
                                    <ControlLabel>Author</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.author}
                                        onChange={(e) => this.setState({ 'author': e.target.value })}
                                    />
                                </FormGroup>

                                <FormGroup controlId="body">
                                    <ControlLabel>Comment</ControlLabel>
                                    <FormControl
                                        componentClass="textarea"
                                        rows={4}
                                        value={this.state.body}
                                        onChange={(e) => this.setState({ 'body': e.target.value })}
                                    >
                                    </FormControl>
                                </FormGroup>
                                <div align="center" >
                                    <Button bsStyle="primary" onClick={this.handleCreateComment}>Add Comment</Button>
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Panel.Body>
                </Panel>
                {this.state.showVoteModal && <Vote id={post.id} singlePost={true} handleCloseVoteModal={()=> this.setState({ showVoteModal : false })}/>}
            </div>
        )
    }
}

const mapStateToProps = ({ posts, comments }) => ({
    post: posts,
    comments

})

const mapDispatchToProps = dispatch => ({
    getPost: (id) => dispatch(getPost(id)),
    deletePost: (post) => dispatch(deletePost(post)),
    getComments: (id) => dispatch(getComments(id)),
    addComment: (comment) => dispatch(addComment(comment))
})


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)