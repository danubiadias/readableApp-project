export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'

export const receiveAllPosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

export function receivePostsByCategory(category, posts) {
    return {
        type: RECEIVE_POSTS_BY_CATEGORY,
        category,
        posts
    }
}

