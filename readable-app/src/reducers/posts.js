import { RECEIVE_POSTS, RECEIVE_POST, RECEIVE_POSTS_BY_CATEGORY } from '../actions/posts'

const initialStatePosts = {
    posts: []
}

export default function posts(state = initialStatePosts, action) {

    switch (action.type) {

        case RECEIVE_POSTS:
            return action.posts
        case RECEIVE_POSTS_BY_CATEGORY:
            return action.posts
        case RECEIVE_POST:
            return action.post
        default:
            return state
    }

}