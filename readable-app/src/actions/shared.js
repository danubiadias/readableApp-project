import * as API from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { receiveAllPosts, receivePost, receivePostsByCategory } from '../actions/posts'
import { receiveComments } from '../actions/comments'

export function getAllCategories() {
    return (dispatch) => {
        API.getAllCategories().then(
            (response) => dispatch(receiveCategories(response))
        )
    }
}

export function getAllPosts() {
    return (dispatch) => {
        API.getAllPosts().then(
            (response) => dispatch(receiveAllPosts(response))
        )
    }
}

export function getPost(id) {
    return (dispatch) => {
        API.getPost(id).then(
            (response) => dispatch(receivePost(response))
        )
    }
}

export function getPostsByCategory(category) {
    return (dispatch) => {
        API.getPostsByCategory(category).then(
            (response) => dispatch(receivePostsByCategory(category, response))
        )
    }
}

export const createPost = (post) => {

    post = {
        ...post,
        timestamp: Date.now(),
    };

    return (dispatch) => {
        return API.createPost(post)
            .then(post => API.getPostsByCategory(post.category))
            .then(posts => dispatch(receiveAllPosts(posts)))
    }
}

export const editPost = (post) => {

    post = {
        ...post,
        timestamp: Date.now(),
    };

    return dispatch => {
        return API.editPost(post)
            .then(post => API.getAllPosts(post.category))
            .then(posts => dispatch(receiveAllPosts(posts)))
    }
}

export const deletePost = (post) => {
    return dispatch => {
        return API.deletePost(post)
            .then(post => API.getAllPosts())
            .then(posts => dispatch(receiveAllPosts(posts)))
    }
}

export const votePost = (id, option, singlePost) => {

    if (singlePost) {
        return dispatch => {
            return API.votePost(id, option)
                .then(post => API.getPost(id))
                .then(post => dispatch(receivePost(post)))
        }
    } else {

        return dispatch => {
            return API.votePost(id, option)
                .then(post => API.getAllPosts())
                .then(posts => dispatch(receiveAllPosts(posts)))
        }
    }


}

export const addComment = (comment) => {
    comment = {
        ...comment,
        timestamp: Date.now(),
    };
    return dispatch => {
        return API.createComment(comment)
            .then(comment => API.getComments(comment.parentId)
                .then(comments => dispatch(receiveComments(comments))))
    }
}

export const editComment = (comment) => {

    comment = {
        ...comment,
        timestamp: Date.now(),
    };

    return dispatch => {
        return API.editComment(comment)
            .then(comment => API.getComments(comment.parentId)
                .then(comments => dispatch(receiveComments(comments))))
    }
}

export const deleteComment = (comment) => {

    return dispatch => {
        return API.deleteComment(comment)
            .then(comment => API.getComments(comment.parentId)
                .then(comments => dispatch(receiveComments(comments))))
    }
}

export const getComments = (id) => {
    return (dispatch) => {
        return API.getComments(id)
            .then(comments => dispatch(receiveComments(comments)))
    }
}

export const voteComment = (id, option) => {
    return dispatch => {
        return API.voteComment(id, option)
            .then(comment => API.getComments(comment.parentId)
                .then(comments => dispatch(receiveComments(comments))))
    }
}