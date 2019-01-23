const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

export const getAllCategories = () => fetch(
  `${api}/categories`,
  {
    headers: headers,
  }
).then(res => res.json()).then(data => data.categories)

export const getAllPosts = () => fetch(
  `${api}/posts`,
  {
    headers: headers,
  }
).then(res => res.json()).then(data => data)

export const getPostsByCategory = (data) => fetch(
  `${api}/${data}/posts`,
  {
    headers: headers,
  }
).then(res => res.json()).then(data => data)

export const getPost = (data) => fetch(
  `${api}/posts/${data}`,
  {
    headers: headers,
  }
).then(res => res.json()).then(data => data)

export const createPost = (data) =>
  fetch(
    `${api}/posts`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => data)


export const editPost = (data) => fetch(
  `${api}/posts/${data.id}`,
  {
    method: 'put',
    headers: headers,
    body: JSON.stringify(data)
  }
).then(res => res.json()).then(data => data)


export const deletePost = (data) =>
  fetch(`${api}/posts/${data.id}`, {
    method: 'DELETE',
    headers,
  }
  ).then(res => res.json())
    .then(data => data)

export const getComments = (data) => fetch(
  `${api}/posts/${data}/comments`,
  {
    headers: headers
  }
).then(res => res.json()).then(data => data)

export const getComment = (data) => fetch(
  `${api}/comments/${data}`,
  {
    headers: headers
  }
).then(res => res.json()).then(data => data)

export const createComment = (data) => fetch(
  `${api}/comments`,
  {
    method: 'post',
    headers: headers,
    body: JSON.stringify(data)
  }
).then(res => res.json()).then(data => data)

export const editComment = (data) => fetch(
  `${api}/comments/${data.id}`,
  {
    method: 'put',
    headers: headers,
    body: JSON.stringify(data)
  }
).then(res => res.json()).then(data => data)


export const deleteComment = (data) =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'DELETE',
    headers,
  }
  ).then(res => res.json())
    .then(data => data)

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option: option
    })
  }
  ).then(res => res.json())
    .then(data => data)

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)

