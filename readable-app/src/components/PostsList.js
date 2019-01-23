import React, { Component } from 'react';
import { getAllPosts, getPostsByCategory } from '../actions/shared'
import { capitalize } from '../utils/helpers'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import sortBy from 'sort-by'
import { ListGroup, ListGroupItem, Glyphicon, Popover, Row, Col, Button, Badge } from 'react-bootstrap';
import Menu from './Menu'
import ButtonCustom from './ButtonCustom'
import Vote from './Vote'


class PostsList extends Component {

    state = {
        sortBy: 'voteScore',
        showVoteModal: false,
        idCurrentPost: ''
    }

    componentDidMount() {

        const category = this.props.match.params.category
        category === undefined ? this.props.getAllPosts() : this.props.getPostsByCategory(category);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.category !== this.props.match.params.category) {
            const category = nextProps.match.params.category;
            this.props.getAllPosts(category);
        }
    }

    orderPosts = (posts, filter) => {

        return filter === 'voteScore' ? posts.sort(sortBy(`-${filter}`)) : posts.sort(sortBy(`${filter}`))
           
    }

    onSortChange = (sortBy) => {
        this.setState({ sortBy })
    }

    votePost = (id) => {
        this.setState({
            'showVoteModal': true,
            'idCurrentPost': id
        })
        
    }


    render() {
        const { posts } = this.props;     
        const orderedPosts = (posts.length > 0) ? this.orderPosts(posts, this.state.sortBy) : posts

        return (
            <div>
                <Menu onSortChange={this.onSortChange} />
                <br />
                <ListGroup>
                    {orderedPosts.length > 0
                        ? orderedPosts.map((post, key) =>
                            (
                                <ListGroupItem key={key} style={{ height: 220 }}>
                                    <Row>
                                        <Col md={8}>
                                            <span style={{ padding: "50px" }}>
                                                <Glyphicon className="icon-post" glyph="user" />
                                            </span>
                                            <Popover
                                                id="popover-basic"
                                                style={{ zIndex: 1, maxWidth: "80%" }}
                                                placement="right"
                                                positionLeft={200}
                                                positionTop={50}
                                                title={post.title}

                                            >
                                                <p><strong>Post created by</strong> {post.author} </p>
                                                <p><strong>Category: </strong> {capitalize(post.category)} </p>
                                                <small>
                                                    <Moment format="dddd, MMM Do YYYY, h:mm:ss A">{post.timestamp}</Moment>
                                                </small>
                                            </Popover>

                                        </Col>
                                        <Col md={4} align="center" style={{ paddingTop: "50px" }}>
                                            <div>
                                                <h5>
                                                    Vote Score: <Badge>{post.voteScore} </Badge> &nbsp;
                                                    {post.voteScore > 0
                                                        ? <Glyphicon className="icon-thumbs-up" glyph="thumbs-up" />
                                                        : (post.voteScore !== 0 ? <Glyphicon className="icon-thumbs-down" glyph="thumbs-down" /> : null)
                                                    }
                                                </h5>
                                                <small>
                                                    <Glyphicon glyph="comment" />
                                                    &nbsp; {post.commentCount} comments
                                                </small>
                                            </div>
                                            <br /><br />
                                            <div >
                                                <Button className="btn-margin" bsStyle="primary" bsSize="xsmall" href={`/${post.category}/${post.id}`}>
                                                    Details
                                                </Button>
                                                <Button className="btn-margin" bsStyle="success" bsSize="xsmall" onClick={() => this.votePost(post.id)}>
                                                    Vote
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroupItem>)
                        )
                        : (
                            <ListGroupItem key={"nofound"}>
                                <h3 align="center">There were no posts in this category.</h3><br />
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
                <br />
                <ButtonCustom icon={"plus"} path={"/newpost"} btnStyle={"btn btn-primary btn-circle btn-xl btn-right"} />
                {this.state.showVoteModal && <Vote id={this.state.idCurrentPost} singlePost={false} handleCloseVoteModal={()=> this.setState({ showVoteModal : false })}/>}
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})

const mapDispatchToProps = (dispatch) => ({
    getAllPosts: () => dispatch(getAllPosts()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category))
})


export default connect(mapStateToProps, mapDispatchToProps)(PostsList)