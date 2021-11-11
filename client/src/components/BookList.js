import React, { useState } from 'react'

import { graphql } from 'react-apollo'

import { getBooksQuery } from '../queries/queries'

import BookDetails from './BookDetails'

const BookList = ({ data }) => {

  const [selected, setSelected] = useState(null)

  const displayBooks = () => {
    const { loading, books } = data
    if (loading) {
      return <div>Loading...</div>
    } else {
      return books.map(book => (
        <li key={book.id} onClick={() => setSelected(book.id)}>{book.name}</li>
      ))
    }
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
