import { RECEIVE_CATEGORIES, REQUEST_CATEGORY } from '../actions/categories'

export default function categories(state = {}, action) {

    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return action.categories
        case REQUEST_CATEGORY:
            return action.category
        default:
            return state
    }

}