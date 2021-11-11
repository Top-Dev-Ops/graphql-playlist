import React, { useState } from 'react'

import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {

  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('')

  const displayAuthors = () => {
    const { loading, authors } = getAuthorsQuery
    if (loading) {
      return <option>Loading...</option>
    } else {
      return authors.map(author => (
        <option key={author.id} value={author.id}>{author.name}</option>
      ))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addBookMutation({
      variables: {
        name, genre, authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Book name: </label>
        <input type="text" id="name" onChange={e => setName(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="genre">Genre: </label>
        <input type="text" id="genre" onChange={e => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="author">Author: </label>
        <select name="author" id="author" onChange={e => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation'})
)(AddBook)
