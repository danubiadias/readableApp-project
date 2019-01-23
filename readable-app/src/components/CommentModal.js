import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { editComment } from '../actions/shared'

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class CommentModal extends Component {

    constructor(props) {
        super(props);
        
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            author: props.comment.author,
            body: props.comment.body,
        };
        
    }

    handleClose() {
        this.setState({ show: false });
        this.props.handleCloseCommentModal();
    }


    handleSaveComment  = (e) => {
        e.preventDefault()

        let comment = {
          id: this.props.comment.id,
          author: this.state.author,
          body: this.state.body
        }
        this.props.editComment(comment);
    
        this.handleClose();
    }


    render() {

        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FieldGroup
                            id="author"
                            type="text"
                            label="Author"
                            value={this.state.author}
                            onChange={(e) => this.setState({ 'author': e.target.value })}
                        />
                        <FieldGroup
                            id="comment"
                            componentClass="textarea"
                            rows={4}
                            label="Comment"
                            value={this.state.body}
                            onChange={(e) => this.setState({ 'body': e.target.value })}
                        />
                    </form>
                    <div align="center">
                        <Button className="btn-margin" bsStyle="primary" onClick={this.handleSaveComment}>Save</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({

    editComment: (comment) => dispatch(editComment(comment))
})

export default connect(null, mapDispatchToProps)(CommentModal)