export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_CATEGORY = 'REQUEST_CATEGORY'

export const receiveCategories = (categories) => ({
        type: RECEIVE_CATEGORIES,
        categories
})

export const requestCategory = (category) => ({
      type: REQUEST_CATEGORY,
      category
  })