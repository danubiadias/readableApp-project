import React, { Component } from 'react';
import { Glyphicon, Popover, Row, Col, Button, Badge } from 'react-bootstrap'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../actions/shared'
import Vote from './Vote'
import CommentModal from './CommentModal'

class Comment extends Component {

    state = {
        showVoteModal: false,
        showCommentModal: false
    }

    render() {

        const { comment } = this.props

        return (
            <Row style={{ height: 180 }}>
                <Col md={6}>
                    <span style={{ padding: "50px" }}>
                        <Glyphicon className="icon-comment" glyph="user" />
                    </span>
                    <Popover
                        id="popover-basic"
                        style={{ zIndex: 1, maxWidth: "80%" }}
                        placement="right"
                        positionLeft={150}
                        positionTop={30}
                        title={"Author: "+comment.author}

                    >
                        <p><strong>Comment: </strong> {comment.body} </p>
                        <Badge>{comment.voteScore}</Badge>&nbsp;
                        {comment.voteScore > 0
                            ? <Glyphicon className="icon-thumbs-up" glyph="thumbs-up" />
                            : (comment.voteScore !== 0 ? <Glyphicon className="icon-thumbs-down" glyph="thumbs-down" /> : null)
                        }
                        <br/><br/>
                        <small>
                            <Moment format="dddd, MMM Do YYYY, h:mm:ss A">{comment.timestamp}</Moment>
                        </small>
                    </Popover>

                </Col>
                <Col md={4}>
                    <div style={{ paddingTop: "70px" }}>
                        <Button className="btn-margin" bsStyle="success" bsSize="xsmall" onClick={() => this.setState({'showVoteModal': true })}>
                            Vote
                        </Button>
                        <Button className="btn-margin" bsStyle="warning" bsSize="xsmall" onClick={() => this.setState({'showCommentModal': true })}>
                            Edit
                        </Button>
                        <Button className="btn-margin" bsStyle="danger" bsSize="xsmall" onClick={() => this.props.deleteComment(comment)}>
                            Delete
                        </Button>
                        {this.state.showVoteModal && <Vote id={comment.id} singlePost={null} handleCloseVoteModal={()=> this.setState({ showVoteModal : false })}/>}
                        {this.state.showCommentModal && <CommentModal comment={comment} handleCloseCommentModal={()=> this.setState({ showCommentModal : false })}/>}
                    </div>
                </Col>
            </Row >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteComment: comment => dispatch(deleteComment(comment))
})

export default connect(null, mapDispatchToProps)(Comment)