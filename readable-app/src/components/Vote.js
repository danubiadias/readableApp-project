import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Glyphicon } from 'react-bootstrap'
import { votePost, voteComment } from '../actions/shared'

class Vote extends Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true
        };
    }

    handleClose() {
        this.setState({ show: false });
        this.props.handleCloseVoteModal();
    }

    vote = (id, option, singlePost) => {

        (singlePost !== null) ? this.props.votePost(id, option, singlePost) : this.props.voteComment(id, option)
        this.handleClose()
    }

    render() {

        const { singlePost, id } = this.props

        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Did you like it?</Modal.Title>
                </Modal.Header>
                <Modal.Body align="center">
                    <Button className="btn-margin" onClick={() => this.vote(id, 'upVote', singlePost)}>
                        <Glyphicon className="icon-vote-modal" glyph="thumbs-up" style={{ fontSize: "3em" }} />
                    </Button>
                    <Button className="btn-margin" onClick={() => this.vote(id, 'downVote', singlePost)}>
                        <Glyphicon className="icon-vote-modal" glyph="thumbs-down" style={{ fontSize: "3em" }} />
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    votePost: (id, option, singlePost) => dispatch(votePost(id, option, singlePost)),
    voteComment: (id, option) => dispatch(voteComment(id, option))
  })

export default connect(null, mapDispatchToProps) (Vote)