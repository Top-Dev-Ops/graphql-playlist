import React from 'react'

import { graphql } from 'react-apollo'

import { getBookQuery } from '../queries/queries'

const BookDetails = ({ data }) => {

  const displayBookDetails = () => {
    const { book } = data
    if (book) {
      return (
        <>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by {book.author.name}</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </>
      )
    } else return <>No book selected.</>
  }

  return (
    <div id="book-details">
      {displayBookDetails()}
    </div>
  )
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
